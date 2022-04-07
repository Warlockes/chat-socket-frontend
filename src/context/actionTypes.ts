import { Message } from "./state";

export enum AppStateActionType {
  SET_AUTH = "app/SET_AUTH",
  SET_USERS = "app/SET_USERS",
  SET_MESSAGES = "app/SET_MESSAGES",
  ADD_MESSAGE = "app/ADD_MESSAGE",
}

export interface ISetAuthAction {
  type: AppStateActionType.SET_AUTH;
  payload: {
    userName: string;
    roomId: string;
  };
}

export interface ISetUsersAction {
  type: AppStateActionType.SET_USERS;
  payload: string[];
}

export interface ISetMessagesAction {
  type: AppStateActionType.SET_MESSAGES;
  payload: Message[];
}

export interface IAddMessageAction {
  type: AppStateActionType.ADD_MESSAGE;
  payload: Message;
}

export type AppStateActions =
  | ISetAuthAction
  | ISetUsersAction
  | ISetMessagesAction
  | IAddMessageAction;
