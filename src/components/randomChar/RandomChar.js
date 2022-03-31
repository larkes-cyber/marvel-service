import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useGetData from '../../services/getData';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import { useState,useEffect} from 'react';

const RandomChar = () => {
    const {getCharacter, loading, error, clearError}=useGetData();
    const [char, setChar]=useState({
        name:null,
        text:null,
        homepage:null,
        wiki:null,
        picture:null
    })


    const onLoadState = (char) => {
        const str = 'image_not_available.jpg';
        const coun = char.picture;

        if(coun.substr(char.picture.length-23,23) === str){
            const elem = document.querySelector('.randomchar__img');
            elem.style.objectFit="contain";
        }
        setChar(char);

    }


    useEffect(()=>{
        updateChar();
    },[])


    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
        .then(res => onLoadState(res))
    }


    const onChangeRandomChar = () => {
        updateChar();
    }


    const loadingBlock=loading ? <Spinner/> : null;
    const errorBlock=error ? <Error/> : null;
    const content= !(loading || error) ? 
        <View data={
            {
            name:char.name,
            img:char.picture,
            text:char.text,
            homepage:char.homepage,
            wiki:char.wiki
            }
        }/> : null


    return (
        <div className="randomchar">
           {loadingBlock}
           {errorBlock}
           {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={onChangeRandomChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    }

const View=(props)=>{
    const {name,img,text,homepage,wiki}=props.data;
    return(
        <div className="randomchar__block">
        <img src={img} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {text}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div> 
    )
}
export default RandomChar;