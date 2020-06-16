import React from "react";
import {TextInput, Text, View, StyleSheet, TouchableOpacity} from "react-native";

class LoginView extends React.Component {
    state = {
        username: "",
        password: "",
    }

    onChangeLogin = text => {
        this.setState({
            username: text.nativeEvent.text,
        });
    }

    onChangePassword = text => {
        this.setState({
            password: text.nativeEvent.text,
        })
    }

    onLogin = () => {
        this.props.authorization({
            username: this.state.username,
            password: this.state.password,
        });
    }

    render() {
        return (
            <>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: "40%"}}>
                    <Text style={styles.label}>WTR Lite</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: "10%"}}>
                    <Text style={styles.text}>Username</Text>
                    <TextInput
                        style={styles.inputField}
                        value={this.state.username}
                        onChange={text => this.onChangeLogin(text)}
                    />
                </View>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: "4%"}}>
                    <Text style={styles.text}>Password</Text>
                    <TextInput
                        style={styles.inputField}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChange={text => this.onChangePassword(text)}
                    />
                </View>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: "7%"}}>
                    <TouchableOpacity style={styles.button} onPress={this.onLogin}>
                        <Text style={{fontSize: 20, color: "white", marginTop: "5%"}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        fontSize: 40,
    },
    inputField: {
        width: 250,
        height: 40,
        borderColor: 'lightblue',
        borderWidth: 2,
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        marginRight: "2%"
    },
    button: {
        backgroundColor: "lightgreen",
        width: 200,
        height: 50,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center"}
});

export default LoginView;