/** @jsxImportSource @emotion/react */

import Profile from './Profile';
import { css } from '@emotion/react';
import { COLORS } from '../../styles/colors';

const profileListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyItems: 'center',
  gap: 10,
  height: `95%`,
  overflow: 'scroll',
  '&::-webkit-scrollbar': {
    backgroundColor: COLORS.SECONDARY_1,
  },
  '&::-webkit-scrollbar-thumb': {
    background: COLORS.PRIMARY_1,
  },
});

const ProfileList = () => {
  const mockData = {
    id: '1',
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
      <Profile
        id={mockData.id}
        code={mockData.code}
        skills={mockData.skills}
        requirements={mockData.requirements}
        liked={mockData.liked}
      />
      <Profile
        id={mockData.id}
        code={mockData.code}
        skills={mockData.skills}
        requirements={mockData.requirements}
        liked={mockData.liked}
      />
      <Profile
        id={mockData.id}
        code={mockData.code}
        skills={mockData.skills}
        requirements={mockData.requirements}
        liked={mockData.liked}
      />
    </div>
  );
};

export default ProfileList;
