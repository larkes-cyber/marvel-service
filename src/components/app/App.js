import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsList, SingleComic, Page404} from "../pages";
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
                    <Route path="/comics/:idElem" element={<SingleComic/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </main>
        </div>
        </BrowserRouter>        
      ) 
    
}

export default App;