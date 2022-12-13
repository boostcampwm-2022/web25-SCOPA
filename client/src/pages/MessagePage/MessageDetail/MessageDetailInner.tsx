/** @jsxImportSource @emotion/react */

import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { Button } from 'common';
import { currentUserState } from 'store';
import { MessageDetailType, SingleMessageType } from 'types/message';
import { useManageMessageData, useScrollBottom } from '../hooks';
import { MessageElement } from './MessageElement';
import { MessageTopBar } from '../MessageTopBar';

import { messageDetailInputWrapperStyle, messageDetailListStyle, messageInputStyle, goBackButtonStyle } from './styles';

import { ArrowDownIcon } from 'assets/svgs';

interface Props {
  promise: { read: () => MessageDetailType };
  userId: string;
}

export const MessageDetailInner = ({ promise, userId }: Props) => {
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const { toUsername, contents } = promise.read();
  const { handleChangeInputValue, handleSubmitMessage, inputValue, currentMessageData } = useManageMessageData(
    currentUserID ?? '',
    contents,
    userId
  );
  const { messageDetailListRef } = useScrollBottom(currentMessageData);
  const nav = useNavigate();

  const handleClickBackButton = useCallback(() => {
    nav('/message');
  }, []);

  return (
    <>
      <MessageTopBar>
        <>
          <button type='button' css={goBackButtonStyle} onClick={handleClickBackButton}>
            <ArrowDownIcon />
          </button>
          <h4>{toUsername}</h4>
        </>
      </MessageTopBar>
      <ul css={messageDetailListStyle} ref={messageDetailListRef}>
        {currentMessageData.map((data: SingleMessageType, idx: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <MessageElement isMine={currentUserID === data.from} messageData={data} key={`message-${data.from}-${idx}`} />
        ))}
      </ul>
      <form css={messageDetailInputWrapperStyle} onSubmit={handleSubmitMessage}>
        <input
          type='text'
          placeholder='쪽지를 입력하세요 (140자)'
          value={inputValue}
          maxLength={140}
          css={messageInputStyle}
          onChange={handleChangeInputValue}
        />
        <Button isSubmit>
          <span>전송</span>
        </Button>
      </form>
    </>
  );
};
