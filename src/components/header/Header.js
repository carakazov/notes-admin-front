import './header.css'
import {useTranslation} from "react-i18next";

export default function Header() {
    const {t, i18n} = useTranslation()

    function setLanguage(language) {
        i18n.changeLanguage(language)
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
                </div>
            </div>
        </header>
    )
}