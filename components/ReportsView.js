import React from "react";
import {Text, ScrollView, TouchableOpacity, View, StyleSheet, ActivityIndicator} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import PagesView from "./PagesView";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

class ReportsView extends React.Component {
    state = {
        countOfWeek: 1,
        arrayOfDates: [],
    }

    componentDidMount() {
        this.props.getReportsData(this.props.user.currentUser.token);
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
        ) {
            const lastDate = new Date();
            const arrayOfDates = [];
            lastDate.setDate(lastDate.getDate() - this.state.countOfWeek * 7 + 1);
            const arrayOfDatesWithReport = this.props.reports.reports
                .filter(report => report.status !== "PRIVATE" && report.status !== "REJECTED")
                .map(report => report.reportDetailsDate)
            while (lastDate < new Date()) {
                let stringOfDate = lastDate.toISOString().split("T")[0];
                if(!arrayOfDatesWithReport.includes(stringOfDate)){
                    arrayOfDates.push(
                        {
                            date: stringOfDate,
                            reports: this.props.reports.reports
                                .filter(report =>
                                    (report.status === "PRIVATE" || report.status === "REJECTED")
                                    && report.reportDetailsDate === stringOfDate)
                        })
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
            date: this.state.arrayOfDates[index].date,
            reports: this.state.arrayOfDates[index].reports,
        });
    }

    setColor = (reports) => {
        let color;
        if (reports.length === 0) {
            color = "#bd1010";
        } else {
            color = "#e0a601";
        }
        return color;
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
                            style={[styles.buttonWithDate, { backgroundColor: this.setColor(date.reports)}]}>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <Text style={styles.date}>
                                    {date.date}
                                </Text>
                                <View style={{marginTop: hp(4), marginRight: wp(3)}}>
                                    <Icon name={"angle-right"} size={hp(5.5)} color={"white"}/>
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
        marginTop: hp(4),
        marginLeft: wp(6),
        color: "white",
        fontSize: hp(4),
        fontWeight: "bold"
    },
    buttonWithDate: {
        marginLeft: wp(4),
        marginRight: wp(4),
        marginBottom: hp(1),
        width: wp(93),
        height: hp(14),
        borderRadius: hp(3),
    }
});

export default ReportsView;