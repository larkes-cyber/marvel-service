import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useGetData from '../../services/getData';
import { useEffect,useState } from 'react';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import { Link } from 'react-router-dom';
import AppBanner from '../appBanner/AppBanner';
import Helmet from 'react-helmet';


const ComicsList = () => {
    const [array,setArray]=useState([]);
    const [offset,setOffset]=useState(1);
    const [firstUpload,setFirstUpload]=useState(true);
    const {getComics,loading,error}=useGetData();
    useEffect(()=>{
        getComics().then(data=>uploadData(data,true));
        setFirstUpload(false)
    },[])
    const uploadData=(data,init=false)=>{
        setFirstUpload(init);
        setArray(array=>[...array,...data]);
    }

   const addComics=()=>{
    getComics(offset+8).then(uploadData);
    setOffset(offset=>offset+8);
   }
    const content=loading&&!firstUpload?<Spinner/>:error?<Error/>:<View array={array}/>;
    return (
        <div className="comics__list">
             <Helmet>
                <meta
                    name="description"
                    content="Marvel list of our comics"
                />
                <title>Marvel list of our comics</title>
            </Helmet>
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
const View=(props)=>{
    
    if (props.array===null) return null
    const Elems=props.array.map((item,i)=>{
        return(
            <Link to={`/comics/comic:${item.id}`}>
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={item.thumbnail.path+'.'+item.thumbnail.extension} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices[0].price+"$"}</div>
                    </a>
             </li>
            </Link>
        )
    });
    return(
        <>
            <AppBanner/>
            <ul className="comics__grid" style={{"margin-top":"5%"}}>
                {Elems}
            </ul>
        </>
      
    )
}
export default ComicsList;