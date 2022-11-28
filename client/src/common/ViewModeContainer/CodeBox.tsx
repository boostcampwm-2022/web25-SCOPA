/** @jsxImportSource @emotion/react */

import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { codeBoxWrapperStyle, languageStyle, codeboxStyle } from './CodeBox.styles';

interface Props {
  code: string;
  language: string;
}

export const CodeBox = ({ code, language }: Props) => {
  return (
    <div css={codeBoxWrapperStyle}>
      <SyntaxHighlighter language={language} showLineNumbers style={nightOwl} wrapLines customStyle={codeboxStyle}>
        {code}
      </SyntaxHighlighter>
      <span css={languageStyle}>using {language}</span>
    </div>
  );
};
