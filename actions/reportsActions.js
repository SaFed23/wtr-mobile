import {REPORTS_FAILED, REPORTS_REQUEST, REPORTS_SUCCESS} from "../reducers/reportsReducer";
import {getReports, saveReport} from "../routes/reportDetailsRoutes";

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

export function saveReportAction(report, reports, token) {
    return dispatch => {
        saveReport({
            comments: report.comments,
            detailedTaskId: report.detailedTask.detailedTaskId,
            factorId: report.factor.factorId,
            featureId: report.feature.featureId,
            hours: report.hours,
            locationId: report.location.locationId,
            projectId: report.project.projectId,
            reportDetailsDate: report.reportDetailsDate,
            status: report.status,
            taskId: report.task.taskId,
            workUnits: report.workUnits,
        }, token)
            .then(res => res.json())
            .then(data => {
                report.reportDetailsId = data.reportDetailsId;
                const updateReports = [...reports, report];
                dispatch({
                    type: REPORTS_SUCCESS,
                    payload: {
                        reports:updateReports,
                    }
                })
            })
            .catch(err => {
                dispatch({
                    type: REPORTS_FAILED,
                })
            })
    }
}
