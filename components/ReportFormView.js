import React from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class ReportFormView extends React.Component {
    render() {
        return (
            <>
                <TouchableOpacity style={styles.buttonBack}
                                  onPress={() => {this.props.navigation.goBack()}}>
                    <View style={{flexDirection: "row"}}>
                        <Icon name={"angle-left"} size={30}/>
                        <Text style={{fontSize: 23, marginLeft: "5%"}}>Back</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{fontSize: 23}}>
                        Report for {this.props.params.date}
                    </Text>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    buttonBack: {
        margin: "2%",
        width: "20%"
    }
})

export default ReportFormView;