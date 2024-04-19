import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum LocalStorageKey {
  Token = 'token',
}

// UserModel의 타입 정의
export type UserState = {
  _id: string; // MongoDB에서 자동으로 생성되는 필드 (필요에 따라 사용)
  avatar: string;
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
};

export interface UserResponse {
  email: string | null;
  nickname: string | null;
  userImage: string | null;
  preset: number | null;
  likePosts: number[] | null;
  userId: number | null;
  push: boolean | null;
  super: boolean | null;
}

const initialState: UserState = {
  _id: "",
  email:"",
  avatar: "",
  name: "",
  role:  "",
  grade: 0,
  point: 0,
  tear: "",
  BELO: {
    race:  "",
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
  name: 'user',
  initialState,
  reducers: {
    LOGIN_USER: (state: UserState, action) => {
      state.email = action.payload.email;
      state.avatar = action.payload.nickname;
      state.user.userImage = action.payload.userImage;
      state.user.preset = action.payload.preset;
      localStorage.setItem(LocalStorageKey.Token, action.payload.token);
    },
    LOGOUT_USER: (state: UserState) => {
      state.user.email = null;
      state.user.nickName = null;
      localStorage.removeItem(LocalStorageKey.Token);
    },
    AUTH_USER: (state: UserState, action: PayloadAction<UserResponse>) => {
      state.user.email = action.payload.email;
      state.user.nickName = action.payload.nickname;
      state.user.userImage = action.payload.userImage;
      state.user.preset = action.payload.preset;
      state.user.likePosts = action.payload.likePosts;
      state.user.push = action.payload.push;
      state.user.userId = action.payload.userId;
    },
  },
});

export const {
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
} = userSlice.actions;

export default userSlice.reducer;
