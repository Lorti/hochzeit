import axios from 'axios/index';

const baseURL = process.env.NODE_ENV === 'production' ?
    '/.netlify/functions' :
    'http://localhost:9000';

export default ({ Vue }) => {
    Vue.prototype.$axios = axios.create({
        baseURL,
    });
}
