import React from "react";
import ReportFormView from "../components/ReportFormView";
import {initReports} from "../actions/reportsActions";
import {connect} from "react-redux";

function ReportForm (props) {
    return (
        <ReportFormView
            navigation={props.navigation}
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

export default connect(mapStateToProps, mapFuncToProps)(ReportForm);