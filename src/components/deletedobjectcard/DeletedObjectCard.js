import './deletedobjectcard.css'
import {useTranslation} from "react-i18next";
import {recreateDirectory, recreateNote} from "../../api/logicApi";
import {handleApiError} from "../../helpers/errorHandler";
import {useNavigate} from "react-router";
import {useContext} from "react";
import {UserProfileContext} from "../../context/userProfileContext";

export default function DeletedObjectCard(props) {
    const {object, objectType, reloadFunction} = props
    const {hasUpdateProfile} = useContext(UserProfileContext)
    const navigate = useNavigate()

    const {t} = useTranslation()

    function recreate() {
        if(objectType === 'directory') {
            recreateDirectory(object.externalId)
                .then(() => {
                    //hasUpdateProfile(true)
                    reloadFunction()
                })
                .catch(
                    status => handleApiError(
                        status,
                    () => navigate("/admin"),
                    () => navigate("/admin/error")
                    )
                )
        }
        if(objectType === 'note') {
            recreateNote(object.externalId)
                .then(() => {
                    //hasUpdateProfile(true)
                    reloadFunction()
                })
                .catch(
                    status => handleApiError(
                        status,
                        () => navigate("/admin"),
                        () => navigate("/admin/error")
                    )
                )
        }
    }

    return(
        <div className={'deleted-object-wrapper'}>
            <div className={'deleted-object-info-wrapper'}>
                <div className={'deleted-title-wrapper'}>
                    {object.title}
                </div>
            </div>
            <div className={'recreate-button-wrapper'}>
                <button onClick={recreate} className={'common-button'}>{t('button.recreate')}</button>
            </div>
        </div>
    )
}