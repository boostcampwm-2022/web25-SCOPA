/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { SelectedItems, TechStackBox } from 'common';
import { useClickOutside } from 'hooks';

import { ArrowDownIcon } from 'assets/svgs';
import { popoverButtonStyle, techStackWrapperStyle } from './TechStackSelector.styles';

interface Props {
  skills: string[];
  setSkills: Dispatch<SetStateAction<string[]>>;
}

export const TechStackSelector = ({ skills, setSkills }: Props) => {
  const [isShown, setIsShown] = useState(false);
  const handleClickPopoverButton = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);
  const outsideClickRef = useClickOutside(setIsShown);

  return (
    <div ref={outsideClickRef} css={techStackWrapperStyle}>
      <SelectedItems itemNames={skills} setItems={setSkills} />
      <button type='button' onClick={handleClickPopoverButton} css={popoverButtonStyle}>
        <ArrowDownIcon />
      </button>
      {isShown && <TechStackBox selectedStacks={skills} setSelectedStacks={setSkills} />}
    </div>
  );
};
