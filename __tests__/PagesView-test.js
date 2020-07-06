import "react-native";
import React from "react";
import PagesView from "../components/PagesView";
import {Text, TouchableOpacity} from "react-native";
import renderer from "react-test-renderer";

let num = 1;

const decrease = () => {
    num = num - 1;
}

const increase = () => {
    num = num + 1;
}

beforeEach(() => {
    num = 1;
});

const test = renderer.create(
    <PagesView
        countOfWeek={num}
        decreaseCountOfWeek={decrease}
        increaseCountOfWeek={increase}
    />);
const root = test.root;

it("Test: get snapshot of component", () => {
    expect(test.toJSON()).toMatchSnapshot();
});

it("Test: decrease of count of weeks", () => {
    const decreaseButton = root.findAllByType(TouchableOpacity)[0];
    decreaseButton._fiber.pendingProps.onPress();
    expect(num).toEqual(0);
    decreaseButton._fiber.pendingProps.onPress();
    expect(num).toEqual(-1);
    decreaseButton._fiber.pendingProps.onPress();
    expect(num).toEqual(-2);
});

it("Test: increase of count of weeks", () => {
    const increaseButton = root.findAllByType(TouchableOpacity)[1];
    increaseButton._fiber.pendingProps.onPress();
    expect(num).toEqual(2);
    increaseButton._fiber.pendingProps.onPress();
    expect(num).toEqual(3);
    increaseButton._fiber.pendingProps.onPress();
    expect(num).toEqual(4);
});

it("Test: text value", () => {
    expect(root.findAllByType(Text)[2]._fiber.stateNode.props.children).toEqual(1);
    test.update(<PagesView
        countOfWeek={2}
        decreaseCountOfWeek={decrease}
        increaseCountOfWeek={increase}
    />);
    expect(root.findAllByType(Text)[2]._fiber.stateNode.props.children).toEqual(2);
    test.update(<PagesView
        countOfWeek={3}
        decreaseCountOfWeek={decrease}
        increaseCountOfWeek={increase}
    />);
    expect(root.findAllByType(Text)[2]._fiber.stateNode.props.children).toEqual(3);
})
