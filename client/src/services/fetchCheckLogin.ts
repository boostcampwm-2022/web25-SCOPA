import { API } from 'utils/constants';

export async function fetchCheckLogin() {
  const data = await fetch(`${process.env.REACT_APP_FETCH_URL}${API.CHECK}`)
    .then(async (response) => {
      const code = response.status;
      const body = await response.json();
      return { code, body };
    })
    .catch(() => {
      return { code: 0, body: null };
    });
  return data;
}
