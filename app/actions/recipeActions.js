import * as constants from '../constants/actionsConstants';
import Request from '../utils/Request';

export function addRecipe(recipe = { title: '', text: '' }) {
    return {
        type: constants.ADD_RECIPE,
        payload: recipe
    }
}

export function nextPage() {
    return {type: constants.NEXT_PAGE_RECIPES};
}

function setFetching() {
    return {type: constants.FETCH_RECIPES};
}

function setError() {
    return {type: constants.ERROR_RECIPES};
}

function fetchedRecipes(data) {
    return {type: constants.FETCHED_RECIPES, payload: data};
}

export function fetchList() {
    return function(dispatch) {
        return setTimeout(() => {
            dispatch(setFetching());
            Request.get('/recipes.json')
                .then(response => {
                    if (response.data) {
                        dispatch(fetchedRecipes(response.data));
                    } else {
                        dispatch(setError());
                    }
                })
                .catch(() => {
                    dispatch(setError());
                });
        }, 10);
    }
}
