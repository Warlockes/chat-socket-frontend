export interface Message {
  userName: string;
  text: string;
}

export interface AppState {
  isAuth: boolean;
  userName: string | null;
  roomId: string | null;
  users: string[];
  messages: Message[];
}
