import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import useGetData from '../../services/getData';
import Skeleton from '../skeleton/Skeleton';
import {useState,useEffect} from "react";
const CharInfo = (props)=> {
    const {getCharacter,loading,error}=useGetData();
    const [array,setArray]=useState(null);
    const [skelet,setSkelet]=useState(true);
    useEffect(()=>{
        if(props.idChar===null)return
        onLoadArray();
        getCharacter(props.idChar).then(onLoadArray);
      
    },[props.idChar]);

    const onLoadArray=(arr)=>{
        setArray(arr);
        console.log(arr)
        setSkelet(false)
}
        const Error=error?<Error/>:null;
        const Loading=loading?<Spinner/>:null;
        const Elem=!(loading||loading||skelet)?View(array):null;
        const Skelet=skelet?<Skeleton/>:null;
        return (
            <div className="char__info">
               {Error}
               {Loading}
               {Elem}
               {Skelet}
            </div>
        )
    }
 const View=(object)=>{
    if(object===undefined)return null
    console.log(object.comics)
    const arrComics=[];
    object.comics.forEach(item => {
        arrComics.push(
            <li className="char__comics-item">
              {item.name}
             </li>
        )
    });
    return(
        <>
             <div className="char__basics">
                    <img src={object.picture} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{object.name}</div>
                        <div className="char__btns">
                            <a href="#" className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={object.wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {object.text}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                {arrComics}
                   
                </ul>
        </>
    )
}
export default CharInfo;