import { ChangeEvent, useCallback, Dispatch, SetStateAction, useState } from 'react';

interface Props {
  setSelectedStacks: Dispatch<SetStateAction<Array<string>>>;
  name: string;
}

export const TechStackCheckbox = ({ setSelectedStacks, name }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) setSelectedStacks((prev) => [...prev, name]);
    else setSelectedStacks((prev) => prev.filter((value) => value !== name));
  }, []);

  return (
    <>
      <input type='checkbox' id={`tech-stack-${name}`} checked={isChecked} onChange={handleChangeCheckbox} />
      <label htmlFor={`tech-stack-${name}`}>{name}</label>
    </>
  );
};
