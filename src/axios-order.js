import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-c8dc0.firebaseio.com/'
});

export default instance;