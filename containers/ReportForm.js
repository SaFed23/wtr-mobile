import React from "react";
import ReportFormView from "../components/ReportFormView";
import {connect} from "react-redux";
import {
    getReportsDataAction
} from "../actions/reportsDataActions";

function ReportForm (props) {
    return (
        <ReportFormView
            navigation={props.navigation}
            params={props.route.params}
            user={props.user}
            reportsData={props.reportsData}
            getReportsData={props.getReportsData}
        />
    )
}

const mapStateToProps = store => {
    return {
        user: store.user,
        reportsData: store.reportsData,
    }
};

const mapFuncToProps = dispatch => {
    return {
        getReportsData: (token) => dispatch(getReportsDataAction(token)),
    }
};

export default connect(mapStateToProps, mapFuncToProps)(ReportForm);