import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.131:9999',
});

export default api;
