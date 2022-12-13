import { useEffect, useRef } from 'react';
import { SingleMessageType } from 'types/message';

export function useScrollBottom(currentMessageData: SingleMessageType[]) {
  const messageDetailListRef = useRef<HTMLUListElement>(null);

  function scrollToEnd() {
    if (messageDetailListRef.current) {
      messageDetailListRef.current.scrollTop = messageDetailListRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToEnd();
  }, [currentMessageData]);

  return { messageDetailListRef };
}
