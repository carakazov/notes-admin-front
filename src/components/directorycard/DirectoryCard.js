import './directorycard.css'
import {useTranslation} from "react-i18next";
import {useState} from "react";
import NoteCard from "../notecard/NoteCard";
import DeleteHistoryModal from "../modal/deletehistory/DeleteHistoryModal";

export default function DirectoryCard(props) {
    const {directory} = props
    const [isShowNotes, hasShowNotes] = useState(false)
    const [isModalActive, hasModalActive] = useState(false)
    const {t} = useTranslation()
    function getNotesBlock() {
        return(
            <div className={'notes-block-wrapper'}>
                <div className={'notes-block-header'}>{t('text.notesList')}</div>
                {directory.notes.map(item => <NoteCard note={item} key={item.externalId}/>)}
                <div className={'close-button-wrapper'}>
                    <button onClick={() => hasShowNotes(false)} className={'common-button'}>{t('button.close')}</button>
                </div>
            </div>
        )
    }

    const notesBlock = isShowNotes ? getNotesBlock() : null

    function hideModalWindow() {
        hasModalActive(false)
    }

    return(
        <div className={'directory-card-wrapper'}>
            <div className={'directory-block-wrapper'}>
                <div className={'directory-info-wrapper'}>
                    <div className={'directory-info-item'}>
                        {directory.directory.title}
                    </div>
                    <div className={'directory-info-item'}>
                        {directory.directory.creationDate}
                    </div>
                    <div className={'directory-info-item'}>
                        {directory.directory.externalId}
                    </div>
                </div>
                <div className={'directory-controls'}>
                    <button className={'common-button directory-controls-button'} onClick={() => hasShowNotes(true)}>{t('button.showNotes')}</button>
                    <button className={'common-button'} onClick={() => hasModalActive(true)}>{t('button.showDeleteHistory')}</button>
                </div>
            </div>
            {notesBlock}
            {isModalActive ? <DeleteHistoryModal externalId={directory.directory.externalId} objectType={'directory'} hideFunction={hideModalWindow}/> : null}
        </div>
    )
}