import React from "react";
import {connect} from "react-redux"
import LoginView from "../components/LoginView";
import {userAuthorization} from "../actions/usersActions";

function Login(props) {
    console.log(props.user)
    return (
        <LoginView
            navigation={props.navigation}
            authorization={props.authorization}
            user={props.user}
        />
    )
}

const mapStateToProps = store => {
    return {
        user: store.user,
    }
};

const mapFuncToProps = dispatch => {
    return {
        authorization: user => dispatch(userAuthorization(user)),
    }
};

export default connect(mapStateToProps, mapFuncToProps)(Login);