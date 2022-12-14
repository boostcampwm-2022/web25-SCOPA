import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { currentUserState, isNewMessageState, newMessageState } from 'store';
import { API } from 'utils/constants';

export function useSetSSE() {
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const setIsNewMessage = useSetRecoilState(isNewMessageState);
  const setNewMessage = useSetRecoilState(newMessageState);
  const [isSSESet, setIsSSESet] = useState<boolean>(false);
  const { pathname } = useLocation();
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
        const messageUserID = pathname.split('/message/')[1];
        if (!messageUserID) {
          setIsNewMessage(true);
          return;
        }
        const message = JSON.parse(data);
        if (message.from === messageUserID) setNewMessage(JSON.parse(data));
        else setIsNewMessage(true);
      };

      return () => {
        eventSource.close();
        setIsSSESet(false);
      };
    }
    return () => {};
  }, [currentUserID, pathname]);
}
