// 주제 (Subject) - 뉴스 발행자
class NewsPublisher {
  constructor() {
    this.subscribers = [];
    this.news = {
      title: "",
      content: "",
      category: "",
    };
  }

  subscribe(observer) {
    this.subscribers.push(observer);
    console.log(`${observer.name} 님이 뉴스 구독을 시작했습니다.`);
  }

  unsubscribe(observer) {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(`${observer.name} 님이 뉴스 구독을 취소했습니다.`);
  }

  notifyAll() {
    console.log(`알림: ${this.news.title} 뉴스가 발행되었습니다.`);
    this.subscribers.forEach((observer) => {
      observer.update(this.news);
    });
  }

  setNews(title, content, category) {
    this.news.title = title;
    this.news.content = content;
    this.news.category = category;
    this.notifyAll();
  }
}

class NewsSubscriber {
  constructor(name) {
    this.name = name;
  }

  update(news) {
    console.log(
      `[${this.name}] 새 뉴스: ${news.title} - ${news.content} (${news.category})`
    );
  }
}

class CategorySubscriber {
  constructor(name, interestedCategory) {
    this.name = name;
    this.interestedCategory = interestedCategory;
  }

  update(news) {
    if (news.category === this.interestedCategory) {
      console.log(
        `[${this.name}] ${this.interestedCategory} 카테고리 알림: ${news.title}`
      );
    }
  }
}

const newsPublisher = new NewsPublisher();

const subscriber1 = new NewsSubscriber("철수");
const subscriber2 = new NewsSubscriber("영희");

const sportsSubscriber = new CategorySubscriber("민수", "스포츠");
const techSubscriber = new CategorySubscriber("지연", "기술");

newsPublisher.subscribe(subscriber1);
newsPublisher.subscribe(subscriber2);
newsPublisher.subscribe(sportsSubscriber);
newsPublisher.subscribe(techSubscriber);

// 뉴스 발행
console.log("\n--- 첫 번째 뉴스 발행 ---");
newsPublisher.setNews(
  "코로나 백신 개발",
  "새로운 백신이 개발되었습니다.",
  "건강"
);

newsPublisher.unsubscribe(subscriber1);

console.log("\n--- 두 번째 뉴스 발행 ---");
newsPublisher.setNews(
  "올림픽 금메달 획득",
  "한국 선수가 금메달을 땄습니다.",
  "스포츠"
);

console.log("\n--- 세 번째 뉴스 발행 ---");
newsPublisher.setNews(
  "새로운 인공지능 기술 발표",
  "혁신적인 AI 모델이 공개되었습니다.",
  "기술"
);
