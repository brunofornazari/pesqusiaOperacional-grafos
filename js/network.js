var Network = Network || function(){
	var _registros = [],
		_amizades = [],
		idCounter = 1;

	return {
		getCountAmizades : function(){
			return _amizades.length;
		},

		getRegistrados : function(){
			return _registros;
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

		getCountRegisstros : function(){
			return _registros.length;
		},

		addRegistro : function(vertice, callback, callbackArguments){
			if(vertice.getContextName && vertice.getContextName() === 'Vertice'){
				
				vertice.getContent().setNetworkID(idCounter);
				_registros.push({
						'id' : idCounter++,
						'vertice' : vertice
					});

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
		}
	}
}