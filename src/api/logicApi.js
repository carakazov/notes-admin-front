import {getToken} from "../token/holder/tokenHolder";

export async function getClientList() {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_OAUTH_BACKEND_URL}/client/list`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }

    return Promise.reject(result.status)
}

export async function changeStatus(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_OAUTH_BACKEND_URL}/client/${externalId}/changeStatus`, {
        method: 'PUT',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return Promise.resolve()
    }

    return Promise.reject(result.status)
}

function getHeaders(token) {
    return {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}