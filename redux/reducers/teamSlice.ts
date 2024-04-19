import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// UserModel의 타입 정의
export type TeamState = {
  _id: string; // MongoDB에서 자동으로 생성되는 필드 (필요에 따라 사용)
  name: string;
  ranking: number;
  w: number;
  l: number;
  point: number;
  winpoint: number;
};

const initialState: TeamState[] = [];

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    LOGIN_TEAM: (state, action: PayloadAction<TeamState[]>) => {
      return action.payload; // 새로운 팀 데이터로 상태 전체를 대체
    },
    LOGOUT_TEAM: (state) => {
      return []; // 로그아웃 시 상태를 비움
    },
    AUTH_TEAM: (state, action: PayloadAction<TeamState[]>) => {
      return action.payload; // 인증된 팀 데이터로 상태 전체를 대체
    },
  },
});

export const { LOGIN_TEAM, LOGOUT_TEAM, AUTH_TEAM } = teamSlice.actions;

export default teamSlice.reducer;
