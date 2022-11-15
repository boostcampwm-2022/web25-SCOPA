/** @jsxImportSource @emotion/react */

import { SetStateAction, Dispatch } from 'react';
import { STACK_LIST } from 'utils/constants';
import { TechStackCheckbox } from './TechStackCheckbox';

import { techStackBoxWrapper } from './styles';

interface Props {
  setSelectedStacks: Dispatch<SetStateAction<Array<string>>>;
}

export const TechStackBox = ({ setSelectedStacks }: Props) => {
  return (
    <div css={techStackBoxWrapper}>
      {STACK_LIST.map((stack) => (
        <TechStackCheckbox key={`tech-stack-${stack}`} setSelectedStacks={setSelectedStacks} name={stack} />
      ))}
    </div>
  );
};
