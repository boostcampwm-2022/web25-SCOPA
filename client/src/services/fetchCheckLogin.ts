import { API } from 'utils/constants';

export async function fetchCheckLogin() {
  const data = await fetch(`${process.env.REACT_APP_FETCH_URL}${API.CHECK}`)
    .then((response) => response.json())
    .catch(() => {
      return { code: 0, body: null };
    });
  return data;
}
