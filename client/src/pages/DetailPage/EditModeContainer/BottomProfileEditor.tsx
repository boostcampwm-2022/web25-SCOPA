/** @jsxImportSource @emotion/react */

import { fieldsetStyle, profileBoxWrapperStyle, subtitleStyle } from './BottomProfileEditor.styles';

export const BottomProfileEditor = () => {
  return (
    <div css={profileBoxWrapperStyle}>
      <h3 css={subtitleStyle}>저는 이런 요구사항이 있어요</h3>
      <fieldset css={fieldsetStyle}>
        <label htmlFor='bottom-profile-worktype'>작업 형태</label>
        <input id='bottom-profile-worktype' type='text' />
        <label htmlFor='bottom-profile-worktime'>작업 선호 시간대</label>
        <input id='bottom-profile-worktime' type='text' />
        <label htmlFor='bottom-profile-email'>이메일</label>
        <input id='bottom-profile-email' type='text' />
        <label htmlFor='bottom-profile-requirements'>필수 요구사항</label>
        <div>
          <input id='bottom-profile-techstack-1' type='text' />
          <input id='bottom-profile-techstack-2' type='text' />
        </div>
      </fieldset>
    </div>
  );
};
