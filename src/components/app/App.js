import './app.css';
import Header from "../header/Header";
import Main from "../main/Main";
import {useState} from "react";
import {AuthContext} from "../../context/authContext";
import {LOGIN_KEY} from "../../constans/tokenConstants";
export default function App() {
    const [isLogged, hasLogged] = useState(sessionStorage.getItem(LOGIN_KEY) !== null)

    return(
        <AuthContext.Provider value={{isLogged, hasLogged}}>
            <div className={'app-wrapper'}>
                <div className={'header-wrapper'}>
                    <Header/>
                </div>
                <div className={'main-wrapper'}>
                    <Main/>
                </div>
            </div>
        </AuthContext.Provider>
    )
}