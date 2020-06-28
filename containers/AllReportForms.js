import React from "react";
import {connect} from "react-redux";
import {saveReportAction} from "../actions/reportsActions";
import AllReportFormsView from "../components/AllReportFormsView";

function AllReportForms (props) {
    return (
        <AllReportFormsView
            navigation={props.navigation}
            date={props.route.params.date}
            reports={props.route.params.reports}
            user={props.user}
            reportsData={props.reportsData}
            saveReport={props.saveReport}
            allReports={props.reports}
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
        saveReport: (report, reports, token) => dispatch(saveReportAction(report, reports, token))
    }
};

export default connect(mapStateToProps, mapFuncToProps)(AllReportForms);