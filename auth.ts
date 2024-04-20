import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User as NextAuthUser } from "next-auth";
// NextAuth의 User 타입을 확장하여 새로운 타입 정의
export interface ExtendedUser extends NextAuthUser {
  avatar?: string;
  email?: string;
  nickname?: string;
  role?: string;
  grade?: number;
  point?: number;
  tear?: string;
  BELO?: {
    race: string;
    pw: number;
    pl: number;
    tw: number;
    tl: number;
    zw: number;
    zl: number;
  };
  team?: string;
}

export const config = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const response = await fetch("http://localhost:3000/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ signInState: { email, password } }),
        });

        const data = await response.json();

        // 데이터 검증
        if (!response.ok || !data.user) {
          console.error("Login failed or bad data", data);
          return null;
        }

        if (data) {
          // 유저 정보와 토큰을 NextAuth.js 세션에 저장합니다.
          return data.user as ExtendedUser;
        } else {
          // 로그인 실패 시 null을 반환합니다.
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/AUTH/signin", // 사용자 정의 로그인 페이지
    // 기타 페이지 설정 생략...
  },
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      alert(pathname);
      if (pathname === "/AUTH/signin") return !!auth;
      return true;
    },
   jwt({ token, user }) {
      if (user) {
        // 사용자 정보 확장 필드 추가
        const extendedUser = user as ExtendedUser;
        token.avatar = extendedUser.avatar;
        token.name = extendedUser.name;
        token.nickname = extendedUser.nickname;
        token.role = extendedUser.role;
        token.grade = extendedUser.grade;
        token.point = extendedUser.point;
        token.tear = extendedUser.tear;
        token.BELO = extendedUser.BELO;
        token.team = extendedUser.team;
      }
      return token;
    },
    session({ session, token }) {
      // 세션 정보에 토큰에서 사용자 정보를 추가
      if (token) {
        session.user = {
          avatar: token.avatar,
          name: token.name,
          nickname: token.nickname,
          point: token.point,
          BELO:token.BELO,
          email: token.email,
          role: token.role,
          grade: token.grade,
          tear:token.tear
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: "1234",
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
