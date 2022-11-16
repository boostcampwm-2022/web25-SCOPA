/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { SelectedItems } from '../SelectedItems';
import { InterestsBox } from 'common';

import { registerInputArrowButtonStyle, registerPageInputStyle, registerPageInputWrapperStyle } from '../styles';

import { ArrowDownIcon } from 'assets/svgs';

export const InterestInput = ({ setInterest }: { setInterest: Dispatch<SetStateAction<string>> }) => {
  const interestPageRef = useRef<HTMLDivElement>(null);

  const [isShown, setIsShown] = useState(false);
  const [interestDraft, setInterestDraft] = useState('');

  const handleClick = useCallback(() => {
    setIsShown(!isShown);
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (!e.target) return;
    if (interestPageRef.current && !interestPageRef.current.contains(e.target as HTMLElement)) setIsShown(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div ref={interestPageRef}>
      <div css={registerPageInputWrapperStyle}>
        <div css={registerPageInputStyle}>
          <span>관심분야</span>
        </div>
        <button type='button' css={registerInputArrowButtonStyle} onClick={handleClick}>
          <ArrowDownIcon />
        </button>
      </div>
      {isShown && <InterestsBox setIsShown={setIsShown} />}
      {interestDraft && <SelectedItems itemNames={[interestDraft]} />}
    </div>
  );
};
