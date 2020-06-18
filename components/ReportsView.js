import React from "react";
import {Text, ScrollView, TouchableOpacity, View, StyleSheet} from "react-native";
import {getReports} from "../routes/reportDetailsView";

const dates = ["2020-06-18", "2020-06-17", "2020-06-11", "2020-06-07", "2020-05-20", "2020-05-19"]

class ReportsView extends React.Component {
    state = {
        countOfWeek: 1,
        arrayOfDate: [],
    }

    componentDidMount() {
        getReports({
            dateStart: "2020-06-07",
            dateEnd: "2020-06-18",
        }, this.props.user.currentUser.token)
            .then(res => res.json())
            .then(data => console.log(data));

    }

    findInterval = (countOfWeek) => {
        const lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - countOfWeek * 7);
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
                <ScrollView>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}>
                    {dates.map((date, index) => {
                        return <TouchableOpacity
                            key={index}
                            style={{
                                margin: "2%",
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: "#249aff"}}>
                            <View style={{flexDirection: "row", justifyContent: "center"}}>
                                <Text style={{marginTop: "40%", color: "white", fontSize: 17, fontWeight: "bold"}}>{date}</Text>
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
    }
});

export default ReportsView;