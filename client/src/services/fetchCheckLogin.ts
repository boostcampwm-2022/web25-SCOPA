import { API } from 'utils/constants';

export async function fetchCheckLogin() {
  const data = await fetch(`${process.env.REACT_APP_FETCH_URL}${API.CHECK}`, { credentials: 'include' }).then(
    (response) => {
      if (response.status !== 200) throw new Error();
      return response.json();
    }
  );
  return data;
}
