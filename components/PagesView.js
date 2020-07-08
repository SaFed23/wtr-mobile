import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

function PagesView(props) {
    return (
        <>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <Text style={{fontSize: hp(3), marginTop: hp(1)}}>Count of week</Text>
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
                        <Text style={{fontSize: hp(5.3)}}>{props.countOfWeek}</Text>
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
        margin: hp(2),
        backgroundColor: "rgba(154,222,130,0.42)",
        opacity: 100,
        width: wp(20),
        height: hp(5),
        borderRadius: hp(1),
    },
    button: {
        margin: hp(2),
        backgroundColor: "#9ade82",
        width: wp(20),
        height: hp(5),
        borderRadius: hp(1),
    },
    char: {
        fontSize: hp(4),
        color: "white",
        fontWeight: "bold",
    },
});

export default PagesView;