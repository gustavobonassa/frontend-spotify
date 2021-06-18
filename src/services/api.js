import axios from 'axios';
import store from '../store';

const api = axios.create({
    baseURL: 'https://adonis-be.herokuapp.com'
});

api.interceptors.request.use((config) => {
    const { token } = store.getState().auth;

    const headers = { ...config.headers };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return { ...config, headers };
})

export default api;
