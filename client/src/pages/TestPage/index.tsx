import { useState, useCallback } from 'react';

import { TechStackBox } from 'common';

export const TestPage = () => {
  const [selectedStacks, setSelectedStacks] = useState<Array<string>>([]);
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleClickButton = useCallback(() => {
    setIsShown((prev) => !prev);
  }, []);

  return (
    <div>
      TechStackBox 테스트용 페이지
      <button type='button' onClick={handleClickButton}>
        팝업 토글
      </button>
      {isShown && <TechStackBox selectedStacks={selectedStacks} setSelectedStacks={setSelectedStacks} />}
      {selectedStacks.map((value) => (
        <span key={`selected-${value}`}>{value}</span>
      ))}
    </div>
  );
};
