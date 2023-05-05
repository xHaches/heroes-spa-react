import { types } from "../types/types";

const initialState = {
    logged: true,
}

export const authReducer = (state = initialState, {type, user}: {type: types, user?: any}) => {
    switch (type) {
        case types.login:
            return {
                ...state,
                logged: true,
                user
            };
        case types.logout:
            return {
                ...state,
                logged: false,
            };
        default:
            return state;
    }
}