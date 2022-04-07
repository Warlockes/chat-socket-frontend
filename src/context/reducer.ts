import produce, { Draft } from "immer";
import { AppStateActions, AppStateActionType } from "./actionTypes";
import { AppState } from "./state";

export const initialState: AppState = {
  isAuth: false,
  userName: null,
  roomId: null,
  users: [],
  messages: [],
};

export const reducer = produce(
  (draft: Draft<AppState>, action: AppStateActions) => {
    switch (action.type) {
      case AppStateActionType.SET_AUTH:
        draft.isAuth = true;
        draft.roomId = action.payload.roomId;
        draft.userName = action.payload.userName;
        break;
      case AppStateActionType.SET_USERS:
        draft.users = action.payload;
        break;
      case AppStateActionType.SET_MESSAGES:
        draft.messages = action.payload;
        break;
      case AppStateActionType.ADD_MESSAGE:
        draft.messages.push(action.payload);
        break;
      default:
        break;
    }
  },
  initialState
);
