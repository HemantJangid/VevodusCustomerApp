import axios from 'axios';
import requestUrls from '../constants/requestUrls';

export const axiosAll = (method, url, data) => {
  const baseURL = requestUrls.baseUrl;
  return axios({method: method, url: `${baseURL}${url}`, data: data})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
};
