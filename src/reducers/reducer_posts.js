import _ from 'lodash';
import { GET_POSTS, GET_POST, GET_POST_COMMENTS } from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_POSTS:
            const postsArray = action.payload.data;
            return _.mapKeys(postsArray, 'id');
        case GET_POST:
            const post = action.payload.data;
            return { ...state, [post.id]: post };
        case GET_POST_COMMENTS:
            const commentsArray = action.payload.data;
            if (commentsArray.length === 0)
                return state;

            const post_id = commentsArray[0].parentId;
            const comments = _.mapKeys(commentsArray, 'id');
            return { ...state, [post_id]: { ...state[post_id], comments: comments } };
        default:
            return state;
    }
}
