/** @jsxImportSource @emotion/react */

import { useParams } from 'react-router-dom';

import { MiniNavBar } from 'common';
import { ViewModeContainer } from './ViewModeContainer';
import { MockUpData } from './mockData';

import { detailProfileWrapperStyle, editButtonStyle, nicknameSpanStyle } from './styles';

import { PencilIcon } from 'assets/svgs';

export const DetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <MiniNavBar>
        <>
          <span css={nicknameSpanStyle}>{id}</span>
          <button type='button' css={editButtonStyle}>
            <PencilIcon />
          </button>
        </>
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        <ViewModeContainer profileData={MockUpData} />
      </div>
    </>
  );
};
