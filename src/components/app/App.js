import './app.css';
import Header from "../header/Header";
import Main from "../main/Main";
export default function App() {
    return(
        <div className={'app-wrapper'}>
            <div className={'header-wrapper'}>
                <Header/>
            </div>
            <div className={'main-wrapper'}>
                <Main/>
            </div>
        </div>
    )
}