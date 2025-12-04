const fs = require('fs');
const path = require('path');

const DOCS_BOOKS_DIR = path.join(__dirname, '..', 'docs', 'books');

// 예제 코드 폴더 내부의 불필요한 _category_.json 파일들을 제거
// 예: pages, style, view, model, components 등은 문서가 아니므로 _category_.json이 필요 없음
const EXCLUDE_FOLDERS = [
  'pages', 'style', 'view', 'model', 'components', 
  'AngularJS', 'React', 'public', 'samplecode', 'sampleCode'
];

function shouldExcludeFolder(folderName) {
  return EXCLUDE_FOLDERS.some(exclude => 
    folderName.toLowerCase().includes(exclude.toLowerCase())
  );
}

function cleanupCategoryJson(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // 예제 코드 폴더 내부의 특정 폴더들은 _category_.json 제거
      if (shouldExcludeFolder(entry.name)) {
        const categoryJsonPath = path.join(entryPath, '_category_.json');
        if (fs.existsSync(categoryJsonPath)) {
          fs.unlinkSync(categoryJsonPath);
          console.log(`제거: ${categoryJsonPath}`);
        }
      }
      // 재귀적으로 처리
      cleanupCategoryJson(entryPath);
    }
  }
}

function main() {
  console.log('불필요한 _category_.json 파일 정리 시작...\n');
  cleanupCategoryJson(DOCS_BOOKS_DIR);
  console.log('\n정리 완료!');
}

main();

