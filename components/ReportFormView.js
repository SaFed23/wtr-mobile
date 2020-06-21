import React from "react";
import {Text, TouchableOpacity, View, StyleSheet, ActivityIndicator} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from 'react-native-picker-select';


class ReportFormView extends React.Component {
    state = {
        project: null,
        feature: null,
        task: null,
        detailedTasks: null,
        location: null,
        factor: null,
    }

    componentDidMount() {
        this.props.getReportsData(this.props.user.currentUser.token);
    }

    onChooseProject = (value) => {
        if(value !== null) {
            this.setState({
                project: value,
                feature: null,
                task: null,
                detailedTasks: null,
            })
        }
    }

    onChooseFeature = (value) => {
        if(value !== null) {
            this.setState({
                feature: value,
                task: null,
                detailedTasks: null,
            })
        }
    }

    onChooseTask = (value) => {
        if(value !== null) {
            this.setState({
                task: value,
                detailedTasks: null,
            })
        }
    }

    onChooseDetailedTask = (value) => {
        if(value !== null) {
            this.setState({
                detailedTask: value,
            })
        }
    }

    onChooseLocation = (value) => {
        if(value !== null) {
            this.setState({
                location: value,
            })
        }
    }

    onChooseFactor = (value) => {
        if(value !== null) {
            this.setState({
                factor: value,
            })
        }
    }

    render() {
        return (
            <>
                <TouchableOpacity style={styles.buttonBack}
                                  onPress={() => {this.props.navigation.goBack()}}>
                    <View style={{flexDirection: "row"}}>
                        <Icon name={"angle-left"} size={30}/>
                        <Text style={{fontSize: 23, marginLeft: "5%"}}>Back</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{fontSize: 23}}>
                        Report for {this.props.params.date}
                    </Text>
                </View>
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large"
                                       color="lightblue"
                                       animating={this.props.reportsData.loading}/>
                </View>
                <View style={{flexDirection: "column", justifyContent: "center"}}>
                    <View style={{borderBottomWidth: 1, marginLeft: "5%", marginRight: "5%", borderColor: "lightblue"}}>
                        <RNPickerSelect
                            default
                            onValueChange={(value) => {this.onChooseProject(value)}}
                            placeholder={{label: "Select a project...", value: null}}
                            style={{placeholder: {color: "black"}}}
                            items={this.props.reportsData.projects.map(project => {
                                return {
                                    label: project.projectName,
                                    value: project.projectId,
                                }
                            })}
                        />
                    </View>
                    <View style={styles.selectItem}>
                        <RNPickerSelect
                            onValueChange={(value) => {this.onChooseFeature(value)}}
                            placeholder={{label: "Select a feature...", value: null}}
                            style={{placeholder: {color: "black"}}}
                            items={this.state.project === null ? [] :
                                this.props.reportsData.features
                                    .filter(feature => feature.projectId === this.state.project)
                                    .map(feature => {
                                        return {
                                            label: feature.featureName,
                                            value: feature.featureId,
                                        }
                                    })}
                        />
                    </View>
                    <View style={styles.selectItem}>
                        <RNPickerSelect
                            onValueChange={(value) => {this.onChooseTask(value)}}
                            placeholder={{label: "Select a task...", value: null}}
                            style={{placeholder: {color: "black"}}}
                            items={this.state.feature === null ? [] :
                                this.props.reportsData.tasks
                                    .filter(task => task.featureId === this.state.feature)
                                    .map(task => {
                                        return {
                                            label: task.taskName,
                                            value: task.taskId,
                                        }
                                    })}
                        />
                    </View>
                    <View style={styles.selectItem}>
                        <RNPickerSelect
                            onValueChange={(value) => {this.onChooseDetailedTask(value)}}
                            placeholder={{label: "Select a detailed task...", value: null}}
                            style={{placeholder: {color: "black"}}}
                            items={this.state.task === null ? [] :
                                this.props.reportsData.detailedTasks
                                    .filter(detailedTask => detailedTask.taskId === this.state.task)
                                    .map(detailedTask => {
                                        return {
                                            label: detailedTask.detailedTaskName,
                                            value: detailedTask.detailedTaskId,
                                        }
                                    })}
                        />
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: "7%"}}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{fontSize: 20, marginTop: "5%"}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: "7%"}}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{fontSize: 20, marginTop: "5%"}}>Submit as private</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    buttonBack: {
        margin: "2%",
        width: "20%"
    },
    text: {
        fontSize: 20,
        marginRight: "2%"
    },
    selectItem: {
        borderBottomWidth: 1,
        marginLeft: "5%",
        marginRight: "5%",
        borderColor: "lightblue"
    }
})

export default ReportFormView;