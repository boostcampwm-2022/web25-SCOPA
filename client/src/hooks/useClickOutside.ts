import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';

export function useClickOutside(setIsShown: Dispatch<SetStateAction<boolean>>) {
  const ref = useRef<HTMLDivElement>(null);
  // Modal 또는 Popover 의 최상위 태그는 Div로 맞춰주길 권장

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (!e.target) return; // e.target이 존재하지 않는 경우
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) setIsShown(false);
    // ref.current가 존재하되 Modal 또는 Popover과 같지 않을 경우 (바깥 요소일 경우) => 이벤트 버블링
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ref; // 이 ref를 Modal 또는 Popover의 최상위 Div에 부착
}
