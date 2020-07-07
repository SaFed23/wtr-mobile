import React from "react";
import {ScrollView, Text, View} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {Picker} from '@react-native-community/picker';

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
                    <Text style={{fontSize: 23}}>
                        Settings
                    </Text>
                </View>
                <ScrollView>
                    <View style={{flexDirection: "column", justifyContent: "center", marginTop: "5%"}}>
                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <Text style={{fontSize: 20}}>
                                Location
                            </Text>
                        </View>
                        <View style={{borderBottomWidth: 1, marginLeft: "5%", marginRight: "5%", borderColor: "lightblue"}}>
                            <Picker
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

export default SettingsView;