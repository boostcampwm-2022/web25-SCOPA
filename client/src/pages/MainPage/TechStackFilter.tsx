/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { TechStackBox, SelectedItems } from 'common';
import { useClickOutside } from 'hooks';

import { techStackFilterWrapperStyle, techStackStyle } from './styles';

interface Props {
  techStack: Array<string>;
  setTechStack: Dispatch<SetStateAction<Array<string>>>;
}

const TechStackFilter = ({ techStack, setTechStack }: Props) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const outSideClickRef = useClickOutside(setIsShown);

  const handleClick = useCallback(() => {
    setIsShown((prevState) => !prevState);
  }, []);

  return (
    <div ref={outSideClickRef} css={techStackStyle}>
      <button type='button' css={techStackFilterWrapperStyle} onClick={handleClick}>
        {techStack.length > 0 ? (
          <SelectedItems itemNames={techStack} setItems={setTechStack} />
        ) : (
          <span>기술스택을 선택하세요</span>
        )}
      </button>
      {isShown && <TechStackBox selectedStacks={techStack} setSelectedStacks={setTechStack} />}
    </div>
  );
};

export default TechStackFilter;
