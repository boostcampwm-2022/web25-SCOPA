/** @jsxImportSource @emotion/react */

import Profile from './Profile';
import { singleProfileData } from './types';

import { profileListStyle } from './styles';

interface Props {
  profileData: Array<singleProfileData>;
}

export const ProfileList = ({ profileData }: Props) => {
  return (
    <div css={profileListStyle}>
      {profileData.map((data) => (
        <Profile key={`profile-${data.id}`} singleData={data} />
      ))}
    </div>
  );
};
