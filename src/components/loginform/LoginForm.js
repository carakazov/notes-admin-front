import './loginform.css'
import jwtDecode from "jwt-decode";
import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import {isStringEmpty} from "../../validators/stringValidator";
import {login} from "../../api/authApi";
import {setData} from "../../token/holder/tokenHolder";
import {useNavigate} from "react-router"
import {AuthContext} from "../../context/authContext";

export default function LoginForm() {
    const {t} = useTranslation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const {hasLogged} = useContext(AuthContext)

    const navigate = useNavigate()

    function callLogin() {
        if(validate()) {
            login({
                username: username,
                password: password
            })
                .then(result => {
                    const token = result.access_token
                    const decodedToken = jwtDecode(token)
                    if(decodedToken.authorities.indexOf('ROLE_ADMIN') > -1) {
                        setData(username, password, result)
                        hasLogged(true)
                        navigate('/users')
                    } else {
                        const errorObject = {}
                        errorObject.notEnoughRights = t('text.notAdmin')
                        setError(errorObject)
                    }
                })
                .catch(errorCode => {
                    const errorObject = {}
                    if(errorCode === 400) {
                        errorObject.incorrectData = t('text.checkCredentials')
                    } else {
                        errorObject.serverError = t('text.serverError')
                    }
                    setError(errorObject)
                })
        }
    }

    function validate() {
        let correct = true
        const errorObject = {}

        if(isStringEmpty(username)) {
            errorObject.loginRequired = t('text.required')
            correct = false
        }

        if(isStringEmpty(password)) {
            errorObject.passwordRequired = t('text.required')
            correct = false
        }

        setError(errorObject)
        return correct
    }

    const loginRequired = error.loginRequired ? <p className={'common-error-message'}>{error.loginRequired}</p> : null
    const passwordRequired = error.passwordRequired ? <p className={'common-error-message'}>{error.passwordRequired}</p> : null

    const serverError = error.serverError ? <p className={'common-error-message'}>{error.serverError}</p> : null
    const incorrectData = error.incorrectData ? <p className={'common-error-message'}>{error.incorrectData}</p> : null
    const notEnoughRights = error.notEnoughRights ? <p className={'common-error-message'}>{error.notEnoughRights}</p> : null

    return(
        <div className={'login-form-wrapper'}>
            <div className={'login-form-inputs-wrapper'}>
                <div className={'input-block'}>
                    <input type={'text'} className={'common-input'} placeholder={t('placeholder.login')} onChange={e => setUsername(e.currentTarget.value)}/>
                    {loginRequired}
                </div>
                <div className={'input-block'}>
                    <input type={'password'} className={'common-input'} placeholder={t('placeholder.password')} onChange={e => setPassword(e.currentTarget.value)}/>
                    {passwordRequired}
                </div>
            </div>
            <div className={'login-form-button-wrapper'}>
                <button className={'common-button'} onClick={callLogin}>{t('button.ok')}</button>
                {serverError}
                {incorrectData}
                {notEnoughRights}
            </div>
        </div>
    )
}