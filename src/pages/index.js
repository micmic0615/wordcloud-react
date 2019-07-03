import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isMobile from 'is-mobile';


class Index extends Component {
  
   

    render() {
        return (<div className="form">
            <div className="form-box">
                <ul>
                    {/* <li><Link to="/oneword">Oneword</Link></li> */}
                    <li><Link to="/allchange">Wall</Link></li>
                    <li><Link to="/pledge">Submit</Link></li>
                    <li><Link to="/form">Admin</Link></li>
                </ul>
            </div>
        </div>)
    }
}

export default Index;