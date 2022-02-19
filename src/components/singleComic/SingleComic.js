import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import useGetData from '../../services/getData';
import { useEffect,useState } from 'react';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
const SingleComic = (props) => {
    const [content,setContent]=useState(null);
    const {getSomeComics,loading,error}=useGetData();
    const [firstLoading,setFirstLoading]=useState(true);
    useEffect(()=>{
        getSomeComics(props.id).then(toDoAfterGetData);
    },[props.id]);
    const toDoAfterGetData=(data)=>{
        setContent(data);
    }
    console.log(content)
    if (!content)return<Spinner/>;

    console.log(loading&&firstLoading)
    const element=loading||!content?<Spinner/>:error?<Error/>:<View content={content} backToComicsList={()=>props.backToComicsList()}/>;
    return (
        <>
        {element}
        </>
        //asdasdf
    )
}
function View(props){
    if(!props.content)return
    return(
        <div className="single-comic">
        <img src={props.content.image} alt="x-men" className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{props.content.title}</h2>
            <p className="single-comic__descr">{props.content.text?props.content.text:"No information"}</p>
            <p className="single-comic__descr">Count of pages: {props.content.numberOfIssue}</p>
            <p className="single-comic__descr">{props.content.language}</p>
            <div className="single-comic__price">{props.content.price+"$"}</div>
        </div>
        <a href="#" className="single-comic__back" onClick={()=>props.backToComicsList()}>Back to all</a>
    </div>
    )
}
export default SingleComic;