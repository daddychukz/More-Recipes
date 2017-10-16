import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios.post('http://localhost:5000/api/v1/users/signin', { credentials }).then(res => res.data.user)
  }
};
