import "react-native";
import React from "react";
import {usersReducer} from "../reducers/usersReducer";
import {reportsDataReducer} from "../reducers/reportsDataReducers";
import {reportsReducer} from "../reducers/reportsReducer";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Reports from "../containers/Reports";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);
const store = mockStore({user: usersReducer, reportsData: reportsDataReducer, reports: reportsReducer});
const wrapper = shallow(
    <Reports store={store}/>
);


it("Test: get snapshot of search", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
});