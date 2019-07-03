import React, { Component, Fragment } from 'react';
import DrawCanvas from 'Src/js/drawCanvas';
import axios from 'axios';
import isMobile from 'is-mobile';
import settings from 'Src/settings';
import GenerateConfig from 'Src/js/generateConfig';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {canDraw: true, nameChange: ""};
        this.maskCanvas = null;
        this.renderReady = true;
        this.wordsRendered = 0;
        this.baseList = null;
        this.alterList = null;
        this.replaceList = null;
        this.changes = [];

        // this.runningList = [...this.baseList];
        // this.runningListIndex = 0;
    }

    updateName = (name) => {
        this.setState({nameChange: name})
    }

    componentDidMount = () => {
        window.HAS_RENDERED = false;
        setTimeout(this.fetch, 500)
    }

    fetch = async () => {
        try {
            const response = await axios.post(`http://${settings.ip_address}:${settings.port}/fetch`);

           
            if (!response.data.initialize){
                if (window.HAS_RENDERED){
                    window.location.reload()
                }
            }

            if (!this.baseList){
                this.baseList = [...response.data.baseList];
                this.alterList = [...response.data.alterList];
                DrawCanvas.bind(this)(GenerateConfig.bind(this)({fade: 1, shuffle: true}));
            } else {
                let list = [...response.data.replaceList];
                let compareList = this.replaceList || this.baseList;
                var compareA = [...compareList].sort();

                this.replaceList = list;
                var compareB = [...this.replaceList].sort();

                if (JSON.stringify(compareA) !== JSON.stringify(compareB)){
                    window.NEW_CHANGES = response.data.changes.filter(p=>!this.changes.includes(p));
                    this.changes = [...response.data.changes];
                    
                    DrawCanvas.bind(this)(GenerateConfig.bind(this)({
                        list: this.replaceList, 
                        frame: this.replaceList, 
                        fade: 1,
                        shuffle: true,
                        color: (word, weight, fontSize, distance, theta, info) => {
                            const positive = () => {
                                var pool = [...settings.positive_colors];
                                var rand = pool[Math.floor(Math.random() * pool.length)];
                
                                return rand;
                            }

                            return positive();
                        }
                    }));
                    
                    
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            requestAnimationFrame(this.fetch)
        }
    }

    render() {
        return (<div className="outer">
            <div className="wrapper" style={{...settings.style_wrapper}}>
                <img src="/images/logo.svg" className="logo"></img>
                 
                <div className="menu-container">
                    <div className="hashtag" style={{...settings.style_hashtag}}>#ICANWEWILL</div>
                    <div className="title" style={{...settings.style_title}}>COMBAT CANCER</div>
                    
                        {(() => {
                            if (this.state.nameChange === null){
                                return <div className="details"  style={{...settings.style_details}}>
                                <div className="details_name hide">I, {this.state.nameChange}, pledge to join the fight.</div>
                                <div className="details_init hide">Every effort counts in the fight to eliminate cancer. <br></br>
                                Enter your name to join in, then share your photos <br></br>
                                to spread the word!</div>
                            </div>
                            } else if (this.state.nameChange != ""){
                                return <div className="details"  style={{...settings.style_details}}>
                                    <div className="details_name ">I, {this.state.nameChange}, pledge to join the fight.</div>
                                    <div className="details_init hide">Every effort counts in the fight to eliminate cancer. <br></br>
                                    Enter your name to join in, then share your photos <br></br>
                                    to spread the word!</div>
                                </div>
                            } else {
                                return <div className="details"  style={{...settings.style_details}}>
                                    <div className="details_name hide">I, {this.state.nameChange}, pledge to join the fight.</div>
                                    <div className="details_init ">Every effort counts in the fight to eliminate cancer. <br></br>
                                    Enter your name to join in, then share your photos <br></br>
                                    to spread the word!</div>
                                </div>
                            }
                        })()}
                        
                
                </div>
                <div className="lungs-container">
                    <img id="img-canvas" src="" className="canvas" alt=""/>
                    <canvas id="canvas" className="canvas" ></canvas>
                    <canvas id="ping-canvas" className="canvas" ></canvas>
                    <div id="html-canvas" className="canvas hide"></div>
                </div>

                <div className="copyright">Copyright © 2019 MSD Pharma (Singapore) Pte. Ltd., a subsidiary of Merck & Co., Inc., Kenilworth, NJ, USA. All rights reserved. SG-KEY-00075 06/19 </div>
            </div>
        </div>)
    }
}

export default Index;