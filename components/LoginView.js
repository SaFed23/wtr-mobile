import React from "react";
import {
    TextInput,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

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
                <View style={styles.labelView}>
                    <Text style={styles.label}>WTR Lite</Text>
                </View>
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" 
                                       color="lightblue"
                                       animating={this.props.user.loading}/>
                </View>
                <View style={{flexDirection: "column", justifyContent: "center"}}>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: hp(1)}}>
                        <Text style={styles.text}>Username</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: hp(1)}}>
                        <TextInput
                            style={styles.inputField}
                            value={this.state.username}
                            onChange={text => this.onChangeLogin(text)}
                        />
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: hp(1.5)}}>
                        <Text style={styles.text}>Password</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: hp(1)}}>
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
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: hp(2)}}>
                        <TouchableOpacity style={styles.button} onPress={this.onLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    labelView: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: hp(20),
    },
    label: {
        fontSize: hp(6),
    },
    inputField: {
        width: wp(60),
        height: hp(6),
        borderColor: 'lightblue',
        borderWidth: wp(0.5),
        borderRadius: hp(1.5),
        fontSize: hp(1.7)
    },
    text: {
        fontSize: hp(2.5),
        marginRight: wp(1),
    },
    button: {
        backgroundColor: "lightgreen",
        width: wp(50),
        height: hp(7),
        borderRadius: hp(1.5),
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonText: {
        fontSize: hp(2.7),
        color: "white",
        marginTop: hp(1.5),
    }
});

export default LoginView;