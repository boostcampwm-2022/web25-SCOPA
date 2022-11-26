/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback } from 'react';

import { INTEREST_LIST } from 'utils/constants';

import { interestsBoxStyle } from './styles';

interface Props {
  setIsShown: Dispatch<SetStateAction<boolean>>;
  setInterest: Dispatch<SetStateAction<string>>;
  topPosition: number;
}

export const InterestsBox = ({ setIsShown, setInterest, topPosition }: Props) => {
  const handleClickInterestButton = useCallback((interest: string) => {
    setInterest(interest);
    setIsShown((prevState) => !prevState);
  }, []);

  return (
    <ul css={interestsBoxStyle(topPosition)}>
      {INTEREST_LIST.map((interest) => (
        <li key={`interest-${interest}`}>
          <button
            type='button'
            onClick={() => {
              handleClickInterestButton(interest);
            }}
          >
            {interest}
          </button>
        </li>
      ))}
    </ul>
  );
};
