/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { TechStackBox, SelectedItems } from 'common';
import { useClickOutside } from 'hooks';

import { ArrowDownIcon } from 'assets/svgs';
import { dropdownContainerStyle, dropdownWrapperStyle, inputButtonArrowStyle } from './DropdownInput.styles';

interface Props {
  techStack: Array<string>;
  setTechStack: Dispatch<SetStateAction<Array<string>>>;
}

export const TechStackInput = ({ techStack, setTechStack }: Props) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const outSideClickRef = useClickOutside(setIsShown);

  const handleClick = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);

  return (
    <div ref={outSideClickRef} css={dropdownWrapperStyle}>
      <div css={dropdownContainerStyle}>
        {techStack.length > 0 ? <SelectedItems itemNames={techStack} setItems={setTechStack} /> : <span>기술스택</span>}
        <button type='button' css={inputButtonArrowStyle} onClick={handleClick}>
          <ArrowDownIcon />
        </button>
      </div>
      {isShown && <TechStackBox selectedStacks={techStack} setSelectedStacks={setTechStack} topPosition={35} />}
    </div>
  );
};
