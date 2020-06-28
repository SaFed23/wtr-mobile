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

export function saveReportAction(arrWithNewReports, reports, token) {
    return dispatch => {
        const arrToCreate = arrWithNewReports
            .filter(report => report.method === "POST")
            .map(report => {
                return {
                    comments: report.report.comments,
                    detailedTaskId: report.report.detailedTask.detailedTaskId,
                    factorId: report.report.factor.factorId,
                    featureId: report.report.feature.featureId,
                    hours: report.report.hours,
                    locationId: report.report.location.locationId,
                    projectId: report.report.project.projectId,
                    reportDetailsDate: report.report.reportDetailsDate,
                    status: report.report.status,
                    taskId: report.report.task.taskId,
                    workUnits: report.report.workUnits,
                }
            });
        const arrToUpdate = arrWithNewReports
            .filter(report => report.method === "PUT")
            .map(report => {
                return {
                    comments: report.report.comments,
                    detailedTaskId: report.report.detailedTask.detailedTaskId,
                    factorId: report.report.factor.factorId,
                    featureId: report.report.feature.featureId,
                    hours: report.report.hours,
                    locationId: report.report.location.locationId,
                    projectId: report.report.project.projectId,
                    reportDetailsDate: report.report.reportDetailsDate,
                    reportDetailsId: report.report.reportDetailsId,
                    status: report.report.status,
                    taskId: report.report.task.taskId,
                    workUnits: report.report.workUnits,
                }
            });
        if (arrToCreate.length) {
            saveReport("POST", arrToCreate, token)
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: REPORTS_REQUEST,
                        payload: {
                            loading: true,
                        }
                    });
                    const updateArr = data.map(report => {
                        report.reportDetailsDate = report.reportDetailsDate.split("T")[0];
                        return report;
                    });
                    dispatch({
                        type: REPORTS_SUCCESS,
                        payload: {
                            reports: [...reports, ...updateArr],
                            loading: false,
                        }
                    });
                })
                .catch(err => console.log("err with create: ", err.message));
        }
        if (arrToUpdate.length) {
            saveReport("PUT", arrToUpdate, token)
                .then(res => {
                    if(res.status === 200) {
                        dispatch({
                            type: REPORTS_REQUEST,
                            payload: {
                                loading: true,
                            }
                        });
                        const oldReports = [...reports]
                            .filter(report => arrToUpdate
                                .findIndex(val => val.reportDetailsId === report.reportDetailsId) === - 1)
                        const newReports = arrWithNewReports
                            .filter(report => report.method === "PUT")
                            .map(report => report.report);
                        dispatch({
                            type: REPORTS_SUCCESS,
                            payload: {
                                reports: [...oldReports, ...newReports],
                                loading: false,
                            }
                        });
                    }
                })
                .catch(err => console.log("err with update: ", err.message));

        }
    }
}
