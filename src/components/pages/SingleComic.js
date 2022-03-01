import './singleComic.scss';
import useGetData from '../../services/getData';
import { useEffect,useState } from 'react';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import { useParams, Link } from 'react-router-dom';


const SingleComic = (props) => {
    const dataId = useParams().idElem;
    const [content,setContent] = useState(null);
    const {getSomeComics,loading,error} = useGetData();
    const [firstLoading, setFirstLoading] = useState(true);
    
    useEffect(()=>{
        getSomeComics(dataId).then(toDoAfterGetData);
    },[dataId]);
    const toDoAfterGetData=(data)=>{
        setContent(data);
    }
    console.log(content)
    if (!content)return<Spinner/>;

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
            <p className="single-comic__descr">pages: {props.content.numberOfIssue}</p>
            <p className="single-comic__descr">language: {props.content.language}</p>
            <div className="single-comic__price">{props.content.price+"$"}</div>
        </div>
        <Link to={"/comics"}>
          <a href="#" className="single-comic__back">Back to all</a>
        </Link>
    </div>
    )
}
export default SingleComic;