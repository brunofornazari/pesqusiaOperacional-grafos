var Network = Network || function(){
	var _registros = [],
		_amizades = [],
		idCounter = 1,
		_distancia = [];

	return {
		getCountAmizades : function(){
			return _amizades.length;
		},

		getRegistrados : function(){
			return _registros;
		},

		getRegistradosShadow : function(userId){
			var registros = _registros,
				shadow = [];

			for(var i = 0; i < registros.length; i += 1){
				if(!userId || registros[i].id !== userId){
					shadow.push(registros[i]);
				}
			}

			return shadow;

		},

		getRegisterById : function(id){
			var temp;

			if(typeof id !== 'number'){
				id = parseInt(id);
			}

			for(index in _registros){
				var user = _registros[index];
				if(user.id === id){
					temp = index;
					break;
				}
			}

			if(temp !== 'undefined'){
				return _registros[temp];
			}

			return false;

		},

		getCountRegistros : function(){
			return _registros.length;
		},

		getMatrizRegistros : function(){
			var tempArr = [];
			for(var col = 0; col < _registros.length; col += 1){
				if(!Array.isArray(tempArr[col])){
					tempArr[col] = [];
				}
				for(var row = 0; row < _registros.length; row += 1){
					tempArr[col][row] = _registros[row].vertice;
				}
			}

			return tempArr;
		},

		addRegistro : function(vertice, callback, callbackArguments){
			if(vertice.getContextName && vertice.getContextName() === 'Vertice'){
				
				vertice.getContent().setNetworkID(idCounter);
				
				_registros.push({
						'id' : idCounter++,
						'vertice' : vertice
					});

				for(var col = 0; col < _registros.length; col += 1){
					if(!Array.isArray(_matrizAdj[col])){
						_matrizAdj[col] = [];
					}
					for(var row = 0; row < _registros.length; row += 1){
						if(col === row){
							_matrizAdj[col][row] = 0;
						} else if(!isFinite(_matrizAdj[col][row])){
							_matrizAdj[col][row] = Infinity;
						}
					}
				}

				if(callback){
					if(!callbackArguments){
						callbackArguments = []
					}
					if(!Array.isArray(callbackArguments)){
						callbackArguments = [callbackArguments];
					}

					if(callbackArguments.length > 1){
						var functionHolder = currying(callback, callbackArguments[0]);

						for(argIndex in callbackArguments){
							var arg = callbackArguments[argIndex];
							if(argIndex == callbackArguments.length-1){
								return functionHolder(arg);
							} else {
								functionHolder(arg);
							}							
						}
					} else {
						callback(callbackArguments[0]);
					}
				}
			} else {
				if(warningBox){
					warningBox.setMessage('Não foi possível adicionar o registro: Erro - ' + typeof vertice + ' não é um vértice.', 'danger');
				}
			}
		},

		removeRegister : function(user){
			_registros.splice(_registros.indexOf(user), 1);

			for(var col = 0; col < _registros.length; col += 1){
				if(!Array.isArray(_matrizAdj[col])){
					_matrizAdj[col] = [];
				}
				for(var row = 0; row < _registros.length; row += 1){
					if(col === row){
						_matrizAdj[col][row] = 0;
					} else if(!isFinite(_matrizAdj[col][row])){
						_matrizAdj[col][row] = Infinity;
					}
				}
			}	
		}
	}
}