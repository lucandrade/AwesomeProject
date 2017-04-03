import * as constants from '../constants/actionsConstants';

export function setTitle(title) {
    return {
        type: constants.TITLE,
        payload: title
    }
}

export function reload() {
    return {
        type: constants.RELOAD
    }
}
