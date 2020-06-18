import {REPORTS_FAILED, REPORTS_REQUEST, REPORTS_SUCCESS} from "../reducers/reportsReducer";
import {getReports} from "../routes/reportDetailsView";

export function initReports(date, token) {
    return async dispatch => {
        dispatch({
            type: REPORTS_REQUEST,
            payload: {
                reports: [],
                loading: true,
                message: "",
            }
        });
        try {
            const result = await getReports(date, token);
            dispatch({
                type: REPORTS_SUCCESS,
                payload: {
                    reports: result,
                    message: "",
                    loading: false,
                },
            });
        } catch (e) {
            dispatch({
                type: REPORTS_FAILED,
                payload: {
                    reports: [],
                    message: "Something is wrong:(",
                    loading: false,
                },
            })
        }
    }
}
