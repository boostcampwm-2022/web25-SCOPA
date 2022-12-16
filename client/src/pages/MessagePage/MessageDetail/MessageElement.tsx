/** @jsxImportSource @emotion/react */

import { SingleMessageType } from 'types/message';

import { messageBubbleStyle, messageElementWrapperStyle, messageTimeStyle } from './MessageElement.styles';

interface Props {
  messageData: SingleMessageType;
  isMine: boolean;
}

export const MessageElement = ({ messageData, isMine }: Props) => {
  const time = new Date(messageData.createdAt).toLocaleTimeString();
  return (
    <li css={messageElementWrapperStyle(isMine)}>
      <div css={messageBubbleStyle}>
        <span>{messageData.content}</span>
      </div>
      <span css={messageTimeStyle}>{time}</span>
    </li>
  );
};
