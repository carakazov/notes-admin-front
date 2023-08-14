import '../modal.css'
import './archivelistmodal.css'
import {useEffect, useState} from "react";
import {getArchive, getVersion} from "../../../api/logicApi";
import {handleApiError} from "../../../helpers/errorHandler";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import NoteContentModal from "../notecontent/NoteContentModal";

export default function ArchiveListModal(props) {
    const {externalId, hideFunction} = props
    const [archive, setArchive] = useState()
    const [versionContent, setVersionContent] = useState()
    const [isContentModalActive, hasContentModalActive] = useState(false)
    const {t} = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        getArchive(externalId)
            .then(result => setArchive(result))
            .catch(status => handleApiError(
                status,
                () => navigate("/admin"),
                () => navigate("/admin/error")
            ))
    }, [externalId])

    function getVersionContent(versionId) {
        getVersion(versionId)
            .then(result => {
                setVersionContent(result.content)
                hasContentModalActive(true)
            })
            .catch(status => handleApiError(
                status,
                () => navigate("/admin"),
                () => navigate("/admin/error")
            ))
    }

    return(
        <div className={'modal'} onClick={() => hideFunction()}>
            <div className={'archive-history-wrapper'} onClick={e => e.stopPropagation()}>
                <div className={'note-details-header-wrapper'}>
                    <div className={'note-details-title-wrapper'}>
                        {archive?.note.noteTitle}
                    </div>
                    <div className={'note-external-id-wrapper'}>
                        {archive?.note.noteExternalId}
                    </div>
                </div>
                <div className={'archive-wrapper'}>
                    {archive?.history.map(item =>
                        <div className={'archive-item'}>
                            <div className={'archive-date'}>
                                {item.editedDate}
                            </div>
                            <button onClick={() => getVersionContent(item.versionNoteGuid)} className={'common-button'}>{t('button.showArchive')}</button>
                        </div>
                    )}
                </div>
            </div>
            {isContentModalActive ? <NoteContentModal content={versionContent} hideFunction={() => hasContentModalActive(false)}/> : null}
        </div>
    )
}