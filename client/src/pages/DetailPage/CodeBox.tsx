/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { codeBoxInnerStyle, codeBoxStyle, codeBoxWrapperStyle, codeNumberStyle, languageStyle } from './CodeBox.styles';

interface Props {
  code: string;
  language: string;
}

export const CodeBox = ({ code, language }: Props) => {
  const parsedCode = useMemo(() => {
    return code.split('\n').map((str, idx) => (
      <code key={`span-${idx}`}>
        {str}
        <br />
      </code>
    ));
  }, [code]);

  const codeLineNumber = useMemo(() => {
    const { length } = code.split('\n');
    return [...Array(length).keys()].map((v) => <code key={`line-num=${v}`}>{v}</code>);
  }, [code]);

  return (
    <div css={codeBoxWrapperStyle}>
      <div css={codeBoxInnerStyle}>
        <pre css={codeNumberStyle}>{codeLineNumber}</pre>
        <pre css={codeBoxStyle}>{parsedCode}</pre>
      </div>
      <span css={languageStyle}>using {language}</span>
    </div>
  );
};
