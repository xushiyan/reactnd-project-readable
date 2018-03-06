import _ from 'lodash';
import {
    GET_POST_COMMENTS, UPDATE_POST_COMMENT_VOTE_SCORE
} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_POST_COMMENTS:
            const commentsArray = action.payload.data;
            if (commentsArray.length === 0)
                return state;

            return _.mapKeys(commentsArray, 'id');
        case UPDATE_POST_COMMENT_VOTE_SCORE:
            const { id, voteScore } = action.payload.data;
            return { ...state, [id]: { ...state[id], voteScore } };
        default:
            return state;
    }
};
