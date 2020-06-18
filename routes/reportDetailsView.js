export function getReports(date, token) {
    let url = "http://10.0.2.2:8080/user/reportDetails/filter?";
    url += `dateStart=${date.dateStart}&`;
    url += `dateEnd=${date.dateEnd}`;
    return fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer_${token}`
        },
    });
}