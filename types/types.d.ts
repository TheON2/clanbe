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
  category:String,// 속한 카테고리
  title: String, // 카테고리 항목의 제목
  description: String, // 메뉴 항목의 설명
  icon: String, // 메뉴 항목의 아이콘
  href: String, // 라우터 링크
}

// NavData 타입 정의, 이전 단계에서 사용된 NavData 타입 예시를 확장하여 사용합니다.
export type NavData = {
  user: User[];
  teams: Team[];
};