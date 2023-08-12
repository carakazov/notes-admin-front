import './main.css'
import {Route, Routes} from "react-router-dom";
import LoginForm from "../loginform/LoginForm";
import UserList from "../userlist/UserList";
import UserProfile from "../userprofile/UserProfile";

export default function Main() {
    return(
        <main className={'inner-main-wrapper'}>
            <Routes>
                <Route exact path={'/'} element={<LoginForm/>}></Route>
                <Route exact path={'/users'} element={<UserList/>}></Route>
                <Route exact path={'/users/:externalId/:username'} element={<UserProfile/>}></Route>
            </Routes>
        </main>
    )
}