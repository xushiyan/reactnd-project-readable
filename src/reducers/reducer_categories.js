import _ from 'lodash';
import { GET_CATEGORIES, SELECT_CATEGORY } from '../actions/actions_categories';

export const CategoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return action.payload.data.categories;
        default:
            return state;
    }
};

export const SelectedCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case SELECT_CATEGORY:
            return action.selected;
        default:
            return state;
    }
};
