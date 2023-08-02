import axios from 'axios';

const wooApi = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default wooApi;
