/** @jsxImportSource @emotion/react */

import { SetStateAction, Dispatch, useCallback, ChangeEvent } from 'react';

import { STACK_LIST } from 'utils/constants';
import { TechStackCheckbox } from './TechStackCheckbox';

import { techStackBoxWrapper } from './styles';
import { useClickOutside } from 'hooks';

interface Props {
  setIsShown: Dispatch<SetStateAction<boolean>>;
  selectedStacks: Array<string>;
  setSelectedStacks: Dispatch<SetStateAction<Array<string>>>;
}

export const TechStackBox = ({ setIsShown, selectedStacks, setSelectedStacks }: Props) => {
  const ref = useClickOutside(setIsShown);

  const handleClickCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.checked) setSelectedStacks((prev) => (prev.length < 3 ? [...prev, name] : prev));
    else setSelectedStacks((prev) => prev.filter((value) => value !== name));
  }, []);

  return (
    <div css={techStackBoxWrapper} ref={ref}>
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
