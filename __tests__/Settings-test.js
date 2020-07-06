import "react-native";
import React from "react";
import {initialState as usersReducer} from "../reducers/usersReducer";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import renderer from "react-test-renderer"
import Settings from "../containers/Settings";

const mockStore = configureStore([thunk]);
const store = mockStore({user: usersReducer});
const test = renderer.create(
    <Settings store={store}/>
);


it("Test: get snapshot of settings", () => {
    expect(test.toJSON()).toMatchSnapshot();
});