import Axios from 'axios';

const url = 'https://lucandrade.github.io/assets';

const Request = Axios.create({
    baseURL: url
});

export default Request;
