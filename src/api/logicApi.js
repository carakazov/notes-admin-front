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

export async function getUserProfile(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/client/${externalId}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }

    return Promise.reject(result.status)
}

export async function getUserCluster(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/client/${externalId}/admin`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }

    return Promise.reject(result.status)
}

export async function getDirectoryDeleteHistory(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/directory/${externalId}/deleteHistory`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }

    return Promise.reject(result.status)
}

export async function getNoteDeleteHistory(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/${externalId}/deleteHistory`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }

    return Promise.reject(result.status)
}

export async function getMoveHistory(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/${externalId}/replacingHistory`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }

    return Promise.reject(result.status)
}

export async function getArchive(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/${externalId}/archiveHistory`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }

    return Promise.reject(result.status)
}

export async function getVersion(externalId) {
    let token = await getToken()
    let result = await fetch(`${process.env.REACT_APP_LOGIC_BACKENG_URL}/note/${externalId}/version`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    if(result.ok) {
        return await result.json()
    }

    return Promise.reject(result.status)
}

function getHeaders(token) {
    return {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}