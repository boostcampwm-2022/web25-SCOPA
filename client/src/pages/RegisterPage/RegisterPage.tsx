import { IdInput } from './IdInput';
import { InterestInput } from './InterestInput';
import { TechStackInput } from './TechStackInput';
import { useState } from 'react';

export const RegisterPage = () => {
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [postponeCheck, setPostponeCheck] = useState(false);
  const handlePrivacyCheck = () => {};
  const handlePostponeCheck = () => {
    setPostponeCheck(!postponeCheck);
  };
  const handleRegisterBtn = () => {};
  return (
    <div>
      <form>
        <div>
          <div>5분이면 충분해요</div>
          <div>팀원을 찾기 위한 정보를 알려주세요</div>
        </div>
        <IdInput />
        <InterestInput />
        <TechStackInput />
        <input type='checkbox' id='privacy_checkbox' onChange={handlePrivacyCheck} checked={privacyCheck} />
        <label htmlFor='privacy_checkbox'>개인정보활용 동의</label>
        <input type='checkbox' id='postpone_checkbox' onChange={handlePostponeCheck} checked={postponeCheck} />
        <label htmlFor='postpone_checkbox'>다음에 작성할래요</label>
        <button type='button' onClick={handleRegisterBtn}>
          확인
        </button>
      </form>
    </div>
  );
};
