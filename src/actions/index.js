import axios from 'axios';

/* CRUD */
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

/* select category */
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export const selectCategory = (category) => {
    return {
        type: SELECT_CATEGORY,
        selected: category
    };
};

/* sort posts */
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER';
export const CHANGE_SORT_CONDITION = 'CHANGE_SORT_CONDITION';
export const VOTE_SCORE = 'voteScore';
export const TIMESTAMP = 'timestamp';
export const SORT_ORDERS = ['asc', 'desc'];
export const DEFAULT_SORT_ORDER = SORT_ORDERS[1];
export const DEFAULT_SORT_PROPERTY = TIMESTAMP;
export const changeSortOrder = (sortOrder) => {
    return {
        type: CHANGE_SORT_ORDER,
        sortOrder: sortOrder
    };
};

export const changeSortCondition = (sortProperty, sortOrder) => {
    return {
        type: CHANGE_SORT_CONDITION,
        sortProperty: sortProperty,
        sortOrder: sortOrder
    };
};

/* up/down-vote post */
export const CHANGE_POST_VOTE_SCORE = 'CHANGE_POST_VOTE_SCORE';
export const changePostVoteScore = (postId, newVoteScore) => {
    return {
        type: CHANGE_POST_VOTE_SCORE,
        postId: postId,
        newVoteScore: newVoteScore
    };
};
