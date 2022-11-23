/** @jsxImportSource @emotion/react */

import { ChangeEvent } from 'react';

import { ProfileType } from 'types/profile';

import {
  fieldsetStyle,
  profileBoxWrapperStyle,
  requirementFieldWrapperStyle,
  subtitleStyle,
} from './BottomProfileEditor.styles';
import { useSetEditor } from './useSetEditor';

interface Props {
  userId: string;
  profileData: ProfileType;
}

export const BottomProfileEditor = ({ userId, profileData }: Props) => {
  const { newProfileData, handleChangeWorkTime, handleChangeWorkType, handleChangeEmail, handleChangeRequirements } =
    useSetEditor(userId, profileData);

  return (
    <div css={profileBoxWrapperStyle}>
      <h3 css={subtitleStyle}>저는 이런 요구사항이 있어요</h3>
      <fieldset css={fieldsetStyle}>
        <label htmlFor='bottom-profile-worktype'>작업 형태</label>
        <input
          id='bottom-profile-worktype'
          value={newProfileData.worktype}
          type='text'
          onChange={handleChangeWorkType}
        />
        <label htmlFor='bottom-profile-worktime'>작업 선호 시간대</label>
        <input
          id='bottom-profile-worktime'
          value={newProfileData.worktime}
          type='text'
          onChange={handleChangeWorkTime}
        />
        <label htmlFor='bottom-profile-email'>이메일</label>
        <input id='bottom-profile-email' value={newProfileData.email} type='text' onChange={handleChangeEmail} />
        <label htmlFor='bottom-profile-requirements-1'>필수 요구사항</label>
        <div css={requirementFieldWrapperStyle}>
          <input
            id='bottom-profile-requirements-1'
            value={newProfileData.requirements[0]}
            type='text'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeRequirements(e.target.value, newProfileData.requirements[1])
            }
          />
          <input
            id='bottom-profile-requirements-2'
            value={newProfileData.requirements[1]}
            type='text'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeRequirements(newProfileData.requirements[0], e.target.value)
            }
          />
        </div>
      </fieldset>
    </div>
  );
};
