import {
    USERS_AUTH,
    USERS_FAILED,
    USERS_REQUEST,
} from "../reducers/usersReducer";
import {authorization} from "../routes/usersRoutes";

export function userAuthorization(user) {
    return async dispatch => {
        dispatch({
            type: USERS_REQUEST,
            payload: {
                currentUser: {},
                message: "",
                loading: true,
            }
        });
        try {
            const result = await authorization(user);
            if (result.token !== undefined)
                dispatch({
                    type: USERS_AUTH,
                    payload: {
                        currentUser: result,
                        message: "",
                        loading: false,
                    },
                });
            else
                dispatch({
                    type: USERS_FAILED,
                    payload: {
                        currentUser: {},
                        message: result.debugMessage,
                        loading: false,
                    },
                })
        } catch (e) {
            dispatch({
                type: USERS_FAILED,
                payload: {
                    currentUser: {},
                    message: "Something is wrong:(",
                    loading: false,
                },
            })
        }
    }
}
