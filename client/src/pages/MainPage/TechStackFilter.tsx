/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';
import { useClickOutside } from '../../hooks';
import { registerPageInputStyle, registerPageInputWrapperStyle } from '../RegisterPage/styles';
import { TechStackBox } from '../../common';
import { SelectedItems } from '../RegisterPage/SelectedItems';
import { css } from '@emotion/react';
import { COLORS } from '../../styles/colors';
import { COMMON_SIZE, FONT_SIZE } from '../../styles/sizes';

const techStackFilterWrapperStyle = css({
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.LARGE,
  backgroundColor: COLORS.SECONDARY_2,
  height: 30,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
});

const techStackStyle = css({
  width: '90%',
  textAlign: 'center',
});

const TechStackFilter = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const outSideClickRef = useClickOutside(setIsShown);

  const handleClick = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);

  return (
    <div ref={outSideClickRef} css={techStackStyle}>
      <div css={techStackFilterWrapperStyle}>
        <button type='button' onClick={handleClick}>
          {techStack.length > 0 ? (
            <SelectedItems itemNames={techStack} setItems={setTechStack} />
          ) : (
            <span>기술스택을 선택하세요</span>
          )}
        </button>
      </div>
      {isShown && <TechStackBox selectedStacks={techStack} setSelectedStacks={setTechStack} />}
    </div>
  );
};

export default TechStackFilter;
