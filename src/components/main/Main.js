import './main.css'
import {Route, Routes} from "react-router-dom";
import LoginForm from "../loginform/LoginForm";
import UserList from "../userlist/UserList";
import UserProfile from "../userprofile/UserProfile";
import {useState} from "react";
import {NoteDetailsContext} from "../../context/noteDetailsContext";
import NoteDetails from "../notedetails/NoteDetails";
import RestorePage from "../restorepage/RestorePage";
import ErrorPage from "../errorpage/ErrorPage";

export default function Main() {
    const [currentNote, setCurrentNote] = useState()

    return(
        <NoteDetailsContext.Provider value={{currentNote, setCurrentNote}}>
            <main className={'inner-main-wrapper'}>
                <Routes>
                    <Route exact path={'/'} element={<LoginForm/>}></Route>
                    <Route exact path={'/users'} element={<UserList/>}></Route>
                    <Route exact path={'/users/:externalId/:username'} element={<UserProfile/>}></Route>
                    <Route exact path={'/note'} element={<NoteDetails/>}></Route>
                    <Route exact path={'/recreate/:externalId'} element={<RestorePage/>}></Route>
                    <Route exact path={'/error'} element={<ErrorPage/>}></Route>
                </Routes>
            </main>
        </NoteDetailsContext.Provider>
    )
}