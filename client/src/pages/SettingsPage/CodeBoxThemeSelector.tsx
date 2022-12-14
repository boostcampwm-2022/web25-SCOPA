/** @jsxImportSource @emotion/react */

import { useRecoilValue } from 'recoil';

import { settingsState } from 'store';
import { MiniCodeBox } from './MiniCodeBox';
import { CODE_EXAMPLE, CODE_SIZE, THEME_LIST } from 'utils/constants';

import { codeBoxListStyle, codeListElementStyle } from './CodeBoxSelector.styles';

interface Props {
  onSelect: (index: number) => void;
}

export const CodeBoxThemeSelector = ({ onSelect }: Props) => {
  const settings = useRecoilValue(settingsState);
  const { size } = CODE_SIZE[settings.codeBoxSize];

  return (
    <div css={codeBoxListStyle}>
      {THEME_LIST.map((option, index) => (
        <button
          type='button'
          onClick={() => onSelect(index)}
          key={`code-box-${option.name}`}
          css={codeListElementStyle(settings.codeBoxTheme === index)}
        >
          <MiniCodeBox code={CODE_EXAMPLE} style={option.style} fontSize={size} />
          <span>{option.name}</span>
        </button>
      ))}
    </div>
  );
};
