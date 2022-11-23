/** @jsxImportSource @emotion/react */

import { ChangeEvent } from 'react';
import { codeEditorWrapperStyle } from './CodeEditor.styles';

interface Props {
  handleChangeCodeText: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CodeEditor = () => {
  return <div css={codeEditorWrapperStyle}>아아아</div>;
};
