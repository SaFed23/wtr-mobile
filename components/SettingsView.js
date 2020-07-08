import React from "react";
import {ScrollView, Text, View, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {Picker} from '@react-native-community/picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

class SettingsView extends React.Component {

    onChooseLocation(value) {
        const location = this.props.locations.find(location => location.locationId === value);
        this.props.changeLocation(location);
        try {
            (async () => {
                await AsyncStorage.setItem('@location', JSON.stringify(location));
            })();
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{fontSize: hp(3)}}>
                        Settings
                    </Text>
                </View>
                <ScrollView>
                    <View style={{flexDirection: "column", justifyContent: "center", marginTop: hp(2)}}>
                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <Text style={{fontSize: hp(2.5)}}>
                                Location
                            </Text>
                        </View>
                        <View style={styles.viewWithPicker}>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.props.user.location === null ? null
                                    : this.props.user.location.locationId}
                                onValueChange={(itemValue) =>
                                    this.onChooseLocation(itemValue)
                                }>
                                <Picker.Item label="Select a location..." value={null} />
                                {this.props.locations
                                    .map(location => {
                                        return <Picker.Item
                                            key={location.locationId}
                                            label={location.locationName}
                                            value={location.locationId} />
                                    })}
                            </Picker>
                        </View>
                    </View>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    viewWithPicker: {
        borderBottomWidth: 1,
        marginLeft: wp(4),
        marginRight: wp(4),
        borderColor: "lightblue"
    },
    picker: {
        height: hp(5),

    }
});

export default SettingsView;