import React from "react";
import {connect} from "react-redux"
import ReportsView from "../components/ReportsView";

function Reports(props) {
    return (
        <ReportsView
            navigation={props.navigation}
            user={props.users}
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
    }
};

export default connect(mapStateToProps, mapFuncToProps)(Reports);