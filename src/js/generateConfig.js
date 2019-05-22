function GenerateConfig (params = {}) {
    var canvasWidth = document.querySelector("#canvas").offsetWidth;
    var bgColor = window.getComputedStyle(document.querySelector('.wrapper'), null).getPropertyValue("background-color");

    let returnConfig = {
        list: this.baseList,
        frame: this.baseList,

        fade: 0,

        shuffle: 0,
        gridSize: Math.round(5 * (800/canvasWidth)),
        fontFamily: "Impact, Charcoal, sans-serif",
        rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: bgColor,

        color: (word, weight) => {
            return (!this.baseList.map(p=>p[0]).includes(word) ? "#f02222" : "#c09292");
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