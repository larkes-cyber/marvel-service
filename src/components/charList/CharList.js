import './charList.scss';
import useGetData from '../../services/getData';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import {useState,useEffect} from 'react';
import { Transition } from 'react-transition-group'; 
import { TransitionGroup } from 'react-transition-group';

const CharList = (props)=> {
    const {getAllCharacters, error, loading,  clearError} = useGetData();
    const [arrayElems, setArrayElems] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [toRed, setToRed] = useState(null);
    const [offset, setOffset] = useState(130);

    useEffect(() => {
        onRequest(offset, true);
    },[])

    const onRequest=(offset, init) => {
        clearError();
        init?setNewItemLoading(false):setNewItemLoading(true);
       getAllCharacters(offset)
        .then(onCharListLoaded)
    }

    const onCharListLoaded = (arrayElems) => {
        const arr = arrayElems;
        arr.splice(9, 11)
        setArrayElems(arrayElems => [...arrayElems, ...arr]);
        setNewItemLoading(false);
        setOffset(offset => offset+9);
    } 
    
    const uploadChar=(e, elem)=>{
        e.currentTarget.parentNode.childNodes.forEach(item => {
            if(item.dataset.key === toRed){
                if(item.classList.contains('lolka')){
                    item.classList.remove('lolka');
                }
            }
        })

        e.currentTarget.parentNode.childNodes.forEach(item=>{
            if(item.dataset.key === elem){
                item.className += ' lolka';
                setToRed(elem);
            }
        })

    }

    const renderOfElements = () => {

        const duration = 11300;

        const defaultStyle = {
        transition: `opacity visibility ${duration}ms ease-in-out`,
        opacity: 0,
        visibility:'hidden'
         }


        const transitionStyles = {
        entering: { opacity: 1, visibility:'visible' },
        entered:  { opacity: 1, visibility:'visible' },
        exiting:  { opacity: 0, visibility:'hidden' },
        exited:  { opacity: 0, visibility:'hidden' },
         };


        const elems = [];

        arrayElems.forEach((item, i)=>{
                elems.push(
                    <Transition in={true} timeout={duration}>
                        {state => ( 
                            <li className="char__item"
                                 key={item.id}
                                 onClick={(e) => {
                                     uploadChar(e, e.currentTarget.dataset.key);
                                     props.onLoadIdChar(item.id);
                                     }
                                  }
                                data-key={item.id}
                                style = {{
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}
                        
                            >
                                <img src={item.picture} className={item.picture.substr(item.picture.length-23,23)==='image_not_available.jpg'?'fixPic':null} alt="abyss"/>
                                <div className="char__name">{item.name}</div>
                            </li>
                          )
                        }
                            
                    </Transition>
                                
                    )
            })


        return (
            <TransitionGroup component={null}>
                <ul className="char__grid">
                    {elems}
                </ul>
            </TransitionGroup>
               
          )        
        }

    const result = renderOfElements();

    const output = error?<Error/>:loading && !newItemLoading?<Spinner/>:result;
    return (
        <div className="char__list">
            {output}
            <button 
             className="button button__main button__long"
             disabled={newItemLoading}
             onClick={()=>onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
        )
    }

export default CharList;
