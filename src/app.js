import React, { Component } from 'react';
import 'Src/main.css'
import DrawCanvas from 'Src/js/drawCanvas';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {canDraw: true};
        this.maskCanvas = null;
        this.renderReady = true;
        this.wordsRendered = 0;
        this.baseList = ["thick","stage","spoon","trite","crate","undress","skate","dangerous","count","gruesome","cactus","spot","green","move","sea","murder","amazing","punishment","harsh","fear","majestic","dysfunctional","attraction","hapless","purring","trick","historical","tenuous","fallacious","lighten","manage","ignore","report","need","mass","store","tooth","detailed","huge","story","anger","lethal","wriggle","tug","naive","yell","hot","ambiguous","tart","whirl"];

        this.replaceList = ["silly","grip","respect","clip","disturbed","teeny-tiny","drain","second-hand","careless","wobble","obsequious","boundless","melt","smell","way","fair","scandalous","nutritious","onerous","tricky","defeated","normal","flower","taste","color","colour","cross","wide-eyed","mature","death","symptomatic","parched","adaptable","ban","reading","lolz","cellar","hesitant","tiresome","idea","dreary","brawny","trap","tasteless","grate","unite","basket","nest","ethereal","sack"]

        this.runningList = [...this.baseList];
        this.runningListIndex = 0;
    }
    
    updateList = (word) => {
        if (this.runningListIndex >= this.runningList.length){this.runningListIndex = 0}
        this.runningList[this.runningListIndex] = word;
        DrawCanvas.bind(this)([...this.runningList]);
        this.runningListIndex++;
    }

    componentDidMount = () => {
        DrawCanvas.bind(this)();

        let updateLoop = this.replaceList.length;
        while(updateLoop){
            this.updateList(this.replaceList[updateLoop - 1]);
            updateLoop--;
        }
    }

    render() {
        return (<div className="container">
            <img id="img-canvas" src="" className="canvas" alt=""/>
            <canvas id="canvas" className="canvas" ></canvas>
            <div id="html-canvas" className="canvas hide"></div>
        </div>)
    }
}

export default App;