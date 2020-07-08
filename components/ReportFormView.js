import React from "react";
import {Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView} from "react-native";
import {Picker} from '@react-native-community/picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";


class ReportFormView extends React.Component {
    state = {
        currentReport: {},
    }

    componentDidMount() {
        this.setState({
            currentReport: this.props.arrWithReports[this.props.currentReport].report,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.currentReport !== prevProps.currentReport) {
            this.setState({
                currentReport: this.props.arrWithReports[this.props.currentReport].report,
            });
        }
    }

    render() {
        return (
            <>
                <ScrollView>
                    {Object.keys(this.state.currentReport).length !== 0 ? (
                        <View style={{flexDirection: "column", justifyContent: "center"}}>
                            <View style={{marginLeft: wp(5), marginTop: hp(2)}}>
                                <Text style={{fontSize: hp(1.8), color: "#616161"}}>
                                    Status: {this.props.arrWithReports[this.props.currentReport].method === "POST"
                                    ? "NEW" : this.props.arrWithReports[this.props.currentReport].report.status}
                                </Text>
                            </View>
                            <View style={styles.selectItem}>
                                    <Picker
                                        selectedValue={this.state.currentReport.project === null ? null
                                            : this.state.currentReport.project.projectId}
                                        onValueChange={(itemValue) =>
                                            this.props.onChooseProject(itemValue)
                                        }>
                                        <Picker.Item label="Select a project..." value={null} />
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
                                    selectedValue={this.state.currentReport.feature === null ? null
                                        : this.state.currentReport.feature.featureId}
                                    onValueChange={(itemValue) =>
                                        this.props.onChooseFeature(itemValue)
                                    }>
                                    <Picker.Item label="Select a feature..." value={null} />
                                    {this.state.currentReport.project === null ? [] :
                                        this.props.reportsData.features
                                            .filter(feature =>
                                                feature.projectId === this.state.currentReport.project.projectId)
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
                                    selectedValue={this.state.currentReport.task === null ? null
                                        : this.state.currentReport.task.taskId}
                                    onValueChange={(itemValue) =>
                                        this.props.onChooseTask(itemValue)
                                    }>
                                    <Picker.Item label="Select a task..." value={null} />
                                    {this.state.currentReport.feature === null ? [] :
                                        this.props.reportsData.tasks
                                            .filter(task =>
                                                task.featureId === this.state.currentReport.feature.featureId)
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
                                    selectedValue={this.state.currentReport.detailedTask === null ? null
                                        : this.state.currentReport.detailedTask.detailedTaskId}
                                    onValueChange={(itemValue) =>
                                        this.props.onChooseDetailedTask(itemValue)
                                    }>
                                    <Picker.Item label="Select a detailed task..." value={null} />
                                    {this.state.currentReport.task === null ? [] :
                                        this.props.reportsData.detailedTasks
                                            .filter(detailedTask =>
                                                detailedTask.taskId === this.state.currentReport.task.taskId)
                                            .map(detailedTask => {
                                                return <Picker.Item
                                                    key={detailedTask.detailedTaskId}
                                                    label={detailedTask.detailedTaskName}
                                                    value={detailedTask.detailedTaskId}/>
                                            })}
                                </Picker>
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "space-between", marginLeft: wp(5), marginRight: wp(5)}}>
                                <Text style={[styles.text, {marginLeft: wp(2)}]}>
                                    Hours
                                </Text>
                                <TextInput
                                    style={styles.inputField}
                                    value={this.props.arrWithReports[this.props.currentReport].report.hours.toString()}
                                    onChange={text => this.props.onChangeHours(text)}
                                />
                                <Text style={[styles.text]}>
                                    Work Units
                                </Text>
                                <TextInput
                                    style={styles.inputField}
                                    value={this.props.arrWithReports[this.props.currentReport].report.workUnits.toString()}
                                    onChange={text => this.props.onChangeWorkUnits(text)}
                                />
                            </View>
                            <View style={styles.selectItem}>
                                <Picker
                                    selectedValue={this.state.currentReport.factor === null ? null
                                        : this.state.currentReport.factor.factorId}
                                    onValueChange={(itemValue) =>
                                        this.props.onChooseFactor(itemValue)
                                    }>
                                    <Picker.Item label="Select a factor..." value={null} />
                                    {this.props.reportsData.factors
                                            .map(factor => {
                                                return <Picker.Item
                                                    key={factor.factorId}
                                                    label={factor.factorName}
                                                    value={factor.factorId}/>
                                            })}
                                </Picker>
                            </View>
                            <View style={styles.commentsView}>
                                <Text style={[styles.text, {marginTop: hp(0.5)}]}>
                                    Comments
                                </Text>
                            </View>
                            <View style={styles.commentsView}>
                                <TextInput
                                    style={styles.inputCommentsField}
                                    multiline={true}
                                    value={this.props.arrWithReports[this.props.currentReport].report.comments}
                                    onChange={text => this.props.onChangeComments(text)}
                                />
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "center"}}>
                                <Text style={{color: "red"}}>
                                    {this.props.message}
                                </Text>
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "center"}}>
                                <TouchableOpacity
                                    style={[styles.button,
                                        {backgroundColor: this.props.arrWithReports.length === 1 ? "rgba(255,0,0,0.29)" : "red"}
                                        ]}
                                    onPress={this.props.onDeleteReport}
                                    disabled={this.props.arrWithReports.length === 1}
                                >
                                    <Text style={{fontSize: hp(2.8), marginTop: hp(1.5), color: "white"}}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : <Text/>}
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    buttonBack: {
        margin: wp(2),
        width: wp(20)
    },
    text: {
        fontSize: hp(2.3),
        marginTop: hp(3)
    },
    selectItem: {
        borderBottomWidth: wp(0.3),
        marginLeft: wp(5),
        marginRight: wp(5),
        borderColor: "lightblue"
    },
    inputField: {
        width: wp(25),
        height: hp(6),
        fontSize: hp(1.7),
        borderColor: 'lightblue',
        borderWidth: wp(0.5),
        borderRadius: hp(2),
        marginTop: hp(2),
    },
    inputCommentsField: {
        width: wp(93),
        height: hp(20),
        fontSize: hp(1.7),
        borderColor: 'lightblue',
        borderWidth: wp(0.5),
        borderRadius: hp(2),
    },
    blockWithHours: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: hp(2),
        marginRight: wp(5),
        marginLeft: wp(5),
    },
    commentsView: {
        flexDirection: "row",
        justifyContent: "center",
        marginLeft: wp(5),
        marginRight: wp(5),
        marginTop: hp(1.5),
    },
    button: {
        width: wp(40),
        height: hp(7),
        margin: wp(2),
        borderRadius: hp(2),
        flexDirection: "row",
        justifyContent: "center"
    }
})

export default ReportFormView;