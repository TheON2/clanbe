// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  export interface User {
    _id: string;
    avatar: string;
    nickname: string;
    email: string;
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
  }
}
