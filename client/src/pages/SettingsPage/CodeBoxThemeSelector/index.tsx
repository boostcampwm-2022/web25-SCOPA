/** @jsxImportSource @emotion/react */

import { useRecoilValue } from 'recoil';

import { settingsState } from 'store';
import { MiniCodeBox } from './MiniCodeBox';
import { CODE_EXAMPLE, THEME_LIST } from 'utils/constants';

import { codeBoxListStyle, codeListElementStyle } from './styles';

interface Props {
  onSelect: (index: number) => void;
}

export const CodeBoxThemeSelector = ({ onSelect }: Props) => {
  const settings = useRecoilValue(settingsState);

  const handleClickThemeButton = (index: number) => {
    onSelect(index);
  };

  return (
    <div css={codeBoxListStyle}>
      {THEME_LIST.map((theme, index) => (
        <button
          type='button'
          onClick={() => handleClickThemeButton(index)}
          key={`code-box-${index}`}
          css={codeListElementStyle(settings.codeBoxTheme === index)}
        >
          <MiniCodeBox code={CODE_EXAMPLE} style={theme.style} fontSize={settings.codeBoxSize} />
          <span>{theme.name}</span>
        </button>
      ))}
    </div>
  );
};
