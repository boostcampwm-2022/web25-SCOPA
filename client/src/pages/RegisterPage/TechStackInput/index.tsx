/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { registerInputArrowButtonStyle, registerPageInputStyle, registerPageInputWrapperStyle } from '../styles';

import { ArrowDownIcon } from 'assets/svgs';
import { InterestsBox } from '../../../common';
import { SelectedItems } from '../SelectedItems';
import { TechStackCheckbox } from '../../../common/TechStackBox/TechStackCheckbox';

export const TechStackInput = ({ setTechStack }: { setTechStack: Dispatch<SetStateAction<Array<string>>> }) => {
  const techStackRef = useRef<HTMLDivElement>(null);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [techStackDraft, setTechStackDraft] = useState<Array<string>>([]);

  const handleClick = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (!e.target) return;
    if (techStackRef.current && !techStackRef.current.contains(e.target as HTMLElement)) setIsShown(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div ref={techStackRef}>
      <div css={registerPageInputWrapperStyle}>
        <button type='button' css={registerPageInputStyle} onClick={handleClick}>
          기술스택
        </button>
        <button type='button' css={registerInputArrowButtonStyle} onClick={handleClick}>
          <ArrowDownIcon />
        </button>
      </div>
      {isShown && (
        <TechStackCheckbox
          setIsShown={setIsShown}
          selectedStacks={techStackDraft}
          setSelectedStacks={setTechStackDraft}
        />
      )}
      {techStackDraft && <SelectedItems itemNames={techStackDraft} />}
    </div>
  );
};
