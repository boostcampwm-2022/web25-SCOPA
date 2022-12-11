/** @jsxImportSource @emotion/react */

import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { MessageMetaDataType, MessageListType } from 'types/message';

import { messageListButtonStyle, messageListElementStyle, messageListTitleStyle } from './MessageList.styles';

interface Props {
  promise: {
    read: () => MessageListType;
  };
}

export const MessageList = ({ promise }: Props) => {
  const nav = useNavigate();
  const { id = null } = useParams();
  const messageData = promise.read();

  const handleClickUser = useCallback(
    (clickedID: string) => {
      if (clickedID === id) nav('/message');
      else nav(`/message/${clickedID}`);
    },
    [id]
  );

  return (
    <>
      <h4 css={messageListTitleStyle}>대화 목록</h4>
      <ul>
        {messageData.messages.map((data: MessageMetaDataType) => (
          <li key={`message-list-${data.with}`} css={messageListElementStyle(id === data.with)}>
            <button type='button' onClick={() => handleClickUser(data.with)} css={messageListButtonStyle}>
              <span>{data.with}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
