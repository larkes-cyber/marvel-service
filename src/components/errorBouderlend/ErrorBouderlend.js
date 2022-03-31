import React, { Component } from 'react';
import Error from '../error/error';
class ErrorBoud extends Component{
    state={
        error:false
    }
    componentDidCatch(err,err2){
        this.setState({
            error:true
        })
        console.log(err,err2)
    }
    render(){
        if(this.state.error){
            return <Error/>
        }
        return this.props.children;
    }
}
export default ErrorBoud;