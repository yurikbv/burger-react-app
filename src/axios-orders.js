import axios from 'axios';

const instance = axios.create({
  baseURL: "https://burger-builder-react-app-858cd.firebaseio.com"
});

export default instance;