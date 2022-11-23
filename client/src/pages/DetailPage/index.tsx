/** @jsxImportSource @emotion/react */

import { useParams } from 'react-router-dom';

import { MiniNavBar } from 'common';
import { CodeBox, TopProfileBox, BottomProfileBox } from './ViewModeContainer';

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
        <CodeBox code={MockUpData.code} language={MockUpData.language} />
        <TopProfileBox interest={MockUpData.interest} techStack={MockUpData.skills} />
        <BottomProfileBox
          workType={MockUpData.worktype}
          workTime={MockUpData.worktime}
          email={MockUpData.email}
          requirements={MockUpData.requirements}
        />
      </div>
    </>
  );
};
