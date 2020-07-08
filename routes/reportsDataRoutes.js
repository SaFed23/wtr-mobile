import {url} from "./constants";

export async function getProjects(token) {
    return await (await fetch(`${url}/user/projects`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}

export async function getFeatures(token) {
    return await (await fetch(`${url}/user/features`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}

export async function getTasks(token) {
    return await (await fetch(`${url}/user/tasks`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}

export async function getDetailedTasks(token) {
    return await (await fetch(`${url}/user/detailedTasks`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}

export async function getLocations(token) {
    return await (await fetch(`${url}/user/locations`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}

export async function getFactors(token) {
    return await (await fetch(`${url}/user/factors`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer_${token}`
        }
    })).json();
}