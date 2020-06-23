import React from "react";
import {connect} from "react-redux";
import {
    getReportsDataAction
} from "../actions/reportsDataActions";
import {saveReportAction} from "../actions/reportsActions";
import SettingsView from "../components/SettingsView";
import {changeLocation} from "../actions/usersActions";

function Settings (props) {
    return (
        <SettingsView
            user={props.user}
            changeLocation={props.changeLocation}
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
        changeLocation: (location) => dispatch(changeLocation(location))
    }
};

export default connect(mapStateToProps, mapFuncToProps)(Settings);