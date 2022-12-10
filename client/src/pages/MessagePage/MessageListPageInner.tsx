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
      <ul css={messageListInnerStyle}>
        {chatData.messages.map((messageData) => (
          <li key={`message-list-${messageData.with}`}>
            <button type='button'>
              <span>{messageData.with}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
