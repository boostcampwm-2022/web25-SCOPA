/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback } from 'react';

import { selectedItemButtonStyle, selectedItemsStyle, selectedItemStyle } from './styles';

import { XIcon } from 'assets/svgs';

interface Props {
  itemNames: Array<string>;
  setItems: Dispatch<SetStateAction<Array<string>>>;
}

export const SelectedItems = ({ itemNames, setItems }: Props) => {
  const handleClick = useCallback(
    (itemName: string) => {
      setItems(itemNames.filter((name) => name !== itemName));
    },
    [itemNames]
  );

  return (
    <ul css={selectedItemsStyle}>
      {itemNames.map((itemName) => (
        <li key={`techStack-${itemName}`} css={selectedItemStyle}>
          <span>{itemName}</span>
          <button
            type='button'
            onClick={() => {
              handleClick(itemName);
            }}
            css={selectedItemButtonStyle}
          >
            <XIcon />
          </button>
        </li>
      ))}
    </ul>
  );
};
