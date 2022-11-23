/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction, useCallback } from 'react';

import { selectedItemsStyle, selectedItemStyle } from './styles';

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
    <div css={selectedItemsStyle}>
      {itemNames.map((itemName) => (
        <div key={`techStack-${itemName}`} css={selectedItemStyle}>
          <span>{itemName}</span>
          <button
            type='button'
            onClick={() => {
              handleClick(itemName);
            }}
          >
            <XIcon />
          </button>
        </div>
      ))}
    </div>
  );
};
