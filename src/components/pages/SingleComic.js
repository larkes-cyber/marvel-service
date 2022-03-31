import './singleComic.scss';
import useGetData from '../../services/getData';
import { useEffect,useState } from 'react';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import { useParams, Link } from 'react-router-dom';

const getInformationToRequest = (data) => {

    let kindOf = data[0]+data[1] !== 'ch', 
     id = '',
     flag = false;



    for(let i = 0; i < data.length; i++){
        let item = data[i]
        if(flag){
            id += item
        }

        if(item === ":"){
            flag = true
        }     
    }

    return [kindOf,id]

}

const SingleComic = (props) => {

    const dataForRequest = useParams().idElem;
    const [content, setContent] = useState(null);
    const {getSomeComics, getCharacterByName, loading, error} = useGetData();
    const [firstLoading, setFirstLoading] = useState(true);
    let [onSwitch, setOnSwitch] = useState(true);
    
    useEffect(()=>{

        const [kindOfRequest, id] = getInformationToRequest(dataForRequest)

        if(kindOfRequest){
            getSomeComics(id).then(toDoAfterGetData);
        }else{
            getCharacterByName(id).then(toDoAfterGetData);  
        }

    },[dataForRequest]);
    const toDoAfterGetData=(data)=>{
        setOnSwitch(false)
        console.log(onSwitch)

        let forView = []

        for(let n in data){
            forView.push(data[n])
        }

        setContent(forView);

    }
    if (!content)return<Spinner/>;

    console.log(onSwitch)
    const element=loading||!content?<Spinner/>:error?<Error/>:<View content={content} kindOf = {onSwitch} backToComicsList={()=>props.backToComicsList()}/>;
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
        <img src={props.content[2]} alt="x-men" className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{props.content[0]}</h2>
            <p className="single-comic__descr">{props.content[1]?props.content[1]:"No information"}</p>
            {
                props.kindOf ? (
                    <>
                        <p className="single-comic__descr">pages: {props.content[3]}</p>
                        <p className="single-comic__descr">language: {props.content[4]}</p>
                        <div className="single-comic__price">{props.content[5]+"$"}</div>
                    </>
                ) : null
            }
        </div>
        <Link to={ props.kindOf ? "/comics" : "/"}>
          <a href="#" className="single-comic__back">Back to all</a>
        </Link>
    </div>
    )
}
export default SingleComic;