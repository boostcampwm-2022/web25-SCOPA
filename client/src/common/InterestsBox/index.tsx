/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback } from 'react';

import { interestsBoxStyle } from './styles';
import { INTEREST_LIST } from 'utils/constants';

interface Props {
  setIsShown: Dispatch<SetStateAction<boolean>>;
  setInterest: Dispatch<SetStateAction<string>>;
}

export const InterestsBox = ({ setIsShown, setInterest }: Props) => {
  const handleClick = useCallback((interest: string) => {
    setInterest(interest);
    setIsShown((prevState) => !prevState);
  }, []);

  return (
    <ul css={interestsBoxStyle}>
      {INTEREST_LIST.map((interest) => (
        <li key={`interest-${interest}`}>
          <button
            type='button'
            onClick={() => {
              handleClick(interest);
            }}
          >
            {interest}
          </button>
        </li>
      ))}
    </ul>
  );
};
