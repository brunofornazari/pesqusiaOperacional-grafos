function namespace(str){
	var parts = str.split('.'),
		parent = grafos,
		i;

	if(parts[0] === "grafos"){
		parts = parts.slice(1);
	}

	for(i = 0; i < parts.length; i += 1){

		if(typeof parent[parts[i]] === 'undefined'){
			parent[parts[i]] = {};
		}
		
		parent = parent[parts[i]];	
	}
	return parent;
};

namespace('grafos.metodosBusca');

grafos.metodosBusca.largura = function(matriz, verticeInicial){
	var fila = [],
		first,
		distancia,
		visitado,
		d = 0;


	if(Array.isArray(matriz)){
		var inicializacao = grafos.preparaMetodoDeBusca(matriz);

		first = verticeInicial || matriz[0][0];
		distancia = inicializacao.distancia;
		visitado = inicializacao.visitado;

		 if(first.getContent() === matriz[0][0].getContent()){
		 	visitado[0][0] = true;
		 	distancia[0][0] = 0;
		 } else {
		 	grafos.setVisitado(visitados, matriz, first);
		 	grafos.setDistancia(visitados, matriz, first, distancia);
		 }

		fila.push(first);

		fila.forEach(function(vertice, index, fila){
			var arestas = vertice.getArestas();
			d += 1;
			for(arestaIndex in arestas){
				var vertice = arestas[arestaIndex],
					posicaoMatriz = grafos.getPosicaoMatriz(matriz, vertice);

				if(visitado[posicaoMatriz.coluna][posicaoMatriz.linha] === false){
					visitado[posicaoMatriz.coluna][posicaoMatriz.linha] = true;
					distancia[posicaoMatriz.coluna][posicaoMatriz.linha] = d;

					for(arestas in vertice.getArestas()){
						fila.push(vertice.getArestas()[arestas]);
					}
				}
				continue;
			}
		});

		console.log(visitado);
		console.log(distancia);
	}
};

function getRandom(base, fromZero){
	var value,
		fromZero = fromZero || true;
	if(!fromZero){
		value = Math.floor((Math.random() * base + 1));
	} else {
		value = Math.floor((Math.random() * base));
	}

	return value;
	 
}

function mixNodes(matriz, elemento){
	if(Array.isArray(matriz)){
		if(typeof elemento === 'undefined'){
			for(elemento in matriz){
				if(Array.isArray(matriz[elemento])){
					mixNodes(matriz, matriz[elemento]);
				}
			}
		} 

		if(Array.isArray(elemento)){
			var referencias = getRandom(matriz.length + elemento.length - 1);
			for(index in elemento){
				var vertice = elemento[index];

				for(var i = 0; i < referencias; i += 1){
					var iColumn = getRandom(matriz.length, true),
						iRow = getRandom(elemento.length, true),
						verticeReferencia = matriz[iColumn][iRow],
						arestas = vertice.getArestas();

					if(!arestas.find(function(elemento, index, arr){
						if(elemento.getContent() === verticeReferencia.getContent()){
							return true;
						}
					})){
						vertice.addAresta(verticeReferencia);
						verticeReferencia.addAresta(vertice);
					}
				}	
			}
		}
	}
}

function criaVertice(content){
	var novoVertice = new Vertice(content);
	novoVertice.setArestas(novoVertice);
	return novoVertice;
}
