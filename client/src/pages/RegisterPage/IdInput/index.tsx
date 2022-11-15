/** @jsxImportSource @emotion/react */

import React, { useCallback, useState } from 'react';
import { registerPageIdButtonStyle, registerPageIdInputStyle, registerPageInputWrapperStyle } from '../styles';

export const IdInput = () => {
  const [id, setId] = useState('');

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  // id값을 서버로 보내서 중복성 체크 후 alert 띄워주기
  const handleClick = useCallback(() => {}, []);

  return (
    <div css={registerPageInputWrapperStyle}>
      <input css={registerPageIdInputStyle} placeholder='아이디를 입력하세요' value={id} onChange={handleOnChange} />
      <button type='button' css={registerPageIdButtonStyle} onClick={handleClick}>
        중복확인
      </button>
    </div>
  );
};
