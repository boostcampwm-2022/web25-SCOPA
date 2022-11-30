/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';

import { MiniNavBar, NavSubtitle } from 'common';
import { Tooltip } from './Tooltip';
import { CodeBoxThemeSelector } from './CodeBoxThemeSelector';
import { settingsState } from 'store';

import {
  settingsWrapperStyle,
  settingsBackgroundStyle,
  settingsListStyle,
  tooltipIconStyle,
  subtitleWrapperStyle,
} from './styles';

import { QuestionIcon } from 'assets/svgs';
import { CodeBoxSizeSelector } from './CodeBoxSizeSelector';

export const SettingsPage = () => {
  const [settings, setSettings] = useRecoilState(settingsState);
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const handleMouseOverTooltip = useCallback(() => {
    setIsTooltipShown(true);
  }, []);

  const handleMouseOutTooltip = useCallback(() => {
    setIsTooltipShown(false);
  }, []);

  const handleSelectCodeTheme = useCallback((index: number) => {
    setSettings((prevValue) => ({ ...prevValue, codeBoxTheme: index }));
  }, []);

  const handleSelectCodeSize = useCallback((index: number) => {
    setSettings((prevValue) => ({ ...prevValue, codeBoxSize: index }));
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
            <CodeBoxThemeSelector onSelect={handleSelectCodeTheme} />
          </li>
          <li css={settingsListStyle}>
            <h3>코드 글자 크기</h3>
            <CodeBoxSizeSelector onSelect={handleSelectCodeSize} />
          </li>
          <li css={settingsListStyle}>
            <h3>화면 밝기</h3>
          </li>
        </ul>
      </div>
    </>
  );
};
