import '../modal.css'
import './deletehistorymodal.css'
import {useEffect, useState} from "react";
import {getDirectoryDeleteHistory, getNoteDeleteHistory} from "../../../api/logicApi";
import {handleApiError} from "../../../helpers/errorHandler";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

export default function DeleteHistoryModal(props) {
    const {externalId, objectType, hideFunction} = props
    const navigate = useNavigate()
    const {t} = useTranslation()

    const [historyWrapper, setHistoryWrapper] = useState()

    useEffect(() => {
        if(objectType === 'directory') {
            getDirectoryDeleteHistory(externalId)
                .then(result => setHistoryWrapper(result))
                .catch(status => handleApiError(
                    status,
                    () => navigate("/"),
                    () => navigate("/error")
                ))
        } else {
            getNoteDeleteHistory(externalId)
                .then(result => setHistoryWrapper(result))
                .catch(status => handleApiError(
                    status,
                    () => navigate("/"),
                    () => navigate("/error")
                ))
        }
    }, [externalId])

    return(
        <div className={'modal'} onClick={() => hideFunction()}>
            <div className={'delete-history-modal'} onClick={e => e.stopPropagation()}>
                <div className={'deleted-object-header'}>
                    <div className={'object-title'}>
                        {historyWrapper?.objectTitle}
                    </div>
                    <div className={'current-state-wrapper'}>
                        {`${t('text.currentState')}: ${historyWrapper?.currentState}`}
                    </div>
                </div>
                <div className={'history-wrapper'}>
                    {historyWrapper?.history.map(item => {
                        return(
                            <div className={'history-item-wrapper'}>
                                <p className={'history-item'}>{item.event}</p>
                                <p className={'history-item-date'}>{item.eventDate}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}