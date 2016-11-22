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
					distancia[coluna].push(Infinity);
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
		for(var colIn = 0; colIn < matriz.length; colIn += 1){
			for(var rowIn = 0; rowIn < matriz[colIn].length; rowIn += 1){
				if(matriz[colIn][rowIn].getContent().getNetworkID() === vertice.getContent().getNetworkID()){
					return {
						coluna: colIn,
						linha: rowIn
					}
				}
			}
		}
	}
};

