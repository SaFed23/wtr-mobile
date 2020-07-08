import React from "react";
import GestureRecognizer from 'react-native-swipe-gestures';
import {StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ReportFormView from "./ReportFormView";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

class AllReportFormsView extends React.Component {
    state = {
        arrWithReports: [],
        currentReport: 0,
        message: "",
    }

    componentDidMount() {
        const reports = this.props.reports;
        if(reports.length === 0) {
            let hours = 0;
            if(new Date(this.props.date).getDay() !== 0
                && new Date(this.props.date).getDay() !== 6){
                hours = 8;
            }
            this.setState({
                arrWithReports: [{method: "POST", report: {
                        project: null,
                        feature: null,
                        task: null,
                        detailedTask: null,
                        factor: null,
                        hours: hours,
                        workUnits: "0",
                        comments: "",
                        message: "",
                    }}],
            });
        } else {
            this.setState({
                arrWithReports: reports.map(report => {return {method: "PUT", report}}),
            });
        }
    }

    onSwipeLeft = () => {
        if (this.state.currentReport < this.state.arrWithReports.length - 1) {
            this.setState({
                currentReport: this.state.currentReport + 1
            });
        }
    }

    onSwipeRight = () => {
        if (this.state.currentReport > 0) {
            this.setState({
                currentReport: this.state.currentReport - 1
            });
        }
    }

    onAddReport = () => {
        let hours = 0;
        if(new Date(this.props.date).getDay() !== 0
            && new Date(this.props.date).getDay() !== 6){
            hours = 8;
        }
        this.setState({
            arrWithReports: [...this.state.arrWithReports,
                {method: "POST", report: {
                        project: null,
                        feature: null,
                        task: null,
                        detailedTask: null,
                        factor: null,
                        hours: hours,
                        workUnits: "0",
                        comments: "",
                        message: "",
                    }}],
        })
    }

    onDeleteReport = () => {
        this.setState({
            arrWithReports: this.state.arrWithReports
                .filter((report, index) => index !== this.state.currentReport),
            currentReport: this.state.currentReport !== 0 ? this.state.currentReport - 1 : this.state.currentReport,
        })
    }

    setReportInState = report => {
        const updatedArr = this.state.arrWithReports;
        updatedArr[this.state.currentReport] = report;
        this.setState({
            arrWithReports: updatedArr,
        });
    }

    onChooseProject = (value) => {
        const report = this.state.arrWithReports[this.state.currentReport];
        report.report.project = this.props.reportsData.projects
            .find(project => project.projectId === +value);
        report.report.feature = null;
        report.report.task = null;
        report.report.detailedTask = null;
        this.setReportInState(report);
    }

    onChooseFeature = (value) => {
        const report = this.state.arrWithReports[this.state.currentReport];
        report.report.feature = this.props.reportsData.features
            .find(feature => feature.featureId === +value);
        report.report.task = null;
        report.report.detailedTask = null;
        this.setReportInState(report)
    }

    onChooseTask = (value) => {
        const report = this.state.arrWithReports[this.state.currentReport];
        report.report.task = this.props.reportsData.tasks
            .find(task => task.taskId === +value);
        report.report.detailedTask = null;
        this.setReportInState(report)
    }

    onChooseDetailedTask = (value) => {
        const report = this.state.arrWithReports[this.state.currentReport];
        report.report.detailedTask = this.props.reportsData.detailedTasks
            .find(detailedTask => detailedTask.detailedTaskId === +value);
        this.setReportInState(report)
    }

    onChooseFactor = (value) => {
        const report = this.state.arrWithReports[this.state.currentReport];
        report.report.factor = this.props.reportsData.factors
            .find(factor => factor.factorId === +value);
        this.setReportInState(report)
    }

    onChangeHours = text => {
        const updatedArr = this.state.arrWithReports;
        const report = this.state.arrWithReports[this.state.currentReport];
        report.report.hours = text.nativeEvent.text;
        updatedArr[this.state.currentReport] = report;
        this.setState({
            arrWithReports: updatedArr,
        });
    }

    onChangeWorkUnits = text => {
        const updatedArr = this.state.arrWithReports;
        const report = this.state.arrWithReports[this.state.currentReport];
        report.report.workUnits = text.nativeEvent.text;
        updatedArr[this.state.currentReport] = report;
        this.setState({
            arrWithReports: updatedArr,
        });
    }

    onChangeComments = text => {
        const updatedArr = this.state.arrWithReports;
        updatedArr[this.state.currentReport].report.comments = text.nativeEvent.text;
        this.setState({
            arrWithReports: updatedArr,
        });
    }

    onSubmit = (status) => {
        let index;
        index = this.state.arrWithReports.findIndex(report => {
            return (
                this.props.user.location === null
            )
        });
        if(index !== -1) {
            this.setState({message: `Select a location in your account settings`})
        } else {
            index = this.state.arrWithReports.findIndex(report => {
                return (
                    report.report.project === null ||
                    report.report.feature === null ||
                    report.report.task === null ||
                    report.report.detailedTask === null ||
                    report.report.factor === null
                )
            });
            if(index !== - 1) {
                this.setState({message: `Something is wrong in the ${index + 1} report!`})
            } else {
                const updatesReports = this.state.arrWithReports
                    .reduce((acc, val) => {
                        val.report.status = status;
                        val.report.location = this.props.user.location;
                        val.report.reportDetailsDate = this.props.date;
                        acc.push(val);
                        return acc;
                    }, []);
                this.props.saveReport(updatesReports,
                    this.props.allReports.reports,
                    this.props.user.currentUser.token);
                this.props.navigation.navigate('Reports')
            }
        }
    }

    render() {
        const index = Dimensions.get("window").height / Dimensions.get("window").width;
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (
            <>
                <TouchableOpacity style={{margin: wp(2), width: wp(16)}}
                                  onPress={() => {this.props.navigation.goBack()}}>
                    <View style={{flexDirection: "row"}}>
                        <Icon name={"angle-left"} size={hp(4)}/>
                        <Text style={{fontSize: hp(3), marginLeft: wp(2)}}>Back</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{fontSize: hp(3)}}>
                        Report for {this.props.date}
                    </Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity style={{marginTop: hp(1), width: wp(5)}}
                                      onPress={this.onSwipeRight}>
                        <View style={{flexDirection: "row"}}>
                            <Icon
                                name={"arrow-left"}
                                size={hp(3)}
                                color={this.state.currentReport === 0 ? "lightgray" : "black"}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonActionWithReports, {backgroundColor: "green"}]}
                                      onPress={this.onAddReport}>
                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <Text style={{fontSize: hp(2.3), color: "white"}}>Add report</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: hp(1), width: wp(4)}}
                                      onPress={this.onSwipeLeft}>
                        <View style={{flexDirection: "row"}}>
                            <Icon
                                name={"arrow-right"}
                                size={hp(3)}
                                color={this.state.currentReport === this.state.arrWithReports.length - 1 ? "lightgray" : "black"}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <GestureRecognizer
                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    onSwipeRight={(state) => this.onSwipeRight(state)}
                    config={config}
                    style={{height: index < 1.8 ? hp(60) : hp(65)}}
                >
                    {this.state.arrWithReports.length ? (
                        <>
                        <ReportFormView
                            arrWithReports={this.state.arrWithReports}
                            currentReport={this.state.currentReport}
                            date={this.props.date}
                            reportsData={this.props.reportsData}
                            message={this.state.message}
                            onDeleteReport={this.onDeleteReport}
                            onChooseProject={this.onChooseProject}
                            onChooseFeature={this.onChooseFeature}
                            onChooseTask={this.onChooseTask}
                            onChooseDetailedTask={this.onChooseDetailedTask}
                            onChooseFactor={this.onChooseFactor}
                            onChangeHours={this.onChangeHours}
                            onChangeWorkUnits={this.onChangeWorkUnits}
                            onChangeComments={this.onChangeComments}
                        />
                        </>) : <Text>""</Text>}
                </GestureRecognizer>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: hp(2)}}>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "lightgreen"}]}
                        onPress={this.onSubmit.bind(this, "REGISTERED")}
                    >
                        <Text style={{fontSize: hp(2.5), marginTop: hp(1.5)}}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "lightgray"}]}
                        onPress={this.onSubmit.bind(this, "PRIVATE")}
                    >
                        <Text style={{fontSize: hp(2.5), marginTop: hp(1.5)}}>Submit as private</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    buttonActionWithReports: {
        marginTop: hp(1),
        width: wp(30),
        borderRadius: hp(1),
    },
    button: {
        width: wp(43),
        height: hp(7),
        margin: wp(2),
        borderRadius: hp(2),
        flexDirection: "row",
        justifyContent: "center"
    }
});

export default AllReportFormsView;