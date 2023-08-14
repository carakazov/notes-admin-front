import './header.css'
import {useTranslation} from "react-i18next";
import {LOGIN_KEY} from "../../constans/tokenConstants";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import {deleteToken} from "../../token/holder/tokenHolder";
import {useNavigate} from "react-router";

export default function Header() {
    const {t, i18n} = useTranslation()
    const {isLogged, hasLogged} = useContext(AuthContext)
    const navigate = useNavigate()

    function setLanguage(language) {
        i18n.changeLanguage(language)
    }

    function logOut() {
        hasLogged(false)
        deleteToken()
        navigate('/admin')
    }

    return(
        <header className={'inner-header-wrapper'}>
            <div className={'company-logo-wrapper'}>
                <p className={'header-wrapper'}>.BSCPricols</p>
            </div>
            <div className={'header-content-wrapper'}>
                <div className={'header-line-wrapper'}>
                    <p className={'header-line'}>{t('text.headerLine')}</p>
                </div>
                <div className={'header-buttons-wrapper'}>
                    <button onClick={() => setLanguage('en')} className={'common-button'}>EN</button>
                    <button onClick={() => setLanguage('ru')} className={'common-button'}>RU</button>
                    {isLogged ? <button onClick={logOut} className={'common-button'}>{t('button.logOut')}</button> : null}
                </div>
            </div>
        </header>
    )
}