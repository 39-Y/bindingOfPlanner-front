import axios from 'axios';

function create (url, options) {
  const instance = axios.create({
    baseURL: url,
    ...options,
  });
  return instance;
}

export const actions = create(`${import.meta.env.VITE_APP_API_URL}/action`);