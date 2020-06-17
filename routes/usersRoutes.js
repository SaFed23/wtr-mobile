export async function authorization(user) {
    return await (await fetch("http://10.0.2.2:8080/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: user.username, password: user.password}),
    })).json();
}