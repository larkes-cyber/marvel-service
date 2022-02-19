import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useGetData from '../../services/getData';
import { useEffect,useState } from 'react';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import SingleComic from '../singleComic/SingleComic';
const ComicsList = () => {
    const [array,setArray]=useState([]);
    const [offset,setOffset]=useState(1);
    const [firstUpload,setFirstUpload]=useState(true);
    const [onTurnMoreInf,setOnTurnMoreInf]=useState(-1);
    const [onChangeMoreInfo,setOnChangeMoreInfo]=useState(false);
    const {getComics,loading,error}=useGetData();
    useEffect(()=>{
        getComics().then(data=>uploadData(data,true));
        setFirstUpload(false)
    },[])
    const uploadData=(data,init=false)=>{
        setFirstUpload(init);
        setArray(array=>[...array,...data]);
    }
    const toMoreInformation=(id)=>{
        setOnTurnMoreInf(id);
        setOnChangeMoreInfo(true);
    }
   const addComics=()=>{
    getComics(offset+8).then(uploadData);
    setOffset(offset=>offset+8);
   }
   const backToComicsList=()=>{
    setOnChangeMoreInfo(false);
   }
    if(!onChangeMoreInfo){
        const content=loading&&!firstUpload?<Spinner/>:error?<Error/>:<View array={array} backToComicsList={backToComicsList} toMoreInformation={toMoreInformation}/>;
        return (
            <div className="comics__list">
                {content}
                <button 
                className="button button__main button__long"
                disabled={loading}
                onClick={addComics}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    else{
        return <SingleComic id={onTurnMoreInf} backToComicsList={backToComicsList}/>
    }
}
const View=(props)=>{
    
    if (props.array===null) return null
    const Elems=props.array.map(item=>{
        console.log(item.id)
        return(
            <li className="comics__item" key={item.id} onClick={()=>props.toMoreInformation(item.id)}>
                    <a href="#">
                        <img src={item.thumbnail.path+'.'+item.thumbnail.extension} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices[0].price+"$"}</div>
                    </a>
             </li>
        )
    });
    return(
        <ul className="comics__grid">
                {Elems}
        </ul>
    )
}
export default ComicsList;