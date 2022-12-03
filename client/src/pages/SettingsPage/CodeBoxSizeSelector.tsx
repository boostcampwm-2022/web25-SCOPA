/** @jsxImportSource @emotion/react */

import { useRecoilValue } from 'recoil';

import { settingsState } from 'store';
import { MiniCodeBox } from './MiniCodeBox';
import { CODE_EXAMPLE, CODE_SIZE, THEME_LIST } from 'utils/constants';

import { codeBoxListStyle, codeListElementStyle } from './CodeBoxSelector.styles';

interface Props {
  onSelect: (index: number) => void;
}

export const CodeBoxSizeSelector = ({ onSelect }: Props) => {
  const settings = useRecoilValue(settingsState);
  const { style } = THEME_LIST[settings.codeBoxTheme];

  return (
    <div css={codeBoxListStyle}>
      {CODE_SIZE.map((option, index) => (
        <button
          type='button'
          onClick={() => onSelect(index)}
          key={`code-box-${option.size}`}
          css={codeListElementStyle(settings.codeBoxSize === index)}
        >
          <MiniCodeBox code={CODE_EXAMPLE} style={style} fontSize={option.size} />
          <span>{option.name}</span>
        </button>
      ))}
    </div>
  );
};
