const GenerateConfig = () => {
    var wordList = 'thick,stage,spoon,trite,crate,undress,skate,dangerous,count,gruesome,cactus,spot,green,move,sea,murder,amazing,punishment,harsh,fear,majestic,dysfunctional,attraction,hapless,purring,trick,historical,tenuous,fallacious,lighten,manage,ignore,report,need,mass,store,tooth,detailed,huge,story,anger,lethal,wriggle,tug,naive,yell,hot,ambiguous,tart,whirl,silly,grip,respect,clip,disturbed,teeny-tiny,drain,second-hand,careless,wobble,obsequious,boundless,melt,smell,way,fair,scandalous,nutritious,onerous,tricky,defeated,normal,flower,taste,color,colour,cross,wide-eyed,mature,death,symptomatic,parched,adaptable,ban,reading,need,cellar,hesitant,tiresome,idea,dreary,brawny,trap,tasteless,grate,unite,basket,nest,ethereal,sack';

    var rawList = [];
    var nums = [5, 4.5, 3.5];
    var words = wordList.split(',');

    nums.forEach(function (n) {
        words.forEach(function (w) {
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

    var canvasWidth = document.querySelector("#canvas").offsetWidth;

    return {
        list: wordcloudList,
        frame: wordcloudList,

        shuffle: 0,
        gridSize: Math.round(16 * canvasWidth / 1024),
        fontFamily: "Times, serif",
        rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: "#ffe0e0",

        color: function (word, weight) {
            return (word === "ow" || word === "le" || word === "spoonerinoaaaaaaaaa") ? "#f02222" : "#c09292";
        },
        weightFactor: function (size) {
            return Math.pow(size, 2.3) * canvasWidth / 1024;
        },
    }
}

export default GenerateConfig;