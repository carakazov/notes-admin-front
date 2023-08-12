import './notecard.css'
import {useTranslation} from "react-i18next";
import {useState} from "react";
import NoteContentModal from "../modal/notecontent/NoteContentModal";
import DeleteHistoryModal from "../modal/deletehistory/DeleteHistoryModal";

export default function NoteCard(props) {
    const {note} = props
    const [isContentModalActive, hasContentModalActive] = useState(false)
    const [isDeleteHistoryModalActive, hasDeleteHistoryModalActive] = useState(false)
    const {t} = useTranslation()

    return(
        <div className={'note-card-wrapper'}>
            <div className={'note-info-wrapper'}>
                <div className={'note-info-item'}>
                    {note.title}
                </div>
                <div className={'note-info-item'}>
                    {note.creationDate}
                </div>
                <div className={'note-info-item'}>
                    {note.externalId}
                </div>
            </div>
            <div className={'note-controls'}>
                <button className={'common-button'} onClick={() => hasContentModalActive(true)}>{t('button.content')}</button>
                <button className={'common-button'} onClick={() => hasDeleteHistoryModalActive(true)}>{t('button.showDeleteHistory')}</button>
                <button className={'common-button'}>{t('button.showArchive')}</button>
            </div>
            {isContentModalActive ? <NoteContentModal content={note.content} hideFunction={() => hasContentModalActive(false)}/> : null}
            {isDeleteHistoryModalActive ? <DeleteHistoryModal externalId={note.externalId} objectType={'note'} hideFunction={() => hasDeleteHistoryModalActive(false)}/> : null}
        </div>
    )
}