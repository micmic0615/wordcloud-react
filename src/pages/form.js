import React, { Component } from 'react';
import axios from 'axios';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ""
        };
    }

    componentDidMount = () => {
        // document.body.requestFullscreen()
    }

    submit = async () => {
        try {
            let { word } = this.state;
            await axios.post('http://107.10.114.154:4000/update', {word});
            this.setState({word: ""}, this.keyboardRef.keyboard.clearInput)
        } catch (error) {
            console.error(error);
        }
    }

    reset = async () => {
        try {
            await axios.post('http://107.10.114.154:4000/reset');
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

    render() {
        return (<div className="form">
            <div className="form-box">
                <input className="form-input" value={this.state.word} readonly style={{pointerEvents:"none", width: "100%", boxSizing:"border-box", marginBottom:"10px"}}/>
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
                        "{alt} {enter}"
                        ],
                        shift: [
                        "! @ # $ % ^ & * ( ) {bksp}",
                        "Q W E R T Y U I O P",
                        "A S D F G H J K L _",
                        "{shiftactivated} Z X C V B N M , .",
                        "{space}",
                        "{alt} {enter}"
                        ]
                    }}
                    display= {{
                        "{alt}": "RESET",
                        "{smileys}": "\uD83D\uDE03",
                        "{shift}": "⇧",
                        "{shiftactivated}": "⇧",
                        "{enter}": "SUBMIT",
                        "{bksp}": "⌫",
                        "{altright}": ".?123",
                        "{downkeyboard}": "🞃",
                        "{space}": " ",
                        "{default}": "ABC",
                        "{back}": "⇦"
                    }}
                />
                {/* <button className="form-button" onClick={this.submit}>SUBMIT</button> */}

                {/* <button className="form-button" onClick={this.reset} style={{marginTop:"60px"}}>RESET</button> */}
            </div>
        </div>);
    }
}

export default Form;