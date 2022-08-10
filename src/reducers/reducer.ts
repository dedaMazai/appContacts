import { actionTypes, typeState, typeAction } from '../types';

const initialState: typeState = {
    content: [],
    request: [],
    token: "",
    expanded: false,
    idEdit: false,
    error: false
}

export const reducer = (state = initialState, action: typeAction): typeState => {
    switch (action.type) {
        case actionTypes.SET_REQUEST:
            return {
                ...state,
                request: action.payload
            };
        case actionTypes.SET_CONTENT:
            return {
                ...state,
                content: action.payload,
            };
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case actionTypes.SET_EXPANDED:
            return {
                ...state,
                expanded: action.payload,
            };
        case actionTypes.SET_ID_EDIT:
            return {
                ...state,
                idEdit: action.payload,
            };
        case actionTypes.ON_ERROR:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}