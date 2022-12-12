import { useCallback, useState } from 'react';

export function useShowTooltip() {
  const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

  const handleMouseOverTooltip = useCallback(() => {
    setIsTooltipShown(true);
  }, []);

  const handleMouseOutTooltip = useCallback(() => {
    setIsTooltipShown(false);
  }, []);

  return { isTooltipShown, handleMouseOutTooltip, handleMouseOverTooltip };
}
