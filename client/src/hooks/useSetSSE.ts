import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { currentUserState } from 'store';
import { API } from 'utils/constants';

export function useSetSSE() {
  const { id: currentUserID } = useRecoilValue(currentUserState);

  useEffect(() => {
    if (!currentUserID) return () => {};
    let eventSource: EventSource;

    eventSource = new EventSource(`${process.env.REACT_APP_FETCH_URL}${API.MESSAGE_EVENT}`, {
      withCredentials: true,
    });

    eventSource.onmessage = ({ data }) => {
      console.log(JSON.parse(data));
    };

    return () => eventSource.close();
  }, [currentUserID]);
}
