import "react-native";
import React from "react";
import {
    initialState,
    USER_LOCATION,
    USERS_AUTH,
    USERS_FAILED,
    USERS_REQUEST,
    usersReducer
} from "../reducers/usersReducer";

it("Test: user reducer", () => {
    // Test user request
    expect(usersReducer(initialState,
        {
            type: USERS_REQUEST,
            payload: {
                loading: true,
            }
        })).toEqual({...initialState, loading: true});

    // Test user failed
    expect(usersReducer(initialState,
        {
            type: USERS_FAILED,
            payload: {
                loading: false,
                message: "Something is wrong!"
            }
        })).toEqual({...initialState, loading: false, message: "Something is wrong!"});

    // Test user auth
    const currentUser = {
        userName: "user",
        token: 123123
    }
    expect(usersReducer(initialState,
        {
            type: USERS_AUTH,
            payload: {
                loading: false,
                currentUser: currentUser,
            }
        })).toEqual({...initialState, loading: false, currentUser});

    // Test change location
    const location = {
        locationId: 1,
        locationName: "brest",
    }
    expect(usersReducer(initialState,
        {
            type: USER_LOCATION,
            payload: {
                location,
            }
        })).toEqual({...initialState, location});
});