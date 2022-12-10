/** @jsxImportSource @emotion/react */

import { MessageListType } from 'types/message';
import { messageListInnerStyle, messageListWrapperStyle } from './styles';

interface Props {
  promise: {
    read: () => MessageListType;
  };
}

export const MessageListPageInner = ({ promise }: Props) => {
  const chatData = promise.read();

  return (
    <div css={messageListWrapperStyle}>
      <div css={messageListInnerStyle}>
        {chatData.messages.map((messageData) => (
          <div key={`message-list-${messageData.with}`}>
            <span>{messageData.with}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
