import React, { Component } from 'react';
import DrawCanvas from 'Src/js/drawCanvas';
import DrawPing from 'Src/js/drawPing';
import axios from 'axios';
import isMobile from 'is-mobile';
import GenerateConfig from 'Src/js/generateConfig';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {canDraw: true};
        this.maskCanvas = null;
        this.renderReady = true;
        this.wordsRendered = 0;
        this.baseList = null;
        this.replaceList = null;
        this.changes = [];

        // this.runningList = [...this.baseList];
        // this.runningListIndex = 0;
    }

    componentDidMount = () => {
        if(isMobile()){
            this.props.history.push('/form')
        } else {
            window.HAS_RENDERED = false;
            DrawPing.bind(this)()
            setTimeout(this.fetch, 500)
        }
    }

    fetch = async () => {
        try {
            const response = await axios.post('http://107.10.114.154:4000/fetch');

            if (!response.data.initialize){
                if (window.HAS_RENDERED){
                    window.location.reload()
                }
            }

            if (!this.baseList){
                let list = [...response.data.baseList];
                this.baseList = list;
                DrawCanvas.bind(this)(GenerateConfig.bind(this)());
            } else {
                let list = [...response.data.replaceList];
                let compareList = this.replaceList || this.baseList;
                var compareA = [...compareList].sort();

                this.replaceList = list;
                var compareB = [...this.replaceList].sort();

                if (JSON.stringify(compareA) !== JSON.stringify(compareB)){
                    DrawCanvas.bind(this)(GenerateConfig.bind(this)({list: this.replaceList}))
                    window.NEW_CHANGES = response.data.changes.filter(p=>!this.changes.includes(p));
                    this.changes = [...response.data.changes];
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            requestAnimationFrame(this.fetch)
        }
    }

    render() {
        return (<div className="wrapper">
            <div className="container">
                <img id="img-canvas" src="" className="canvas" alt=""/>
                <canvas id="canvas" className="canvas" ></canvas>
                <canvas id="ping-canvas" className="canvas" ></canvas>
                <div id="html-canvas" className="canvas hide"></div>
            </div>
        </div>)
    }
}

export default Index;