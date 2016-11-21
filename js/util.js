function namespace(str, parent, parentName){
	var parts = str.split('.'),
		parent = parent || grafos,
		parentName = parentName || 'grafos',
		i;

	if(parts[0] === parentName){
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

var currying = function(fn){
	var slice = Array.prototype.slice,
		stored_args = slice.call(arguments, 1);

	return function(){
		var new_args = slice.call(arguments),
			args = stored_args.concat(new_args);

		return fn.apply(null, args);
	};
};

var WarningBox = function(containerTag){
	if(typeof containerTag === 'string'){

		containerTag = document.querySelector(containerTag);

		var __message = '',
			__icon = '',
			textCarrier;

				
			__renderMessage = function(){
				__setIcon(containerTag, textCarrier);
				containerTag.MaterialSnackbar.showSnackbar({
					message: __message,
					actionText: 'X',
					timeout: 10000,
					actionHandler: function(event){
						$(this.parentElement).attr('aria-hidden', true).removeClass('mdl-snackbar--active');

					}
				});
			};

			__setIcon = function(){
				var iconHolder = null,
					iconName = '';

				if($(containerTag).find('i.material-icons').length === 0){
					$(containerTag).append('<i class="material-icons graph-snackbar-icon-centralizer"></i>');
				}

				iconHolder = $(containerTag).find('i.material-icons');


				switch(__icon){
					case 'warning' : 
						iconName = 'warning';
						break;

					case 'danger' :
						iconName = 'error'
						break;

					case 'success' :
						iconName = 'check_circle'
						break;

					default :
						iconName = 'info'
						break;
				}

				iconHolder.text(iconName);
			};

		return {
			setMessage : function(message, icon){
				if(typeof message === 'string'){
					__message = message;
				} else {
					__message = 'WarningBox Error: Got ' + typeof message + ', String expected.';
				}

				__icon = (icon && icon.toString()) || '';
				__renderMessage();
			},
			getMessage : function(){
				return __message;
			}
		}

	} else {
		console.error('Erro ao carregar inicialização: WarningBox tag is invalid.');
	}
}

grafos.metodosBusca.largura = function(matriz, verticeInicial){
	var fila = [],
		first,
		distancia,
		visitado,
		d = 0;

	try{
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

						for(arestasIndex in vertice.getArestas()){
							fila.push(vertice.getArestas()[arestasIndex]);
						}
					}
					continue;
				}
			});
			return distancia;
		}
	} catch (err){
		warningBox.setMessage('Método de Busca - Largura retornou um erro, Contate o administrador e informe erro: ' + err.message, 'danger');
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

function renderListOfGraphs(htmlTag, listOfGraphs){
	var stringHtml = '';

	stringHtml += '<tr><th></th>';

	for(var i = 0; i < listOfGraphs.length; i += 1){
		stringHtml += '<th>' + listOfGraphs[i] + '</th>';
	}

	stringHtml += '</tr>';

	for(var i = 0; i < listOfGraphs.length; i += 1){
		stringHtml += '<tr>';
		stringHtml += '<td>' + listOfGraphs[i] + '</td>';
		for(var counter = 0; counter < listOfGraphs.length; counter += 1){
			stringHtml += '<td></td>';
		} 
		stringHtml += '</tr>';
	}

	if(!htmlTag instanceof $){
		htmlTag = $(htmlTag) || undefined;
	}

	if(htmlTag){
		htmlTag.append(stringHtml);
	} else {
		console.error('Erro ao renderizar.');
	}
}

function renderDistances(htmlTag, listOfDistances){
	var holder,
		maxGraphs = listOfDistances[0].length + listOfDistances[0][0].length,
		counter = 0;

	mainLoop : for(column in listOfDistances){
		inLoop : for(row in listOfDistances[column]){
			$($(htmlTag.children('tbody').children('tr')[row+1]).children('td')[column+1]).text(listOfDistances[column][row].toString());
		}
	}
}

var BadgeManager = function(htmlTag){
	var __tag,
		__value,
		__renderValue;

	if(!(htmlTag instanceof $)){
		__tag = $(htmlTag);
	} else {
		__tag = htmlTag;
	}

	if(!__tag.attr('data-badge')){
		__value = 0;
	} else {
		__value = parseInt(__tag.attr('data-badge'));
	}

	__renderValue = function(){
		__tag.attr('data-badge', __value);
	};

	return {
		addValue : function(value){
			if(typeof value == 'number' || typeof value === 'undefined'){
				if(value){
					__value += Math.round(value);
				} else {
					__value += 1;
				}
				
				__renderValue();
			} else {
				console.error('BadgeManager espera um número, ' + typeof value + ' recebido.');
			}
			
		},
		removeValue : function(value){
			if(typeof value == 'number' || typeof value === 'undefined'){
				if(value){
					__value -= Math.round(value);
				} else {
					__value -= 1;
				}

				__renderValue();
			} else {
				console.error('BadgeManager espera um número, ' + typeof value + ' recebido.');
			}
		},
		setValue : function(value){
			if(typeof value == 'number'){
				__value = Math.round(value);
				__renderValue();
			} else {
				console.error('BadgeManager espera um número, ' + typeof value + ' recebido.');
			}
		},
		getValue : function(){
			return __value;
		}
	}
};

function showDialog(id, callback, arguments){
	var dialog = document.querySelector(id);

	if(!dialog.showModal){
		dialogPolyfill.registerDialog(dialog);
	}

	dialog.querySelector('.close').addEventListener('click', function(oEvent){
		oEvent.stopPropagation();
		if(dialog.open){
			dialog.close();
		}
		
	});
	try{
		if(callback){
			callback(dialog, arguments);
		}

		dialog.showModal();
	} catch(e){
		warningBox.setMessage(e.message, 'warning');
	}
	
}

function validate(valor, schematics, mandatory){
	switch(schematics){
		case 'INPUT__TXT' : 
			if(typeof valor === 'string'){
				return true;
			}
		break;

		case 'INPUT__NUMINT' : 
			var temp = parseInt(valor);
			if(typeof temp === 'number' && temp !== NaN){
				return true;
			}
		break;
	}

	if(mandatory){
		return false;
	} else {
		return true;
	}
}

function loadFriendList(dialog, id){
	var user = network.main.getRegisterById(id),
		list,
		friendList;

	if(user){
		if(user.vertice.getArestas().length > 0){
			friendList = user.vertice.getArestas();
			list = $(dialog).find('ul.mdl-list');

			list.text('');

			$(dialog).find('.mdl-dialog__title').text('Amigos de ' + user.vertice.getContent().getNome());
			for(index in friendList){
				var temp,
					friend = friendList[index].getContent();

				list.append('<li class="mdl-list__item"></li>');
				temp = $(list.children('li.mdl-list__item')[index]);

				temp.append(' <span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-avatar">person</i>' + friend.getNome()  + '</span>');
				temp.append('<span class="mdl-list__item-secondary-action">' + generateButtonString('removeFriend(\'' + id + '\', \'' + friend.getNetworkID() + '\')', '<i class="material-icons">sentiment_very_dissatisfied</i>', 'mdl-button mdl-js-button mdl-button--icon') + '</span>')

			}
			

		} else {
			throw new Error('Usuário não tem amigos ainda!');
		}
	} else {
		throw new Error('Usuário não encontrado.');
	}
}

function loadAvailableFriends(dialog, id){
	var user = network.main.getRegisterById(id),
		table,
		friendList,
		availableList;

	if(user){
		if(user.vertice.getArestas().length > 0){
			friendList = user.vertice.getArestas();
			
		} else {
			friendList = network.main.getRegistrados();
		}

		table = $(dialog).find('tbody');
		$(dialog).find('.mdl-dialog__title').text('Adicionar Amigos - ' + user.vertice.getContent().getNome());
		$(dialog).attr('data-source', user.vertice.getContent().getNetworkID());
		$(dialog).find('button.close').on('click', function(oEvt){
			renderRegisteredList();
		});

		table.text('');

		for(index in friendList){
			var friend = friendList[index].vertice.getContent(),
				temp;
			table.append('<tr></tr>');

			temp = $(table.find('tr')[index]);
			temp.append('<td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="row-' + friend.getNetworkID() + '"><input type="checkbox" data-status="false" data-id="' + friend.getNetworkID() + '" id="row-' + friend.getNetworkID() + '" class="mdl-checkbox__input" /></label></td>');
			temp.append('<td class="mdl-data-table__cell--non-numeric">' + friend.getNome() + '</td>');
			temp.append('<td>' + generateButtonString('onAddFriend(' + user.vertice.getContent().getNetworkID() + ', ' + friend.getNetworkID() + ')','<i class="material-icons">add</i>', 'mdl-button mdl-js-button mdl-button--icon') + '</td>');

			$('#row-' + friend.getNetworkID()).on('click', function(){
				var temp = $(this);
				if(temp.attr('data-status') == 'false'){
					$(this).attr('data-status', 'true');
				} else {
					$(this).attr('data-status', 'false');
				}
			});
		}

	} else {
		throw new Error('Usuário não encontrado.');
	}
}

function onCreateRegister(oSource){
	var dialogInputs = $('#register-dialog').find('form input.mdl-textfield__input'),
		objectValidated = {},
		dialog;
	
	for(index in dialogInputs){
		if(typeof dialogInputs[index] === 'object'){
			var input = $(dialogInputs[index]);
			if(validate(input.val(), input.attr('validator-schematics'), input.attr('data-mandatory'))){
				objectValidated[input.attr('name')] = input.val();
			} else {
				warningBox.setMessage('Erro: Campo ' + input.attr('data-name') + ' precisa ser um campo válido!', 'warning');
				break;
			}
		}
		
	}

	network.main.addRegistro(new Vertice(new Registro(objectValidated.name, objectValidated.age)), network.manager.registeredManager.addValue);

	dialog = document.querySelector('#' + $(oSource).parents('dialog').attr('id'));
	dialog.close();
	warningBox.setMessage('Novo usuário: ' + objectValidated.name + ' acaba de ser registrado!', 'success');
}

function onAddFriend(userId, targetId){
	if(userId !== 'undefined' && targetId !== 'undefined'){
		var user = network.main.getRegisterById(userId),
			friend;
		if(user){

			friend = network.main.getRegisterById(targetId);
			var insertNew = true;

			if(user.vertice.getArestas().length > 0){
				
				for(index in user.vertice.getArestas()){
					var aresta = user.vertice.getArestas()[index].getContent();

					if(aresta.getNetworkID() === targetId){
						warningBox.setMessage(user.vertice.getContent().getNome() + ' e ' + aresta.getNome() + ' já são amigos!');
						insertNew = false;
						break;
					}
				}
			}
			
			if(insertNew){
				user.vertice.addAresta(friend.vertice);

				friend.vertice.addAresta(user.vertice);

				network.manager.friendshipManager.addValue();
				warningBox.setMessage('Agora ' + user.vertice.getContent().getNome() + ' e ' + friend.vertice.getContent().getNome() + ' são amigos!', 'success');
			}
				
			
		}
	} else {
		warningBox.setMessage('Erro ao receber dados, por favor, tente novamente mais tarde!', 'danger');
	}
}

function onAddMultipleFriends(oSource){
	var dialog = $(oSource).parents('dialog'),
		selected = [],
		user = network.main.getRegisterById(parseInt($(dialog).attr('data-source'))),
		userInfo,
		inputList = $($(oSource).parents('dialog').find('table').find('input'));

	if(user){
		userInfo = user.vertice.getContent();

		for(index in inputList){
			var input = inputList[index];
			if(typeof input === 'object'){
				if($(input).attr('data-status') == 'true'){
					var tempId = parseInt($(input).attr('data-id'));
					onAddFriend(userInfo.getNetworkID(), tempId);
				}
			}
			
		}

		dialog = document.querySelector('#' + $(oSource).parents('dialog').attr('id'));
		dialog.close();

		renderRegisteredList();
		warningBox.setMessage(userInfo.getNome() + ' acaba de fazer novos amigos!', 'success');
	}

	
}

function removeFriend(userId, targetId){
	var user = network.main.getRegisterById(userId),
		userInfo,
		friend,
		friendInfo;

	if(user){
		userInfo = user.vertice.getContent();
		if(user.vertice.getArestas().length > 0){
			friend = network.main.getRegisterById(targetId),
			friendInfo = friend.vertice.getContent();

			if(user.vertice.removeAresta(friend.vertice)){
				friend.vertice.removeAresta(user.vertice);
				warningBo0x.setMessage(userInfo.getNome() + ' e  ' + friendInfo.getNome() + ' não são mais amigos.', 'success');
				renderRegisteredList();
				network.manager.friendshipManager.removeValue();
				debugger;
			} else {
				warningBox.setMessage('Parece que ' + userInfo.getNome() + ' e ' + friendInfo.getNome() + ' não são amigos!');
			}

		} else {
			warningBox.setMessage(userInfo.getNome() + ' não tem nenhum amigo para poder remover!', 'warning0');
		}
	} else {
		warningBox.setMessage('Erro ao recuperar usuário, tente novamente mais tarde.', 'danger');
	}
}

function generateButtonString(fnString, textValue, sClass){
	if(!sClass){
		sClass = 'mdl-button mdl-js-button mdl-button--fab mdl-button--colored';
	}
	return '<button type="button" class="' + sClass + '" onclick="' + fnString + '">' + textValue + '</button>';
}

function renderRegisteredList(){
	var userList = network.main.getRegistrados(),
		table = $('#table--list-registered'),
		body = $(table.find('tbody'));

	body.text('');

	if(userList.length > 0){
		for(index in userList){
			var temp,
				vertice = userList[index].vertice,
				id = userList[index].id,
				user = vertice.getContent();
			body.append('<tr></tr>');
			
			temp = $(body.children('tr')[index]);

			temp.append('<td>' + user.getNome() + '</td>');
			temp.append('<td>' + generateButtonString('showDialog(\'#friendship-dialog\', loadFriendList,\'' + id + '\')', vertice.getArestas().length) + '</td>');
			temp.append('<td>' + generateButtonString('showDialog(\'#addFriend-dialog\', loadAvailableFriends, \'' + id + '\')', '<i class="material-icons">add</i>') + '</td>');
			temp.append('<td>' + generateButtonString('showRemoveFriendDialog(' + id + ')', '<i class="material-icons">close</i>', 'mdl-button mdl-js-button mdl-button--icon') + '</td>');
			
		}
	} else {
		warningBox.setMessage('Não há usuários cadastrados!', 'warning');
	}
	table.removeClass('hidden');
}