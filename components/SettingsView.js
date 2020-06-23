import React from "react";
import {ScrollView, Text, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-community/async-storage";
import {getLocations} from "../routes/reportsDataRoutes";

class SettingsView extends React.Component {
    state = {
        locations: [],
    }

    componentDidMount() {
        getLocations(this.props.user.currentUser.token)
            .then(data => this.setState({locations: data}));
    }

    onChooseLocation(value) {
        const location = this.state.locations.find(location => location.locationId === value);
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
                            <RNPickerSelect
                                default
                                onValueChange={(value) => {this.onChooseLocation(value)}}
                                placeholder={(() => {
                                    if(this.props.user.location === null){
                                        return {
                                            label: "Select a location...",
                                            value: null
                                        }
                                    } else {
                                        return {
                                            label: this.props.user.location.locationName,
                                            value: this.props.user.location.locationId,
                                        }
                                    }
                                })()}
                                style={{placeholder: {color: "black"}}}
                                items={this.state.locations
                                    .filter(location => {
                                        if(this.props.user.location !== null)
                                            return location.locationId !== this.props.user.location.locationId
                                        else
                                            return location
                                    })
                                    .map(location => {
                                    return {
                                        label: location.locationName,
                                        value: location.locationId,
                                    }
                                })}
                            />
                        </View>
                    </View>
                </ScrollView>
            </>
        );
    }
}

export default SettingsView;