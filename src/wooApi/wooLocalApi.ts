import axios from 'axios';

const wooLocalApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default wooLocalApi;
