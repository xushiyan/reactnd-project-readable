import { http_client } from '.';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export const selectCategory = (category) => {
    return {
        type: SELECT_CATEGORY,
        selected: category
    };
};

export const getCategories = () => {
    const request = http_client.get('/categories')
    return {
        type: GET_CATEGORIES,
        payload: request
    };
};
