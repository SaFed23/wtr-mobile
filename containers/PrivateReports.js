import React from "react";
import {connect} from "react-redux";
import DateWithReportsView from "../components/DateWithReportsView";

function PrivateReports (props) {
    const reports = props.reports.reports.filter(report => report.status === "PRIVATE");
    return (
        <DateWithReportsView
            reports={reports}
            status={"PRIVATE"}
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

export default connect(mapStateToProps, mapFuncToProps)(PrivateReports);