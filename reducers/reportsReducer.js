export const REPORTS_REQUEST = "REPORTS_REQUEST";
export const REPORTS_FAILED = "REPORTS_FAILED";
export const REPORTS_SUCCESS = "REPORTS_SUCCESS";


export const initialState = {
    reports: [],
    loading: false,
    message: "",
};

export function reportsReducer(state = initialState, action) {
    switch (action.type) {
        case REPORTS_REQUEST:
            return { ...state, ...action.payload };
        case REPORTS_FAILED:
            return { ...state, ...action.payload };
        case REPORTS_SUCCESS:
            return {...state, ...action.payload };
        default:
            return state;
    }
}
