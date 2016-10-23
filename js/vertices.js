var Vertice = function(content, arestas){
	var _content = content,
		_arestas;

	if(!Array.isArray(arestas)){
		arestas = arestas == true ? [arestas] : [];
	}

	_arestas = arestas;

	return {
		getContent : function(){
			return _content;
		},
		setContent : function(content){
			_content = content;
		},
		getArestas : function(){
			return _arestas;
		},
		setArestas : function(arestas){
			var temp;

			if(!Array.isArray(arestas)){
				temp = [];
				temp.push(arestas);
			}

			_arestas = typeof temp !== 'undefined' ? temp : arestas;
		},
		addAresta : function(aresta) {
			if(!Array.isArray(_arestas)){
				_arestas = [];
			}

			_arestas.push(aresta);
		}
	}
};