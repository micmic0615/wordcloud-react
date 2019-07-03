import settings from 'Src/settings';

function GenerateConfig (params = {}) {
    var canvasWidth = document.querySelector("#canvas").offsetWidth;
    var bgColor = window.getComputedStyle(document.querySelector('.wrapper'), null).getPropertyValue("background-color");

    let returnConfig = {
        list: this.baseList,
        frame: this.baseList,

        fade: 0,

        shuffle: 0,
        gridSize: 6,
        // drawMask: true,
        fontFamily: (word, weight, fontSize, index) => {
            var wordScore = index;
            var i = 0;
            while(i < word.length){
                wordScore += (word.charCodeAt(i))
                i++
            }
            
            var pool = [...settings.wordcloud_fonts];
            var rand = pool[wordScore % pool.length];
            return rand; 
        },
        rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: bgColor,

        color: (word, weight) => {
            const negative = () => {
                var pool = [...settings.negative_colors];
                var rand = pool[Math.floor(Math.random() * pool.length)];
                return rand;
            }

            return negative();

            // return (!this.baseList.map(p=>p[0]).includes(word) ? "#f02222" : "#c09292");
        },
        weightFactor: (size) => {
            return Math.pow(size, 2.3) * canvasWidth / 1024;
        },
    }

    for (const key in params) {
        returnConfig[key] = params[key]
    }
    return returnConfig
}

export default GenerateConfig;