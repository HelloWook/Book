const fs = require('fs');
const path = require('path');

const CONTENTS_BOOKS_DIR = path.join(__dirname, '..', 'contents', 'books');
const DOCS_BOOKS_DIR = path.join(__dirname, '..', 'docs', 'books');

// README 파일명 패턴들
const README_PATTERNS = [
  /^readme\.md$/i,
  /^README\.MD$/i,
  /^Readme\.md$/i,
  /^RAEDME\.MD$/i,
  /^Raedme\.md$/i,
  /^READMD\.MD$/i,
  /^REAMDE\.MD$/i,
];

// 파일명을 표준화 (README.md로)
function normalizeReadmeName(filename) {
  if (README_PATTERNS.some(pattern => pattern.test(filename))) {
    return 'README.md';
  }
  // 아이템.README.MD 같은 경우도 처리 (REAMDE 같은 오타 포함)
  if (/^아이템\d*\.RE?A?M?D?E?\.MD$/i.test(filename)) {
    const match = filename.match(/^아이템(\d*)\.RE?A?M?D?E?\.MD$/i);
    const num = match[1] ? match[1] : '';
    return `아이템${num}.md`;
  }
  // 다른 README 변형들 (REAMDE 같은 오타 포함)
  if (/RE?A?M?D?E?/i.test(filename) && /\.MD?$/i.test(filename)) {
    // README, RAEDME, REAMDE 등을 모두 README로 정규화
    return filename.replace(/RE?A?M?D?E?/i, 'README').replace(/\.MD$/, '.md');
  }
  return filename;
}

// 디렉토리 복사 함수
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // 예제 코드 폴더는 그대로 복사
      if (entry.name === '예제 코드' || entry.name === 'samplecode' || entry.name === 'sampleCode') {
        copyDirectory(srcPath, destPath);
      } else {
        // 일반 장 폴더
        copyDirectory(srcPath, destPath);
        // _category_.json 생성
        createCategoryJson(destPath, entry.name);
      }
    } else {
      // 파일 복사
      const normalizedName = normalizeReadmeName(entry.name);
      const finalDestPath = path.join(dest, normalizedName);
      
      // 이미 존재하는 파일은 건너뛰기 (덮어쓰지 않음)
      if (!fs.existsSync(finalDestPath)) {
        fs.copyFileSync(srcPath, finalDestPath);
        console.log(`복사: ${srcPath} -> ${finalDestPath}`);
      } else {
        console.log(`건너뜀 (이미 존재): ${finalDestPath}`);
      }
    }
  }
}

// _category_.json 파일 생성
function createCategoryJson(dirPath, folderName) {
  const categoryJsonPath = path.join(dirPath, '_category_.json');
  
  if (fs.existsSync(categoryJsonPath)) {
    return; // 이미 존재하면 건너뛰기
  }

  const categoryJson = {
    label: folderName,
    position: 1
  };

  fs.writeFileSync(categoryJsonPath, JSON.stringify(categoryJson, null, 2), 'utf8');
  console.log(`생성: ${categoryJsonPath}`);
}

// 메인 실행
function main() {
  console.log('책 파일 동기화 시작...');
  console.log(`소스: ${CONTENTS_BOOKS_DIR}`);
  console.log(`대상: ${DOCS_BOOKS_DIR}\n`);

  if (!fs.existsSync(CONTENTS_BOOKS_DIR)) {
    console.error('소스 디렉토리가 존재하지 않습니다:', CONTENTS_BOOKS_DIR);
    process.exit(1);
  }

  if (!fs.existsSync(DOCS_BOOKS_DIR)) {
    fs.mkdirSync(DOCS_BOOKS_DIR, { recursive: true });
  }

  // 각 책 디렉토리 처리
  const books = fs.readdirSync(CONTENTS_BOOKS_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  for (const book of books) {
    console.log(`\n처리 중: ${book}`);
    const srcBookPath = path.join(CONTENTS_BOOKS_DIR, book);
    const destBookPath = path.join(DOCS_BOOKS_DIR, book);
    copyDirectory(srcBookPath, destBookPath);
  }

  console.log('\n동기화 완료!');
}

main();

