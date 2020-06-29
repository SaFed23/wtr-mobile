import React from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class SearchResultView extends React.Component {
    state = {
        arrWithDates: []
    }

    componentDidMount() {
        this.setState({
            arrWithDates: this.props.route.params.reports.reduce((acc, val) => {
                if(!acc.includes(val.reportDetailsDate))
                    acc.push(val.reportDetailsDate);
                return acc;
            }, [])
        })
    }

    onPressDate = (date) => {
        this.props.navigation.navigate('ResultDetails', {
            date: date,
            reports: this.props.route.params.reports.filter(report => report.reportDetailsDate === date),
        });
    }

    render() {
        return (
            <>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: "2 %"}}>
                    <Text style={{fontSize: 20}}>Searching result</Text>
                </View>
                <ScrollView style={{marginTop: "5%"}}>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}>
                        {this.state.arrWithDates.map((date, index) => {
                            return <TouchableOpacity
                                key={index}
                                onPress={this.onPressDate.bind(this, date)}
                                style={[styles.buttonWithDate]}>
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
        marginTop: "5%",
        marginLeft: "8%",
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
        borderColor: "lightblue",
        borderWidth: 8
    }
});


export default SearchResultView;