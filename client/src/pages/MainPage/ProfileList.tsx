/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useRef, useState } from 'react';

import Profile from './Profile';
import { profileDatum } from './types';

import { emptyProfileBoxStyle, profileListStyle } from './styles';

import { COMMON_SIZE } from 'styles/sizes';

interface Props {
  profileData: Array<profileDatum>;
}

const ProfileList = ({ profileData }: Props) => {
  const profileListRef = useRef<HTMLDivElement>(null);
  const [isOdd, setIsOdd] = useState<boolean>(false);
  const [isBlankNeeded, setIsBlankNeeded] = useState<boolean>(false);

  useEffect(() => {
    if (profileData.length % 2 !== 0) setIsOdd(true);
    else setIsOdd(false);
  }, []);

  const isWidthDouble = useCallback((targetWidth: number) => {
    return targetWidth > COMMON_SIZE.PROFILELIST_SINGLE_WIDTH && targetWidth < COMMON_SIZE.PROFILELIST_TRIPLE_WIDTH;
  }, []);

  const decideBlank = useCallback(() => {
    if (!profileListRef.current) return;
    if (isWidthDouble(profileListRef.current.clientWidth)) setIsBlankNeeded(true);
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
