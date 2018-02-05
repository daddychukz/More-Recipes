import axios from 'axios';


/**
 * @description sets authorization token for protected routes
 *
 * @param {string} token
 *
 * @returns {void}
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthorizationToken;
