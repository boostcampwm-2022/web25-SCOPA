/** @jsxImportSource @emotion/react */

import { useRecoilValue } from 'recoil';

import { Button } from 'common';
import { currentUserState } from 'store';
import { SingleMessageType } from 'types/message';
import { MessageElement } from './MessageElement';
import { messageDetailInputWrapperStyle, messageDetailListStyle, messageInputStyle } from './styles';

interface Props {
  promise: { read: () => SingleMessageType[] };
}

export const MessageDetailInner = ({ promise }: Props) => {
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const messageDetailData = promise.read();

  return (
    <>
      <ul css={messageDetailListStyle}>
        {messageDetailData.map((data: SingleMessageType, idx: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <MessageElement isMine={currentUserID === data.from} messageData={data} key={`message-${data.from}-${idx}`} />
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
