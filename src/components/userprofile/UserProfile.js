import './userprofile.css'
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {getUserCluster, getUserProfile} from "../../api/logicApi";
import {handleApiError} from "../../helpers/errorHandler";
import {useTranslation} from "react-i18next";
import DirectoryCard from "../directorycard/DirectoryCard";

export default function UserProfile() {
    const params = useParams()
    const {externalId, username} = params
    const navigate = useNavigate()
    const {t} = useTranslation()


    const [user, setUser] = useState()
    const [cluster, setCluster] = useState()
    const [isPending, hasPending] = useState(true)
    useEffect(() => {
        getUserCluster(externalId)
            .then(cluster => {
                getUserProfile(externalId)
                    .then(user => {
                        setCluster(cluster)
                        setUser(user)
                        hasPending(false)
                    })
                    .catch(status => handleApiError(
                        status,
                        () => navigate("/"),
                        () => navigate("/error")
                    ))
            })
            .catch(status => handleApiError(
                status,
                () => navigate("/"),
                () => navigate("/error")
            ))
    }, [])

    if(isPending) {
        return(
            <div className={'pending-wrapper'}>
                <h3 className={'pending-header'}>{t('text.loading')}</h3>
            </div>
        )
    }

    return(
        <div className={'user-page-wrapper'}>
            <div className={'user-info-wrapper'}>
                <h3 className={'user-name-wrapper'}>{`${user?.surname} ${user?.name} ${user?.middleName}`}</h3>
                <div className={'user-details-wrapper'}>
                    <p className={'user-details-item'}>{`${t('text.username')} - ${username}`}</p>
                    <p className={'user-details-item'}>{`${t('text.email')} - ${user?.email}`}</p>
                    <p className={'user-details-item'}>{`${t('text.clusterId')} - ${cluster?.clusterExternalId}`}</p>
                    <p className={'user-details-item'}>{`${t('text.userId')} - ${cluster?.userExternalId}`}</p>
                    <button onClick={() => navigate(`/recreate/${user?.externalId}`)} className={'common-button'}>{t('button.deletedObjects')}</button>
                </div>
            </div>
            <div className={'directory-list-wrapper'}>
                {cluster.directories.map(item => <DirectoryCard directory={item} key={item.directory.externalId}/>)}
            </div>
        </div>
    )
}