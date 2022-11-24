/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { TechStackBox, SelectedItems } from 'common';
import { useClickOutside } from 'hooks';

import { registerInputArrowButtonStyle, registerPageInputStyle, registerPageInputWrapperStyle } from './styles';

import { ArrowDownIcon } from 'assets/svgs';

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
    <div ref={outSideClickRef}>
      <div css={registerPageInputWrapperStyle}>
        <button type='button' css={registerPageInputStyle} onClick={handleClick}>
          기술스택
        </button>
        <button type='button' css={registerInputArrowButtonStyle} onClick={handleClick}>
          <ArrowDownIcon />
        </button>
      </div>
      {isShown && <TechStackBox selectedStacks={techStack} setSelectedStacks={setTechStack} />}
      {techStack && <SelectedItems itemNames={techStack} setItems={setTechStack} />}
    </div>
  );
};
