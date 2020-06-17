import axios from 'axios';

const AT_JOB = 'http://192.168.1.131:9999';
const AT_HOME = 'http://10.0.0.104:9999';

const api = axios.create({
  baseURL: AT_HOME,
});

export default api;
