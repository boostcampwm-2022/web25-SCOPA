/** @jsxImportSource @emotion/react */

import { tooltipInnerStyle, tooltipWrapperStyle } from './Tooltip.styles';

interface Props {
  text: string;
}

export const Tooltip = ({ text }: Props) => {
  return (
    <div css={tooltipWrapperStyle}>
      <div css={tooltipInnerStyle}>
        <span>{text}</span>
      </div>
    </div>
  );
};
