/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';
import { codeBoxInnerStyle, codeBoxStyle, codeBoxWrapperStyle, codeNumberStyle, languageStyle } from './styles';

interface Props {
  language: string;
  code: string;
}

const SummarizedCodeBox = ({ language, code }: Props) => {
  const parsedCode = useMemo(() => {
    return code
      .split('\n')
      .slice(0, 30)
      .map((str, idx) => (
        // eslint-disable-next-line react/no-array-index-key
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

export default SummarizedCodeBox;
