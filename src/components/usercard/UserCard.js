import './usercard.css'
import {useTranslation} from "react-i18next";
import {changeStatus} from "../../api/logicApi";
import {handleApiError} from "../../helpers/errorHandler";
import {useNavigate} from "react-router";

export default function UserCard(props) {
    const {user, reloadFunction} = props
    const navigate = useNavigate()

    const {t} = useTranslation()

    function callChangeStatus() {
        changeStatus(user.externalId)
            .then(() => reloadFunction())
            .catch(status => handleApiError(status, () => navigate("/"), () => navigate("/error")))
    }

    return(
        <div className={'user-card-wrapper'}>
            <div className={'username-info-block'}>
                <p className={'username-info-item'}>{user.username}</p>
                <p className={'username-info-item'}>{user.blocked ? t('text.blocked') : t('text.active')}</p>
            </div>
            <div className={'username-buttons-block'}>
                <button onClick={callChangeStatus} className={'common-button'}>Изменить статус</button>
                <button className={'common-button'}>Подробности</button>
            </div>
        </div>
    )
}