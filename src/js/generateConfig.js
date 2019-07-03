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
            
            var pool = [ 
                'Avenir-MediumOblique',
                'Gotham-Light',
                'BigCaslon-Medium',
                'ArialNarrow-Italic',
                'Avenir-Black',
                'Avenir-Light',
                'Avenir-Oblique',
                'ArialNarrow-BoldItalic',
                'ArialNarrow',
                'Avenir-HeavyOblique',
                'Avenir-Roman',
                'Gotham-Book',
                'Gotham-Bold',
                'Gotham-XLight',
                'Avenir-Heavy',
                'Avenir-BookOblique',
                'Gotham-UltraItalic',
                'Avenir-LightOblique',
                'Arial-Black',
                'ArialNarrow-Bold',
                'Avenir-BlackOblique',
                'Gotham-XLightItalic',
                'BigCaslon',
                'Arial Narrow Bold',
                'Gotham-BookItalic',
                'Gotham-ThinItalic',
                'Avenir-Medium',
                'Gotham-Thin',
                'Arial Narrow Italic',
                'Gotham-Black',
                'Aero',
                'Avenir-Book' 
            ];

            var rand = pool[wordScore % pool.length];
            return rand; 
        },
        rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: bgColor,

        color: (word, weight) => {
            const negative = () => {
                var shade = Math.random()*50 + 40;
                return `rgba(${shade}, ${shade},${shade},1)`;
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