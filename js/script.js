var matrizExemplo = [
	[new criaVertice('Ana'), new criaVertice('José'), new criaVertice('João')],
	[new criaVertice('Bianca'), new criaVertice('Olivia'), new criaVertice('Laura')],
	[new criaVertice('Claudio'), new criaVertice('Vivian'), new criaVertice('Caio')]
];

mixNodes(matrizExemplo);
for(elemento in matrizExemplo){
	var arr = matrizExemplo[elemento];
	for(index in arr){
		var vertice = arr[index],
			arestas = vertice.getArestas(),
			amigos = '';

		arestas.forEach(function(vertice, index, arestas){
			if(vertice.getContent){
				amigos += vertice.getContent();

			if(index < arestas.length - 1){
				amigos += ', ';
			}
			}
			
		});

		console.log('A pessoa: ' + vertice.getContent() + (arestas.length > 0 ? ' é amiga de: ' + amigos : ' não tem amigos ainda!'));		
	}
}

grafos.metodosBusca.largura(matrizExemplo);