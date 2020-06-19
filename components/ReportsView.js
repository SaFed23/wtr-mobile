import React from "react";
import {Text, ScrollView, TouchableOpacity, View, StyleSheet, ActivityIndicator} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const dates = ["2020-06-18", "2020-06-17", "2020-06-11", "2020-06-07", "2020-05-20", "2020-05-19"]

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
        }, this.props.user.currentUser.token)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.reports.loading === true && this.props.reports.loading === false
            || prevState.countOfWeek !== this.state.countOfWeek) {
            const lastDate = new Date();
            const arrayOfDates = [];
            lastDate.setDate(lastDate.getDate() - this.state.countOfWeek * 7 + 1);
            const arrayOfDatesWithReport = this.props.reports.reports.map(report => report.reportDetailsDate)
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

    findInterval = () => {
        const lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - this.state.countOfWeek * 7);
        return dates.filter(date => new Date(date) < new Date() && new Date(date) > lastDate);
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

    onPressDate = (date) => {
        this.props.navigation.navigate('ReportForm');
    }

    render() {
        return (
            <>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{fontSize: 20, marginTop: "2%"}}>Count of week</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity style={styles.button} onPress={this.decreaseCountOfWeek}>
                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <View style={{flexDirection: "column", justifyContent: "center"}}>
                                <Text style={styles.char}>-</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <View style={{flexDirection: "column", justifyContent: "center"}}>
                            <Text style={{fontSize: 30}}>{this.state.countOfWeek}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.increaseCountOfWeek}>
                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <View style={{flexDirection: "column", justifyContent: "center"}}>
                                <Text style={styles.char}>+</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
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
                            onPress={this.onPressDate}
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
    button: {
        margin: "4%",
        backgroundColor: "lightgreen",
        width: "20%",
        height: 40,
        borderRadius: 6,
    },
    char: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
    },
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