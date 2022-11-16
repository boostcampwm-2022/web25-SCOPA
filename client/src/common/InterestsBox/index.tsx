/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback } from 'react';

import { interestsBoxStyle } from './styles';

export const InterestsBox = ({ setIsShown }: { setIsShown: Dispatch<SetStateAction<boolean>> }) => {
  // 나중에 공통 상수화 해야 함
  const interests = { Frontend: 1, Backend: 1, Android: 2, iOS: 3 };

  const handleClick = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);

  return (
    <ul css={interestsBoxStyle}>
      {Object.keys(interests).map((interest, i) => (
        <li key={`interest-${interest}`}>
          <button id={interest} type='button' onClick={handleClick}>
            {interest}
          </button>
        </li>
      ))}
    </ul>
  );
};
