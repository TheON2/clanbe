import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const config = {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        const response = await fetch("http://localhost:3000/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ signInState: { username, password } }),
        });

        const data = await response.json();

        if (data) {
          // 유저 정보와 토큰을 NextAuth.js 세션에 저장합니다.
          return {
            name: data.user.name,
            email: data.user.email,
          };
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
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: "1234",
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
