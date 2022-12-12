import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { currentUserState, isNewMessageState } from 'store';
import { API } from 'utils/constants';

export function useSetSSE() {
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const setIsNewMessage = useSetRecoilState(isNewMessageState);
  const [isSSESet, setIsSSESet] = useState<boolean>(false);
  let eventSource: EventSource;

  useEffect(() => {
    if (currentUserID && !isSSESet) {
      eventSource = new EventSource(`${process.env.REACT_APP_FETCH_URL}${API.MESSAGE_EVENT}`, {
        withCredentials: true,
      });

      eventSource.onopen = () => {
        setIsSSESet(true);
      };

      eventSource.onmessage = ({ data }) => {
        console.log(data); // for debug
        setIsNewMessage(true);
      };

      return () => {
        eventSource.close();
        setIsSSESet(false);
      };
    }
    return () => {};
  }, [currentUserID]);
}
