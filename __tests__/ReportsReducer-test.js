import {
    initialState,
    reportsReducer,
    REPORTS_REQUEST,
    REPORTS_SUCCESS,
    REPORTS_FAILED
} from "../reducers/reportsReducer";

it("Test: reports reducer", () => {
    // Test reports request
    expect(
        reportsReducer(initialState, {
            type: REPORTS_REQUEST,
            payload: {
                loading: true,
            }
        })
    ).toEqual({...initialState, loading: true});

    // Test reports failed
    expect(
        reportsReducer(initialState, {
            type: REPORTS_FAILED,
            payload: {
                loading: false,
            }
        })
    ).toEqual({...initialState, loading: false});

    // Test reports success
    const reports = [
        {
            reportDetailsId: 1,
            reportDetailsDate: "2020-06-05"
        },
        {
            reportDetailsId: 2,
            reportDetailsDate: "2020-03-20"
        },
    ]
    expect(
        reportsReducer(initialState, {
            type: REPORTS_SUCCESS,
            payload: {
                loading: false,
                reports: reports,
            }
        })
    ).toEqual({...initialState, loading: false, reports: reports});
});