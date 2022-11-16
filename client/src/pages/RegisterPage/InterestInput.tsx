/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { SelectedItems } from './SelectedItems';
import { InterestsBox } from 'common';

import { useClickOutside } from 'hooks';

import { registerInputArrowButtonStyle, registerPageInputStyle, registerPageInputWrapperStyle } from './styles';

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
    <div ref={outSideClickRef}>
      <div css={registerPageInputWrapperStyle}>
        <button type='button' css={registerPageInputStyle} onClick={handleClick}>
          <span>관심분야</span>
        </button>
        <button type='button' css={registerInputArrowButtonStyle} onClick={handleClick}>
          <ArrowDownIcon />
        </button>
      </div>
      {isShown && <InterestsBox setInterest={setInterest} setIsShown={setIsShown} />}
      {interest && <SelectedItems itemNames={[interest]} />}
    </div>
  );
};
