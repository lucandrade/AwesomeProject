import * as constants from '../constants/actionsConstants';

export function addRecipe(recipe = { title: '', text: '' }) {
    return {
        type: constants.ADD_RECIPE,
        payload: recipe
    }
}
