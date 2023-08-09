export function handleApiError(status, notAuthorizedHandlingFunction, serverErrorHandlingFunction) {
    if(status === 401 || status === 403) {
        notAuthorizedHandlingFunction()
    } else {
        serverErrorHandlingFunction()
    }
}