import './errorpage.css'
import {useTranslation} from "react-i18next";

export default function ErrorPage() {
    const {t} = useTranslation()

    return(
        <div className={'error-wrapper'}>
            {t('text.fatalError')}
        </div>
    )
}