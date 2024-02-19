import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ModalReducer from "./Modal/ModalReducer";
import UserInfoReducer from "./UserInfo/UserInfoReducer";
import TourInfoReducer from "./TourInfo/TourInfoReducer";

export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  modal: ModalReducer,
  userInfo: UserInfoReducer,
  tourInfo: TourInfoReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
