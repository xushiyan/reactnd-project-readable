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
