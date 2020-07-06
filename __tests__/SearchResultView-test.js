import "react-native";
import React from "react";
import SearchResultView from "../components/SearchResultView";
import {TouchableOpacity} from "react-native";
import renderer from "react-test-renderer"

let test;
let answer;
let root;

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
    test = renderer.create(
        <SearchResultView
            route={props.route}
            navigation={props.navigation}
            />);
    root = test.root;
});

it("Test: get snapshot of component", () => {
    expect(test.toJSON()).toMatchSnapshot();
});

it("Test: count of dates in state", () => {
    const instance = test.getInstance();
    expect(instance.state.arrWithDates.length).toEqual(2);
});

it("Test: count of touchable opacity", () => {
    expect(root.findAllByType(TouchableOpacity).length).toEqual(2);
});

it("Test: on press date", () => {
    const [button1, button2] = [...root.findAllByType(TouchableOpacity)];
    button1._fiber.pendingProps.onPress();
    expect(answer).toEqual("Go to ResultDetails with date 2020-06-20");
    button2._fiber.pendingProps.onPress();
    expect(answer).toEqual("Go to ResultDetails with date 2020-06-25");
});