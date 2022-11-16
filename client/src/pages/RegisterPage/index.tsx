/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';

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
  const [id, setId] = useState<string>('');
  const [confirmedId, setConfirmedId] = useState<string>('');
  const [interest, setInterest] = useState('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [privacyCheck, setPrivacyCheck] = useState<boolean>(false);
  const [isAllSet, setIsAllSet] = useState<boolean>(false);

  const handlePrivacyCheck = useCallback(() => {}, []);
  const handleRegisterButton = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (id && interest && techStack && privacyCheck) {
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
          onClick={handleRegisterButton}
          disabled={isAllSet}
        >
          확인
        </button>
      </div>
    </div>
  );
};
