import "react-native";
import React from "react";
import {usersReducer} from "../reducers/usersReducer";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from "enzyme-to-json";
import Settings from "../containers/Settings";

configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);
const store = mockStore({user: usersReducer});
const wrapper = shallow(
    <Settings store={store}/>
);


it("Test: get snapshot of settings", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
});