/** @jsxImportSource @emotion/react */

import { ArrowDownIcon } from 'assets/svgs';
import { registerInputArrowButtonStyle, registerPageInputStyle, registerPageInputWrapperStyle } from '../styles';
import { useCallback, useState } from 'react';

export const InterestInput = () => {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = useCallback(() => {
    setIsOpened(!isOpened);
  }, []);

  return (
    <div css={registerPageInputWrapperStyle}>
      <div css={registerPageInputStyle}>관심분야</div>
      <button type='button' css={registerInputArrowButtonStyle} onClick={handleClick}>
        <ArrowDownIcon />
      </button>
    </div>
  );
};
