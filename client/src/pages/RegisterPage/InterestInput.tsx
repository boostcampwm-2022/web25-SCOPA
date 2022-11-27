/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { InterestsBox } from 'common';
import { useClickOutside } from 'hooks';

import { dropdownContainerStyle, dropdownWrapperStyle, inputButtonArrowStyle } from './DropdownInput.styles';

import { ArrowDownIcon } from 'assets/svgs';

interface Props {
  interest: string;
  setInterest: Dispatch<SetStateAction<string>>;
}

export const InterestInput = ({ interest, setInterest }: Props) => {
  const [isShown, setIsShown] = useState(false);
  const outSideClickRef = useClickOutside(setIsShown);

  const handleClick = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);

  return (
    <div ref={outSideClickRef} css={dropdownWrapperStyle}>
      <div css={dropdownContainerStyle}>
        <span>{interest.length ? interest : '관심분야'}</span>
        <button type='button' onClick={handleClick} css={inputButtonArrowStyle}>
          <ArrowDownIcon />
        </button>
      </div>
      {isShown && <InterestsBox setInterest={setInterest} setIsShown={setIsShown} topPosition={35} />}
    </div>
  );
};
