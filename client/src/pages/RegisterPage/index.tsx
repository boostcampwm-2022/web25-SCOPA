/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IdInput } from './IdInput';
import { InterestInput } from './InterestInput';
import { TechStackInput } from './TechStackInput';

import {
  registerPageButtonStyle,
  registerPageHeaderStyle,
  registerPageInnerStyle,
  registerPagePrivacyCheckStyle,
} from './styles';

export const RegisterPage = () => {
  const navigate = useNavigate();
  // test용
  // 나중에 validated id api의 cors가 작동되면, 기본값인 ''로 변경할 것
  const [id, setId] = useState<string>('hello');
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  // test용
  // 개인정보 내용 확인되면 모달창 생성하고 dafault값을 false 처리 필요
  const [privacyCheck, setPrivacyCheck] = useState<boolean>(true);
  const [isAllSet, setIsAllSet] = useState<boolean>(false);

  const sendInfoToServer = () => {
    fetch('http://localhost:3001/api/auth/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, interest, techStack, privacyCheck }),
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

  const handlePrivacyCheck = useCallback(() => {}, []);
  const handleClickRegisterButton = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await sendInfoToServer();
  }, []);

  useEffect(() => {
    if (id && interest.length > 0 && techStack.length > 0 && privacyCheck) {
      setIsAllSet(true);
    } else {
      setIsAllSet(false);
    }
  }, [id, interest, techStack, privacyCheck]);

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
        <div css={registerPagePrivacyCheckStyle}>
          <input type='checkbox' id='privacy_checkbox' onChange={handlePrivacyCheck} checked={privacyCheck} />
          <label htmlFor='privacy_checkbox'>개인정보 수집 및 활용 동의(필수)</label>
        </div>
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
