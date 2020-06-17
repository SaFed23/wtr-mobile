import React from "react";
import {Text, ScrollView, TouchableOpacity, View} from "react-native";

const dates = ["10-01-2019", "10-01-2020", "10-02-2020", "11-10-2020", "10-01-2021", "22-10-2020"]

class ReportsView extends React.Component {
    render() {
        return (
            <>
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
                                height: 50,
                                borderRadius: 5,
                                backgroundColor: "lightblue"}}>
                            <Text>{date}</Text>
                        </TouchableOpacity>
                    })}
                        </View>
                </ScrollView>
            </>
        );
    }
}

export default ReportsView;