import React from "react";
import {connect} from "react-redux"
import ReportsView from "../components/ReportsView";
import {initReports} from "../actions/reportsActions";

function Reports(props) {
    return (
        <ReportsView
            navigation={props.navigation}
            user={props.user}
            reports={props.reports}
            initReports={props.initReports}
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
    }
};

export default connect(mapStateToProps, mapFuncToProps)(Reports);