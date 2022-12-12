/** @jsxImportSource @emotion/react */

import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { Button } from 'common';
import { currentUserState } from 'store';
import { SingleMessageType } from 'types/message';
import { MessageElement } from './MessageElement';
import { fetchSendMessage } from '../services';

import { messageDetailInputWrapperStyle, messageDetailListStyle, messageInputStyle } from './styles';

interface Props {
  promise: { read: () => SingleMessageType[] };
  userId: string;
}

export const MessageDetailInner = ({ promise, userId }: Props) => {
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const [currentChatData, setCurrentChatData] = useState<SingleMessageType[]>([]);
  const messageDetailData = promise.read();

  const handleClickSendMessage = async () => {
    await fetchSendMessage(userId, 'hihi').then(() => {
      setCurrentChatData((prevState) => [
        ...prevState,
        { from: currentUserID ?? '', content: 'hihi', time: new Date().toString() },
      ]);
    });
  };

  useEffect(() => {
    setCurrentChatData(messageDetailData);
  }, [messageDetailData]);

  return (
    <>
      <ul css={messageDetailListStyle}>
        {currentChatData.map((data: SingleMessageType, idx: number) => (
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
