import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import GetData from '../../services/getData';
import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
class CharList extends Component {
    state={
        array:[],
        arrayElems:[],
        loading:true,
        error:false,
        newItemLoading:false,
        offset:210
    }
    componentDidMount(){
        let arrInfo=[]
        this.onRequest();
   
    }
    onRequest=(offset)=>{
        this.onCharListLoading();
        const Data=new GetData();
        Data.getAllCharacters()
        .then(this.onCharListLoaded)
        .catch(()=>{
            this.setState({
                error:true
            })
        } 
        )
    }
    onCharListLoading=()=>{
        this.setState({
            newItemLoading:true
        })
    }
    onCharListLoaded=(arrayElems)=>{
        const arr=arrayElems;
        arr.splice(9,11)
        this.setState(state=>({
            arrayElems:[...state.arrayElems, ...arr],
            loading:false,
            newItemLoading:false,
            offset:state.offset+9
        }))
    } 
    uploadChar=()=>{

    }
    render(){
        const elems=[];
        console.log(this.state.arrayElems)
        this.state.arrayElems.forEach((item,i)=>{
                elems.push(
                    <li className="char__item"
                        key={item.id}
                        onClick={()=>this.props.onLoadIdChar(item.id)}
                    >
                        <img src={item.picture} className={item.picture.substr(item.picture.length-23,23)==='image_not_available.jpg'?'fixPic':null} alt="abyss"/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )
        })

        const output=this.state.error?<Error/>:this.state.loading?<Spinner/>:elems;
        return (
            <div className="char__list">
                <ul className="char__grid">
                   {output}
                </ul>
                <button 
                className="button button__main button__long"
                disabled={this.state.newItemLoading}
                onClick={()=>this.onRequest(this.state.offset)}
                >
                    <div className="inner" onClick={this.uploadChar}>load more</div>
                </button>
            </div>
        )
    }

}

export default CharList;