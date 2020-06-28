import React from "react";
import {connect} from "react-redux";
import SearchView from "../components/SearchView";

function Search (props) {
    return (
        <SearchView
            navigation={props.navigation}
            user={props.user}
            reportsData={props.reportsData}
            reports={props.reports}
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

export default connect(mapStateToProps)(Search);