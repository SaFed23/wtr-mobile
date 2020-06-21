import {combineReducers} from "redux";
import {usersReducer} from "./usersReducer";
import {reportsReducer} from "./reportsReducer";
import {reportsDataReducer} from "./reportsDataReducers";


export const rootReducer = combineReducers({
    user: usersReducer,
    reports: reportsReducer,
    reportsData: reportsDataReducer,
});
