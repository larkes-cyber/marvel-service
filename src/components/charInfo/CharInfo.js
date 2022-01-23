import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import React, {Component } from 'react'
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import GetData from '../../services/getData';
import Skeleton from '../skeleton/Skeleton';
class CharInfo extends Component {
    state={
        array:null,
        loading:false,
        error:false,
        skelet:true
    }

    componentDidMount(){
       
    }
    componentDidUpdate(prevProp){
        console.log([1,4,56]*1)
        if(this.props!==prevProp){
            this.onLoadArray();
            const Data=new GetData();
        Data.getCharacter(this.props.idChar).then(this.onLoadArray);
        }
    }
    onLoadArray=(arr)=>{

        this.setState({
            array:arr,
            loading:!this.state.loading,
            skelet:false
        })
}
    render(){
        
        const Error=this.state.error?<Error/>:null;
        const Loading=this.state.loading?<Spinner/>:null;
        const Elem=!(this.state.loading||this.state.loading||this.state.skelet)?View(this.state.array):null;
        const Skelet=this.state.skelet?<Skeleton/>:null;
        return (
            <div className="char__info">
               {Error}
               {Loading}
               {Elem}
               {Skelet}
            </div>
        )
    }
}
 const View=(object)=>{
    console.log(object.comics)
    const arrComics=[];
    object.comics.forEach(item => {
        arrComics.push(
            <li className="char__comics-item">
              {item.name}
             </li>
        )
    });
    return(
        <>
             <div className="char__basics">
                    <img src={object.picture} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{object.name}</div>
                        <div className="char__btns">
                            <a href="#" className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={object.wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {object.text}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                {arrComics}
                   
                </ul>
        </>
    )
}
export default CharInfo;