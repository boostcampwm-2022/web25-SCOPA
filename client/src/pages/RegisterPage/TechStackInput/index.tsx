/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { registerInputArrowButtonStyle, registerPageInputStyle, registerPageInputWrapperStyle } from '../styles';

import { ArrowDownIcon } from 'assets/svgs';

export const TechStackInput = ({ setTechStack }: { setTechStack: Dispatch<SetStateAction<Array<string>>> }) => {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = useCallback(() => {
    setIsOpened(!isOpened);
  }, []);

  return (
    <div css={registerPageInputWrapperStyle}>
      <div css={registerPageInputStyle}>기술스택</div>
      <button type='button' css={registerInputArrowButtonStyle} onClick={handleClick}>
        <ArrowDownIcon />
      </button>
    </div>
  );
};
