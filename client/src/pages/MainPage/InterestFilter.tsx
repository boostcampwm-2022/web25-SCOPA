/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';
import { useClickOutside } from '../../hooks';
import { registerPageInputStyle, registerPageInputWrapperStyle } from '../RegisterPage/styles';
import { InterestsBox } from '../../common';
import { css } from '@emotion/react';
import { COLORS } from '../../styles/colors';
import { COMMON_SIZE, FONT_SIZE } from '../../styles/sizes';

const interestFilterWrapperStyle = css({
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.LARGE,
  backgroundColor: COLORS.SECONDARY_2,
  height: 30,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  textAlign: 'center',
});

const interestStyle = css({
  width: '90%',
  textAlign: 'center',
});

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
          {interest.length > 0 ? <span>{interest}</span> : <span>분야 선택</span>}
        </button>
      </div>
      {isShown && <InterestsBox setInterest={setInterest} setIsShown={setIsShown} />}
    </div>
  );
};

export default InterestFilter;
