import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { newMessageState } from 'store';
import { SingleMessageType } from 'types/message';
import { fetchSendMessage } from '../services';

export function useManageMessageData(currentUserID: string, contents: SingleMessageType[], userId: string) {
  const [inputValue, setInputValue] = useState<string>('');
  const [currentMessageData, setCurrentMessageData] = useState<SingleMessageType[]>([]);
  const [newMessage, setNewMessage] = useRecoilState(newMessageState);

  async function handleSubmitMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue.length < 1) return;
    await fetchSendMessage(userId, inputValue)
      .then(() => {
        setCurrentMessageData((prevState) => [
          ...prevState,
          { from: currentUserID ?? '', content: inputValue, createdAt: new Date().toString() },
        ]);
      })
      .then(() => {
        setInputValue('');
      });
  }

  function handleChangeInputValue(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  useEffect(() => {
    setCurrentMessageData(contents);
  }, [contents]);

  useEffect(() => {
    if (!newMessage) return;
    setCurrentMessageData((prevState) => [...prevState, newMessage]);
  }, [newMessage]);

  return {
    handleChangeInputValue,
    handleSubmitMessage,
    inputValue,
    currentMessageData,
  };
}
