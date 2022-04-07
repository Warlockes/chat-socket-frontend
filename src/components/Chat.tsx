import React from "react";
import { AppState, Message } from "../context/state";
import { socket } from "../socket";

interface ChatProps {
  state: AppState;
  onAddMessage: (message: Message) => void;
}

export const Chat: React.FC<ChatProps> = ({ state, onAddMessage }) => {
  const [messageValue, setMessageValue] = React.useState<string>("");
  const { messages, users, roomId, userName } = state;
  const messagesContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    messagesContainerRef.current?.scrollTo(0, 99999);
  }, [messages]);

  const handleChangeMessage = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setMessageValue(event.currentTarget.value);
  };

  const handleSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      text: messageValue,
      roomId,
      userName,
    });
    onAddMessage({ text: messageValue, userName: userName ?? "Anon" });
    setMessageValue("");
  };

  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesContainerRef} className="messages">
          {messages.map((message) => (
            <div className="message">
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            className="form-control"
            rows={3}
            value={messageValue}
            onChange={handleChangeMessage}
          ></textarea>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSendMessage}
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};
