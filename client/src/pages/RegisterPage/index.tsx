/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IdInput } from './IdInput';
import { InterestInput } from './InterestInput';
import { TechStackInput } from './TechStackInput';

import { API } from 'utils/constants';

import {
  inputWrapperStyle,
  registerPageButtonStyle,
  registerPageHeaderStyle,
  registerPageSubHeaderStyle,
} from './styles';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [isAllSet, setIsAllSet] = useState<boolean>(false);

  const sendInfoToServer = () => {
    fetch(`${process.env.REACT_APP_FETCH_URL}${API.REGISTER}`, {
      credentials: 'include',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, interest, techStack }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 10000) {
          alert('회원가입에 성공하였습니다.');
          navigate('/login');
          return;
        }
        alert('회원가입에 실패하였습니다.');
      });
  };

  const handleClickRegisterButton = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      sendInfoToServer();
    },
    [username, interest, techStack]
  );

  useEffect(() => {
    setIsAllSet(username.length > 0 && interest.length > 0 && techStack.length > 0);
  }, [username, interest, techStack]);

  return (
    <>
      <h2 css={registerPageHeaderStyle}>5분이면 충분해요.</h2>
      <h3 css={registerPageSubHeaderStyle}>파트너를 찾기 위한 정보를 알려주세요!</h3>
      <div css={inputWrapperStyle}>
        <IdInput setId={setUsername} />
      </div>
      <div css={inputWrapperStyle}>
        <InterestInput interest={interest} setInterest={setInterest} />
      </div>
      <div css={inputWrapperStyle}>
        <TechStackInput techStack={techStack} setTechStack={setTechStack} />
      </div>
      <button
        css={registerPageButtonStyle(true)}
        type='submit'
        onClick={handleClickRegisterButton}
        disabled={!isAllSet}
      >
        <span>확인</span>
      </button>
    </>
  );
};
