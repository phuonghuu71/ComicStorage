import * as React from "react";

export interface useInputProps {
  text: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  onChangeTextHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useInput() {
  const [text, setText] = React.useState<string>("");

  const onChangeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return [text, setText, onChangeTextHandler] as const;
}

export default useInput;
