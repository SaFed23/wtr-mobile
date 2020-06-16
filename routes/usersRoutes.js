export async function authorization(user) {
    return await (await fetch("/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: user.username, password: user.password}),
    })).json();
}