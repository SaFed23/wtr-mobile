import React from "react";
import {Text, ScrollView, TouchableOpacity, View, StyleSheet, ActivityIndicator} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import PagesView from "./PagesView";

class ReportsView extends React.Component {
    state = {
        countOfWeek: 1,
        arrayOfDates: [],
    }

    componentDidMount() {
        const lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - 28);
        this.props.initReports({
            dateStart: lastDate.toISOString().split("T")[0],
            dateEnd: new Date().toISOString().split("T")[0],
        }, this.props.user.currentUser.token);
        try {
            (async () => {
                const location = await AsyncStorage.getItem('@location')
                this.props.changeLocation(JSON.parse(location));
            })();
        } catch (e) {
            console.log(e);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.reports.loading === true && this.props.reports.loading === false
            || prevState.countOfWeek !== this.state.countOfWeek
            || this.props.reports.reports.length !== prevProps.reports.reports.length) {
            const lastDate = new Date();
            const arrayOfDates = [];
            lastDate.setDate(lastDate.getDate() - this.state.countOfWeek * 7 + 1);
            const arrayOfDatesWithReport = this.props.reports.reports
                .filter(report => report.status !== "PRIVATE" && report.status !== "REJECTED")
                .map(report => report.reportDetailsDate)
            while (lastDate < new Date()) {
                if(!arrayOfDatesWithReport.includes(lastDate.toISOString().split("T")[0])){
                    arrayOfDates.push(lastDate.toISOString().split("T")[0])
                }
                lastDate.setDate(lastDate.getDate() + 1);
            }
            this.setState({
                arrayOfDates: arrayOfDates,
            })
        }
    }

    increaseCountOfWeek = () => {
        if(this.state.countOfWeek < 4) {
            this.setState({
                countOfWeek: this.state.countOfWeek + 1,
            });
        }
    }

    decreaseCountOfWeek = () => {
        if(this.state.countOfWeek > 1) {
            this.setState({
                countOfWeek: this.state.countOfWeek - 1,
            });
        }
    }

    onPressDate = (index) => {
        this.props.navigation.navigate('ReportForm', {
            date: this.state.arrayOfDates[index],
        });
    }

    render() {
        return (
            <>
                <PagesView
                    countOfWeek={this.state.countOfWeek}
                    increaseCountOfWeek={this.increaseCountOfWeek}
                    decreaseCountOfWeek={this.decreaseCountOfWeek}/>
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large"
                                       color="lightblue"
                                       animating={this.props.reports.loading}/>
                </View>
                <ScrollView>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}>
                    {this.state.arrayOfDates.map((date, index) => {
                        return <TouchableOpacity
                            key={index}
                            onPress={this.onPressDate.bind(this, index)}
                            style={styles.buttonWithDate}>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <Text style={styles.date}>
                                    {date}
                                </Text>
                                <View style={{marginTop: "8%", marginRight: "3%"}}>
                                    <Icon name={"angle-right"} size={40} color={"white"}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    })}
                        </View>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    date: {
        marginTop: "8%",
        marginLeft: "8%",
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    buttonWithDate: {
        marginLeft: "4%",
        marginRight: "4%",
        marginBottom: "2%",
        width: 380,
        height: 100,
        borderRadius: 20,
        backgroundColor: "#249aff"}
});

export default ReportsView;