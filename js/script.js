var network = {};
/*	
mixNodes(matrizExemplo);
var verticesList = [];

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
		//precisamos fazer uma lista eficaz de verdade para distâncias!
		verticesList.push(vertice.getContent());
		console.log('A pessoa: ' + vertice.getContent() + (arestas.length > 0 ? ' é amiga de: ' + amigos : ' não tem amigos ainda!'));		
	}
}
*/

(function(){
	var table = $('#table'),
		tableChildren,
		timer = 1000,
		registeredBadge = $('#registeredBadge'),
		friendshipsBadge = $('#friendshipsBadge');

	namespace('network.main', network, 'network');
	namespace('network.manager.registeredManager', network, 'network');
	namespace('network.manager.friendshipManager', network, 'network');

	network.manager.registeredManager = new BadgeManager(registeredBadge);
	network.manager.friendshipManager = new BadgeManager(friendshipsBadge);

	network.main = new Network();
	warningBox = new WarningBox('#warning.mdl-js-snackbar'),

	//renderListOfGraphs(table, verticesList);
	//loadExemplosRegistros();
	

	tableChildren =  table.children('tbody').children('tr');

	table.ready(function(){
		//renderDistances(table, grafos.metodosBusca.largura(matrizExemplo));
	});
	
})();

function loadExemplosRegistros(){
	var matrizExemplo = [
			['Ana', 'José', 'João'],
			['Bianca', 'Olivia', 'Laura'],
			['Claudio', 'Vivian', 'Caio']
		];

	for(columnIndex in matrizExemplo){
		var column = matrizExemplo[columnIndex];
		if(Array.isArray(column)){
			for(rowIndex in column){
				var row = column[rowIndex];
				
				network.main.addRegistro(new Vertice(new Registro(row, getRandom(18, false))), network.manager.registeredManager.addValue);
									
			}
		}
	}	
}

//continuar daqui


