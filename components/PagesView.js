import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

function PagesView(props) {
    return (
        <>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <Text style={{fontSize: 20, marginTop: "2%"}}>Count of week</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity
                    style={props.countOfWeek === 1 ? styles.disabledButton : styles.button}
                    onPress={props.decreaseCountOfWeek}
                    disabled={props.countOfWeek === 1}
                >
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <View style={{flexDirection: "column", justifyContent: "center"}}>
                            <Text style={styles.char}>-</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <View style={{flexDirection: "column", justifyContent: "center"}}>
                        <Text style={{fontSize: 30}}>{props.countOfWeek}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={props.countOfWeek === 4 ? styles.disabledButton : styles.button}
                    onPress={props.increaseCountOfWeek}
                    disabled={props.countOfWeek === 4}
                >
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <View style={{flexDirection: "column", justifyContent: "center"}}>
                            <Text style={styles.char}>+</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
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
});

export default PagesView;