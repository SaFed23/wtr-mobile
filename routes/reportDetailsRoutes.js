import {url} from "./constants";

export async function getReports(date, token) {
    let url = `${url}/user/reportDetails/filter?`;
    url += `dateStart=${date.dateStart}&`;
    url += `dateEnd=${date.dateEnd}`;
    return (await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer_${token}`
        },
    })).json();
}

export function saveReport(method, reports, token) {
    return fetch(`${url}/user/reportDetails/list`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer_${token}`,
        },
        body: JSON.stringify(reports),
    });
}

export function searchReportDetail(report, token) {
    let currentUrl = `${url}/user/reportDetails/filter?`;
    if(report.status)
        currentUrl += `status=${report.status}&`;
    if(report.projectId)
        currentUrl += `projectId=${report.projectId}&`;
    if(report.taskId)
        currentUrl += `taskId=${report.taskId}&`;
    if(report.detailedTaskId)
        currentUrl += `detailedTaskId=${report.detailedTaskId}&`;
    if(report.featureId)
        currentUrl += `featureId=${report.featureId}&`;
    if(report.factorId)
        currentUrl += `factorId=${report.factorId}&`;
    if(report.locationId)
        currentUrl += `locationId=${report.locationId}&`;
    if(report.dateStart)
        currentUrl += `dateStart=${report.dateStart}&`;
    if(report.dateEnd)
        currentUrl += `dateEnd=${report.dateEnd}&`;
    console.log(currentUrl)
    return fetch(currentUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer_${token}`
        },
    });
}