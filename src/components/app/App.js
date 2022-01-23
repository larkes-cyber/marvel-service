import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import React, { Component } from 'react'
import decoration from '../../resources/img/vision.png';
import ErrorBoud from '../errorBouderlend/ErrorBouderlend';
class App extends  Component{
    state={
        idChar:null
    }
    onLoadIdChar=(id)=>{
        this.setState({
            idChar:id
        })
        console.log(this.state)
    }
    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onLoadIdChar={this.onLoadIdChar}/>
                        <ErrorBoud>
                            <CharInfo idChar={this.state.idChar}/>
                        </ErrorBoud>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }   
    
}

export default App;