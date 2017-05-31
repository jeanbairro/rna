# Classificação com redes neurais artificiais
Trabalho de redes neurais artificiais

***Yagan: Não sei se nossas redes são mais de classificação ou de reconhecimento de padrões.***

## Biblioteca

Para criar as redes neurais, utilizamos uma biblioteca chamada Synaptic. Synaptic é uma biblioteca gratuita de rede neural, escrita em javascrit, para node.js e navegadores. A biblioteca possibilita a criação e treinamento de redes neurais em geral.

## Criação da rede neural

Tanto a rede de classificação (ou reconhecimento) de artrite, como a de classificação de flor-de-lis, são constituídas por três camadas de neurônios. 

A camada de neurônios de entrada, a camada de neurônio de saída, e uma camada de neurônios escondida ligando as duas camadas.

Utilizando a biblioteca Synaptic, o algoritmo de criação da rede, foi implementado da seguinte forma:

```javascript
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
```

## Conjuntos de treinamento

Após a criação da rede neural, foram definidos os conjuntos de treinamento. Para definir estes conjuntos, foi utilizada uma metodologia afim de distribuir os casos de maneira igual, para treinar as redes de maneira justa (dá pra melhorar essa frase).

A metodologia foi implementada por meio de um algoritmo, que distribui os casos de maneira igual em um conjunto de treinamento, classificando pelos tipos de artrite, ou no caso da segunda rede, pelos tipos de flor-de-lis. 

Afim de que o número de casos de flor-de-lis setosa, por exemplo, seja igual ao número de casos de flor-de-lis versicolor e flor-de-lis virginia, no conjunto de treinamento.

Ao total foram selecionados trinta casos de artrite, e cem casos de flor-de-lis para as respectivas redes.

## Treinamento

Para realizar o treinamento, com nossos conjuntos de treinamento já definidos, utilizamos a função train(). 

```javascript
var trainer = new Trainer(redeSynaptic);
var treino = trainer.train(_self.unidadesDeTreino, {
    rate: this.taxa,
    iterations: this.quantidadeMaximaDeIteracoes,
    error: this.erroAceitavel,
    shuffle: true,
    log: 1,
    cost: Trainer.cost.CROSS_ENTROPY
});
```

Esta função recebe alguns parâmetros (acima), que tem as seguintes funções:

* **rate**: Taxa de aprendizado da rede.
* **iterations**: Número máximo de iterações (não serão todos utilizados caso o erro seja atingido precocemente).
* **error**: Erro mínimo ou erro aceitável.
* **shuffle**: Define se o conjunto de treinamento é ordenado de forma aleatória ou não.
* **cost**: Funcão de custo utilizada para o treinamento.
