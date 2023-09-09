import './app.css';
import Header from "../header/Header";
import Main from "../main/Main";
import {useEffect, useState} from "react";
import {AuthContext} from "../../context/authContext";
import {LOGIN_KEY} from "../../constans/tokenConstants";
import {useNavigate} from "react-router";
export default function App() {
    const [crutch, setCrutch] = useState(true)
    const navigate = useNavigate()
    //Не смотрите сюда, это такой костыль
    useEffect(() => {
        if(crutch) {
            navigate("/")
            setCrutch(false)
        }
    }, [crutch])

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