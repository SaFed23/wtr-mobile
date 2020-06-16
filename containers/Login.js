import React from "react";
import {connect} from "react-redux"
import LoginView from "../components/LoginView";
import {userAuthorization} from "../actions/usersActions";

function Login(props) {
    return (
        <LoginView
            authorization={props.authorization}
        />
    )
}

const mapStateToProps = store => {
    return {
        users: store.users,
    }
};

const mapFuncToProps = dispatch => {
    return {
        authorization: user => dispatch(userAuthorization(user)),
    }
};

export default connect(mapStateToProps, mapFuncToProps)(Login);