export const REPORTS_DATE_REQUEST = "REPORTS_DATE_REQUEST";
export const REPORTS_DATA_FAILED = "REPORTS_DATA_FAILED";
export const REPORTS_DATA_SUCCESS = "REPORTS_DATA_SUCCESS";


export const initialState = {
    projects: [],
    features: [],
    tasks: [],
    detailedTasks: [],
    locations: [],
    factors: [],
    loading: false,
};

export function reportsDataReducer(state = initialState, action) {
    switch (action.type) {
        case REPORTS_DATE_REQUEST:
            return { ...state, ...action.payload };
        case REPORTS_DATA_FAILED:
            return { ...state, ...action.payload };
        case REPORTS_DATA_SUCCESS:
            return {...state, ...action.payload };
        default:
            return state;
    }
}
