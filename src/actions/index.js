import axios from 'axios';

/* CRUD */
export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POST = 'GET_POST';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const UPDATE_POST_VOTE_SCORE = 'UPDATE_POST_VOTE_SCORE';

const http_client = axios.create({
    baseURL: 'http://localhost:3001',
});
http_client.defaults.headers.common['Authorization'] = 'Bearer some-token';
http_client.defaults.headers.post['Content-Type'] = 'application/json';

export const getPosts = () => {
    const request = http_client.get('/posts')
    return {
        type: GET_POSTS,
        payload: request
    }
};

export const getCategories = () => {
    const request = http_client.get('/categories')
    return {
        type: GET_CATEGORIES,
        payload: request
    };
};

export const getPost = (postId) => {
    const request = http_client.get(`/posts/${postId}`);
    return {
        type: GET_POST,
        payload: request
    };
};

export const getPostComments = (postId) => {
    const request = http_client.get(`/posts/${postId}/comments`);
    return {
        type: GET_POST_COMMENTS,
        payload: request
    };
};

export const updatePostVoteScore = (postId, upOrDownVote) => {
    const request = http_client.post(`/posts/${postId}`, { option: upOrDownVote });
    return {
        type: UPDATE_POST_VOTE_SCORE,
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
