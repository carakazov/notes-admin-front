import './userlist.css'
import {useEffect, useState} from "react";
import {getClientList} from "../../api/logicApi";
import {useNavigate} from "react-router";
import {handleApiError} from "../../helpers/errorHandler";
import {useTranslation} from "react-i18next";
import UserCard from "../usercard/UserCard";

export default function UserList() {
    const [users, setUsers] = useState([])
    const [isReload, hasReload] = useState(true)
    const {t} = useTranslation()

    const navigate = useNavigate()

    function reloadFunction() {
        hasReload(true)
    }

    useEffect(() => {
        if(isReload) {
            getClientList()
                .then(result => setUsers(result.clients))
                .catch(status => handleApiError(status, () => navigate("/"), () => navigate("/error")))
            hasReload(false)
        }
    }, [isReload])

    return(
        <div className={'client-list-wrapper'}>
            <div className={'client-list-header-wrapper'}>
                <p className={'client-list-header'}>{t('header.clientList')}</p>
            </div>
            <div className={'user-cards-wrapper'}>
                {users.map(item => <UserCard user={item} reloadFunction={reloadFunction} key={item.externalId}/>)}
            </div>
        </div>
    )
}