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
