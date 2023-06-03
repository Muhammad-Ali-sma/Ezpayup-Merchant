import axios from 'axios';

const BASE_URL = 'https://1a20-104-189-117-104.ngrok.io/local';

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': 'allow',
  },
});

export default API;
