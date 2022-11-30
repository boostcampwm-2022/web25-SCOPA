/** @jsxImportSource @emotion/react */

import { CSSProperties } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { miniCodeBoxStyle } from './MiniCodeBox.styles';

interface Props {
  code: string;
  style: { [key: string]: CSSProperties };
}

export const MiniCodeBox = ({ code, style }: Props) => {
  return (
    <SyntaxHighlighter language='c' showLineNumbers style={style} wrapLines customStyle={miniCodeBoxStyle}>
      {code}
    </SyntaxHighlighter>
  );
};
