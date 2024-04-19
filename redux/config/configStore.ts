import {
  combineReducers,
  configureStore,
  PayloadAction,
} from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import teamReducer from '../reducers/teamSlice';

const rootReducer = combineReducers({
  user: userReducer,
  team: teamReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
