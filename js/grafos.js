var grafos = grafos || {};

grafos.preparaMetodoDeBusca = function(matriz){
	var distancia = [],
		visitado = [];

	if(Array.isArray(matriz)){
		for(coluna in matriz){
			distancia.push([]);
			visitado.push([]);
			var linha = matriz[coluna];
			if(Array.isArray(linha)){
				for(indice in linha){
					distancia[coluna].push('∞');
					visitado[coluna].push(false);
					 
				}
			}
		}
	}	

	return {
		'distancia' : distancia,
		'visitado' : visitado
	}
};

grafos.setVisitado = function(matrizVertice, matrizContent, content){
	if(!Array.isArray(matrizVertice)){
		matrizVertice = grafos.preparaMetodoDeBusca(matrizContent).visitado;
	}
	if(Array.isArray(matrizContent)){
		for(coluna in matrizContent){
			for(linha in coluna){
				if(matrizContent[coluna][linha] === content){
					matrizVertice[coluna][linha] = true;
				}
			}
		}
	}
};

grafos.setDistancia = function(matrizVertice, matrizContent, content, valor){
	if(!Array.isArray(matrizVertice)){
		matrizVertice = grafos.preparaMetodoDeBusca(matrizContent).distancia;
	}
	if(Array.isArray(matrizContent)){
		for(coluna in matrizContent){
			for(linha in coluna){
				if(matrizContent[coluna][linha] === content){
					matrizVertice[coluna][linha] = valor;
				}
			}
		}
	}
};

grafos.getPosicaoMatriz = function(matriz, vertice){
	if(Array.isArray(matriz)){
		for(colunaIndex in matriz){
			for(linhaIndex in matriz[colunaIndex]){
				if(matriz[colunaIndex][linhaIndex].getContent() === vertice.getContent()){
					return {
						coluna : colunaIndex,
						linha : linhaIndex
					};
				}
			}
		}
	}
};