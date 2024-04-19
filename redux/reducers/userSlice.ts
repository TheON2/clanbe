import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum LocalStorageKey {
  Token = "token",
}

// UserModel의 타입 정의
export type UserState = {
  _id: string; // MongoDB에서 자동으로 생성되는 필드 (필요에 따라 사용)
  avatar: string;
  email: string;
  nickname: string;
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

const initialState: UserState = {
  _id: "",
  email: "",
  avatar: "",
  nickname: "",
  name: "",
  role: "",
  grade: 0,
  point: 0,
  tear: "",
  BELO: {
    race: "",
    pw: 0,
    pl: 0,
    tw: 0,
    tl: 0,
    zw: 0,
    zl: 0,
  },
  team: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN_USER: (state: UserState, action) => {
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.nickname = action.payload.nickname;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.grade = action.payload.grade;
      state.point = action.payload.point;
      state.tear = action.payload.tear;
      state.BELO = action.payload.BELO;
      state.team = action.payload.team;
      localStorage.setItem(LocalStorageKey.Token, action.payload.token);
    },
    LOGOUT_USER: (state: UserState) => {
      state.email = "";
      state.avatar = "";
      state.nickname = "";
      state.name = "";
      state.role = "";
      state.grade = 0;
      state.point = 0;
      state.tear = "";
      state.BELO = {
        race: "",
        pw: 0,
        pl: 0,
        tw: 0,
        tl: 0,
        zw: 0,
        zl: 0,
      };
      state.team = "";
      localStorage.removeItem(LocalStorageKey.Token);
    },
    AUTH_USER: (state: UserState, action) => {
      state.email = action.payload.email;
      state.avatar = action.payload.nickname;
      state.nickname = action.payload.nickname;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.grade = action.payload.grade;
      state.point = action.payload.point;
      state.tear = action.payload.tear;
      state.BELO = action.payload.BELO;
      state.team = action.payload.team;
    },
  },
});

export const { LOGIN_USER, LOGOUT_USER, AUTH_USER } = userSlice.actions;

export default userSlice.reducer;
