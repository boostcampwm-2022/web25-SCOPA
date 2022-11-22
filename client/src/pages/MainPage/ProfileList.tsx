/** @jsxImportSource @emotion/react */

import Profile from './Profile';
import { css } from '@emotion/react';
import { COLORS } from '../../styles/colors';
import { profileDatum } from './types';
import { COMMON_SIZE } from '../../styles/sizes';
import { useCallback, useEffect, useRef, useState } from 'react';

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

const emptyProfileBoxStyle = css({
  width: 'calc((100% / 3) - 40px)',
  minWidth: 350,
  flexGrow: 1,
  height: '95%',
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.SECONDARY_1,
});

const ProfileList = ({ profileData }: Props) => {
  const profileListRef = useRef<HTMLDivElement>(null);
  const [isOdd, setIsOdd] = useState<boolean>(false);
  const [isBlankNeeded, setIsBlankNeeded] = useState<boolean>(false);

  useEffect(() => {
    if (profileData.length % 2 !== 0) setIsOdd(true);
    else setIsOdd(false);
  }, []);

  const decideBlank = useCallback(() => {
    if (profileListRef.current && profileListRef.current.clientWidth < 1069) setIsBlankNeeded(true);
    else setIsBlankNeeded(false);
  }, [profileListRef.current]);

  useEffect(() => {
    window.addEventListener('resize', decideBlank);
    return () => {
      window.removeEventListener('resize', decideBlank);
    };
  }, []);

  return (
    <div css={profileListStyle} ref={profileListRef}>
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
      {isOdd && isBlankNeeded && <div css={emptyProfileBoxStyle} />}
    </div>
  );
};

export default ProfileList;
