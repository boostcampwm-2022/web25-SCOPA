/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { useClickOutside } from 'hooks';
import { SelectedItems } from './SelectedItems';
import { TechStackBox } from './TechStackBox';

import { dropdownContainerStyle, dropdownWrapperStyle, inputButtonArrowStyle } from './DropdownInput.styles';

import { ArrowDownIcon } from 'assets/svgs';

interface Props {
  techStack: Array<string>;
  setTechStack: Dispatch<SetStateAction<Array<string>>>;
  className?: string;
}

export const TechStackInput = ({ techStack, setTechStack, className }: Props) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const outSideClickRef = useClickOutside(setIsShown);

  const handleClick = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);

  return (
    <div ref={outSideClickRef} css={dropdownWrapperStyle} className={className}>
      <div css={dropdownContainerStyle}>
        {techStack.length > 0 ? (
          <SelectedItems itemNames={techStack} setItems={setTechStack} />
        ) : (
          <span>기술스택 (최대 3개)</span>
        )}
        <button type='button' aria-label='기술스택 선택' css={inputButtonArrowStyle} onClick={handleClick}>
          <ArrowDownIcon />
        </button>
      </div>
      {isShown && <TechStackBox selectedStacks={techStack} setSelectedStacks={setTechStack} topPosition={35} />}
    </div>
  );
};
