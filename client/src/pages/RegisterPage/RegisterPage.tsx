/** @jsxImportSource @emotion/react */

import { IdInput } from './IdInput/IdInput';
import { InterestInput } from './InterestInput/InterestInput';
import { TechStackInput } from './TechStackInput/TechStackInput';
import { useCallback, useState } from 'react';

import {
  registerPageButtonStyle,
  registerPageHeaderStyle,
  registerPageInnerStyle,
  registerPageWrapperStyle,
} from './styles';
import { css } from '@emotion/react';

export const RegisterPage = () => {
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [id, setId] = useState('');
  const [interest, setInterest] = useState([] as string[]);
  const [techStack, setTechStack] = useState([] as string[]);

  const handlePrivacyCheck = useCallback(() => {}, []);
  const handleRegisterButton = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div css={registerPageWrapperStyle}>
      <div css={registerPageInnerStyle}>
        <h3 css={registerPageHeaderStyle}>{`5분이면 충분해요\n팀원을 찾기 위한 정보를 알려주세요`}</h3>
        <IdInput setId={setId} />
        <InterestInput setInterest={setInterest} />
        <TechStackInput setTechStack={setTechStack} />
        <div css={css({ marginBottom: 10, width: 400 })}>
          <input type='checkbox' id='privacy_checkbox' onChange={handlePrivacyCheck} checked={privacyCheck} />
          <label htmlFor='privacy_checkbox'>개인정보 수집 및 활용 동의(필수)</label>
        </div>
        <button css={registerPageButtonStyle} type='submit' onClick={handleRegisterButton}>
          확인
        </button>
      </div>
    </div>
  );
};
