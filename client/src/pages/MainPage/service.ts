import { Dispatch, SetStateAction } from 'react';

import { API } from 'utils/constants';
import { checkCustomCode, checkStatusCode } from 'utils/fetchUtils';
import { singleProfileData } from './types';

interface Params {
  setProfileData: Dispatch<SetStateAction<Array<singleProfileData>>>;
  setTotalNumOfData: Dispatch<SetStateAction<number>>;
  paramObject: Record<string, string>;
}

export async function fetchFilteredData({ setProfileData, setTotalNumOfData, paramObject }: Params) {
  await fetch(`${process.env.REACT_APP_FETCH_URL}${API.PROFILE}?${new URLSearchParams(paramObject)}`)
    .then(checkStatusCode)
    .then(checkCustomCode)
    .then((res) => {
      setProfileData(res.list);
      setTotalNumOfData(res.totalNumOfData);
    })
    .catch((err) => {
      alert(err);
    });
}

export function sendLikeIdToServer(likedId: string, type: string) {
  fetch(`${process.env.REACT_APP_FETCH_URL}${API.LIKE}`, {
    credentials: 'include',
    method: type,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: likedId }),
  })
    .then(checkStatusCode)
    .then(checkCustomCode)
    .catch((err) => {
      alert(err);
    });
}
