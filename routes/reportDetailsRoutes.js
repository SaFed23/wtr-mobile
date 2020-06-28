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