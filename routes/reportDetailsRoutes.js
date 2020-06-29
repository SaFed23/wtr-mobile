export async function getReports(date, token) {
    let url = "http://10.0.2.2:8080/user/reportDetails/filter?";
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
    return fetch(`http://10.0.2.2:8080/user/reportDetails/list`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer_${token}`,
        },
        body: JSON.stringify(reports),
    });
}

export function searchReportDetail(report, token) {
    let url = "http://10.0.2.2:8080/user/reportDetails/filter?";
    if(report.status)
        url += `status=${report.status}&`;
    if(report.projectId)
        url += `projectId=${report.projectId}&`;
    if(report.taskId)
        url += `taskId=${report.taskId}&`;
    if(report.detailedTaskId)
        url += `detailedTaskId=${report.detailedTaskId}&`;
    if(report.featureId)
        url += `featureId=${report.featureId}&`;
    if(report.factorId)
        url += `factorId=${report.factorId}&`;
    if(report.locationId)
        url += `locationId=${report.locationId}&`;
    if(report.dateStart)
        url += `dateStart=${report.dateStart}&`;
    if(report.dateEnd)
        url += `dateEnd=${report.dateEnd}&`;
    return fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer_${token}`
        },
    });
}