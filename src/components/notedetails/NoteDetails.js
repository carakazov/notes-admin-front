import './notedetails.css'
import {useContext, useState} from "react";
import {NoteDetailsContext} from "../../context/noteDetailsContext";
import {useTranslation} from "react-i18next";
import DeleteHistoryModal from "../modal/deletehistory/DeleteHistoryModal";
import ReplacingHistoryModal from "../modal/replacinghistory/ReplacingHistoryModel";
import ArchiveListModal from "../modal/archivelist/ArchiveListModal";

export default function NoteDetails() {
    const {currentNote} = useContext(NoteDetailsContext)
    const [isDeleteHistoryModalActive, hasDeleteHistoryModalActive] = useState(false)
    const [isMoveHistoryModalActive, hasMoveHistoryModalActive] = useState(false)
    const [isArchiveHistoryModalActive, hasArchiveHistoryModalActive] = useState(false)
    const {t} = useTranslation()

    return(
        <div className={'note-details-page'}>
            <div className={'note-header-wrapper'}>
                <div className={'note-title-wrapper'}>
                    {currentNote?.title}
                </div>
                <div className={'note-external-id-wrapper'}>
                    {currentNote?.externalId}
                </div>
            </div>
            <div className={'note-controls-wrapper'}>
                <button onClick={() => hasMoveHistoryModalActive(true)} className={'common-button'}>{t('button.showMoveHistory')}</button>
                <button onClick={() => hasArchiveHistoryModalActive(true)} className={'common-button'}>{t('button.showArchive')}</button>
                <button onClick={() => hasDeleteHistoryModalActive(true)} className={'common-button'}>{t('button.showDeleteHistory')}</button>
            </div>
            {isDeleteHistoryModalActive ? <DeleteHistoryModal externalId={currentNote.externalId} objectType={'note'} hideFunction={() => hasDeleteHistoryModalActive(false)}/> : null}
            {isMoveHistoryModalActive ? <ReplacingHistoryModal externalId={currentNote.externalId} hideFunction={() => hasMoveHistoryModalActive(false)}/> : null}
            {isArchiveHistoryModalActive ? <ArchiveListModal externalId={currentNote.externalId} hideFunction={() => hasArchiveHistoryModalActive(false)}/> : null}
        </div>
    )
}