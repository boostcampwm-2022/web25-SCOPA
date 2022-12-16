/** @jsxImportSource @emotion/react */

import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { MessageMetaDataType } from 'types/message';

import { messageListButtonStyle, messageListElementStyle, messageListWrapperStyle } from './MessageList.styles';

interface Props {
  promise: { read: () => MessageMetaDataType[] };
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
    <ul css={messageListWrapperStyle}>
      {messageData.map((data: MessageMetaDataType) => (
        <li key={`message-list-${data.with}`} css={messageListElementStyle(id === data.with)}>
          <button type='button' onClick={() => handleClickUser(data.with)} css={messageListButtonStyle}>
            <span>{data.username}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
