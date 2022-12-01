/** @jsxImportSource @emotion/react */

import SyntaxHighlighter from 'react-syntax-highlighter';
import { useRecoilValue } from 'recoil';

import { settingsState } from 'store';
import { THEME_LIST, CODE_SIZE } from 'utils/constants';

import { codeBoxWrapperStyle, languageStyle, codeBoxStyle, lineNumberStyle } from './styles';

interface Props {
  code: string;
  language: string;
  className?: string;
}

export const CodeBox = ({ code, language, className }: Props) => {
  const settings = useRecoilValue(settingsState);

  return (
    <div css={codeBoxWrapperStyle(THEME_LIST[settings.codeBoxTheme].backgroundColor)} className={className}>
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
      <span css={languageStyle(THEME_LIST[settings.codeBoxTheme].textColor)}>using {language}</span>
    </div>
  );
};
