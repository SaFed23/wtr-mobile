import "react-native";
import React from "react";
import {initialState as usersReducer} from "../reducers/usersReducer";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import renderer from "react-test-renderer"
import Settings from "../containers/Settings";
import {initialState as reportsDataReducer} from "../reducers/reportsDataReducers";

const mockStore = configureStore([thunk]);
const store = mockStore({user: usersReducer, reportsData: reportsDataReducer});
const test = renderer.create(
    <Settings store={store}/>
);


it("Test: get snapshot of settings", () => {
    expect(test.toJSON()).toMatchSnapshot();
});