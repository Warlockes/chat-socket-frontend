import React from "react";
import axios from "axios";

import { FormState, JoinBlock } from "./components/JoinBlock";
import { Chat } from "./components/Chat";
import {
  addMessage,
  setAuth,
  setMessages,
  setUsers,
} from "./context/actionCreators";
import { initialState, reducer } from "./context/reducer";
import { socket } from "./socket";
import { RoomResponse } from "./types";

import "./App.scss";
import { Message } from "./context/state";

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onLogin = async (formState: FormState) => {
    dispatch(setAuth({ ...formState }));
    socket.emit("ROOM:JOIN", { ...formState });
    const { data } = await axios.get<RoomResponse>(
      `https://test-socket-backend.herokuapp.com/rooms/${formState.roomId}`
    );
    dispatch(setUsers(data.users));
    dispatch(setMessages(data.messages));
  };

  const handleAddNewMessage = React.useCallback((newMessage: Message) => {
    dispatch(addMessage(newMessage));
  }, []);

  React.useEffect(() => {
    const handleSetUsers = (users: string[]) => {
      dispatch(setUsers(users));
    };

    socket.on("ROOM:SET_USERS", handleSetUsers);
    socket.on("ROOM:NEW_MESSAGE", handleAddNewMessage);

    return () => {
      socket.off("ROOM:SET_USERS", handleSetUsers);
      socket.off("ROOM:NEW_MESSAGE", handleAddNewMessage);
    };
  }, [handleAddNewMessage]);

  return (
    <div className="wrapper">
      {!state.isAuth ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat state={state} onAddMessage={handleAddNewMessage} />
      )}
    </div>
  );
}

export default App;
