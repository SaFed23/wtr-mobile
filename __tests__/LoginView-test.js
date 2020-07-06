import "react-native";
import React from "react";
import LoginView from "../components/LoginView";
import {TextInput, TouchableOpacity} from "react-native";
import renderer from "react-test-renderer";

const props = {
    navigation: {
        navigate: (...args) => {}
    },
    user: {
        currentUser: {},
        loading: false,
        message: "",
    },
    authorization: function (user) {
        this.user.loading = true;
        this.user.currentUser = user;
        this.user.loading = false;
    }
}

const testRenderer = renderer.create(<LoginView {...props}/>);
const testInstance = testRenderer.root;
const instance = testRenderer.getInstance();

it("Test: get snapshot of login view", () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
});

it("Test: set state", () => {
    expect(instance.state.username).toEqual("");
    expect(instance.state.password).toEqual("");
    const [username, password] = testInstance.findAllByType(TextInput).map(el => el.instance);
    username.props.onChange({nativeEvent: {text: "user"}});
    password.props.onChange({nativeEvent: {text: "password"}});
    expect(instance.state.username).toEqual("user");
    expect(instance.state.password).toEqual("password");
});

it("Test: navigate", () => {
    const [username, password] = testInstance.findAllByType(TextInput).map(el => el.instance);
    username.props.onChange({nativeEvent: {text: "user"}});
    password.props.onChange({nativeEvent: {text: "password"}});
    const button = testInstance.findAllByType(TouchableOpacity)[0];
    expect(instance.state.username).toEqual("user");
    expect(instance.state.password).toEqual("password");
    button._fiber.pendingProps.onPress();
    expect(props.user.currentUser.username).toEqual("user");
    expect(props.user.currentUser.password).toEqual("password");
    expect(instance.state.username).toEqual("");
    expect(instance.state.password).toEqual("");
});
