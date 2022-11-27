/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { InterestsBox } from 'common';
import { useClickOutside } from 'hooks';

import { interestWrapperStyle, popoverButtonStyle } from './InterestSelector.styles';

import { ArrowDownIcon } from 'assets/svgs';

interface Props {
  interest: string;
  setInterest: Dispatch<SetStateAction<string>>;
}

export const InterestSelector = ({ interest, setInterest }: Props) => {
  const [isShown, setIsShown] = useState(false);
  const handleClickPopoverButton = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);
  const outsideClickRef = useClickOutside(setIsShown);

  return (
    <div ref={outsideClickRef} css={interestWrapperStyle}>
      <span>{interest ?? '선택한 관심분야 없음'}</span>
      <button type='button' onClick={handleClickPopoverButton} css={popoverButtonStyle}>
        <ArrowDownIcon />
      </button>
      {isShown && <InterestsBox setIsShown={setIsShown} setInterest={setInterest} topPosition={30} />}
    </div>
  );
};
