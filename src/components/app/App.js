import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';
import ErrorBoud from '../errorBouderlend/ErrorBouderlend';
import SingleComic from "../singleComic/SingleComic";
import ComicsList from "../comicsList/ComicsList";
const App = ()=> {
    const [state,setState]=useState(null);
    const [page,setPage]=useState(true);
    const onLoadIdChar=(id)=>{
        setState(id);
    }
    const toSetPage=(bool)=>{
        setPage(bool);  
    }
    return (
         <div className="app">
            <AppHeader toSetPage={toSetPage}/>
            <main>
                {page? <MainPage state={state} onLoadIdChar={onLoadIdChar}/> :<ComicsList/>}
            </main>
          </div>
      ) 
    
}//    {/* <ComicsList/> */} {/* <SingleComic/> */}
const MainPage=(props)=>{
    return(
        <>
        <RandomChar/>
            <div className="char__content">
                <CharList onLoadIdChar={(id)=>props.onLoadIdChar(id)}/>
                    <ErrorBoud>
                        <CharInfo idChar={props.state}/>
                    </ErrorBoud>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
export default App;