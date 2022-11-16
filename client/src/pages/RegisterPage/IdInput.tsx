/** @jsxImportSource @emotion/react */

import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { css } from '@emotion/react';

import { registerPageIdButtonStyle, registerPageInputStyle, registerPageInputWrapperStyle } from './styles';

export const IdInput = ({ setId }: { setId: Dispatch<SetStateAction<string>> }) => {
  const [idDraft, setIdDraft] = useState('');

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIdDraft(e.target.value);
  }, []);

  // 서버측 id 유효성 검사를 위해 fetch 통신(쿼리스트링)
  // code 10000 : 유효한ID, 10001 : 유효하지않음, 10002: 중복됨
  const sendIdToServer = useCallback(() => {
    fetch(`http://localhost:3001/api/auth/validate?${new URLSearchParams({ id: idDraft })}`)
      .then((res) => res.json())
      .then((res) => {
        alert(res.code);
        if (res.code === 10000) {
          setId(idDraft);
          return;
        }
        if (res.code === 10001) {
          alert('유효하지 않은 Id 형식입니다.');
          return;
        }
        if (res.code === 10002) {
          alert('중복되는 Id 입니다.');
        }
      });
  }, []);

  // 클라이언트측 id 유효성 검사
  const isValidatedId = useCallback(() => {
    if (idDraft.length < 4 || idDraft.length > 15) return false;
    const regExp = /^[a-zA-Z0-9]*$/;
    return regExp.test(idDraft);
  }, [idDraft]);

  // id값을 서버로 보내서 중복성 체크 후 alert 띄워주고
  // 유효한 값이면, register컴포넌트 값 셋팅
  const handleClick = useCallback(async () => {
    if (!isValidatedId()) {
      alert('유효하지 않은 Id 형식 : 4글자 이상 10글자 이하로 알파벳과 소문자로만 구성 부탁드립니다.');
      return;
    }
    await sendIdToServer();
  }, [idDraft]);

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
