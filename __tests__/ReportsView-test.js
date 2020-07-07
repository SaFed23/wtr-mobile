import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {TouchableOpacity} from "react-native";
import ReportsView from "../components/ReportsView";

let reports = [];

const initReportsState = [
    {
        reportDetailsId: 1,
        reportDetailsDate: "2020-07-05",
        projectId: 1,
        featureId: 2,
        taskId: 3,
        detailedTaskId: 4,
        factorId: 5,
        locationId: 6,
        status: "PRIVATE",
    },
    {
        reportDetailsId: 2,
        reportDetailsDate: "2020-06-24",
        projectId: 1,
        featureId: 5,
        taskId: 1,
        detailedTaskId: 8,
        factorId: 1,
        locationId: 3,
        status: "REJECTED",
    },
    {
        reportDetailsId: 3,
        reportDetailsDate: "2020-07-01",
        projectId: 3,
        featureId: 1,
        taskId: 7,
        detailedTaskId: 2,
        factorId: 9,
        locationId: 5,
        status: "REGISTERED",
    },
]

const props = {
    navigation: {
        navigate: function (...args) {
            reports = args[1].reports;
        }
    },
    user: {
        currentUser: {username: "user", password: "password", token: 123123},
        loading: false,
        message: "",
    },
    reports: {
        reports: initReportsState,
        loading: false,
        message: "",
    },
    getReportsData: () => {},
    changeLocation: () => {},
    initReports: function() {},
}

const test = renderer.create(<ReportsView {...props}/>);
const root = test.root;
const instance = test.getInstance();

it("Test: get snapshots", () => {
    expect(test.toJSON()).toMatchSnapshot();
});

it("Test: count of dates", () => {
    instance.componentDidUpdate({reports: {loading: true}});
    expect(instance.state.arrayOfDates.length).toEqual(5);
    expect(root.findAllByType(TouchableOpacity).length).toEqual(7);
    instance.increaseCountOfWeek();
    expect(instance.state.arrayOfDates.length).toEqual(12);
    expect(root.findAllByType(TouchableOpacity).length).toEqual(14);
    instance.increaseCountOfWeek();
});

it("Test: press on date", () => {
    instance.componentDidUpdate({reports: {loading: true}});
    const buttonWithReports = root.findAllByType(TouchableOpacity)[5]._fiber;
    const buttonWithoutReports = root.findAllByType(TouchableOpacity)[3]._fiber;
    buttonWithoutReports.pendingProps.onPress();
    expect(reports.length).toEqual(0);
    buttonWithReports.pendingProps.onPress();
    expect(reports.length).toEqual(1);
});