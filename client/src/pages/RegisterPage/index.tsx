/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IdInput } from './IdInput';
import { InterestInput } from './InterestInput';
import { TechStackInput } from './TechStackInput';

import { registerPageButtonStyle, registerPageHeaderStyle, registerPageInnerStyle } from './styles';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [isAllSet, setIsAllSet] = useState<boolean>(false);

  const sendInfoToServer = () => {
    fetch('http://localhost:3001/api/auth/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, interest, techStack }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          alert('회원가입이 성공하였습니다.');
          navigate('/');
          return;
        }
        alert('회원가입이 실패하였습니다.');
      });
  };

  const handleClickRegisterButton = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await sendInfoToServer();
  }, []);

  useEffect(() => {
    if (id && interest.length > 0 && techStack.length > 0) {
      setIsAllSet(true);
    } else {
      setIsAllSet(false);
    }
  }, [id, interest, techStack]);

  return (
    <div>
      <div css={registerPageInnerStyle}>
        <h3 css={registerPageHeaderStyle}>
          5분이면 충분해요.
          <br /> 파트너를 찾기위한 정보를 알려주세요!
        </h3>
        <IdInput setId={setId} />
        <InterestInput interest={interest} setInterest={setInterest} />
        <TechStackInput techStack={techStack} setTechStack={setTechStack} />
        <button
          css={registerPageButtonStyle(isAllSet)}
          type='submit'
          onClick={handleClickRegisterButton}
          disabled={!isAllSet}
        >
          확인
        </button>
      </div>
    </div>
  );
};
