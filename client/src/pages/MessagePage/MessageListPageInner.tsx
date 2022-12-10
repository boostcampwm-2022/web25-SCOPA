/** @jsxImportSource @emotion/react */

import { useState } from 'react';

import { MessageListType } from 'types/message';
import { MessageList } from './MessageList';
import { messagePageWrapperStyle } from './styles';

interface Props {
  promise: {
    read: () => MessageListType;
  };
}

export const MessageListPageInner = ({ promise }: Props) => {
  const messageData = promise.read();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div css={messagePageWrapperStyle}>
      <MessageList messageData={messageData.messages} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
    </div>
  );
};
