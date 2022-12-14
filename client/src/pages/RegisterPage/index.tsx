/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, InterestInput, TechStackInput } from 'common';
import { UsernameInput } from './usernameInput';
import { fetchRequestRegistration } from './fetchRequestRegistration';
import { LINK } from 'utils/constants';

import { dropdownStyle, registerPageButtonStyle, registerPageHeaderStyle, registerPageSubHeaderStyle } from './styles';

export const RegisterPage = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [isAllSet, setIsAllSet] = useState<boolean>(false);

  // deps가 많아, 굳이 useCallback 처리가 필요없다고 사료됨
  const handleClickRegisterButton = () => {
    if (!isAllSet) return;
    fetchRequestRegistration({ username, interest, techStack })
      .then(() => {
        alert('회원가입에 성공하였습니다.');
        nav(LINK.LOGIN);
      })
      .catch((err) => alert(err));
  };

  // 모든 입력값이 입력되었는지 검사
  useEffect(() => {
    setIsAllSet(username.length > 0 && interest.length > 0);
  }, [username, interest, techStack]);

  return (
    <>
      <h2 css={registerPageHeaderStyle}>5분이면 충분해요.</h2>
      <h3 css={registerPageSubHeaderStyle}>파트너를 찾기 위한 정보를 알려주세요!</h3>
      <UsernameInput setUsername={setUsername} />
      <InterestInput interest={interest} setInterest={setInterest} css={dropdownStyle} />
      <TechStackInput techStack={techStack} setTechStack={setTechStack} css={dropdownStyle} />
      <Button
        aria-label='회원가입신청'
        css={registerPageButtonStyle(isAllSet)}
        onClick={handleClickRegisterButton}
        disabled={!isAllSet}
      >
        <span>확인</span>
      </Button>
    </>
  );
};
