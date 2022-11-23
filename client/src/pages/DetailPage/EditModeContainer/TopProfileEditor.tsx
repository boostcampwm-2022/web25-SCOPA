/** @jsxImportSource @emotion/react */

import { ProfileType } from 'types/profile';
import { fieldsetStyle, profileBoxWrapperStyle } from './TopProfileEditor.styles';
import { useSetEditor } from './useSetEditor';

interface Props {
  userId: string;
  profileData: ProfileType;
}

export const TopProfileEditor = ({ userId, profileData }: Props) => {
  const { newProfileData } = useSetEditor(userId, profileData);
  return (
    <div css={profileBoxWrapperStyle}>
      <fieldset css={fieldsetStyle}>
        <label htmlFor='top-profile-interest'>저는 이런 분야에 자신있어요</label>
        <input id='top-profile-interest' type='text' />
        <label htmlFor='top-profile-techstack'>저는 이런 기술을 사용할 수 있어요</label>
        <input id='top-profile-techstack' type='text' />
      </fieldset>
    </div>
  );
};
