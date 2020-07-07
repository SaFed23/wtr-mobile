import React from "react";
import {connect} from "react-redux";
import SettingsView from "../components/SettingsView";
import {changeLocation} from "../actions/usersActions";

function Settings (props) {
    return (
        <SettingsView
            user={props.user}
            changeLocation={props.changeLocation}
            locations={props.locations}
        />
    )
}

const mapStateToProps = store => {
    return {
        user: store.user,
        locations: store.reportsData.locations,
    }
};

const mapFuncToProps = dispatch => {
    return {
        changeLocation: (location) => dispatch(changeLocation(location))
    }
};

export default connect(mapStateToProps, mapFuncToProps)(Settings);