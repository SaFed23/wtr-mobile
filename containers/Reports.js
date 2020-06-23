import React from "react";
import {connect} from "react-redux"
import ReportsView from "../components/ReportsView";
import {initReports} from "../actions/reportsActions";
import {changeLocation} from "../actions/usersActions";

function Reports(props) {
    return (
        <ReportsView
            navigation={props.navigation}
            user={props.user}
            reports={props.reports}
            initReports={props.initReports}
            changeLocation={props.changeLocation}
        />
    )
}

const mapStateToProps = store => {
    return {
        user: store.user,
        reports: store.reports,
    }
};

const mapFuncToProps = dispatch => {
    return {
        initReports: (date, token) => dispatch(initReports(date, token)),
        changeLocation: (location) => dispatch(changeLocation(location)),
    }
};

export default connect(mapStateToProps, mapFuncToProps)(Reports);