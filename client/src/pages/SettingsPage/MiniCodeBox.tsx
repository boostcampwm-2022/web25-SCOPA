/** @jsxImportSource @emotion/react */

import { CSSProperties } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { miniCodeBoxStyle } from './MiniCodeBox.styles';

interface Props {
  code: string;
  style: { [key: string]: CSSProperties };
  fontSize: number;
}

export const MiniCodeBox = ({ code, style, fontSize }: Props) => {
  return (
    <SyntaxHighlighter
      language='c'
      showLineNumbers
      style={style}
      wrapLines
      customStyle={{ ...miniCodeBoxStyle, userSelect: 'none', fontSize }}
    >
      {code}
    </SyntaxHighlighter>
  );
};
