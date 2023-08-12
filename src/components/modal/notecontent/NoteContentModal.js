import '../modal.css'
import './notecontentmodal.css'

export default function NoteContentModal(props) {
    const {content, hideFunction} = props

    return(
        <div className={'modal'} onClick={() => hideFunction()}>
            <div className={'note-content-modal'} onClick={e => e.stopPropagation()}>
                {content}
            </div>
        </div>
    )
}