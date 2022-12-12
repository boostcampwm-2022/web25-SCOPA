/** @jsxImportSource @emotion/react */

import { CSSProperties } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { COMMON_SIZE } from 'styles/sizes';

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

const miniCodeBoxStyle = {
  width: 230,
  height: 160,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  margin: 0,
  overflow: 'hidden',
};
