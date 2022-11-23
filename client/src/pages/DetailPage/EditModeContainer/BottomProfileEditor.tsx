/** @jsxImportSource @emotion/react */

import { ChangeEvent } from 'react';

import {
  fieldsetStyle,
  profileBoxWrapperStyle,
  requirementFieldWrapperStyle,
  subtitleStyle,
} from './BottomProfileEditor.styles';

interface Props {
  workType: string;
  workTime: string;
  email: string;
  requirements: string[];
  handleChangeWorkType: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeWorkTime: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeRequirements: (newRequirement01: string, newRequirement02: string) => void;
}

export const BottomProfileEditor = ({
  workType,
  workTime,
  email,
  requirements,
  handleChangeWorkTime,
  handleChangeWorkType,
  handleChangeEmail,
  handleChangeRequirements,
}: Props) => {
  return (
    <div css={profileBoxWrapperStyle}>
      <h3 css={subtitleStyle}>저는 이런 요구사항이 있어요</h3>
      <fieldset css={fieldsetStyle}>
        <label htmlFor='bottom-profile-worktype'>작업 형태</label>
        <input id='bottom-profile-worktype' value={workType} type='text' onChange={handleChangeWorkType} />
        <label htmlFor='bottom-profile-worktime'>작업 선호 시간대</label>
        <input id='bottom-profile-worktime' value={workTime} type='text' onChange={handleChangeWorkTime} />
        <label htmlFor='bottom-profile-email'>이메일</label>
        <input id='bottom-profile-email' value={email} type='text' onChange={handleChangeEmail} />
        <label htmlFor='bottom-profile-requirements-1'>필수 요구사항</label>
        <div css={requirementFieldWrapperStyle}>
          <input
            id='bottom-profile-requirements-1'
            value={requirements[0]}
            type='text'
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeRequirements(e.target.value, requirements[1])}
          />
          <input
            id='bottom-profile-requirements-2'
            value={requirements[1]}
            type='text'
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeRequirements(requirements[0], e.target.value)}
          />
        </div>
      </fieldset>
    </div>
  );
};
