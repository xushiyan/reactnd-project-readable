import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POST = 'GET_POST';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';


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

export const getPost = (post_id) => {
    const request = axios.get(`${ROOT_URL}/posts/${post_id}`, HEADERS);
    return {
        type: GET_POST,
        payload: request
    };
};

export const getPostComments = (post_id) => {
    const request = axios.get(`${ROOT_URL}/posts/${post_id}/comments`, HEADERS);
    return {
        type: GET_POST_COMMENTS,
        payload: request
    };
};
