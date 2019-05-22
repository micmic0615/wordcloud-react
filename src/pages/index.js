import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isMobile from 'is-mobile';


class Index extends Component {
  
    componentDidMount = () => {
        if(isMobile()){
            this.props.history.push('/form')
        } else {
            
        }
    }


    render() {
        return (<div className="form">
            <div className="form-box">
                <ul>
                    <li><Link to="/oneword">Oneword</Link></li>
                    <li><Link to="/allchange">Allchange</Link></li>
                    <li><Link to="/form">Form</Link></li>
                </ul>
            </div>
        </div>)
    }
}

export default Index;