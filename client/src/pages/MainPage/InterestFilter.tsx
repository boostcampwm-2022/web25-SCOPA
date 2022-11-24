/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';

import { InterestsBox } from 'common';

import { useClickOutside } from 'hooks';

import { interestFilterWrapperStyle, interestStyle } from './styles';

const InterestFilter = () => {
  const [isShown, setIsShown] = useState(false);
  const [interest, setInterest] = useState<string>('');
  const outSideClickRef = useClickOutside(setIsShown);

  const handleClick = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);

  return (
    <div ref={outSideClickRef} css={interestStyle}>
      <div css={interestFilterWrapperStyle}>
        <button type='button' onClick={handleClick}>
          <span>{interest.length > 0 ? interest : '분야 선택'}</span>
        </button>
      </div>
      {isShown && <InterestsBox setInterest={setInterest} setIsShown={setIsShown} topPosition={40} />}
    </div>
  );
};

export default InterestFilter;
