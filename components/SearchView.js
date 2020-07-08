import React from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Picker} from "@react-native-community/picker";
import {searchReportDetail} from "../routes/reportDetailsRoutes";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

class SearchView extends React.Component {
    state = {
        dateStart: "",
        dateEnd: "",
        projectId: "",
        featureId: "",
        taskId: "",
        detailedTaskId: "",
        factorId: "",
        locationId: "",
        status: "",
    }

    onChooseProject = (value) => {
        this.setState({
            projectId: value
        });
    }

    onChooseFeature = (value) => {
        this.setState({
            featureId: value
        });
    }

    onChooseTask = (value) => {
        this.setState({
            taskId: value
        });
    }

    onChooseDetailedTask = (value) => {
        this.setState({
            detailedTaskId: value
        });
    }

    onChooseFactor = (value) => {
        this.setState({
            factorId: value
        });
    }

    onChooseLocation = (value) => {
        this.setState({
            locationId: value
        });
    }

    onChooseStatus = (value) => {
        this.setState({
            status: value
        });
    }

    onChangeStartDate = text => {
        this.setState({
            dateStart: text.nativeEvent.text,
        });
    }

    onChangeEndDate = text => {
        this.setState({
            dateEnd: text.nativeEvent.text,
        });
    }

    onSearch = () => {
        searchReportDetail(this.state, this.props.user.currentUser.token)
            .then(res => res.json())
            .then(data => this.props.navigation.navigate("SearchResult", {reports: data}));
    }

    render() {
        return (
            <>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: hp(1)}}>
                    <Text style={{fontSize: hp(2.5)}}>Searching</Text>
                </View>
                <ScrollView>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginLeft: wp(4), marginRight: wp(4)}}>
                        <Text style={[styles.text, {marginLeft: wp(12)}]}>
                            Start date
                        </Text>
                        <Text style={[styles.text, {marginRight: wp(15)}]}>
                            End date
                        </Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginLeft: wp(4), marginRight: wp(4)}}>
                        <TextInput
                            style={styles.inputField}
                            value={this.state.dateStart}
                            onChange={text => this.onChangeStartDate(text)}
                        />
                        <TextInput
                            style={styles.inputField}
                            value={this.state.dateEnd}
                            onChange={text => this.onChangeEndDate(text)}
                        />
                    </View>
                    <View style={{borderBottomWidth: 1, marginLeft: wp(4), marginRight: wp(4), borderColor: "lightblue"}}>
                        <Picker
                            selectedValue={this.state.projectId}
                            onValueChange={(itemValue) =>
                                this.onChooseProject(itemValue)
                        }>
                            <Picker.Item label="Select a project..." value={""} />
                            {this.props.reportsData.projects.map(project => {
                                return <Picker.Item
                                    key={project.projectId}
                                    label={project.projectName}
                                    value={project.projectId} />
                            })}
                        </Picker>
                    </View>
                    <View style={styles.selectItem}>
                        <Picker
                            selectedValue={this.state.featureId}
                            onValueChange={(itemValue) =>
                                this.onChooseFeature(itemValue)
                            }>
                            <Picker.Item label="Select a feature..." value={""} />
                            {this.props.reportsData.features
                                    .map(feature => {
                                        return <Picker.Item
                                            key={feature.featureId}
                                            label={feature.featureName}
                                            value={feature.featureId}/>
                                    })}
                        </Picker>
                    </View>
                    <View style={styles.selectItem}>
                        <Picker
                            selectedValue={this.state.taskId}
                            onValueChange={(itemValue) =>
                                this.onChooseTask(itemValue)
                            }>
                            <Picker.Item label="Select a task..." value={""} />
                            {this.props.reportsData.tasks
                                    .map(task => {
                                        return <Picker.Item
                                            key={task.taskId}
                                            label={task.taskName}
                                            value={task.taskId}/>
                                    })}
                        </Picker>
                    </View>
                    <View style={styles.selectItem}>
                        <Picker
                            selectedValue={this.state.detailedTaskId}
                            onValueChange={(itemValue) =>
                                this.onChooseDetailedTask(itemValue)
                            }>
                            <Picker.Item label="Select a detailed task..." value={""} />
                            {this.props.reportsData.detailedTasks
                                    .map(detailedTask => {
                                        return <Picker.Item
                                            key={detailedTask.detailedTaskId}
                                            label={detailedTask.detailedTaskName}
                                            value={detailedTask.detailedTaskId}/>
                                    })}
                        </Picker>
                    </View>
                    <View style={styles.selectItem}>
                        <Picker
                            selectedValue={this.state.factorId}
                            onValueChange={(itemValue) =>
                                this.onChooseFactor(itemValue)
                            }>
                            <Picker.Item label="Select a factor..." value={""} />
                            {this.props.reportsData.factors
                                .map(factor => {
                                    return <Picker.Item
                                        key={factor.factorId}
                                        label={factor.factorName}
                                        value={factor.factorId}/>
                                })}
                        </Picker>
                    </View>
                    <View style={styles.selectItem}>
                        <Picker
                            selectedValue={this.state.locationId}
                            onValueChange={(itemValue) =>
                                this.onChooseLocation(itemValue)
                            }>
                            <Picker.Item label="Select a location..." value={""} />
                            {this.props.reportsData.locations
                                .map(location => {
                                    return <Picker.Item
                                        key={location.locationId}
                                        label={location.locationName}
                                        value={location.locationId}/>
                                })}
                        </Picker>
                    </View>
                    <View style={styles.selectItem}>
                        <Picker
                            selectedValue={this.state.status}
                            onValueChange={(itemValue) =>
                                this.onChooseStatus(itemValue)
                            }>
                            <Picker.Item label="Select a status..." value={""} />
                            <Picker.Item label="Private" value={"PRIVATE"} />
                            <Picker.Item label="Rejected" value={"REJECTED"} />
                            <Picker.Item label="Approved" value={"APPROVED"} />
                            <Picker.Item label="Registered" value={"REGISTERED"} />
                        </Picker>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: "2%"}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onSearch}
                        >
                            <Text style={{fontSize: hp(3), marginTop: hp(1.2), color: "white"}}>Search</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: hp(2.3),
        marginTop: hp(2),
    },
    selectItem: {
        borderBottomWidth: wp(0.3),
        marginLeft: wp(4),
        marginRight: wp(4),
        borderColor: "lightblue"
    },
    inputField: {
        width: wp(43),
        height: hp(6),
        fontSize: hp(1.7),
        borderColor: 'lightblue',
        borderWidth: wp(0.5),
        borderRadius: hp(2),
        marginTop: hp(1),
    },
    button: {
        width: wp(43),
        height: hp(7),
        margin: wp(3),
        borderRadius: hp(2),
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "lightgreen"
    }
});

export default SearchView;