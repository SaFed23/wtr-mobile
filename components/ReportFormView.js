import React from "react";
import {Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, TextInput, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from 'react-native-picker-select';


class ReportFormView extends React.Component {
    state = {
        project: null,
        feature: null,
        task: null,
        detailedTask: null,
        factor: null,
        hours: "0",
        workUnits: "0",
        comments: "",
        message: "",
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.reports.reports.length !== prevProps.reports.reports.length){
            this.props.navigation.goBack();
        }
    }

    onChooseProject = (value) => {
        if(value !== null) {
            this.setState({
                project: value,
                feature: null,
                task: null,
                detailedTask: null,
            })
        }
    }

    onChooseFeature = (value) => {
        if(value !== null) {
            this.setState({
                feature: value,
                task: null,
                detailedTask: null,
            })
        }
    }

    onChooseTask = (value) => {
        if(value !== null) {
            this.setState({
                task: value,
                detailedTask: null,
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

    onChangeComments = text => {
        this.setState({
            comments: text.nativeEvent.text,
        })
    }

    onSubmit = (status) => {
        if(this.state.project === null) {
            this.setState({message: "Project not selected!"})
        } else if(this.state.feature === null) {
            this.setState({message: "Feature not selected!"})
        } else if(this.state.task === null) {
            this.setState({message: "Task not selected!"})
        } else if(this.state.detailedTask === null) {
            this.setState({message: "Detailed task not selected!"})
        } else if(this.props.user.location === null) {
            this.setState({message: "Location not selected!"})
        } else if(this.state.factor === null) {
            this.setState({message: "Factor not selected!"})
        } else {
            const report = {
                project: this.props.reportsData.projects
                    .find(project => project.projectId === +this.state.project),
                feature: this.props.reportsData.features
                    .find(feature => feature.featureId === +this.state.feature),
                task: this.props.reportsData.tasks
                    .find(task => task.taskId === +this.state.task),
                detailedTask: this.props.reportsData.detailedTasks
                    .find(detailedTask => detailedTask.detailedTaskId === +this.state.detailedTask),
                location: this.props.user.location,
                factor: this.props.reportsData.factors
                    .find(factor => factor.factorId === +this.state.factor),
                hours: +this.state.hours,
                workUnits: +this.state.workUnits,
                comments: this.state.comments,
                reportDetailsDate: this.props.params.date,
                status
            };
            this.props.saveReport(report, this.props.reports.reports, this.props.user.currentUser.token);
        }
    }

    render() {
        return (
            <>
                {/*<TouchableOpacity style={styles.buttonBack}*/}
                {/*                  onPress={() => {this.props.navigation.goBack()}}>*/}
                {/*    <View style={{flexDirection: "row"}}>*/}
                {/*        <Icon name={"angle-left"} size={30}/>*/}
                {/*        <Text style={{fontSize: 23, marginLeft: "5%"}}>Back</Text>*/}
                {/*    </View>*/}
                {/*</TouchableOpacity>*/}
                {/*<View style={{flexDirection: "row", justifyContent: "center"}}>*/}
                {/*    <Text style={{fontSize: 23}}>*/}
                {/*        Report for {this.props.params.date}*/}
                {/*    </Text>*/}
                {/*</View>*/}
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
                    <View style={styles.commentsView}>
                        <Text style={styles.text}>
                            Comments
                        </Text>
                    </View>
                    <View style={styles.commentsView}>
                        <TextInput
                            style={styles.inputCommentsField}
                            multiline={true}
                            value={this.state.comments}
                            onChange={text => this.onChangeComments(text)}
                        />
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <Text style={{color: "red"}}>
                            {this.state.message}
                        </Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: "7%"}}>
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: "lightgreen"}]}
                            onPress={this.onSubmit.bind(this, "REGISTERED")}
                        >
                            <Text style={{fontSize: 20, marginTop: "5%"}}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: "lightgray"}]}
                            onPress={this.onSubmit.bind(this, "PRIVATE")}
                        >
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
    inputCommentsField: {
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
    commentsView: {
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