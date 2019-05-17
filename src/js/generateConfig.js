function GenerateConfig (currentList) {
    const wordcloudList = (words) => {
        var rawList = [];
        var nums = [4.25, 4, 3.75, 3.5, 3.25, 3];

        nums.forEach((n) => {
            words.forEach((w) => {
                rawList.push(n + ' ' + w);
            });
        });

        var stringList = rawList.join('\n');
        var loopList = stringList.split('\n');

        var wordcloudList = [];
        loopList.forEach((line, i) => {
            var lineArr = line.split(' ');
            var count = parseFloat(lineArr.shift()) || 0;
            wordcloudList.push([lineArr.join(' '), count]);
        });

        return wordcloudList
    }

    var canvasWidth = document.querySelector("#canvas").offsetWidth;

    return {
        list: wordcloudList(currentList || this.baseList),
        frame: wordcloudList(this.baseList),

        shuffle: 0,
        gridSize: Math.round(16 * canvasWidth / 1024),
        fontFamily: "Times, serif",
        rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: "#ffe0e0",

        color: (word, weight) => {
            return (!this.baseList.includes(word) ? "#f02222" : "#c09292");
        },
        weightFactor: (size) => {
            return Math.pow(size, 2.3) * canvasWidth / 1024;
        },
    }
}

export default GenerateConfig;