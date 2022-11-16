/** @jsxImportSource @emotion/react */

import { SetStateAction, Dispatch, useCallback, ChangeEvent } from 'react';

import { STACK_LIST } from 'utils/constants';
import { TechStackCheckbox } from './TechStackCheckbox';

import { techStackBoxWrapper } from './styles';

interface Props {
  selectedStacks: Array<string>;
  setSelectedStacks: Dispatch<SetStateAction<Array<string>>>;
}

export const TechStackBox = ({ selectedStacks, setSelectedStacks }: Props) => {
  const handleClickCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.checked) setSelectedStacks((prev) => (prev.length < 3 ? [...prev, name] : prev));
    else setSelectedStacks((prev) => prev.filter((value) => value !== name));
  }, []);

  return (
    <div css={techStackBoxWrapper}>
      {STACK_LIST.map((stackName) => (
        <TechStackCheckbox
          key={`tech-stack-${stackName}`}
          value={selectedStacks.includes(stackName)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleClickCheckbox(e, stackName)}
          name={stackName}
        />
      ))}
    </div>
  );
};
