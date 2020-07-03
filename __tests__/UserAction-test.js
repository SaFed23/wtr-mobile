import {changeLocation, userAuthorization} from "../actions/usersActions";
import {USER_LOCATION, usersReducer} from "../reducers/usersReducer";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

it("Test: change user location", () => {
    let location = {locationId: 1, locationName: "Brest"};
    expect(changeLocation(location))
        .toEqual({
            type: USER_LOCATION,
            payload: {
                location
            }
        });

    location = {locationId: 100, locationName: "Minsk"};
    expect(changeLocation(location))
        .toEqual({
            type: USER_LOCATION,
            payload: {
                location
            }
        });
});

it("Test: user authorization", async () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({user: usersReducer});
    global.fetch = jest.fn((user) => {
        return new Promise((resolve) => {
            resolve({
                json: () => new Promise(resolve => {
                    if(user.username !== "123user123")
                        resolve({
                            debugMessage: "Username not found",
                        });
                    else if(user.password !== "password")
                        resolve({
                            debugMessage: "Password is wrong",
                        });
                    else
                        resolve({
                            username: "123user123",
                            token: 232323,
                        });
                })

            })

        })
    })

    //Test user authorization with wrong username
    store.dispatch(userAuthorization({username: "user", password: "123"}))
        .then(() => {
            expect(store.getActions()[0].payload.loading).toEqual(true);
            expect(store.getActions()[1].payload.message).toEqual("Username not found");
        });

    //Test user authorization with wrong password
    store.dispatch(userAuthorization({username: "123user123", password: "123"}))
        .then(() => {
            expect(store.getActions()[0].payload.loading).toEqual(true);
            expect(store.getActions()[1].payload.message).toEqual("Password is wrong");
        });

    //Test user authorization with correct data
    store.dispatch(userAuthorization({username: "123user123", password: "password"}))
        .then(() => {
            expect(store.getActions()[0].payload.loading).toEqual(true);
            expect(store.getActions()[1].payload.currentUser).toEqual({
                username: "123user123",
                token: 232323,
            });
        });
});
