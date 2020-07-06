import "react-native";
import React from "react";
import {usersReducer} from "../reducers/usersReducer";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from "../containers/Login";
import renderer from "react-test-renderer"

const mockStore = configureStore([thunk]);
const store = mockStore({user: usersReducer});
const test = renderer.create(
    <Login store={store}/>
);


it("Test: get snapshot of login", () => {
    expect(test.toJSON()).toMatchSnapshot();
});