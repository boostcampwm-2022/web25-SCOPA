/** @jsxImportSource @emotion/react */
import { Dispatch, SetStateAction, useCallback } from 'react';

import { listButtonStyle, listWrapperStyle } from './TechStackBox.styles';

import { CheckIcon } from 'assets/svgs';

interface Props {
  isSelected: boolean;
  setSelectedStacks: Dispatch<SetStateAction<Array<string>>>;
  name: string;
}

export const TechStackCheckbox = ({ isSelected, setSelectedStacks, name }: Props) => {
  const handleClickButton = useCallback(() => {
    if (!isSelected) setSelectedStacks((prev) => (prev.length < 3 ? [...prev, name] : prev));
    else setSelectedStacks((prev) => prev.filter((value) => value !== name));
  }, [isSelected]);

  return (
    <li css={listWrapperStyle}>
      <button type='button' onClick={handleClickButton} css={listButtonStyle(isSelected)}>
        {isSelected ? <CheckIcon /> : <div />}
        <span>{name}</span>
        <div />
      </button>
    </li>
  );
};
