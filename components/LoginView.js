import React from "react";
import {
    TextInput,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

class LoginView extends React.Component {
    state = {
        username: "",
        password: "",
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.user.loading === true && this.props.user.loading === false) {
            if (this.props.user.currentUser.token)
                this.props.navigation.navigate('Application');
        }
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
        this.setState({username: "", password: ""});
    }

    render() {
        return (
            <>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: "40%"}}>
                    <Text style={styles.label}>WTR Lite</Text>
                </View>
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" 
                                       color="lightblue"
                                       animating={this.props.user.loading}/>
                </View>
                <View style={{flexDirection: "column", justifyContent: "center"}}>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: "2%"}}>
                        <Text style={styles.text}>Username</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: "2%"}}>
                        <TextInput
                            style={styles.inputField}
                            value={this.state.username}
                            onChange={text => this.onChangeLogin(text)}
                        />
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: "4%"}}>
                        <Text style={styles.text}>Password</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: "2%"}}>
                        <TextInput
                            style={styles.inputField}
                            secureTextEntry={true}
                            value={this.state.password}
                            onChange={text => this.onChangePassword(text)}
                        />
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <Text style={{color: "red"}}>
                                {this.props.user.message}
                            </Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: "7%"}}>
                        <TouchableOpacity style={styles.button} onPress={this.onLogin}>
                            <Text style={{fontSize: 20, color: "white", marginTop: "5%"}}>Login</Text>
                        </TouchableOpacity>
                    </View>
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
        justifyContent: "center"
    }
});

export default LoginView;