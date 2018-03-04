import _ from 'lodash';
import { GET_CATEGORIES } from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return action.payload.data.categories;
        default:
            return state;
    }
};
