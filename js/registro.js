var Registro = Registro || function(nome, idade){
	var __nome = nome || '',
		__idade = idade || 0,
		__networkID;

	return {
		setNome : function(nome){
			if(typeof nome === 'string'){
				__nome = nome;
			} else {
				warningBox.setMessage('Erro ao criar registro', 'danger');
			}
		},

		getNome : function(){
			return __nome;
		},

		setIdade : function(idade){
			if(typeof idade === 'number'){
				__idade = Math.round(idade);
			} else {
				warningBox.setMessage('Erro ao criar registro', 'danger');
			}
		},

		getNetworkID : function(){
			return __networkID;
		},

		setNetworkID : function(id){
			__networkID = id;
		},

		getIdade : function(){
			return __idade;
		},

		getContextName : function(){
			return 'Registro';
		}
	}
}