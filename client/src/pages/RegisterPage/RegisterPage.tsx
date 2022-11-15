/** @jsxImportSource @emotion/react */

import { IdInput } from './IdInput';
import { InterestInput } from './InterestInput';
import { TechStackInput } from './TechStackInput';
import { useCallback, useState } from 'react';

import {
  registerPageButtonStyle,
  registerPageHeaderStyle,
  registerPageInnerStyle,
  registerPageWrapperStyle,
} from './styles';

export const RegisterPage = () => {
  const handlePrivacyCheck = useCallback(() => {}, []);
  const handleRegisterButton = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  return (
    <div css={registerPageWrapperStyle}>
      <form css={registerPageInnerStyle}>
        <h3 css={registerPageHeaderStyle}>{`5분이면 충분해요\n팀원을 찾기 위한 정보를 알려주세요`}</h3>
        <IdInput />
        <InterestInput />
        <TechStackInput />
        <div>
          <input type='checkbox' id='privacy_checkbox' onChange={handlePrivacyCheck} checked={privacyCheck} />
          <label htmlFor='privacy_checkbox'>개인정보활용 동의</label>
        </div>
        <button css={registerPageButtonStyle} type='submit' onClick={handleRegisterButton}>
          확인
        </button>
      </form>
    </div>
  );
};
