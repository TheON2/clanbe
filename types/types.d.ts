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
}

// NavData 타입 정의, 이전 단계에서 사용된 NavData 타입 예시를 확장하여 사용합니다.
export type NavData = {
  user: User[];
  teams: Team[];
};