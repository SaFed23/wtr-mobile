import React from "react";
import {connect} from "react-redux";
import DateWithReportsView from "../components/DateWithReportsView";

function RejectedReports (props) {
    const reports = props.reports.reports.filter(report => report.status === "REJECTED");
    return (
        <DateWithReportsView
            reports={reports}
            status={"REJECTED"}
        />
    )
}

const mapStateToProps = store => {
    return {
        reports: store.reports
    }
};

const mapFuncToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapFuncToProps)(RejectedReports);