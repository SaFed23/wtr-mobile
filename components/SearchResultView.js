import React from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

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
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: hp(1)}}>
                    <Text style={{fontSize: hp(3)}}>Searching result</Text>
                </View>
                <ScrollView style={{marginTop: hp(2)}}>
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
                                    <View style={{marginTop: hp(3), marginRight: wp(3)}}>
                                        <Icon name={"angle-right"} size={hp(5)} color={"black"}/>
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
        marginTop: hp(3),
        marginLeft: wp(7),
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
        borderColor: "lightblue",
        borderWidth: wp(2)
    }
});


export default SearchResultView;