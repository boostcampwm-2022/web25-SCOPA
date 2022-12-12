/** @jsxImportSource @emotion/react */

import SyntaxHighlighter from 'react-syntax-highlighter';
import { useRecoilValue } from 'recoil';

import { settingsState } from 'store';
import { THEME_LIST, CODE_SIZE } from 'utils/constants';

import {
  codeBoxWrapperStyle,
  languageStyle,
  codeBoxStyle,
  lineNumberStyle,
  noCodeBoxStyle,
  cryIconStyle,
  cryTextStyle,
} from './styles';

import { CryIcon } from 'assets/svgs';

interface Props {
  code: string;
  language: string;
  className?: string;
}

export const CodeBox = ({ code, language, className }: Props) => {
  const settings = useRecoilValue(settingsState);

  return (
    <div css={codeBoxWrapperStyle(THEME_LIST[settings.codeBoxTheme].backgroundColor)} className={className}>
      {code && code.length > 0 ? (
        <>
          <SyntaxHighlighter
            language={language}
            showLineNumbers
            style={THEME_LIST[settings.codeBoxTheme].style}
            wrapLines
            customStyle={codeBoxStyle(CODE_SIZE[settings.codeBoxSize].size)}
            lineNumberStyle={lineNumberStyle}
          >
            {code}
          </SyntaxHighlighter>
          <span css={languageStyle(THEME_LIST[settings.codeBoxTheme].textColor)}>using {language ?? 'none'}</span>
        </>
      ) : (
        <div css={noCodeBoxStyle}>
          <CryIcon css={cryIconStyle(THEME_LIST[settings.codeBoxTheme].textColor)} />
          <span css={cryTextStyle(THEME_LIST[settings.codeBoxTheme].textColor)}>등록한 코드가 없어요</span>
        </div>
      )}
    </div>
  );
};
