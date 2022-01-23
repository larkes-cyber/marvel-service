import React, { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import GetData from '../../services/getData';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
const Data=new GetData();
class RandomChar extends Component{
    state={
        char:{
            name:null,
            text:null,
            homepage:null,
            wiki:null,
            picture:null
        },
        loading:true,
        error:false
    }
    Data=new GetData();
    onLoadState=(char)=>{
        const str='image_not_available.jpg';
        const coun=char.picture;
        if(coun.substr(char.picture.length-23,23)===str){
            const elem=document.querySelector('.randomchar__img');
            elem.style.objectFit="contain";
        }
        console.log(char)
        this.setState({
            char:char,
            loading:false,
            error:false
        })
    }
    componentDidMount(){
        this.updateChar();
    }
    updateChar=()=>{
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.Data.getCharacter(id)
        .then(res=>this.onLoadState(res))
        .catch(()=>{
          
            this.setState({
                loading:false,
                error:true
            })
        }
        )
    }
    onChangeRandomChar=()=>{
        this.updateChar();
    }
    render(){
        const loading=this.state.loading ? <Spinner/> : null;
        const error=this.state.error ? <Error/> : null;
        const content= !(this.state.loading || this.state.error) ? 
        <View data={
            {
            name:this.state.char.name,
            img:this.state.char.picture,
            text:this.state.char.text,
            homepage:this.state.char.homepage,
            wiki:this.state.char.wiki
            }
        }/> : null
    return (
        <div className="randomchar">
           {loading}
           {error}
           {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={this.onChangeRandomChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    }
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