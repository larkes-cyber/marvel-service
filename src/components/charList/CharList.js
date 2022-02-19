import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import useGetData from '../../services/getData';
import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import {useState,useEffect} from 'react';
const CharList = (props)=> {
    const {getAllCharacters,error,loading}=useGetData();
    const [array,setArray] = useState([]);
    const [arrayElems,setArrayElems]=useState([]);
    const [newItemLoading,setNewItemLoading]=useState(false);
    const [toRed,setToRed]=useState(null);
    const [offset,setOffset]=useState(250);
    useEffect(()=>{
        onRequest(123,true);

    },[])
    const onRequest=(offset,init)=>{
        init?setNewItemLoading(false):setNewItemLoading(true);
       getAllCharacters(offset)
        .then(onCharListLoaded)
    }
    const onCharListLoaded=(arrayElems)=>{
        const arr=arrayElems;
        arr.splice(9,11)
        setArrayElems(arrayElems=>[...arrayElems, ...arr]);
        setNewItemLoading(false);
        setOffset(offset=>offset+9);
    } 
    const uploadChar=(e,elem)=>{
        e.currentTarget.parentNode.childNodes.forEach(item=>{
            if(item.dataset.key===toRed){
                if(item.classList.contains('lolka')){
                    item.classList.remove('lolka');
                }
            }
        })
        e.currentTarget.parentNode.childNodes.forEach(item=>{
            if(item.dataset.key===elem){
                item.className+=' lolka';
                setToRed(elem);
            }
        })

    }
        const elems=[];
        arrayElems.forEach((item,i)=>{
                elems.push(
                    <li className="char__item"
                        key={item.id}
                        onClick={(e)=>{
                            uploadChar(e,e.currentTarget.dataset.key);
                            props.onLoadIdChar(item.id);
                        }
                        }
                        data-key={item.id}
                    >
                        <img src={item.picture} className={item.picture.substr(item.picture.length-23,23)==='image_not_available.jpg'?'fixPic':null} alt="abyss"/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )
        })

        const output=error?<Error/>:loading && !newItemLoading?<Spinner/>:elems;
        return (
            <div className="char__list">
                <ul className="char__grid">
                   {output}
                </ul>
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