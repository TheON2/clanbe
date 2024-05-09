// TeamModel의 타입 정의
export type Team = {
  _id: string; // MongoDB에서 자동으로 생성되는 필드 (필요에 따라 사용)
  name: string;
  ranking: number;
  w: number;
  l: number;
  point: number;
  winpoint: number;
};

export type SupportAmount = {
  _id?: string;
  type: number;
  amount: number;
  email: string;
  postid: string;
}

export type Support = {
  amount: number;
  _id?: string;
  createdAt: Date;
  nickname: string;
  title?: string;
  user: {
    avatar: string;
    email: string;
    name: string;
  }
}

export type Match = {
  _id?: string;
  name: string;
  winner: string;
  wrace: string;
  loser: string;
  lrace: string;
  map: string;
  date: Date;
}

export type ViewDate = {
  _id?: string;
  userid: string;
  postid: string;
}

export type EventType = {
  id?: string;
  title: string;
  date: string;
  description: string;
  author: string;
}

// UserModel의 타입 정의
export type User = {
  _id: string; // MongoDB에서 자동으로 생성되는 필드 (필요에 따라 사용)
  avatar: string;
  nickname: string;
  email: string;
  name: string;
  password: string;
  role: string;
  grade: number;
  point: number;
  tear: string;
  kakao: string;
  birth: date;
  BELO: {
    race: string;
    pw: number;
    pl: number;
    tw: number;
    tl: number;
    zw: number;
    zl: number;
    belo: number;
  };
  team: string;
};

export type Category = {
  buttonTitle: string;
  menuItems: {
    title: string;
    description: string;
    icon: string;
    href: string;
  }[];
};

export type CategoryData = {
  category: Category[];
};

// NavData 타입 정의, 이전 단계에서 사용된 NavData 타입 예시를 확장하여 사용합니다.
export type NavData = {
  user: User[];
  teams: Team[];
};

// 게시물 타입 정의
export type Post = {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  featured: boolean;
  noticed: boolean;
  fileUrl: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  view: number;
  comments: Comment[];
};

export type Reply = {
  _id: string;
  author: string;
  text: string;
  createdAt: Date;
};

export type Comment = {
  _id: string;
  author: string;
  text: string;
  replies: Reply[];
  createdAt: Date;
};

//회원가입 정보 타입정의
export type Signup = {
  name: string;
  kakao: string;
  birth: date;
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  race: string;
};

//회원가입 에러메세지
export type Error = {
  name: string;
  kakao: string;
  birth: date;
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  race: string;
};

//회원가입 정보 체크박스 타입정의
export type CheckBoxInterface = {
  checkAll: boolean;
  checkTerms: boolean;
  checkPersonalInfo: boolean;
  checkNewsletter: boolean;
};
