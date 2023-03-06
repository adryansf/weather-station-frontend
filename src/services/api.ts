import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.163.83.11:3333',
});

export default api;
