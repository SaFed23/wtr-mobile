export const USERS_REQUEST = "USERS_REQUEST";
export const USERS_FAILED = "USERS_FAILED";
export const USERS_AUTH = "USERS_AUTH";


export const initialState = {
    currentUser: {},
    loading: false,
    message: "",
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case USERS_REQUEST:
            return { ...state, ...action.payload };
        case USERS_FAILED:
            return { ...state, ...action.payload };
        case USERS_AUTH:
            return {...state, ...action.payload };
        default:
            return state;
    }
}
