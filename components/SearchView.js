import React from "react";
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Picker} from "@react-native-community/picker";

class SearchView extends React.Component {
    render() {
        return (
            <>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{fontSize: 20}}>Searching</Text>
                </View>
                    {/*TODO searching form*/}
                    {/*<ScrollView>*/}
                    {/*    {Object.keys(this.state.currentReport).length !== 0 ? (*/}
                    {/*        <View style={{flexDirection: "column", justifyContent: "center"}}>*/}
                    {/*            <View style={{marginLeft: "5%", marginTop: "3%"}}>*/}
                    {/*                <Text style={{fontSize: 14, color: "#616161"}}>*/}
                    {/*                    Status: {this.props.arrWithReports[this.props.currentReport].method === "POST"*/}
                    {/*                    ? "NEW" : this.props.arrWithReports[this.props.currentReport].report.status}*/}
                    {/*                </Text>*/}
                    {/*            </View>*/}
                    {/*            <View style={{borderBottomWidth: 1, marginLeft: "5%", marginRight: "5%", borderColor: "lightblue"}}>*/}
                    {/*                <Picker*/}
                    {/*                    selectedValue={this.state.currentReport.project === null ? null*/}
                    {/*                        : this.state.currentReport.project.projectId}*/}
                    {/*                    onValueChange={(itemValue, itemIndex) =>*/}
                    {/*                        this.props.onChooseProject(itemValue)*/}
                    {/*                    }>*/}
                    {/*                    <Picker.Item label="Select a project..." value={null} />*/}
                    {/*                    {this.props.reportsData.projects.map(project => {*/}
                    {/*                        return <Picker.Item*/}
                    {/*                            key={project.projectId}*/}
                    {/*                            label={project.projectName}*/}
                    {/*                            value={project.projectId} />*/}
                    {/*                    })}*/}
                    {/*                </Picker>*/}
                    {/*            </View>*/}
                    {/*            <View style={styles.selectItem}>*/}
                    {/*                <Picker*/}
                    {/*                    selectedValue={this.state.currentReport.feature === null ? null*/}
                    {/*                        : this.state.currentReport.feature.featureId}*/}
                    {/*                    onValueChange={(itemValue, itemIndex) =>*/}
                    {/*                        this.props.onChooseFeature(itemValue)*/}
                    {/*                    }>*/}
                    {/*                    <Picker.Item label="Select a feature..." value={null} />*/}
                    {/*                    {this.state.currentReport.project === null ? [] :*/}
                    {/*                        this.props.reportsData.features*/}
                    {/*                            .filter(feature =>*/}
                    {/*                                feature.projectId === this.state.currentReport.project.projectId)*/}
                    {/*                            .map(feature => {*/}
                    {/*                                return <Picker.Item*/}
                    {/*                                    key={feature.featureId}*/}
                    {/*                                    label={feature.featureName}*/}
                    {/*                                    value={feature.featureId}/>*/}
                    {/*                            })}*/}
                    {/*                </Picker>*/}
                    {/*            </View>*/}
                    {/*            <View style={styles.selectItem}>*/}
                    {/*                <Picker*/}
                    {/*                    selectedValue={this.state.currentReport.task === null ? null*/}
                    {/*                        : this.state.currentReport.task.taskId}*/}
                    {/*                    onValueChange={(itemValue, itemIndex) =>*/}
                    {/*                        this.props.onChooseTask(itemValue)*/}
                    {/*                    }>*/}
                    {/*                    <Picker.Item label="Select a task..." value={null} />*/}
                    {/*                    {this.state.currentReport.feature === null ? [] :*/}
                    {/*                        this.props.reportsData.tasks*/}
                    {/*                            .filter(task =>*/}
                    {/*                                task.featureId === this.state.currentReport.feature.featureId)*/}
                    {/*                            .map(task => {*/}
                    {/*                                return <Picker.Item*/}
                    {/*                                    key={task.taskId}*/}
                    {/*                                    label={task.taskName}*/}
                    {/*                                    value={task.taskId}/>*/}
                    {/*                            })}*/}
                    {/*                </Picker>*/}
                    {/*            </View>*/}
                    {/*            <View style={styles.selectItem}>*/}
                    {/*                <Picker*/}
                    {/*                    selectedValue={this.state.currentReport.detailedTask === null ? null*/}
                    {/*                        : this.state.currentReport.detailedTask.detailedTaskId}*/}
                    {/*                    onValueChange={(itemValue, itemIndex) =>*/}
                    {/*                        this.props.onChooseDetailedTask(itemValue)*/}
                    {/*                    }>*/}
                    {/*                    <Picker.Item label="Select a detailed task..." value={null} />*/}
                    {/*                    {this.state.currentReport.task === null ? [] :*/}
                    {/*                        this.props.reportsData.detailedTasks*/}
                    {/*                            .filter(detailedTask =>*/}
                    {/*                                detailedTask.taskId === this.state.currentReport.task.taskId)*/}
                    {/*                            .map(detailedTask => {*/}
                    {/*                                return <Picker.Item*/}
                    {/*                                    key={detailedTask.detailedTaskId}*/}
                    {/*                                    label={detailedTask.detailedTaskName}*/}
                    {/*                                    value={detailedTask.detailedTaskId}/>*/}
                    {/*                            })}*/}
                    {/*                </Picker>*/}
                    {/*            </View>*/}
                    {/*            <View style={{flexDirection: "row", justifyContent: "space-between", marginLeft: "5%", marginRight: "5%"}}>*/}
                    {/*                <Text style={[styles.text, {marginLeft: "2%"}]}>*/}
                    {/*                    Hours*/}
                    {/*                </Text>*/}
                    {/*                <TextInput*/}
                    {/*                    style={styles.inputField}*/}
                    {/*                    value={this.props.arrWithReports[this.props.currentReport].report.hours.toString()}*/}
                    {/*                    onChange={text => this.props.onChangeHours(text)}*/}
                    {/*                />*/}
                    {/*                <Text style={[styles.text]}>*/}
                    {/*                    Work Units*/}
                    {/*                </Text>*/}
                    {/*                <TextInput*/}
                    {/*                    style={styles.inputField}*/}
                    {/*                    value={this.props.arrWithReports[this.props.currentReport].report.workUnits.toString()}*/}
                    {/*                    onChange={text => this.props.onChangeWorkUnits(text)}*/}
                    {/*                />*/}
                    {/*            </View>*/}
                    {/*            <View style={styles.selectItem}>*/}
                    {/*                <Picker*/}
                    {/*                    selectedValue={this.state.currentReport.factor === null ? null*/}
                    {/*                        : this.state.currentReport.factor.factorId}*/}
                    {/*                    onValueChange={(itemValue, itemIndex) =>*/}
                    {/*                        this.props.onChooseFactor(itemValue)*/}
                    {/*                    }>*/}
                    {/*                    <Picker.Item label="Select a factor..." value={null} />*/}
                    {/*                    {this.props.reportsData.factors*/}
                    {/*                        .map(factor => {*/}
                    {/*                            return <Picker.Item*/}
                    {/*                                key={factor.factorId}*/}
                    {/*                                label={factor.factorName}*/}
                    {/*                                value={factor.factorId}/>*/}
                    {/*                        })}*/}
                    {/*                </Picker>*/}
                    {/*            </View>*/}
                    {/*            <View style={styles.commentsView}>*/}
                    {/*                <Text style={[styles.text, {marginTop: "1%"}]}>*/}
                    {/*                    Comments*/}
                    {/*                </Text>*/}
                    {/*            </View>*/}
                    {/*            <View style={styles.commentsView}>*/}
                    {/*                <TextInput*/}
                    {/*                    style={styles.inputCommentsField}*/}
                    {/*                    multiline={true}*/}
                    {/*                    value={this.props.arrWithReports[this.props.currentReport].report.comments}*/}
                    {/*                    onChange={text => this.props.onChangeComments(text)}*/}
                    {/*                />*/}
                    {/*            </View>*/}
                    {/*            <View style={{flexDirection: "row", justifyContent: "center"}}>*/}
                    {/*                <Text style={{color: "red"}}>*/}
                    {/*                    {this.props.message}*/}
                    {/*                </Text>*/}
                    {/*            </View>*/}
                    {/*            <View style={{flexDirection: "row", justifyContent: "center"}}>*/}
                    {/*                <TouchableOpacity*/}
                    {/*                    style={[styles.button,*/}
                    {/*                        {backgroundColor: this.props.arrWithReports.length === 1 ? "rgba(255,0,0,0.29)" : "red"}*/}
                    {/*                    ]}*/}
                    {/*                    onPress={this.props.onDeleteReport}*/}
                    {/*                    disabled={this.props.arrWithReports.length === 1}*/}
                    {/*                >*/}
                    {/*                    <Text style={{fontSize: 20, marginTop: "5%", color: "white"}}>Delete</Text>*/}
                    {/*                </TouchableOpacity>*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*    ) : <Text/>}*/}
                    {/*</ScrollView>*/}
            </>
        );
    }
}

export default SearchView;