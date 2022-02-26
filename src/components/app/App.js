import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';
import ErrorBoud from '../errorBouderlend/ErrorBouderlend';
import ComicsList from "../comicsList/ComicsList";
import MainPage from "../pages/mainPage";
import { BrowserRouter, Route, Routes} from "react-router-dom";
const App = ()=> {

    return (
        <BrowserRouter>
        <div className="app">
            <AppHeader/>
            <main>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/comics" element={<ComicsList/>}/>
                </Routes>
            </main>
        </div>
        </BrowserRouter>        
      ) 
    
}

export default App;