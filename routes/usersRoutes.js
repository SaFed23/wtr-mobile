import {url} from "./constants";

export async function authorization(user) {
    return await (await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: user.username, password: user.password}),
    })).json();
}