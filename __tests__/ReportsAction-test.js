import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {reportsReducer} from "../reducers/reportsReducer";
import {initReports, saveReportAction} from "../actions/reportsActions";

const mockStore = configureStore([thunk]);
const store = mockStore({reports: reportsReducer});

const initReportsState = [
    {
        reportDetailsId: 1,
        reportDetailsDate: "2020-06-05",
        projectId: 1,
        featureId: 2,
        taskId: 3,
        detailedTaskId: 4,
        factorId: 5,
        locationId: 6,
        status: "PRIVATE",
    },
    {
        reportDetailsId: 2,
        reportDetailsDate: "2020-03-20",
        projectId: 1,
        featureId: 5,
        taskId: 1,
        detailedTaskId: 8,
        factorId: 1,
        locationId: 3,
        status: "REJECTED",
    },
    {
        reportDetailsId: 3,
        reportDetailsDate: "2019-03-20",
        projectId: 3,
        featureId: 1,
        taskId: 7,
        detailedTaskId: 2,
        factorId: 9,
        locationId: 5,
        status: "REGISTERED",
    },
]

it("Test: init reports", async () => {
    const date = {dateStart: "2020-02-02", dateEnd: "2020-07-01"};
    global.fetch = jest.fn(() => {
        return new Promise(resolve => {
            resolve({
                json: () => {
                    return new Promise((resolve) => {
                            resolve(initReportsState
                                .reduce((acc, val) => {
                                    if(new Date(val.reportDetailsDate) > new Date(date.dateStart)
                                        && new Date(val.reportDetailsDate) < new Date(date.dateEnd)) {
                                        acc.push(val);
                                    }
                                    return acc;
                                }, []));
                    })
                }
            })
        })
    });
    store.dispatch(initReports(date, 121212))
        .then(() => {
            expect(store.getActions().length).toEqual(2);
            expect(store.getActions()[0].payload.loading).toEqual(true);
            expect(store.getActions()[1].payload.reports.length).toEqual(2);
        });
});

it("Test: reports save", async () => {
    const arrWithNewReport = [
        {
            method: "POST",
            report: {
                project: {projectId: 1, projectName: "wtr lite"},
                feature: {featureId: 43, featureName: "backend"},
                task: {taskId: 22, taskName: "testing"},
                detailedTask: {detailedTaskId: 109, detailedTaskName: "reducer"},
                location: {locationId: 22, location: "Brest"},
                factor: {factorId: 1, factorName: "Standard"},
                reportDetailsDate: "2020-06-20T20:20",
                status: "PRIVATE"
            }
        },
        {
            method: "PUT",
            report: {
                project: {projectId: 1, projectName: "wtr lite"},
                feature: {featureId: 43, featureName: "backend"},
                task: {taskId: 22, taskName: "testing"},
                detailedTask: {detailedTaskId: 109, detailedTaskName: "reducer"},
                location: {locationId: 10, location: "Minsk"},
                factor: {factorId: 12, factorName: "Day off"},
                reportDetailsDate: "2018-10-25",
                reportDetailsId: 2,
                status: "PRIVATE"
            }
        }
    ]
    global.fetch = jest.fn(() => {
        return new Promise(resolve => {
            resolve({
                status: 200,
                json: () => {
                    return new Promise(resolve => {
                        resolve([{
                            reportDetailsId: 10,
                            projectId: 1,
                            featureId: 43,
                            taskId: 22,
                            detailedTaskId: 109,
                            locationId: 22,
                            factorId: 1,
                            reportDetailsDate: "2020-06-20T20:20",
                        }]);
                    })
                }
            })
        })
    });
    store.dispatch(saveReportAction(arrWithNewReport, initReportsState, 121212))
        .then(() => {
            expect(store.getActions().length).toEqual(4);
            expect(store.getActions()[0].payload.loading && store.getActions()[2].payload.loading).toBeTrue()
            expect(store.getActions[3].payload.reports.length).toEqual(3);
            expect(store.getActions[3].payload.reports)
                .toContainValue({
                    reportDetailsId: 10,
                    projectId: 1,
                    featureId: 43,
                    taskId: 22,
                    detailedTaskId: 109,
                    locationId: 22,
                    factorId: 1,
                    reportDetailsDate: "2020-06-20",
                });
            expect(store.getActions[1].payload.reports
                .find(report => report.reportDetailsId === 2).reportDetailsDate)
                .toEqual("2018-10-25");
            expect(store.getActions[1].payload.reports
                .find(report => report.reportDetailsId === 2).status)
                .toEqual("PRIVATE");
        });
})