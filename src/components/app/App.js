import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';
import ErrorBoud from '../errorBouderlend/ErrorBouderlend';
const App = ()=> {
    const [state,setState]=useState(null);
    const onLoadIdChar=(id)=>{
        setState(id);
    }
  
    return (
         <div className="app">
            <AppHeader/>
            <main>
                 <RandomChar/>
                <div className="char__content">
                     <CharList onLoadIdChar={onLoadIdChar}/>
                    <ErrorBoud>
                         <CharInfo idChar={state}/>
                     </ErrorBoud>
                 </div>
                 <img className="bg-decoration" src={decoration} alt="vision"/>
             </main>
          </div>
      ) 
    
}

export default App;