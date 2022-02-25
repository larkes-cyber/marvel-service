import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';
import ErrorBoud from '../errorBouderlend/ErrorBouderlend';
import ComicsList from "../comicsList/ComicsList";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
const App = ()=> {
    const [state,setState]=useState(null);
    const onLoadIdChar=(id)=>{
        setState(id);
    }
    return (
        <Router>
        <div className="app">
            <AppHeader/>
            <main>
                <Switch>
                    <Route exact path="/">
                        <RandomChar/>
                        <div className="char__content">
                                <CharList onLoadIdChar={(id)=>onLoadIdChar(id)}/>
                                    <ErrorBoud>
                                     <CharInfo idChar={state}/>
                                    </ErrorBoud>
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </Route>
                    <Route exact path="/comics">
                     <ComicsList/>
                    </Route>
                </Switch>
            </main>
        </div>
    </Router>        
      ) 
    
}

export default App;