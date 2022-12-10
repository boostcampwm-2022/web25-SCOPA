/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction } from 'react';

import { MessageMetaDataType } from 'types/message';
import { messageListInnerStyle } from './MessageList.styles';

interface Props {
  messageData: MessageMetaDataType[];
  selectedUser: string | null;
  setSelectedUser: Dispatch<SetStateAction<string | null>>;
}

export const MessageList = ({ messageData, selectedUser, setSelectedUser }: Props) => {
  return (
    <ul css={messageListInnerStyle}>
      {messageData.map((data) => (
        <li key={`message-list-${data.with}`}>
          <button type='button'>
            <span>{data.with}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
