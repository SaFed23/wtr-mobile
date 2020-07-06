import "react-native";
import React from "react";
import {initialState as usersReducer} from "../reducers/usersReducer";
import {initialState as reportsDataReducer} from "../reducers/reportsDataReducers";
import {initialState as reportsReducer} from "../reducers/reportsReducer";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import renderer from "react-test-renderer";
import Search from "../containers/Search";

const mockStore = configureStore([thunk]);
const store = mockStore({user: usersReducer, reportsData: reportsDataReducer, reports: reportsReducer});
const test = renderer.create(
    <Search store={store}/>
);


it("Test: get snapshot of search", () => {
    expect(test.toJSON()).toMatchSnapshot();
});