import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const config = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const response = await fetch(`${process.env.NEXT_AUTH_URL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ signInState: { email, password } }),
          });

          const data = await response.json();

          if (response.ok && data.user) {
            return data.user; // 성공적으로 사용자 정보를 받음
          } else {
            // API에서 반환된 에러 메시지 사용 또는 기본 에러 메시지 설정
            throw new Error(
              data.message || "로그인에 실패했습니다. 다시 시도해 주세요."
            );
          }
        } catch (error: any) {
          // catch 블록에서 오류를 잡아 에러를 던집니다.
          throw new Error(
            error.message || "로그인 처리 중 오류가 발생했습니다."
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // 사용자 정의 로그인 페이지
    signOut: "/", // 로그아웃 후 리다이렉트 페이지
  },
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/auth/signin") return !!auth;
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        // 사용자 정보 확장 필드 추가
        token.avatar = user.avatar;
        token.name = user.name;
        token.nickname = user.nickname;
        token.role = user.role;
        token.grade = user.grade;
        token.point = user.point;
        token.tear = user.tear;
        token.BELO = user.BELO;
        token.league = user.league;
        token.team = user.team;
        token.kakao = user.kakao;
        token.birth = user.birth;
        token.id = user._id;
        token.email = user.email;
        token.phone = user.phone;
        token.message = user.message;
      }
      return token;
    },
    session({ session, token }) {
      // 세션 정보에 토큰에서 사용자 정보를 추가
      if (token) {
        session.user = {
          _id: token.id as string,
          message: token.message as string,
          avatar: token.avatar as string,
          name: token.name as string,
          nickname: token.nickname as string,
          point: token.point as number,
          kakao: token.kakao as string,
          birth: token.birth as Date,
          BELO: token.BELO as any,
          league: token.league as any,
          email: token.email as string,
          role: token.role as string,
          grade: token.grade as number,
          tear: token.tear as string,
          team: token.team as string,
          phone: token.phone as string,
          id: token.id as string, // 필요한 경우 token에서 id를 가져오거나 기본 id 제공
          emailVerified: null, // emailVerified는 null이 가능
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3600 * 24,
  },
  jwt: {
    maxAge: 3600 * 24,
  },
  secret: `${process.env.NEXT_AUTH_SECRET}`,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
