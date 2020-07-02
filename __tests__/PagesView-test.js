import "react-native";
import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PagesView from "../components/PagesView";
import {Text, TouchableOpacity} from "react-native";

configure({ adapter: new Adapter() });

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

it.skip("Test: get snapshot of component", () => {
    const wrapper = shallow(
        <PagesView
            countOfWeek={num}
            decreaseCountOfWeek={decrease}
            increaseCountOfWeek={increase}
        />);
    expect(wrapper).toMatchSnapshot();
});

it("Test: decrease of count of weeks", () => {
    const wrapper = shallow(
        <PagesView
            countOfWeek={num}
            decreaseCountOfWeek={decrease}
            increaseCountOfWeek={increase}
        />);
    const decreaseButton = wrapper.find(TouchableOpacity).at(0);
    decreaseButton.simulate('press');
    expect(num).toEqual(0);
    decreaseButton.simulate('press');
    expect(num).toEqual(-1);
    decreaseButton.simulate('press');
    expect(num).toEqual(-2);
});

it("Test: increase of count of weeks", () => {
    const wrapper = shallow(
        <PagesView
            countOfWeek={num}
            decreaseCountOfWeek={decrease}
            increaseCountOfWeek={increase}
        />);
    const increaseButton = wrapper.find(TouchableOpacity).at(1);
    increaseButton.simulate('press');
    expect(num).toEqual(2);
    increaseButton.simulate('press');
    expect(num).toEqual(3);
    increaseButton.simulate('press');
    expect(num).toEqual(4);
});

it("Test: text value", () => {
    const wrapper = shallow(
        <PagesView
            countOfWeek={num}
        />);
    expect(wrapper.find(Text).at(2).props().children).toEqual(1);
    wrapper.setProps({countOfWeek: 2});
    expect(wrapper.find(Text).at(2).props().children).toEqual(2);
    wrapper.setProps({countOfWeek: 3});
    expect(wrapper.find(Text).at(2).props().children).toEqual(3);
})
