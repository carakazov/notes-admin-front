import './main.css'
import {Route, Routes} from "react-router-dom";
import LoginForm from "../loginform/LoginForm";
import UserList from "../userlist/UserList";

export default function Main() {
    return(
        <main className={'inner-main-wrapper'}>
            <Routes>
                <Route exact path={'/'} element={<LoginForm/>}></Route>
                <Route exact path={'/users'} element={<UserList/>}></Route>
            </Routes>
        </main>
    )
}