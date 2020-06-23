import React from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PagesView from "./PagesView";

class DateWithReportsView extends React.Component {
    state = {
        countOfWeek: 1,
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
                <ScrollView>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}>
                        {this.props.reports
                            .map((report, index) => {
                            return <TouchableOpacity
                                key={index}
                                onPress={this.onPressDate.bind(this, index)}
                                style={[styles.buttonWithDate,
                                    {backgroundColor: this.props.status === "PRIVATE" ? "#383838" : "#bd1010"}]}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={styles.date}>
                                        {report.reportDetailsDate}
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
    }
});

export default DateWithReportsView;