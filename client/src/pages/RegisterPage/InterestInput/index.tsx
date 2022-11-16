/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { SelectedItems } from '../SelectedItems';
import { InterestsBox } from 'common';

import { registerInputArrowButtonStyle, registerPageInputStyle, registerPageInputWrapperStyle } from '../styles';

import { ArrowDownIcon } from 'assets/svgs';

export const InterestInput = ({ setInterest }: { setInterest: Dispatch<SetStateAction<string>> }) => {
  const interestRef = useRef<HTMLDivElement>(null);

  const [isShown, setIsShown] = useState(false);
  const [interestDraft, setInterestDraft] = useState('');

  const handleClick = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (!e.target) return;
    if (interestRef.current && !interestRef.current.contains(e.target as HTMLElement)) setIsShown(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div ref={interestRef}>
      <div css={registerPageInputWrapperStyle}>
        <button type='button' css={registerPageInputStyle} onClick={handleClick}>
          <span>관심분야</span>
        </button>
        <button type='button' css={registerInputArrowButtonStyle} onClick={handleClick}>
          <ArrowDownIcon />
        </button>
      </div>
      {isShown && <InterestsBox setIsShown={setIsShown} />}
      {interestDraft && <SelectedItems itemNames={[interestDraft]} />}
    </div>
  );
};
