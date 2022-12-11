/** @jsxImportSource @emotion/react */

import { useParams } from 'react-router-dom';

import { MessageTopBar } from '../MessageTopBar';

import { goBackButtonStyle } from './styles';

import { ArrowDownIcon } from 'assets/svgs';

export const MessageDetail = () => {
  const { id = null } = useParams();

  return (
    <>
      <MessageTopBar>
        <>
          <button type='button' css={goBackButtonStyle}>
            <ArrowDownIcon />
          </button>
          <h4>{id}</h4>
        </>
      </MessageTopBar>
      <img src='/earlybird.gif' alt='earlybird' />
      <span>{id}</span>
    </>
  );
};
