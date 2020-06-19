import React from "react";
import {Text, TouchableOpacity} from "react-native";

class ReportFormView extends React.Component {
    render() {
        return (
            <>
                <Text>Report Form</Text>
                <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </>
        );
    }
}

export default ReportFormView;