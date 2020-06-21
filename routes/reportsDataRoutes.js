export async function getProjects(token) {
    return await (await fetch(`http://10.0.2.2:8080/user/projects`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}

export async function getFeatures(token) {
    return await (await fetch(`http://10.0.2.2:8080/user/features`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}

export async function getTasks(token) {
    return await (await fetch(`http://10.0.2.2:8080/user/tasks`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}

export async function getDetailedTasks(token) {
    return await (await fetch(`http://10.0.2.2:8080/user/detailedTasks`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}

export async function getLocations(token) {
    return await (await fetch(`http://10.0.2.2:8080/user/locations`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}

export async function getFactors(token) {
    return await (await fetch(`http://10.0.2.2:8080/user/factors`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}