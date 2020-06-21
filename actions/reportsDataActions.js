import {REPORTS_DATA_FAILED, REPORTS_DATA_SUCCESS, REPORTS_DATE_REQUEST} from "../reducers/reportsDataReducers";
import {
    getDetailedTasks,
    getFactors,
    getFeatures,
    getLocations,
    getProjects,
    getTasks
} from "../routes/reportsDataRoutes";

export function getReportsDataAction(token) {
    return async dispatch => {
        dispatch({
            type: REPORTS_DATE_REQUEST,
            payload: {
                loading: true,
            }
        });
        try {
            const projects = await getProjects(token);
            const locations = await getLocations(token);
            const factors = await getFactors(token);
            const features = await getFeatures(token);
            const tasks = await getTasks(token);
            const detailedTasks = await getDetailedTasks(token);
            dispatch({
                type: REPORTS_DATA_SUCCESS,
                payload: {
                    projects,
                    locations,
                    factors,
                    features,
                    tasks,
                    detailedTasks,
                    loading: false,
                }
            });
        } catch (e) {
            dispatch({
                type: REPORTS_DATA_FAILED,
                payload: {
                    loading: false,
                }
            });
        }
    }
}