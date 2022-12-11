/** @jsxImportSource @emotion/react */

import { Button } from 'common';
import { SingleMessageType } from 'types/message';
import { messageDetailInputWrapperStyle, messageDetailListStyle, messageInputStyle } from './styles';

interface Props {
  promise: { read: () => SingleMessageType[] };
}

export const MessageDetailInner = ({ promise }: Props) => {
  const messageDetailData = promise.read();

  return (
    <>
      <ul css={messageDetailListStyle}>
        {messageDetailData.map((data: SingleMessageType, idx: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`message-${data.from}-${idx}`}>
            <span>{data.content}</span>
          </li>
        ))}
      </ul>
      <div css={messageDetailInputWrapperStyle}>
        <input type='text' placeholder='쪽지를 입력하세요 (140자)' maxLength={140} css={messageInputStyle} />
        <Button>
          <span>전송</span>
        </Button>
      </div>
    </>
  );
};
