/** @jsxImportSource @emotion/react */

import { ChangeEvent } from 'react';

import { checkboxLabelStyle, checkboxStyle, checkboxWrapperStyle } from './TechStackCheckbox.styles';

interface Props {
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export const TechStackCheckbox = ({ value, onChange, name }: Props) => {
  return (
    <div css={checkboxWrapperStyle}>
      <input type='checkbox' id={`tech-stack-${name}`} checked={value} onChange={onChange} css={checkboxStyle} />
      <label htmlFor={`tech-stack-${name}`} css={checkboxLabelStyle}>
        {name}
      </label>
    </div>
  );
};
