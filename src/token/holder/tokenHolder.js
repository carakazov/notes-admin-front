import {updateToken} from "../requester/tokenRequester";
import {
    LOGIN_KEY,
    PASSWORD_KEY,
    ACCESS_TOKEN_EXPIRATION_TIME_KEY,
    TOKEN_KEY, CURRENT_USER_DATA
} from "../../constans/tokenConstants";

export function setData(login, password, token) {
    let accessToken = token.access_token
    let expirationTime = token.expires_in
    let currentTime = Math.round(new Date().getTime()/1000)
    sessionStorage.setItem(LOGIN_KEY, login)
    sessionStorage.setItem(PASSWORD_KEY, password)
    sessionStorage.setItem(TOKEN_KEY, accessToken)
    sessionStorage.setItem(ACCESS_TOKEN_EXPIRATION_TIME_KEY, currentTime + expirationTime)
}

export async function getToken() {
    await updateToken()
    return sessionStorage.getItem(TOKEN_KEY)
}

export function deleteToken() {
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(LOGIN_KEY)
    sessionStorage.removeItem(PASSWORD_KEY)
}