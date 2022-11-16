/** @jsxImportSource @emotion/react */

import { useCallback } from 'react';

import { registerPageSelectedItemButtonStyle, registerPageSelectedItemsStyle } from './styles';

export const SelectedItems = ({ itemNames }: { itemNames: string[] }) => {
  const handleClick = useCallback(() => {}, []);

  return (
    <div css={registerPageSelectedItemsStyle}>
      {itemNames.map((itemName, i) => (
        <div key={i}>
          <span>{itemName}</span>
          <button type='button' css={registerPageSelectedItemButtonStyle} onClick={handleClick}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};
