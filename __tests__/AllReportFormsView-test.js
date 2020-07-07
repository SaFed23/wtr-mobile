import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {TouchableOpacity} from "react-native";
import AllReportFormsView from "../components/AllReportFormsView";
import {Picker} from "@react-native-community/picker";

let answer = "";
let submitReports = [];

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
        navigate: (str) => {answer = str},
        goBack: () => {answer = "back"},
    },
    date: "2020-07-05",
    reports: [{
        reportDetailsId: 1,
        reportDetailsDate: "2020-07-05",
        project: {projectId: 1, projectName: "wtr lite"},
        feature: {featureId: 43, featureName: "backend", projectId: 1},
        task: {taskId: 22, taskName: "testing", featureId: 43},
        detailedTask: {detailedTaskId: 109, detailedTaskName: "reducer", taskId: 22},
        factor: {factorId: 1, factorName: "Standard"},
        location: {locationId: 22, location: "Brest"},
        status: "PRIVATE",
        hours: 8,
        workUnits: 8,
    }],
    user: {
        currentUser: {username: "user", password: "password", token: 123123},
        location: {locationId: 1, locationName: "Brest"},
        loading: false,
        message: "",
    },
    allReports: {
        reports: initReportsState,
        loading: false,
        message: "",
    },
    reportsData: {
        projects: [
            {projectId: 1, projectName: "wtr lite"},
            {projectId: 2, projectName: "game"}],
        features: [
            {featureId: 43, featureName: "backend", projectId: 1},
            {featureId: 22, featureName: "ui realization", projectId: 2}],
        tasks: [
            {taskId: 22, taskName: "testing", featureId: 43},
            {taskId: 11, taskName: "added first screen", featureId: 22}],
        detailedTasks: [
            {detailedTaskId: 109, detailedTaskName: "reducer", taskId: 22},
            {detailedTaskId: 101, detailedTaskName: "added form", taskId: 11}],
        locations: [
            {locationId: 22, location: "Brest"},
            {locationId: 10, location: "Minsk"}],
        factors: [
            {factorId: 1, factorName: "Standard"},
            {factorId: 12, factorName: "Day off"}],
        loading: false,
    },
    saveReport: (reports, allReports, token) => {submitReports = reports},
}

const test = renderer.create(<AllReportFormsView {...props}/>);
const root = test.root;
const instance = test.getInstance();

it("Test: get snapshots", () => {
    expect(test.toJSON()).toMatchSnapshot();
});

it("Test: count of report forms and press buttons", () => {
    const buttonAdd = root.findAllByType(TouchableOpacity)[2]._fiber;
    const buttonPrev = root.findAllByType(TouchableOpacity)[1]._fiber;
    const buttonNext = root.findAllByType(TouchableOpacity)[3]._fiber;
    const buttonDelete = root.findAllByType(TouchableOpacity)[4]._fiber;
    expect(instance.state.arrWithReports.length).toEqual(1);
    buttonAdd.pendingProps.onPress();
    expect(instance.state.arrWithReports.length).toEqual(2);
    buttonAdd.pendingProps.onPress();
    expect(instance.state.arrWithReports.length).toEqual(3);
    buttonNext.pendingProps.onPress();
    buttonNext.pendingProps.onPress();
    expect(instance.state.currentReport).toEqual(2);
    buttonPrev.pendingProps.onPress();
    expect(instance.state.currentReport).toEqual(1);
    buttonDelete.pendingProps.onPress();
    expect(instance.state.currentReport).toEqual(0);
    expect(instance.state.arrWithReports.length).toEqual(2);
});

it("Test: navigation and submit buttons", () => {
    const buttonBack = root.findAllByType(TouchableOpacity)[0]._fiber;
    const buttonAdd = root.findAllByType(TouchableOpacity)[2]._fiber;
    const buttonNext = root.findAllByType(TouchableOpacity)[3]._fiber;
    const submit = root.findAllByType(TouchableOpacity)[5]._fiber;
    const submitAsPrivate = root.findAllByType(TouchableOpacity)[6]._fiber;
    buttonBack.pendingProps.onPress();
    expect(answer).toEqual("back");
    buttonAdd.pendingProps.onPress();
    buttonNext.pendingProps.onPress();
    submit.pendingProps.onPress();
    expect(instance.state.message).toEqual("Something is wrong in the 2 report!");
    const [project, feature, task, detailedTask, factor] =
        root.findAllByType(Picker).map(el => el._fiber.stateNode);
    project.props.onValueChange(2);
    feature.props.onValueChange(22);
    task.props.onValueChange(11);
    detailedTask.props.onValueChange(101);
    factor.props.onValueChange(12);
    submit.pendingProps.onPress();
    expect(instance.state.arrWithReports[1].report.project).toEqual({projectId: 2, projectName: "game"});
    expect(submitReports.length).toEqual(2);
    expect(submitReports[0].method).toEqual("PUT");
    expect(submitReports[1].method).toEqual("POST");
    expect(submitReports[0].report.status && submitReports[1].report.status).toEqual("REGISTERED");
    submitAsPrivate.pendingProps.onPress();
    expect(submitReports[0].report.status && submitReports[1].report.status).toEqual("PRIVATE");
});