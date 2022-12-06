/** @jsxImportSource @emotion/react */

import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import Editor from '@monaco-editor/react';

import { settingsState } from 'store';
import { LANGUAGE_LIST } from 'utils/constants';

import {
  codeEditorStyle,
  codeEditorWrapperStyle,
  languageSelectorStyle,
  languageSelectorWrapperStyle,
} from './CodeEditor.styles';

interface Props {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

export const CodeEditor = ({ code, setCode, language, setLanguage }: Props) => {
  const { codeBoxTheme: codeBoxThemeIndex } = useRecoilValue(settingsState);

  const handleChangeLanguage = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  }, []);

  const handleChangeCode = useCallback((value: string | undefined) => {
    setCode(value ?? '');
  }, []);

  return (
    <section css={codeEditorWrapperStyle(codeBoxThemeIndex)}>
      <Editor
        defaultValue={code}
        defaultLanguage='javascript'
        language={language}
        onChange={handleChangeCode}
        theme={codeBoxThemeIndex < 3 ? 'light' : 'vs-dark'}
        css={codeEditorStyle}
      />
      <div css={languageSelectorWrapperStyle}>
        <select onChange={handleChangeLanguage} css={languageSelectorStyle(codeBoxThemeIndex)}>
          {LANGUAGE_LIST.map((option) => (
            <option key={`select-language-${option.value}`} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};
