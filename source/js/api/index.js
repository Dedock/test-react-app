import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';
import axios from 'axios';

promisePolyfill.polyfill();

function login(user) {
  console.log(user)
  return axios.post('/api/login', user)
    .then(response => response);
}

export default {
  login,
};
