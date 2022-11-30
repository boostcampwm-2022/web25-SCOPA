/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, InterestInput, TechStackInput } from 'common';
import { IdInput } from './IdInput';
import { isRegisterRequestDone } from './service';

import { dropdownStyle, registerPageButtonStyle, registerPageHeaderStyle, registerPageSubHeaderStyle } from './styles';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [isAllSet, setIsAllSet] = useState<boolean>(false);

  // deps가 많아, 굳이 useCallback 처리가 필요없다고 사료됨
  const handleClickRegisterButton = () => {
    if (isRegisterRequestDone({ username, interest, techStack })) navigate('/login');
  };

  // 모든 입력값이 입력되었는지 검사
  useEffect(() => {
    setIsAllSet(username.length > 0 && interest.length > 0 && techStack.length > 0);
  }, [username, interest, techStack]);

  return (
    <>
      <h2 css={registerPageHeaderStyle}>5분이면 충분해요.</h2>
      <h3 css={registerPageSubHeaderStyle}>파트너를 찾기 위한 정보를 알려주세요!</h3>
      <IdInput setId={setUsername} />
      <InterestInput interest={interest} setInterest={setInterest} css={dropdownStyle} />
      <TechStackInput techStack={techStack} setTechStack={setTechStack} css={dropdownStyle} />
      <Button css={registerPageButtonStyle(isAllSet)} onClick={handleClickRegisterButton} disabled={!isAllSet}>
        <span>확인</span>
      </Button>
    </>
  );
};
