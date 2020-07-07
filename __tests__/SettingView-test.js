import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {Picker} from '@react-native-community/picker';
import SettingsView from "../components/SettingsView";

const props = {
    user: {
        currentUser: {
            username: "user",
            token: 121212,
        },
        location: null,
        loading: false,
        message: "",
    },
    changeLocation: function(location) {
        this.user.location = location;
    },
    locations: [
        {locationId: 1, locationName: "Brest"},
        {locationId: 2, locationName: "Minsk"},
        {locationId: 3, locationName: "Grodno"},
        ]

}

const test = renderer.create(<SettingsView {...props}/>);
const root = test.root;

it("Test: get snapshot", () => {
    expect(test.toJSON()).toMatchSnapshot();
});

it("Test: get state", () => {
    const locationSelect = root.findAllByType(Picker)[0]._fiber.stateNode;
    expect(props.user.location).toEqual(null);
    locationSelect.props.onValueChange(2);
    expect(props.user.location).toEqual(props.locations[1]);
});