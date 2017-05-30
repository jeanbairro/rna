const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;

var redeConfig = {
    erroAceitavel: .05,
    quantidadeMaximaDeIteracoes: 1000,
    taxa: .1
};

function UnidadeDaRede(entradas, saidas) {
    this.input = entradas;
    this.output = saidas;
}

function ResultadoDoTeste(entradas, saidas, saidasDaRede) {
    this.entradas = entradas;
    this.saidas = saidas;
    this.saidasDaRede = saidasDaRede;
}

function RedeNeural(quantidadeDeEntradas, quantidadeDeSaidas, quantidadeOculta, quantidadeDeCasosParaTreino, inputs, outputs) {
    this.quantidadeDeCasosParaTreino = quantidadeDeCasosParaTreino;
    this.quantidadeOculta = quantidadeOculta;
    this.unidadesDeTreino = [];
    this.unidadesDeTeste = [];
    this.erro = 0;
    this.iteracoes = 0;
    this.tempo = 0;
    this.resultados = [];
    this.erroAceitavel = redeConfig.erroAceitavel;
    this.quantidadeMaximaDeIteracoes = redeConfig.quantidadeMaximaDeIteracoes;
    this.taxa = redeConfig.taxa;

    var _self = this;

    var retornarRedeSynaptic = function() {
        var inputLayer = new Layer(quantidadeDeEntradas);
        var outputLayer = new Layer(quantidadeDeSaidas);
        var hiddenLayer = new Layer(_self.quantidadeOculta);

        inputLayer.project(hiddenLayer);
        hiddenLayer.project(outputLayer);

        return new Network({
            input: inputLayer,
            hidden: [hiddenLayer],
            output: outputLayer
        });
    }

    var montarUnidadesDeTreino = function() {
        var c = 0;
        var i = 0;
        var len = 0;
        var qtdDeLinhas = outputs.length;
        var qtdDeColunas = quantidadeDeSaidas;
        while (len < _self.quantidadeDeCasosParaTreino) {
            if (outputs[i][c] === 1 && !outputs[i][quantidadeDeSaidas]) {
                var output = outputs[i].slice(0,-1);
                _self.unidadesDeTreino.push(new UnidadeDaRede(inputs[i], output));
                len++;
                //visitada
                outputs[i][quantidadeDeSaidas] = true;

                if (i < qtdDeLinhas-1) {
                    i++;
                } else {
                    i = 0
                }

                if (c < qtdDeColunas-1) {
                    c++;
                } else{
                    c = 0;
                }
            } else {
                if (i < qtdDeLinhas-1) {
                    i++;
                } else {
                    i = 0;

                    if (c < qtdDeColunas-1) {
                        c++;
                    } else{
                        c = 0;
                    }
                }
            }
        }
    }

    var montarUnidadesDeTeste = function() {
        var len = outputs.length;   

        for (var i = 0; i < len; i++) {
            if (!outputs[i][quantidadeDeSaidas]) {
                var output = outputs[i].slice(0,-1);
                _self.unidadesDeTeste.push(new UnidadeDaRede(inputs[i], output));
            }
        }
    }

    this.iniciar = function() {
        var redeSynaptic = retornarRedeSynaptic();
        montarUnidadesDeTreino();
        montarUnidadesDeTeste();

        const trainer = new Trainer(redeSynaptic);
        var treino = trainer.train(_self.unidadesDeTreino, {
            rate: this.taxa,
            iterations: this.quantidadeMaximaDeIteracoes,
            error: this.erroAceitavel,
            shuffle: true,
            log: 1,
            cost: Trainer.cost.CROSS_ENTROPY
        });

        this.erro = treino.error;
        this.iteracoes = treino.iterations;
        this.tempo = treino.time;

        var len = this.unidadesDeTeste.length;   
        for (var i = 0; i < len; i++) {
            var unidadesDeTeste = this.unidadesDeTeste[i];
            var saidasDaRede = redeSynaptic.activate(unidadesDeTeste.input).map(function(e) { 
                e = e.toFixed(2); 
                return e;
            });
            this.resultados.push(new ResultadoDoTeste(
                unidadesDeTeste.input, 
                unidadesDeTeste.output,
                saidasDaRede
            ));
        }
    }

    this.recalcular = function(erroAceitavel, quantidadeMaximaDeIteracoes, quantidadeOculta, taxa) {
        this.erroAceitavel = erroAceitavel;
        this.quantidadeMaximaDeIteracoes = quantidadeMaximaDeIteracoes;
        this.quantidadeOculta = quantidadeOculta;
        this.taxa = taxa;

        this.unidadesDeTreino = [];
        this.unidadesDeTeste = [];
        this.erro = 0;
        this.iteracoes = 0;
        this.tempo = 0;
        this.resultados = [];
        var len = outputs.length;   
        for (var i = 0; i < len; i++) {
            outputs[i][quantidadeDeSaidas] = false;
        }

        this.iniciar();
    }
} 