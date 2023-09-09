import './restorepage.css'
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {getDeletedObjects} from "../../api/logicApi";
import {handleApiError} from "../../helpers/errorHandler";
import DeletedObjectCard from "../deletedobjectcard/DeletedObjectCard";
import {useTranslation} from "react-i18next";

export default function RestorePage() {
    const params = useParams()
    const {externalId} = params
    const navigate = useNavigate()

    const {t} = useTranslation()
    const [deletedObjects, setDeletedObjects] = useState()
    const [isShouldReload, hasShouldReload] = useState(true)

    useEffect(() => {
        if(isShouldReload) {
            getDeletedObjects(externalId)
                .then(result => {
                    setDeletedObjects(result)
                    hasShouldReload(false)
                })
                .catch(status => handleApiError(
                    status, () => navigate("/"), () => navigate("/error"))
                )
        }
    }, [isShouldReload])

    function reloadFunction() {
        hasShouldReload(true)
    }

    return(
        <div className={'restore-page-wrapper'}>
            <div className={'deleted-directory-wrapper'}>
                <p>{t('text.directories')}</p>
                {deletedObjects?.directories.map(item =>
                    <DeletedObjectCard object={item} objectType={'directory'} reloadFunction={reloadFunction} key={item.externalId}/>
                )}
            </div>
            <div className={'deleted-note-wrapper'}>
                <p>{t('text.notes')}</p>
                {deletedObjects?.notes.map(item =>
                    <DeletedObjectCard object={item} objectType={'note'} reloadFunction={reloadFunction} key={item.externalId}/>
                )}
            </div>
        </div>
    )
}