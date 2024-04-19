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

// UserModel의 타입 정의
export type User = {
  _id: string; // MongoDB에서 자동으로 생성되는 필드 (필요에 따라 사용)
  avatar: string;
  name: string;
  password: string;
  role: string;
  grade: number;
  point: number;
  tear: string;
  BELO: {
    race: string;
    pw: number;
    pl: number;
    tw: number;
    tl: number;
    zw: number;
    zl: number;
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
  id: number;
  category: string;
  title: string;
  date: number;
  author: string;
  view: number;
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
