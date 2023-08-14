import './notecard.css'
import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import NoteContentModal from "../modal/notecontent/NoteContentModal";
import DeleteHistoryModal from "../modal/deletehistory/DeleteHistoryModal";
import {NoteDetailsContext} from "../../context/noteDetailsContext";
import {useNavigate} from "react-router";

export default function NoteCard(props) {
    const {note} = props
    const [isContentModalActive, hasContentModalActive] = useState(false)
    const {t} = useTranslation()
    const {setCurrentNote} = useContext(NoteDetailsContext)
    const navigate = useNavigate()

    function goToNoteDetails() {
        setCurrentNote(note)
        navigate('/admin/note')
    }

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
                <button className={'common-button'} onClick={goToNoteDetails}>{t('button.details')}</button>
            </div>
            {isContentModalActive ? <NoteContentModal content={note.content} hideFunction={() => hasContentModalActive(false)}/> : null}
        </div>
    )
}