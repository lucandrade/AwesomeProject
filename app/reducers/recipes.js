import * as constants from '../constants/actionsConstants';

const initialState = {
    list: [],
    counter: 0
};

export default function recipes(state = initialState, action) {
    switch (action.type) {
        case constants.ADD_RECIPE:
            state.list.push({
                title: action.payload.title || '',
                text: action.payload.text || '',
            });
            return {...state, counter: state.counter+1};
        default:
            return state;
    }
}
