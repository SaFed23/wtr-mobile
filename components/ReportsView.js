import React from "react";
import {Text, ScrollView, TouchableOpacity, View, StyleSheet, ActivityIndicator} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{fontSize: 20, marginTop: "2%"}}>Count of week</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity
                        style={this.state.countOfWeek === 1 ? styles.disabledButton : styles.button}
                        onPress={this.decreaseCountOfWeek}
                        disabled={this.state.countOfWeek === 1}
                    >
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
                    <TouchableOpacity
                        style={this.state.countOfWeek === 4 ? styles.disabledButton : styles.button}
                        onPress={this.increaseCountOfWeek}
                        disabled={this.state.countOfWeek === 4}
                    >
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
    disabledButton: {
        margin: "4%",
        backgroundColor: "rgba(154,222,130,0.42)",
        opacity: 100,
        width: "20%",
        height: 40,
        borderRadius: 6,
    },
    button: {
        margin: "4%",
        backgroundColor: "#9ade82",
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