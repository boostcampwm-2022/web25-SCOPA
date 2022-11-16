/** @jsxImportSource @emotion/react */

import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { css } from '@emotion/react';

import { registerPageIdButtonStyle, registerPageInputStyle, registerPageInputWrapperStyle } from '../styles';

export const IdInput = ({ setId }: { setId: Dispatch<SetStateAction<string>> }) => {
  const [idDraft, setIdDraft] = useState('');

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIdDraft(e.target.value);
  }, []);

  // 서버측 id 유효성 검사를 위해 fetch 통신(쿼리스트링)
  // code 10000 : 유효한ID, 10001 : 유효하지않음, 10002: 중복됨
  const sendIdToServer = useCallback(() => {}, []);

  // 클라이언트측 id 유효성 검사
  const isValidatedId = useCallback((id:string)=>{
    if(id.length < 4) return false;
    if(id.length > 15) return false;
    const regExp = /^[a-zA-Z0-9]*$/;
    return regExp.test(id);
  }, [])

  // id값을 서버로 보내서 중복성 체크 후 alert 띄워주고
  // 유효한 값이면, register컴포넌트 값 셋팅
  const handleClick = useCallback(() => {
    setId(idDraft);
  }, []);

  return (
    <div css={registerPageInputWrapperStyle}>
      <input
        css={css(registerPageInputStyle, { width: 300 })}
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
