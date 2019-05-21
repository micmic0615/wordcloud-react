function GenerateConfig (currentList) {
    var canvasWidth = document.querySelector("#canvas").offsetWidth;
    var bgColor = window.getComputedStyle(document.querySelector('.wrapper'), null).getPropertyValue("background-color");

    return {
        list: currentList || this.baseList,
        frame: this.baseList,

        shuffle: 0,
        gridSize: Math.round(16 * canvasWidth / 1024),
        fontFamily: "Times, serif",
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
}

export default GenerateConfig;