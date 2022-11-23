/** @jsxImportSource @emotion/react */

import { ChangeEvent } from 'react';
import { codeEditorWrapperStyle } from './CodeEditor.styles';

interface Props {
  handleChangeCodeText: (e: ChangeEvent<HTMLInputElement>) => void;
} // 임시로 작성 (에디터 라이브러리 아직 결정 X)

export const CodeEditor = () => {
  return <div css={codeEditorWrapperStyle}>아아아</div>;
};
