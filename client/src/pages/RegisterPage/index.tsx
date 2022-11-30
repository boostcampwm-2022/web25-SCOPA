/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, InterestInput, TechStackInput } from 'common';
import { IdInput } from './IdInput';

import { dropdownStyle, registerPageButtonStyle, registerPageHeaderStyle, registerPageSubHeaderStyle } from './styles';
import { requestRegister } from './service';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [isAllSet, setIsAllSet] = useState<boolean>(false);

  const sendInfoToServer = () => {
    if (requestRegister({ username, interest, techStack })) navigate('/login');
  };

  const handleClickRegisterButton = useCallback(() => {
    sendInfoToServer();
  }, [username, interest, techStack]);

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
