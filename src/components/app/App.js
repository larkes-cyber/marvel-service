import { BrowserRouter, Route, Routes} from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/spinner";

const Page404 = lazy(() => import('../pages/page404'));
const MainPage = lazy(() => import('../pages/mainPage'));
const ComicsList = lazy(() => import('../pages/ComicsList'));
const SingleComic = lazy(() => import('../pages/SingleComic'));

const App = ()=> {

    return (
        <BrowserRouter>
        <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsList/>}/>
                        <Route path="/comics/:idElem" element={<SingleComic/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </main>
        </div>
        </BrowserRouter>        
      ) 
    
}

export default App;