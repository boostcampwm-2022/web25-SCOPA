/** @jsxImportSource @emotion/react */

import Profile from './Profile';
import { css } from '@emotion/react';
import { COLORS } from '../../styles/colors';
import { profileDatum } from './types';
import { COMMON_SIZE } from '../../styles/sizes';

interface Props {
  profileData: Array<profileDatum>;
}

const profileListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyItems: 'center',
  gap: 10,
  height: `calc(100% - 50px)`,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    backgroundColor: COLORS.SCROLL_BG_COLOR,
    width: COMMON_SIZE.SCROLLBAR_WIDTH,
  },
  '&::-webkit-scrollbar-thumb': {
    background: COLORS.SCROLLBAR_COLOR,
  },
});

const ProfileList = ({ profileData }: Props) => {
  const mockData = {
    id: '1',
    language: 'JavaScript',
    code: `export const DetailPage = () => {
  const { id } = useParams();
    return (
    <div>
      <MiniNavBar>
        <>
          <span>{id}</span>
          <button type='button'>
            <PencilIcon />
          </button>
        </>
      </MiniNavBar>
      상세페이지임 암튼그럼ㅋㅋ
    </div>
  );
};`,
    skills: ['React', 'Emotion', 'Typescript'],
    requirements: ['잠실사는사람만', '소통좋아해요'],
    liked: false,
  };
  return (
    <div css={profileListStyle}>
      {profileData.map((data) => (
        <Profile
          key={`profile-${data.id}`}
          id={data.id}
          language={data.language}
          code={data.code}
          skills={data.skills}
          requirements={data.requirements}
          liked={data.liked}
        />
      ))}
    </div>
  );
};

export default ProfileList;
