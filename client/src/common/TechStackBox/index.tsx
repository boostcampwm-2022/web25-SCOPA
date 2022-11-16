/** @jsxImportSource @emotion/react */

import { useRef, SetStateAction, Dispatch, useCallback, useEffect, ChangeEvent } from 'react';

import { TechStackCheckbox } from './TechStackCheckbox';
import { STACK_LIST } from 'utils/constants';

import { techStackBoxWrapper } from './styles';

interface Props {
  setIsShown: Dispatch<SetStateAction<boolean>>;
  selectedStacks: Array<string>;
  setSelectedStacks: Dispatch<SetStateAction<Array<string>>>;
}

export const TechStackBox = ({ setIsShown, selectedStacks, setSelectedStacks }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (!e.target) return;
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) setIsShown(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.checked) setSelectedStacks((prev) => [...prev, name]);
    else setSelectedStacks((prev) => prev.filter((value) => value !== name));
  }, []);

  return (
    <div css={techStackBoxWrapper} ref={ref}>
      {STACK_LIST.map((stackName) => (
        <TechStackCheckbox
          key={`tech-stack-${stackName}`}
          initialValue={selectedStacks.includes(stackName)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleClickCheckbox(e, stackName)}
          name={stackName}
        />
      ))}
    </div>
  );
};
