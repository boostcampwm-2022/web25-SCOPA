/** @jsxImportSource @emotion/react */

import { ChangeEvent, useCallback, useState } from 'react';

import { checkboxLabelStyle, checkboxStyle, checkboxWrapperStyle } from './TechStackCheckbox.styles';

interface Props {
  initialValue: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export const TechStackCheckbox = ({ initialValue, onChange, name }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialValue);
  const handleChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange(e);
  }, []);

  return (
    <div css={checkboxWrapperStyle}>
      <input
        type='checkbox'
        id={`tech-stack-${name}`}
        checked={isChecked}
        onChange={handleChangeCheckbox}
        css={checkboxStyle}
      />
      <label htmlFor={`tech-stack-${name}`} css={checkboxLabelStyle}>
        {name}
      </label>
    </div>
  );
};
