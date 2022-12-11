/** @jsxImportSource @emotion/react */

import { SingleMessageType } from 'types/message';

interface Props {
  promise: { read: () => SingleMessageType[] };
}

export const MessageDetailInner = ({ promise }: Props) => {
  const messageDetailData = promise.read();

  return (
    <ul>
      {messageDetailData.map((data: SingleMessageType, idx: number) => (
        <li key={`message-${data.from}-${idx}`}>
          <span>{data.content}</span>
        </li>
      ))}
    </ul>
  );
};
