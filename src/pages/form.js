import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ""
        };
    }

    submit = async () => {
        try {
            let { word } = this.state;
            await axios.post('http://localhost:4000/update', {word});
            this.setState({word: ""})
        } catch (error) {
            console.error(error);
        }
    }

    reset = async () => {
        try {
            await axios.post('http://localhost:4000/reset');
            this.setState({word: ""})
        } catch (error) {
            console.error(error);
        }
    }

    onChange = (e) => {
        this.setState({word: e.target.value})
    }

    onKeyDown = (e) => {
        if (e.keyCode === 13){this.submit()}
    }

    render() {
        return (<div className="form">
            <div className="form-box">
                <input className="form-input" value={this.state.word} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
                <button className="form-button" onClick={this.submit}>SUBMIT</button>
                <button className="form-button" onClick={this.reset} style={{marginTop:"60px"}}>RESET</button>
            </div>
        </div>);
    }
}

export default Form;