import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import FindCharacter from "../findCharacter/findCharacter";

const MainPage=()=>{
    const [state,setState]=useState(null);
    const onLoadIdChar=(id)=>{
        setState(id);
    }
    return(
        <>
            <RandomChar/>
            <div className="char__content">
               <CharList onLoadIdChar={(id)=>onLoadIdChar(id)}/>
               <div>
                   <CharInfo idChar={state}/>
                    <FindCharacter/>
               </div>
               
              
               <img className="bg-decoration" src={decoration} alt="vision"/> 
            </div>
        </>
    
    )
}
export default MainPage;