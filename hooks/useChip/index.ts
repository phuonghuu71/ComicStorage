import React from "react";
import { useInput } from "../useInput";

export interface useChipProps {
  deleteItemFromCurrentList: (item: string) => void;
  addItemToCurrentlist: (
    e: React.FormEvent<HTMLDivElement>,
    dataI: string
  ) => void;
  openPopover: boolean;
}

export function useChip(inputList: string[]) {
  const [text, setText, onChangeTextHandler] = useInput();

  const [rootList, setRootList] = React.useState<string[]>(inputList);

  const [openPopover, setOpenPopover] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (text.length > 0) setOpenPopover(true);
    else setOpenPopover(false);
  }, [text]);

  const deleteItemFromCurrentList = (item: string) => {
    setRootList((prev: string[]) => [...prev, item]);
  };

  const addItemToCurrentlist = (
    e: React.FormEvent<HTMLDivElement>,
    dataI: string
  ) => {
    e.preventDefault();

    const filteredRootList: string[] = rootList.filter(
      (rootListItem: string) => rootListItem !== dataI
    );

    setRootList(filteredRootList);

    setOpenPopover(false);

    setText("");
  };

  return {
    rootList,
    addItemToCurrentlist,
    deleteItemFromCurrentList,
    openPopover,
    text,
    onChangeTextHandler,
  };
}

export default useChip;
