/** @jsxImportSource @emotion/react */

import { RefObject } from 'react';

import { ProfileType } from 'types/profile';

import {
  fieldsetStyle,
  profileBoxWrapperStyle,
  requirementFieldWrapperStyle,
  subtitleStyle,
} from './BottomProfileEditor.styles';

interface Props {
  workTypeRef: RefObject<HTMLInputElement>;
  workTimeRef: RefObject<HTMLInputElement>;
  emailRef: RefObject<HTMLInputElement>;
  requirementRef1: RefObject<HTMLInputElement>;
  requirementRef2: RefObject<HTMLInputElement>;
  profileData: ProfileType;
}

export const BottomProfileEditor = ({
  workTimeRef,
  workTypeRef,
  emailRef,
  requirementRef1,
  requirementRef2,
  profileData,
}: Props) => {
  return (
    <section css={profileBoxWrapperStyle}>
      <h3 css={subtitleStyle}>저는 이런 요구사항이 있어요</h3>
      <fieldset css={fieldsetStyle}>
        <label htmlFor='bottom-profile-worktype'>작업 형태</label>
        <input id='bottom-profile-worktype' type='text' ref={workTypeRef} defaultValue={profileData.worktype} />
        <label htmlFor='bottom-profile-worktime'>작업 선호 시간대</label>
        <input id='bottom-profile-worktime' type='text' ref={workTimeRef} defaultValue={profileData.worktime} />
        <label htmlFor='bottom-profile-email'>이메일</label>
        <input id='bottom-profile-email' type='text' ref={emailRef} defaultValue={profileData.email} />
        <label htmlFor='bottom-profile-requirements-1'>필수 요구사항</label>
        <div css={requirementFieldWrapperStyle}>
          <input
            id='bottom-profile-requirements-1'
            type='text'
            ref={requirementRef1}
            defaultValue={profileData.requirements[0]}
          />
          <input
            id='bottom-profile-requirements-2'
            type='text'
            ref={requirementRef2}
            defaultValue={profileData.requirements[1]}
          />
        </div>
      </fieldset>
    </section>
  );
};
