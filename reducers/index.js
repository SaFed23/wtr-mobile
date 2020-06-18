import {combineReducers} from "redux";
import {usersReducer} from "./usersReducer";
import {reportsReducer} from "./reportsReducer";


export const rootReducer = combineReducers({
    user: usersReducer,
    reports: reportsReducer,
});
