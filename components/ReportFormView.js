import React from "react";
import {Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, TextInput, ScrollView} from "react-native";
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
        hours: "0",
        workUnits: "0",
        comment: "",
    }

    componentDidMount() {
        this.props.getReportsData(this.props.user.currentUser.token);
        if(new Date(this.props.params.date).getDay() !== 0
            && new Date(this.props.params.date).getDay() !== 6){
            this.setState({
                hours: "8",
            })
        }
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

    onChangeHours = text => {
        this.setState({
            hours: text.nativeEvent.text,
        });
    }

    onChangeWorkUnits = text => {
        this.setState({
            workUnits: text.nativeEvent.text,
        })
    }

    onChangeComment = text => {
        this.setState({
            comment: text.nativeEvent.text,
        })
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
                <ScrollView>
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
                    <View style={styles.blockWithHours}>
                        <Text style={[styles.text, {marginLeft: "15%"}]}>
                            Hours
                        </Text>
                        <Text style={[styles.text, {marginRight: "15%"}]}>
                            Work Units
                        </Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginLeft: "5%", marginRight: "5%"}}>
                        <TextInput
                            style={styles.inputField}
                            value={this.state.hours}
                            onChange={text => this.onChangeHours(text)}
                        />
                        <TextInput
                            style={styles.inputField}
                            value={this.state.workUnits}
                            onChange={text => this.onChangeWorkUnits(text)}
                        />
                    </View>
                    <View style={styles.selectItem}>
                        <RNPickerSelect
                            onValueChange={(value) => {this.onChooseLocation(value)}}
                            placeholder={{label: "Select a location...", value: null}}
                            style={{placeholder: {color: "black"}}}
                            items={this.props.reportsData.locations
                                    .map(location => {
                                        return {
                                            label: location.locationName,
                                            value: location.locationId,
                                        }
                                    })}
                        />
                    </View>
                    <View style={styles.selectItem}>
                        <RNPickerSelect
                            onValueChange={(value) => {this.onChooseFactor(value)}}
                            placeholder={{label: "Select a factor...", value: null}}
                            style={{placeholder: {color: "black"}}}
                            items={this.props.reportsData.factors
                                .map(factor => {
                                    return {
                                        label: factor.factorName,
                                        value: factor.factorId,
                                    }
                                })}
                        />
                    </View>
                    <View style={styles.commentView}>
                        <Text style={styles.text}>
                            Comment
                        </Text>
                    </View>
                    <View style={styles.commentView}>
                        <TextInput
                            style={styles.inputCommentField}
                            multiline={true}
                            value={this.state.comment}
                            onChange={text => this.onChangeComment(text)}
                        />
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: "7%"}}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "lightgreen"}]}>
                            <Text style={{fontSize: 20, marginTop: "5%"}}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "lightgray"}]}>
                            <Text style={{fontSize: 20, marginTop: "5%"}}>Submit as private</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
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
        fontSize: 17,
    },
    selectItem: {
        borderBottomWidth: 1,
        marginLeft: "5%",
        marginRight: "5%",
        borderColor: "lightblue"
    },
    inputField: {
        width: 180,
        height: 40,
        borderColor: 'lightblue',
        borderWidth: 2,
        borderRadius: 10
    },
    inputCommentField: {
        width: "100%",
        height: 120,
        borderColor: 'lightblue',
        borderWidth: 2,
        borderRadius: 10
    },
    blockWithHours: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5%",
        marginRight: "5%",
        marginLeft: "5%"
    },
    commentView: {
        flexDirection: "row",
        justifyContent: "center",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "3%"
    },
    button: {
        width: 180,
        height: 50,
        margin: "2%",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center"
    }
})

export default ReportFormView;