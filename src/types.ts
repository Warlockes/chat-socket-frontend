import { Message } from "./context/state";

export interface RoomResponse {
  users: string[];
  messages: Message[];
}
