import {
  AppStateActionType,
  IAddMessageAction,
  ISetAuthAction,
  ISetMessagesAction,
  ISetUsersAction,
} from "./actionTypes";
import { Message } from "./state";

export const setAuth = (payload: {
  userName: string;
  roomId: string;
}): ISetAuthAction => ({
  type: AppStateActionType.SET_AUTH,
  payload,
});

export const setUsers = (payload: string[]): ISetUsersAction => ({
  type: AppStateActionType.SET_USERS,
  payload,
});

export const setMessages = (payload: Message[]): ISetMessagesAction => ({
  type: AppStateActionType.SET_MESSAGES,
  payload,
});

export const addMessage = (payload: Message): IAddMessageAction => ({
  type: AppStateActionType.ADD_MESSAGE,
  payload,
});
