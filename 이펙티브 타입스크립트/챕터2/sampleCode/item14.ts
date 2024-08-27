interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}

type TopNavState = {
  userId: State["userId"];
  pageTitle: State["pageTitle"];
  recentFiles: State["recentFiles"];
};

type CustomPick<T, K extends keyof T> = {
  [k in K]: T[k];
};

type TopNavState = CustomPick<State, "userId" | "pageTitle" | "recentFiles">;

type Partial<T> = { [k in keyof T]?: T[k] };

type Something = {
  a: number;
  b: number;
};
