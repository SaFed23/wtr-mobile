import {
    initialState,
    reportsDataReducer,
    REPORTS_DATE_REQUEST,
    REPORTS_DATA_SUCCESS,
    REPORTS_DATA_FAILED
} from "../reducers/reportsDataReducers";

it("Test: reports data reducer", () => {
    // Test reports data request
    expect(
        reportsDataReducer(initialState, {
            type: REPORTS_DATE_REQUEST,
            payload: {
                loading: true,
            }
        })
    ).toEqual({...initialState, loading: true});

    // Test reports data failed
    expect(
        reportsDataReducer(initialState, {
            type: REPORTS_DATA_FAILED,
            payload: {
                loading: false,
            }
        })
    ).toEqual({...initialState, loading: false});

    // Test reports success
    const reportsData = {
        projects: [{projectId: 1, projectName: "wtr lite"}],
        features: [{featureId: 43, featureName: "backend"}],
        tasks: [{taskId: 22, taskName: "testing"}],
        detailedTasks: [{detailedTaskId: 109, detailedTaskName: "reducer"}],
        locations: [{locationId: 22, location: "Brest"}, {locationId: 10, location: "Minsk"}],
        factors: [{factorId: 1, factorName: "Standard"}, {factorId: 12, factorName: "Day off"}],
        loading: false,
    }
    expect(
        reportsDataReducer(initialState, {
            type: REPORTS_DATA_SUCCESS,
            payload: {
                reportsData,
            }
        })
    ).toEqual({...initialState, reportsData});
});