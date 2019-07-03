import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import settings from 'Src/settings';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            ratio: 20,
            placeholder: "flex",
            name: "",
            scale: 1,
            submitted: false, 
            canSubmit: true
        };
    }

    componentDidMount = () => {
        // document.body.requestFullscreen()
       

        setTimeout(() => {
            let screen_height = document.querySelector(".pledge").offsetHeight;
            let page_height = document.querySelector("#pledge-container").offsetHeight;
            let height_ratio = page_height/screen_height;
            if (height_ratio > 1){
                this.setState({scale: (1/height_ratio)})
            } else {
                this.setState({scale: 1})
            }
        },100)
        
    }

    submit = async () => {
        try {
            let { word, ratio } = this.state;
            await axios.post(`http://${settings.ip_address}:${settings.port}/update`, {word, ratio});
            this.setState({word: ""}, this.keyboardRef.keyboard.clearInput)
        } catch (error) {
            console.error(error);
        }
    }

    reset = async () => {
        try {
            await axios.post(`http://${settings.ip_address}:${settings.port}/reset`);
            this.setState({word: ""}, this.keyboardRef.keyboard.clearInput)
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

    onKeyChange = (input) => {
        this.setState({word: input})
    }
    
    onKeyPress = (button) => {
        if (button === "{enter}"){
            this.submit()
        } else if (button === "{alt}"){
            this.reset()
        } else if (button === "{more}"){
            let ratio = this.state.ratio + 5;
            if (ratio > 100){ratio = 100}
            this.setState({ratio})
        } else if (button === "{less}"){
            let ratio = this.state.ratio - 5;
            if (ratio < 0){ratio = 0}
            this.setState({ratio})
        } else if (button.includes("{") && button.includes("}")) {
            this.handleLayoutChange(button);
        }
    }

    handleLayoutChange(button) {
        let currentLayout = this.keyboardRef.keyboard.options.layoutName;
        let layoutName;
      
        switch (button) {
          case "{shift}":
          case "{shiftactivated}":
          case "{default}":
            layoutName = currentLayout === "default" ? "shift" : "default";
            break;
      
       
      
          case "{smileys}":
            layoutName = currentLayout === "smileys" ? "default" : "smileys";
            break;
      
          default:
            break;
        }
      
        if (layoutName) {
          this.keyboardRef.keyboard.setOptions({
            layoutName: layoutName
          });
        }
    }

    pledgeClick = () => {
        if (this.state.name.length >= 3 && this.state.name.length <= 12){
            this.setState({submitted: true, canSubmit: false}, async () => {
                try {
                    await axios.post(`http://${settings.ip_address}:${settings.port}/update`, {word: this.state.name, ratio: 25});
                    this.setState({canSubmit: true})
                } catch (error) {
                    
                }
            })
        }
    }

    nextName = () => {
        if (this.state.canSubmit){
            this.setState({submitted: false, name: ""})
        }
    }

    render() {
        return (<div className="pledge">
            <div id="pledge-container" style={{transform: `scale(${this.state.scale})`}} >
                <img src="/images/pledge.jpg" className="pledge-img"></img>

                <div className="menu-container">
                    <div className="hashtag">#ICANWEWILL</div>
                    <div className="title">COMBAT CANCER</div>
                    
                    {this.state.submitted ? <Fragment>
                        <div className="details" style={{marginTop:"30px"}}>Awesome! <br></br>Look out for your name on our digital wall</div>
                    </Fragment> : <Fragment>
                        <div className="details">Enter your name to join the fight</div>
                        <div className="input-text">
                            <input 
                                type="text"
                                value={this.state.name}
                                onFocus={() => {this.setState({placeholder:  this.state.name == "" ? "flex" : "none"})}}
                                onBlur={() => {this.setState({placeholder: this.state.name == "" ? "flex" : "none"})}}
                                onChange={(e) => {this.setState({name: e.target.value, placeholder: e.target.value == "" ? "flex" : "none"})}}
                            ></input>
                            <div className="placeholder" style={{display: this.state.placeholder}}>
                                <span >Name</span> 
                                <span >(3 - 12 characters)</span>
                            </div>
                        </div>
                    </Fragment>}


                    {this.state.submitted ? <div className="green-button" onClick={this.nextName}>NEXT NAME</div> : <div className="green-button" onClick={this.pledgeClick}>PLEDGE</div>}
                    

                    <img src="/images/logo.png" className="pledge-logo"></img>

                    <div className="pledge-footer">Copyright © 2019 MSD Pharma (Singapore) Pte. Ltd., a subsidiary of Merck & Co., Inc., Kenilworth, NJ, USA. All rights reserved. SG-KEY-00076 06/19</div>
                </div>
            </div>

            <div className="keyboard">
            <Keyboard 
                ref={r => this.keyboardRef = r}
                onChange={input =>this.onKeyChange(input)} 
                onKeyPress={button => this.onKeyPress(button)}
                theme={"hg-theme-default hg-theme-ios"}
                layout={{
                    default: [
                    "1 2 3 4 5 6 7 8 9 0 {bksp}",
                    "q w e r t y u i o p",
                    "a s d f g h j k l -",
                    "{shift} z x c v b n m , .",
                    "{space}",
                    ],
                    shift: [
                    "! @ # $ % ^ & * ( ) {bksp}",
                    "Q W E R T Y U I O P",
                    "A S D F G H J K L _",
                    "{shiftactivated} Z X C V B N M , .",
                    "{space}",
                    ]
                }}
                display= {{
                    "{smileys}": "\uD83D\uDE03",
                    "{shift}": "⇧",
                    "{shiftactivated}": "⇧",
                    "{enter}": "SUBMIT",
                    "{bksp}": "⌫",
                    "{altright}": ".?123",
                    "{downkeyboard}": "🞃",
                    "{space}": " ",
                    "{default}": "ABC",
                    "{back}": "⇦",
                }}
            />
            </div>
        </div>);
    }
}

export default Form;