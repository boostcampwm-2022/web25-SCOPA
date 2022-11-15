/** @jsxImportSource @emotion/react */

import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { registerPageIdButtonStyle, registerPageInputStyle, registerPageInputWrapperStyle } from '../styles';
import { css } from '@emotion/react';

export const IdInput = ({ setId }: { setId: Dispatch<SetStateAction<string>> }) => {
  const [idDraft, setIdDraft] = useState('');

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIdDraft(e.target.value);
  }, []);

  // id값을 서버로 보내서 중복성 체크 후 alert 띄워주고
  // 유효한 값이면, register컴포넌트 값 셋팅
  const handleClick = useCallback(() => {
    setId(idDraft);
  }, []);

  return (
    <div css={registerPageInputWrapperStyle}>
      <input
        css={css(registerPageInputStyle, { width: 300 })}
        id='id-input'
        placeholder='아이디'
        value={idDraft}
        onChange={handleOnChange}
      />
      <button type='button' css={registerPageIdButtonStyle} onClick={handleClick}>
        중복확인
      </button>
    </div>
  );
};
