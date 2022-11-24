/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { InterestsBox } from 'common';
import { useClickOutside } from 'hooks';

import { interestFilterWrapperStyle, interestStyle } from './styles';

interface Props {
  interest: string;
  setInterest: Dispatch<SetStateAction<string>>;
}

const InterestFilter = ({ interest, setInterest }: Props) => {
  const [isShown, setIsShown] = useState(false);
  const outSideClickRef = useClickOutside(setIsShown);

  const handleClick = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);

  return (
    <div ref={outSideClickRef} css={interestStyle}>
      <button type='button' css={interestFilterWrapperStyle} onClick={handleClick}>
        <span>{interest.length > 0 ? interest : '분야 선택'}</span>
      </button>
      {isShown && <InterestsBox setInterest={setInterest} setIsShown={setIsShown} />}
    </div>
  );
};

export default InterestFilter;
