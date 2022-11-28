/** @jsxImportSource @emotion/react */

import { SetStateAction, Dispatch } from 'react';

import { STACK_LIST } from 'utils/constants';
import { TechStackCheckbox } from './TechStackCheckbox';

import { techStackBoxWrapperStyle } from './styles';

interface Props {
  selectedStacks: Array<string>;
  setSelectedStacks: Dispatch<SetStateAction<Array<string>>>;
  topPosition: number;
}

export const TechStackBox = ({ selectedStacks, setSelectedStacks, topPosition }: Props) => {
  return (
    <ul css={techStackBoxWrapperStyle(topPosition)}>
      {STACK_LIST.map((stackName) => (
        <TechStackCheckbox
          key={`tech-stack-${stackName}`}
          isSelected={selectedStacks.includes(stackName)}
          setSelectedStacks={setSelectedStacks}
          name={stackName}
        />
      ))}
    </ul>
  );
};
