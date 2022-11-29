import { Dispatch, SetStateAction, useCallback } from 'react';

import { API } from 'utils/constants';
import { singleProfileData } from './types';

interface Params {
  setProfileData: Dispatch<SetStateAction<Array<singleProfileData>>>;
  setTotalNumOfData: Dispatch<SetStateAction<number>>;
  paramObject: Record<string, string>;
}

export const fetchFilteredData = ({ setProfileData, setTotalNumOfData, paramObject }: Params) => {
  fetch(`${process.env.REACT_APP_FETCH_URL}${API.PROFILE}?${new URLSearchParams(paramObject)}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 10000) {
        setProfileData(res.data.list);
        setTotalNumOfData(res.data.totalNumOfData);
      } else alert('데이터 미전송 : 잠시 후 다시 시도해주시기 바랍니다.');
    })
    .catch(() => {
      alert('오류 발생 : 잠시 후 다시 시도해주시기 바랍니다.');
    });
};

export const sendLikeIdToServer = (likedId: string, type: string) => {
  fetch(`${process.env.REACT_APP_FETCH_URL}${API.LIKE}`, {
    credentials: 'include',
    method: type,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: likedId }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 1000) return;
      else alert('잠시 후 다시 시도해주세요.');
    })
    .catch(() => {
      alert('잠시 후 다시 시도해주세요.');
    });
};
