// 주체 클래스
class News {
  constructor() {
    this.observer = [];
    this.news = null;
  }

  subscribe(user) {
    console.log(user.getName() + " 님이 구독 했습니다.");
    this.observer.push(user);
  }

  unSubscrbe(user) {
    console.log(user.getName() + " 님이 구독을 취소했습니다");
    this.observer = this.observer.filter((subscribe) => subscribe !== user);
  }

  setNews(news) {
    this.news = news;
    this.notifiy();
  }

  getNews() {
    console.log(this.news);
  }

  notifiy() {
    this.observer.forEach((observer) => {
      observer.update();
      this.getNews();
    });
  }
}

// 팔로우 객체
class SubScirber {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  update() {
    console.log(this.getName() + "님 새 뉴스가 왔어요!");
  }
}

const news = new News();

const a = new SubScirber("철수");
const b = new SubScirber("영희");

news.subscribe(a);
news.subscribe(b);

news.setNews("지진 발생!!");

news.unSubscrbe(b);

news.setNews("해일 발생!!!");
