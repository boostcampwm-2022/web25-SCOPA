/** @jsxImportSource @emotion/react */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
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
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const [currentMessageData, setCurrentMessageData] = useState<SingleMessageType[]>([]);
  const newMessage = useRecoilValue(newMessageState);
  const resetNewMessage = useResetRecoilState(newMessageState);
  const { toUsername, contents } = promise.read();
  const nav = useNavigate();

  const handleClickSendMessage = async () => {
    const rand = Math.random().toString();
    await fetchSendMessage(userId, rand).then(() => {
      setCurrentMessageData((prevState) => [
        ...prevState,
        { from: currentUserID ?? '', content: rand, createdAt: new Date().toString() },
      ]);
    });
  };

  useEffect(() => {
    setCurrentMessageData(contents);
  }, [contents]);

  useEffect(() => {
    if (!newMessage) return;
    setCurrentMessageData((prevState) => [...prevState, newMessage]);
    resetNewMessage();
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
      <div css={messageDetailInputWrapperStyle}>
        <input type='text' placeholder='쪽지를 입력하세요 (140자)' maxLength={140} css={messageInputStyle} />
        <Button onClick={handleClickSendMessage}>
          <span>전송</span>
        </Button>
      </div>
    </>
  );
};
