import React, { Component } from 'react';
import 'Src/main.css'
import WordCloud from 'Src/wordcloud2';
import GenerateConfig from 'Src/config';
import MaskBase64 from 'Src/mask';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount = () => {
        var maskCanvas, wordsRendered;

        var divContainer = document.querySelector(".container");
        var divCanvas = document.querySelector("#canvas");
        var divImgCanvas = document.querySelector("#img-canvas");
        var divHtmlCanvas = document.querySelector("#html-canvas");

        function readMask(callback) {
            maskCanvas = null;

            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = MaskBase64;

            img.onload = function readPixels() {
                window.URL.revokeObjectURL(MaskBase64);

                maskCanvas = document.createElement('canvas');
                maskCanvas.width = img.width;
                maskCanvas.height = img.height;

                var ctx = maskCanvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height);

                var imageData = ctx.getImageData(
                    0, 0, maskCanvas.width, maskCanvas.height);
                var newImageData = ctx.createImageData(imageData);

                for (var i = 0; i < imageData.data.length; i += 4) {
                    var tone = imageData.data[i] +
                        imageData.data[i + 1] +
                        imageData.data[i + 2];
                    var alpha = imageData.data[i + 3];

                    if (alpha < 128 || tone > 128 * 3) {
                        // Area not to draw
                        newImageData.data[i] =
                            newImageData.data[i + 1] =
                            newImageData.data[i + 2] = 255;
                        newImageData.data[i + 3] = 0;
                    } else {
                        // Area to draw
                        newImageData.data[i] =
                            newImageData.data[i + 1] =
                            newImageData.data[i + 2] = 0;
                        newImageData.data[i + 3] = 255;
                    }
                }

                ctx.putImageData(newImageData, 0, 0);
                callback()
            };
        };

        function run(customList) {
            wordsRendered = 0;
            var runConfig = GenerateConfig();

            // devicePixelRatio
            var devicePixelRatio = parseFloat(1);

            // Set the width and height
            var width = divContainer.offsetWidth;
            var height = divContainer.offsetHeight;
            var pixelWidth = width;
            var pixelHeight = height;

            if (devicePixelRatio !== 1) {
                divCanvas.style.width = width + 'px';
                divCanvas.style.height = height + 'px';

                pixelWidth *= devicePixelRatio;
                pixelHeight *= devicePixelRatio;
            } else {
                divCanvas.style.width = '';
                divCanvas.style.height = '';
            }

            divCanvas.setAttribute('width', pixelWidth);
            divCanvas.setAttribute('height', pixelHeight);

            divHtmlCanvas.style.width = pixelWidth + 'px';
            divHtmlCanvas.style.height = pixelHeight + 'px';

            if (customList){runConfig.list = customList}

            if (devicePixelRatio !== 1) {
                if (!('gridSize' in runConfig)) {
                    runConfig.gridSize = 8;
                }
                runConfig.gridSize *= devicePixelRatio;

                if (runConfig.origin) {
                    if (typeof runConfig.origin[0] == 'number')
                        runConfig.origin[0] *= devicePixelRatio;
                    if (typeof runConfig.origin[1] == 'number')
                        runConfig.origin[1] *= devicePixelRatio;
                }

                if (!('weightFactor' in runConfig)) {
                    runConfig.weightFactor = 1;
                }
                if (typeof runConfig.weightFactor == 'function') {
                    var origWeightFactor = runConfig.weightFactor;
                    runConfig.weightFactor =
                        function weightFactorDevicePixelRatioWrap() {
                            return origWeightFactor.apply(this, arguments) * devicePixelRatio;
                        };
                } else {
                    runConfig.weightFactor *= devicePixelRatio;
                }
            }

        
            if (maskCanvas) {
                runConfig.clearCanvas = false;

                /* Determine bgPixel by creating
                another canvas and fill the specified background color. */
                var bctx = document.createElement('canvas').getContext('2d');

                bctx.fillStyle = runConfig.backgroundColor || '#fff';
                bctx.fillRect(0, 0, 1, 1);
                var bgPixel = bctx.getImageData(0, 0, 1, 1).data;
                var canvas = document.querySelector("#canvas")
                var maskCanvasScaled = document.createElement('canvas');
                maskCanvasScaled.width = divCanvas.getAttribute("width");
                maskCanvasScaled.height = divCanvas.getAttribute("height");
                var ctx = maskCanvasScaled.getContext('2d');

                ctx.drawImage(maskCanvas,  0, 0, maskCanvas.width, maskCanvas.height, 0, 0, maskCanvasScaled.width, maskCanvasScaled.height);

                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var newImageData = ctx.createImageData(imageData);
                for (var i = 0; i < imageData.data.length; i += 4) {
                    if (imageData.data[i + 3] > 128) {
                        newImageData.data[i] = bgPixel[0];
                        newImageData.data[i + 1] = bgPixel[1];
                        newImageData.data[i + 2] = bgPixel[2];
                        newImageData.data[i + 3] = bgPixel[3];
                    } else {
                        // This color must not be the same w/ the bgPixel.
                        newImageData.data[i] = bgPixel[0];
                        newImageData.data[i + 1] = bgPixel[1];
                        newImageData.data[i + 2] = bgPixel[2];
                        newImageData.data[i + 3] = bgPixel[3] ? (bgPixel[3] - 1) : 0;
                    }
                }

                ctx.putImageData(newImageData, 0, 0);

                ctx = divCanvas.getContext('2d');
                ctx.drawImage(maskCanvasScaled, 0, 0);

                maskCanvasScaled = ctx = imageData = newImageData = bctx = bgPixel = undefined;
            }

            // Always manually clean up the html output
            if (!runConfig.clearCanvas) {
                divHtmlCanvas.innerHTML = '';
                divHtmlCanvas.style.backgroundColor =  runConfig.backgroundColor || '#fff';
            }

            // All set, call the WordCloud()
            // Order matters here because the HTML canvas might by
            // set to display: none.
            WordCloud([divCanvas, divHtmlCanvas], runConfig);

            divCanvas.addEventListener("wordclouddrawn", function(test){
                wordsRendered++;
                if (wordsRendered === runConfig.list.length){
                    setTimeout(() => {
                        var pngUrl = divCanvas.toDataURL(); 
                        divImgCanvas.src = String(pngUrl);
                        divCanvas.style.opacity = 0;
                    },750)
                } 
            });
        };

        readMask(() => {
            run();
        });
    }

    render() {
        return (<div class="container">
            <img id="img-canvas" src="" class="canvas" alt=""/>
            <canvas id="canvas" class="canvas" ></canvas>
            <div id="html-canvas" class="canvas hide"></div>
        </div>)
    }
}

export default App;