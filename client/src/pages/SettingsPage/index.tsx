/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';

import { MiniNavBar, NavSubtitle } from 'common';
import { Tooltip } from './Tooltip';

import {
  settingsWrapperStyle,
  settingsBackgroundStyle,
  settingsListStyle,
  tooltipIconStyle,
  subtitleWrapperStyle,
} from './styles';

import { QuestionIcon } from 'assets/svgs';

export const SettingsPage = () => {
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const handleMouseOverTooltip = useCallback(() => {
    setIsTooltipShown(true);
  }, []);

  const handleMouseOutTooltip = useCallback(() => {
    setIsTooltipShown(false);
  }, []);

  return (
    <>
      <MiniNavBar>
        <div css={subtitleWrapperStyle}>
          <NavSubtitle text='환경설정' />
          <div
            css={tooltipIconStyle}
            onFocus={handleMouseOverTooltip}
            onMouseOver={handleMouseOverTooltip}
            onBlur={handleMouseOutTooltip}
            onMouseOut={handleMouseOutTooltip}
          >
            <QuestionIcon />
          </div>
          {isTooltipShown && <Tooltip text='설정값은 로컬 스토리지에 저장됩니다.' />}
        </div>
      </MiniNavBar>
      <div css={settingsBackgroundStyle}>
        <ul css={settingsWrapperStyle}>
          <li css={settingsListStyle}>
            <h3>코드 뷰어 테마</h3>
          </li>
          <li css={settingsListStyle}>
            <h3>코드 글자 크기</h3>
          </li>
          <li css={settingsListStyle}>
            <h3>화면 밝기</h3>
          </li>
        </ul>
      </div>
    </>
  );
};
