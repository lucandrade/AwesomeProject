import * as constants from '../constants/actionsConstants';

let fullList = [];
let list, current;
const page = 0;
const itemsPerPage = 2;
const initialState = {
    list: [],
    counter: 0,
    recipe: {},
    fetched: false,
    fetching: false,
    error: null
};

function nextPage(state) {
    current = page*itemsPerPage;
    list = state.concat(fullList.slice(current, current+itemsPerPage));
    page++;
    return list;
}

export default function recipes(state = initialState, action) {
    switch (action.type) {
        case constants.ADD_RECIPE:
            state.list.push({
                id: action.payload.id || null,
                title: action.payload.title || '',
                text: action.payload.text || '',
            });
            return {...state, counter: state.counter+1};
        case constants.FETCH_RECIPES:
            return {...state, error: null, fetching: true};
        case constants.ERROR_RECIPES:
            return {...state, error: true};
        case constants.FETCHED_RECIPES:
            fullList = action.payload;
            list = nextPage(state.list);
            return {
                ...state,
                list,
                fetching: false,
                error: null,
                fetched: true,
            };
        case constants.NEXT_PAGE_RECIPES:
            list = nextPage(state.list);
            return {
                ...state,
                list
            };
        case constants.FETCHED_RECIPE:
            return {
                ...state,
                fetching: false,
                error: null,
                fetched: true,
                recipe: action.payload
            };
        default:
            return state;
    }
}
