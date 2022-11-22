/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';

import { TechStackBox } from 'common';
import { SelectedItems } from 'common/SelectedItems/SelectedItems';

import { useClickOutside } from 'hooks';

import { techStackFilterWrapperStyle, techStackStyle } from './styles';

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
