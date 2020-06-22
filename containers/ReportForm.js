import React from "react";
import ReportFormView from "../components/ReportFormView";
import {connect} from "react-redux";
import {
    getReportsDataAction
} from "../actions/reportsDataActions";
import {saveReportAction} from "../actions/reportsActions";

function ReportForm (props) {
    return (
        <ReportFormView
            navigation={props.navigation}
            params={props.route.params}
            user={props.user}
            reportsData={props.reportsData}
            reports={props.reports}
            getReportsData={props.getReportsData}
            saveReport={props.saveReport}
        />
    )
}

const mapStateToProps = store => {
    return {
        user: store.user,
        reportsData: store.reportsData,
        reports: store.reports
    }
};

const mapFuncToProps = dispatch => {
    return {
        getReportsData: (token) => dispatch(getReportsDataAction(token)),
        saveReport: (report, reports, token) => dispatch(saveReportAction(report, reports, token))
    }
};

export default connect(mapStateToProps, mapFuncToProps)(ReportForm);