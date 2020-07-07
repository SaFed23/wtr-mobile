import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import SearchView from "../components/SearchView";
import {TextInput} from "react-native";
import {Picker} from "@react-native-community/picker";

const initReportsState = [
    {
        reportDetailsId: 1,
        reportDetailsDate: "2020-06-05",
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
        reportDetailsDate: "2020-03-20",
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
        reportDetailsDate: "2019-03-20",
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
            expect(args[1].reports).toEqual(initReportsState[0]);
        }
    },
    user: {
        currentUser: {username: "user", password: "password", token: 123123},
        loading: false,
        message: "",
    },
    reportsData: {
        projects: [{projectId: 1, projectName: "wtr lite"}],
        features: [{featureId: 43, featureName: "backend"}],
        tasks: [{taskId: 22, taskName: "testing"}],
        detailedTasks: [{detailedTaskId: 109, detailedTaskName: "reducer"}],
        locations: [{locationId: 22, location: "Brest"}, {locationId: 10, location: "Minsk"}],
        factors: [{factorId: 1, factorName: "Standard"}, {factorId: 12, factorName: "Day off"}],
        loading: false,
    },
    reports: {
        reports: initReportsState,
        loading: false,
        message: "",
    }

}

const test = renderer.create(<SearchView {...props}/>);
const root = test.root;
const instance = test.getInstance();

it("Test: get snapshot", () => {
    expect(test.toJSON()).toMatchSnapshot();
});

it("Test: set dates", () => {
    const [dateStart, dateEnd] = [...root.findAllByType(TextInput).map(el => el.instance)];
    expect(instance.state.dateStart).toEqual("");
    expect(instance.state.dateEnd).toEqual("");
    dateStart.props.onChange({nativeEvent: {text: "2020-01-05"}});
    dateEnd.props.onChange({nativeEvent: {text: "2020-10-05"}});
    expect(instance.state.dateStart).toEqual("2020-01-05");
    expect(instance.state.dateEnd).toEqual("2020-10-05");
});

it("Test: change select value", () => {
    const [project, feature, task, detailedTask, factor, location, status] =
        root.findAllByType(Picker).map(el => el._fiber.stateNode);
    expect(instance.state.projectId).toEqual("");
    expect(instance.state.featureId).toEqual("");
    expect(instance.state.taskId).toEqual("");
    expect(instance.state.detailedTaskId).toEqual("");
    expect(instance.state.factorId).toEqual("");
    expect(instance.state.locationId).toEqual("");
    expect(instance.state.status).toEqual("");
    project.props.onValueChange(1);
    feature.props.onValueChange(43);
    task.props.onValueChange(22)
    detailedTask.props.onValueChange(109)
    factor.props.onValueChange(10)
    location.props.onValueChange(1)
    status.props.onValueChange("PRIVATE");
    expect(instance.state.projectId).toEqual(1);
    expect(instance.state.featureId).toEqual(43);
    expect(instance.state.taskId).toEqual(22);
    expect(instance.state.detailedTaskId).toEqual(109);
    expect(instance.state.factorId).toEqual(10);
    expect(instance.state.locationId).toEqual(1);
    expect(instance.state.status).toEqual("PRIVATE");
});

it("Test: click search", async () => {
    global.fetch = jest.fn(() => {
        return new Promise(resolve => {
            resolve({
                json: () => {
                    return new Promise(resolve => {
                        resolve(initReportsState[0]);
                    });
                },
            });
        });
    });
    instance.onSearch();
});