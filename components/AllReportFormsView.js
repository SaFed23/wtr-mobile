import React from "react";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class AllReportFormsView extends React.Component {
    state = {
        arrWithReports: [1, 1],
        currentReport: 0,
    }

    onSwipeLeft = () => {
        if (this.state.currentReport < this.state.arrWithReports.length - 1) {
            this.setState({
                currentReport: this.state.currentReport + 1
            });
        }
    }

    onSwipeRight = () => {
        if (this.state.currentReport > 0) {
            this.setState({
                currentReport: this.state.currentReport - 1
            });
        }
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (
            <>
                <TouchableOpacity style={{margin: "2%", width: "20%"}}
                                  onPress={() => {this.props.navigation.goBack()}}>
                    <View style={{flexDirection: "row"}}>
                        <Icon name={"angle-left"} size={30}/>
                        <Text style={{fontSize: 23, marginLeft: "5%"}}>Back</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{fontSize: 23}}>
                        Report for {this.props.route.params.date}
                    </Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity style={{marginTop: "2%", width: "5%"}}
                                      onPress={this.onSwipeRight}>
                        <View style={{flexDirection: "row"}}>
                            <Icon
                                name={"arrow-left"}
                                size={20}
                                color={this.state.currentReport === 0 ? "lightgray" : "black"}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonActionWithReports, {backgroundColor: "green"}]}
                                      onPress={() => {}}>
                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <Text style={{fontSize: 18, color: "white"}}>Add report</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonActionWithReports,
                            { backgroundColor: this.state.arrWithReports.length === 1 ? "rgba(255,0,0,0.29)" : "red"}]}
                        onPress={() => {}}
                        disabled={this.state.arrWithReports.length === 1}
                    >
                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <Text style={{fontSize: 18, color: "white"}}>Delete report</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: "2%", width: "5%"}}
                                      onPress={this.onSwipeLeft}>
                        <View style={{flexDirection: "row"}}>
                            <Icon
                                name={"arrow-right"}
                                size={20}
                                color={this.state.currentReport === this.state.arrWithReports.length - 1 ? "lightgray" : "black"}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <GestureRecognizer
                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    onSwipeRight={(state) => this.onSwipeRight(state)}
                    config={config}
                    style={{backgroundColor: "yellow", height: "70%"}}
                >
                    <Text>{this.state.currentReport}</Text>
                </GestureRecognizer>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: "7%"}}>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "lightgreen"}]}
                    >
                        <Text style={{fontSize: 20, marginTop: "5%"}}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "lightgray"}]}
                    >
                        <Text style={{fontSize: 20, marginTop: "5%"}}>Submit as private</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    buttonActionWithReports: {
        marginTop: "2%",
        width: "30%",
        borderRadius: 6,
    },
    button: {
        width: 180,
        height: 50,
        margin: "2%",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center"
    }
});

export default AllReportFormsView;