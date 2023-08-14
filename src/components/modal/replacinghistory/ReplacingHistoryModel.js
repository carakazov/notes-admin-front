import '../modal.css'
import './replacinghistorymodal.css'
import {useEffect, useState} from "react";
import {getMoveHistory} from "../../../api/logicApi";
import {handleApiError} from "../../../helpers/errorHandler";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

export default function ReplacingHistoryModal(props) {
    const {externalId, hideFunction} = props
    const [history, setHistory] = useState()
    const {t} = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        getMoveHistory(externalId)
            .then(result => setHistory(result))
            .catch(status => handleApiError(
                status,
                () => navigate("/admin"),
                () => navigate("/admin/error")
            ))
    }, [externalId])

    return(
        <div className={'modal'} onClick={() => hideFunction()}>
            <div className={'replacing-history-modal-wrapper'} onClick={e => e.stopPropagation()}>
                <div className={'note-details-header-wrapper'}>
                    <div className={'note-details-title-wrapper'}>
                        {history?.note.noteTitle}
                    </div>
                    <div className={'note-external-id-wrapper'}>
                        {history?.note.noteExternalId}
                    </div>
                </div>
                <div className={'move-history-wrapper'}>
                    {history?.history.map(item =>
                        <div className={'move-item'}>
                            <div className={'move-route-wrapper'}>
                                {`${t('text.from')}: ${item.sourceDirectory.directoryTitle}, ${t('text.to')}: ${item.targetDirectory.directoryTitle}`}
                            </div>
                            <div className={'move-date-wrapper'}>
                                {item.replacingDate}
                            </div>
                        </div>
                    )}
               </div>
            </div>
        </div>
    )
}