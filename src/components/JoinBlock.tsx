import React from "react";
import axios from "axios";

interface JoinBlockProps {
  onLogin: (obj: FormState) => void;
}

export interface FormState {
  roomId: string;
  userName: string;
}

export const JoinBlock: React.FC<JoinBlockProps> = ({ onLogin }) => {
  const [formState, setFormState] = React.useState<FormState>({
    roomId: "",
    userName: "",
  });
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const handleChangeFormField = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearForm = () => {
    setFormState({ roomId: "", userName: "" });
  };

  const onEnter = async () => {
    const { roomId, userName } = formState;

    if (!roomId || !userName) {
      return alert("Неверные данные для входа");
    }

    setLoading(true);

    await axios.post("https://test-socket-backend.herokuapp.com/rooms", {
      roomId,
      userName,
    });

    handleClearForm();
    setLoading(false);
    onLogin(formState);
  };

  return (
    <div className="join-block">
      <input
        type="text"
        name="roomId"
        placeholder="Room ID"
        value={formState.roomId}
        onChange={handleChangeFormField}
      />
      <input
        type="text"
        name="userName"
        placeholder="Ваше имя"
        value={formState.userName}
        onChange={handleChangeFormField}
      />
      <button
        className="btn btn-success"
        disabled={isLoading}
        onClick={onEnter}
      >
        {isLoading ? "ВХОД..." : "ВОЙТИ"}
      </button>
    </div>
  );
};
