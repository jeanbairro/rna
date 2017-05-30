$(".erroAceitavel").val(redeConfig.erroAceitavel);
$(".quantidadeMaximaDeIteracoes").val(redeConfig.quantidadeMaximaDeIteracoes);
$(".taxa").val(redeConfig.taxa);

function atualizar($el, rede) {
    $el.find(".erro").html(rede.erro);
    $el.find(".tempo").html(rede.tempo);
    $el.find(".quantidadeOculta").val(rede.quantidadeOculta);
    $el.find(".iteracoes").html(rede.iteracoes);

    var $table = $el.find("table");
    $table.find("tbody").html("");
    rede.resultados.forEach(function(resultado, index, array) {
        $table.find("tbody").append("<tr><td>"+ index +"</td><td>"+ resultado.entradas.join() +"</td><td>"+ resultado.saidas.join() +"</td><td>"+ resultado.saidasDaRede.join() +"</td></tr>");
    });
}

var artriteConfig = {
    quantidadeDeEntradas: 17,
    quantidadeDeSaidas: 4,
    quantidadeOculta: 4,
    quantidadeDeCasosParaTreino: 30
};

var florDeLisConfig = {
    quantidadeDeEntradas: 4,
    quantidadeDeSaidas: 3,
    quantidadeOculta: 5,
    quantidadeDeCasosParaTreino: 100
}

var redeArtrite = new RedeNeural(
    artriteConfig.quantidadeDeEntradas, 
    artriteConfig.quantidadeDeSaidas, 
    artriteConfig.quantidadeOculta,
    artriteConfig.quantidadeDeCasosParaTreino,
    entradasArtrite,
    saidasArtrite
); 
redeArtrite.iniciar();

var $sectionArtrite = $(".artrite");
atualizar($sectionArtrite, redeArtrite);

$sectionArtrite.find(".iteracoes").html(redeArtrite.iteracoes);

$sectionArtrite.find(".recalcular").on("click", function() {
    var erro = parseFloat($sectionArtrite.find(".erroAceitavel").val());
    var qtdMax = parseInt($sectionArtrite.find(".quantidadeMaximaDeIteracoes").val());
    var qtdOculta = parseInt($sectionArtrite.find(".quantidadeOculta").val());
    var taxa = parseFloat($sectionArtrite.find(".taxa").val());

    redeArtrite.recalcular(erro, qtdMax, qtdOculta, taxa);
    atualizar($sectionArtrite, redeArtrite);
});

var redeFlorDeLis = new RedeNeural(
    florDeLisConfig.quantidadeDeEntradas, 
    florDeLisConfig.quantidadeDeSaidas, 
    florDeLisConfig.quantidadeOculta,
    florDeLisConfig.quantidadeDeCasosParaTreino,
    entradasFlorDeLis,
    saidasFlorDeLis
); 
redeFlorDeLis.iniciar();

var $sectionFlorDeLis = $(".florDeLis");
atualizar($sectionFlorDeLis, redeFlorDeLis);

$sectionFlorDeLis.find(".iteracoes").html(redeFlorDeLis.iteracoes);

$sectionFlorDeLis.find(".recalcular").on("click", function() {
    var erro = parseFloat($sectionFlorDeLis.find(".erroAceitavel").val());
    var qtdMax = parseInt($sectionFlorDeLis.find(".quantidadeMaximaDeIteracoes").val());
    var qtdOculta = parseInt($sectionFlorDeLis.find(".quantidadeOculta").val());
    var taxa = parseFloat($sectionFlorDeLis.find(".taxa").val());

    redeFlorDeLis.recalcular(erro, qtdMax, qtdOculta, taxa);
    atualizar($sectionFlorDeLis, redeFlorDeLis);
});


/************************* ARTRITE *****************************/

// console.log("************************* ARTRITE *****************************");

// const inputLayer = new Layer(17);
// const hiddenLayer = new Layer(8);
// const outputLayer = new Layer(4);

// inputLayer.project(hiddenLayer);
// hiddenLayer.project(outputLayer);

// const myNetwork = new Network({
//     input: inputLayer,
//     hidden: [hiddenLayer],
//     output: outputLayer
// });

// var trainingSet = [];
// var testSet = [];

// var len = inputs.length - 10;
// for (var i = 0; i < len; i++) {
// 	trainingSet.push(new UnidadeDeTreino(inputs[i], outputs[i]));
// }

// for (var i = len; i < len+10; i++) {
//     testSet.push(new UnidadeDeTreino(inputs[i], outputs[i]));
// }
 

// const trainer = new Trainer(myNetwork);
// var treino = trainer.train(trainingSet, {
//     rate: .2,
//     iterations: 60,
//     error: .1,
//     shuffle: true,
//     log: 1,
//     cost: Trainer.cost.CROSS_ENTROPY
// });

// for (var i = 0; i < testSet.length; i++) {
//     console.log(testSet[i].input);
//     console.log(testSet[i].output);
//     console.log(myNetwork.activate(testSet[i].input));
//     console.log("------------------------------------------------------------");
// }

/************************* FLOR DE LIS *****************************/


// console.log("************************* FLOR DE LIS *****************************");

// const inputLayer2 = new Layer(4);
// const hiddenLayer2 = new Layer(5);
// const outputLayer2 = new Layer(3);

// inputLayer2.project(hiddenLayer2);
// hiddenLayer2.project(outputLayer2);

// const myNetwork2 = new Network({
//     input: inputLayer2,
//     hidden: [hiddenLayer2],
//     output: outputLayer2
// });

// var trainingSet2 = [];
// var testSet2 = [];

// var len2 = inputs2.length - 50;
// for (var i = 0; i < len2; i++) {
//     trainingSet2.push(new UnidadeDeTreino(inputs2[i], outputs2[i]));
// }

// for (var i = len2; i < len2+50; i++) {
//     testSet2.push(new UnidadeDeTreino(inputs2[i], outputs2[i]));
// }
 

// const trainer2 = new Trainer(myNetwork2);
// var treino2 = trainer2.train(trainingSet2, {
//     rate: .1,
//     iterations: 1000,
//     error: .05,
//     shuffle: true,
//     log: 1,
//     cost: Trainer.cost.CROSS_ENTROPY
// });

// for (var i = 0; i < testSet2.length; i++) {
//     console.log(testSet2[i].input);
//     console.log(testSet2[i].output);
//     console.log(myNetwork2.activate(testSet2[i].input));
//     console.log("------------------------------------------------------------");
// }
