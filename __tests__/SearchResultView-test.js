import "react-native";
import React from "react";
import SearchResultView from "../components/SearchResultView";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {TouchableOpacity} from "react-native";

configure({ adapter: new Adapter() });

let wrapper;
let answer;

const props = {
    route: {
        params: {
            reports: [
                {reportDetailsDate: "2020-06-20"},
                {reportDetailsDate: "2020-06-25"},
                {reportDetailsDate: "2020-06-20"}]
        }
    },
    navigation: {
        navigate: (...args) => {
            answer = `Go to ResultDetails with date ${args[1].date}`;
        }
    }
}

beforeAll(() => {
    wrapper = shallow(
        <SearchResultView
            route={props.route}
            navigation={props.navigation}
            />);
});

it("Test: get snapshot of component", () => {
    expect(wrapper).toMatchSnapshot();
});

it("Test: count of dates in state", () => {
    const instance = wrapper.instance();
    expect(instance.state.arrWithDates.length).toEqual(2);
});

it("Test: count of touchable opacity", () => {
    expect(wrapper.find(TouchableOpacity).length).toEqual(2);
});

it("Test: on press date", () => {
    const button = wrapper.find(TouchableOpacity);
    button.at(0).simulate('press');
    expect(answer).toEqual("Go to ResultDetails with date 2020-06-20");
    button.at(1).simulate('press');
    expect(answer).toEqual("Go to ResultDetails with date 2020-06-25");
});