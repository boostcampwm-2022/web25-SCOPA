/** @jsxImportSource @emotion/react */

import { useCallback } from 'react';
import { selectedItemButtonStyle, selectedItemsStyle } from './styles';

export const SelectedItems = ({ itemNames }: { itemNames: string[] }) => {
  const handleClick = useCallback(() => {}, []);

  return (
    <div css={selectedItemsStyle}>
      {itemNames.map((itemName, i) => (
        <div key={i}>
          <span>{itemName}</span>
          <button type='button' css={selectedItemButtonStyle} onClick={handleClick}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};
