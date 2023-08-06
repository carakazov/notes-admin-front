import './main.css'
import {Route, Routes} from "react-router-dom";
import LoginForm from "../loginform/LoginForm";

export default function Main() {
    return(
        <main className={'inner-main-wrapper'}>
            <Routes>
                <Route exact path={'/'} element={<LoginForm/>}></Route>
            </Routes>
        </main>
    )
}