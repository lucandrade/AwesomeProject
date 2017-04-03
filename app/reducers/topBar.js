import * as constants from '../constants/actionsConstants';

const initialState = {
    title: 'Receitas',
    reload: 0
};

export default function topBar(state = initialState, action) {
    switch (action.type) {
        case constants.TITLE:
            return {...state, title: action.payload};
        case constants.RELOAD:
            return {...state, reload: state.reload+1};
        default:
            return state;
    }
}
