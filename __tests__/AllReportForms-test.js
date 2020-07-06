import "react-native";
import React from "react";
import {initialState as reportsDataReducer} from "../reducers/reportsDataReducers";
import {initialState as reportsReducer} from "../reducers/reportsReducer";
import {initialState as usersReducer} from "../reducers/usersReducer";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AllReportForms from "../containers/AllReportForms";
import renderer from "react-test-renderer";

const mockStore = configureStore([thunk]);
const store = mockStore({user: usersReducer, reportsData: reportsDataReducer, reports: reportsReducer});
const props = {
    route: {
        params: {
            date: "2020-06-20",
            reports: [],
        }
    },
}
const test = renderer.create(
    <AllReportForms store={store} {...props}/>
);


it("Test: get snapshot of all reports forms", () => {
    expect(test.toJSON()).toMatchSnapshot();
});