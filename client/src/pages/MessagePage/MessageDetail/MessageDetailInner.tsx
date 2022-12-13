/** @jsxImportSource @emotion/react */

import { useState, useEffect, useCallback, useRef, ChangeEvent, FormEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { Button } from 'common';
import { currentUserState, newMessageState } from 'store';
import { MessageDetailType, SingleMessageType } from 'types/message';
import { MessageElement } from './MessageElement';
import { fetchSendMessage } from '../services';
import { MessageTopBar } from '../MessageTopBar';

import { messageDetailInputWrapperStyle, messageDetailListStyle, messageInputStyle, goBackButtonStyle } from './styles';

import { ArrowDownIcon } from 'assets/svgs';

interface Props {
  promise: { read: () => MessageDetailType };
  userId: string;
}

export const MessageDetailInner = ({ promise, userId }: Props) => {
  const [currentMessageData, setCurrentMessageData] = useState<SingleMessageType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const [newMessage, setNewMessage] = useRecoilState(newMessageState);
  const { toUsername, contents } = promise.read();
  const nav = useNavigate();

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

  useEffect(() => {
    setCurrentMessageData(contents);
  }, [contents]);

  useEffect(() => {
    if (!newMessage) return;
    setCurrentMessageData((prevState) => [...prevState, newMessage]);
    setNewMessage(null);
  }, [newMessage]);

  const handleClickBackButton = useCallback(() => {
    nav('/message');
  }, []);

  const messageDetailListRef = useRef<HTMLUListElement>(null);

  function scrollToEnd() {
    if (messageDetailListRef.current) {
      messageDetailListRef.current.scrollTop = messageDetailListRef.current.scrollHeight;
    }
  }

  function handleChangeInputValue(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  useEffect(() => {
    scrollToEnd();
  }, [currentMessageData]);

  return (
    <>
      <MessageTopBar>
        <>
          <button type='button' css={goBackButtonStyle} onClick={handleClickBackButton}>
            <ArrowDownIcon />
          </button>
          <h4>{toUsername}</h4>
        </>
      </MessageTopBar>
      <ul css={messageDetailListStyle} ref={messageDetailListRef}>
        {currentMessageData.map((data: SingleMessageType, idx: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <MessageElement isMine={currentUserID === data.from} messageData={data} key={`message-${data.from}-${idx}`} />
        ))}
      </ul>
      <form css={messageDetailInputWrapperStyle} onSubmit={handleSubmitMessage}>
        <input
          type='text'
          placeholder='쪽지를 입력하세요 (140자)'
          value={inputValue}
          maxLength={140}
          css={messageInputStyle}
          onChange={handleChangeInputValue}
        />
        <Button isSubmit>
          <span>전송</span>
        </Button>
      </form>
    </>
  );
};
