import _ from 'lodash';
import {
    GET_POSTS, GET_POST,
    UPDATE_POST_VOTE_SCORE,
    CHANGE_SORT_ORDER, CHANGE_SORT_CONDITION,
    DEFAULT_SORT_ORDER, DEFAULT_SORT_PROPERTY,
    ADD_POST, UPDATE_POST, DELETE_POST,
} from '../actions';

export const PostsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_POSTS:
            const postsArray = action.payload.data;
            return _.mapKeys(postsArray, 'id');
        case GET_POST:
            const post = action.payload.data;
            return { ...state, [post.id]: post };
        case ADD_POST:
            return
        case UPDATE_POST:
            return
        case UPDATE_POST_VOTE_SCORE:
            const { id, voteScore } = action.payload.data;
            return { ...state, [id]: { ...state[id], voteScore } };
        case DELETE_POST:
            return
        default:
            return state;
    }
};

export const PostsSortConditionReducer = (
    state = {
        sortOrder: DEFAULT_SORT_ORDER,
        sortProperty: DEFAULT_SORT_PROPERTY
    },
    action
) => {
    switch (action.type) {
        case CHANGE_SORT_ORDER:
            return { ...state, sortOrder: action.sortOrder };
        case CHANGE_SORT_CONDITION:
            return {
                ...state,
                sortProperty: action.sortProperty,
                sortOrder: action.sortOrder
            };
        default:
            return state;
    }
};
