/** @jsxImportSource @emotion/react */

import { SingleProfileType } from 'types/profile';
import Profile from './Profile';

import { profileListStyle } from './styles';

interface Props {
  profileData: Array<SingleProfileType>;
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
