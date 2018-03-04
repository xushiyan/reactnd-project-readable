import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';


const ROOT_URL = 'http://localhost:3001'
const AUTH_TOKEN = 'Bearer some-token'
const HEADERS = { headers: { Authorization: AUTH_TOKEN } };

export const getPosts = () => {
    const request = axios.get(`${ROOT_URL}/posts`, HEADERS)
    return {
        type: GET_POSTS,
        payload: request
    }
};

export const getCategories = () => {
    const request = axios.get(`${ROOT_URL}/categories`, HEADERS);
    return {
        type: GET_CATEGORIES,
        payload: request
    };
};
