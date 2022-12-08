/** @jsxImportSource @emotion/react */

import { MiniNavBar, NavSubtitle } from 'common';

import { messageListInnerStyle, messageListWrapperStyle } from './styles';

export const MessageListPage = () => {
  return (
    <>
      <MiniNavBar>
        <NavSubtitle text='쪽지' />
      </MiniNavBar>
      <div css={messageListWrapperStyle}>
        <div css={messageListInnerStyle}>안쪽</div>
      </div>
    </>
  );
};
