import {getReportsDataAction} from "../actions/reportsDataActions";
import {reportsDataReducer} from "../reducers/reportsDataReducers";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);
const store = mockStore({reportsData: reportsDataReducer});

it("Test: test reports data", async () => {
    global.fetch = jest.fn((data) => {
        return new Promise(resolve => {
            resolve({
                json: () => {
                    return new Promise(resolve => {
                        const part = data.split("/")[4];
                        if(part === "projects") {
                            resolve([
                                {projectId: 1, projectName: "wtr lite"},
                                {projectId: 2, projectName: "the best game"},
                            ]);
                        } else if(part === "locations") {
                            resolve([
                                    {locationId: 22, location: "Brest"},
                                    {locationId: 10, location: "Minsk"}
                                ]);
                        } else if(part === "factors") {
                            resolve([
                                    {factorId: 1, factorName: "Standard"},
                                    {factorId: 12, factorName: "Day off"}
                                ]);
                        } else if(part === "features") {
                            resolve([
                                {featureId: 43, featureName: "backend"},
                                {featureId: 12, featureName: "frontend"}
                            ]);
                        } else if(part === "tasks") {
                            resolve([
                                    {taskId: 22, taskName: "testing"},
                                    {taskId: 43, taskName: "database"},
                                ]);
                        } else if(part === "detailedTasks") {
                            resolve([
                                    {detailedTaskId: 109, detailedTaskName: "reducer"},
                                    {detailedTaskId: 99, detailedTaskName: "filling database"}
                                ]);
                        }
                    });
                }
            })
        })
    });
    store.dispatch(getReportsDataAction(121212))
        .then(() => {
            expect(store.getActions().length).toEqual(2);
            expect(store.getActions()[0].payload.loading).toBeTrue();
            expect(store.getActions()[1].payload.loading).toBeFalse();
            expect(store.getActions()[1].payload.projects).toEqual([
                {projectId: 1, projectName: "wtr lite"},
                {projectId: 2, projectName: "the best game"},
            ]);
        });
});