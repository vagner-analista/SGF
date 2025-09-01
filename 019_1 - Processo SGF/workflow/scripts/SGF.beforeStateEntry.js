function beforeStateEntry(sequenceId){

	var usuario = getValue("WKUser");
	var WKNumState = parseInt(getValue("WKNumState"));
	var NEXT_STATE = getValue("WKNextState");
	var processo = getValue("WKNumProces");

	log.info("@@@@@@@@@@@@ fluxo_financa - "+ hAPI.getCardValue('fluxo_financa'));
	log.info("@@@@@@@@@@@@ cnpjFornecedor - "+ hAPI.getCardValue('cnpjFornecedor'));

	log.info("@@@@@@@@@@@@ WKNumState - "+ WKNumState);
	log.info("@@@@@@@@@@@@ NEXT_STATE - "+ NEXT_STATE);




	if (NEXT_STATE != null)
	{		
		var cl = DatasetFactory.createConstraint("colleaguePK.colleagueId",usuario,usuario,ConstraintType.MUST);
		var consts = new Array(cl);    
		var dsUsuario = DatasetFactory.getDataset("colleague", null, consts, null);

		if (dsUsuario != null && dsUsuario.values.length > 0) 
		{
			var nomeUsuario = dsUsuario.getValue(0, "colleagueName"); 
		}

		//A cada mudança de atividade, é alterada a data da aprovação (para central de tarefas)
		var dataAtual = new Date();

		var dia = dataAtual.getDate();
		if(dia < 10){
			dia = "0" + dia;
		}
		var mes = dataAtual.getMonth()+1;	
		if(mes < 10){		
			mes = "0" + mes;
		}
		var ano = dataAtual.getFullYear();
		if(ano < 10){
			ano = "0" + ano;
		}
		var hora = dataAtual.getHours();
		if(hora < 10){
			hora = "0" + hora;
		}
		var minuto = dataAtual.getMinutes();
		if(minuto < 10){
			minuto = "0" + minuto;
		}
		var segundo = dataAtual.getSeconds();
		if(segundo < 10){
			segundo = "0" + segundo;
		}
		var dataAtualFinal = dia + "/" + mes + "/" + ano + " - " + hora +":"+minuto+":"+segundo;

		hAPI.setCardValue("dataHoraUltimaAprovacao",dataAtualFinal);





		//gera historico automatico para fiscal e gestor do contrato (quando for aprovação automatica)
		if	(WKNumState == 6 && NEXT_STATE == 132 && hAPI.getCardValue('matriculas_aprovacao_fiscal') == "")
		{
			hAPI.setCardValue("aprovafiscal", "sim");
			hAPI.setCardValue("ck_termo_fiscal", "on");


			var str_historico = dataAtualFinal + ' - ' + hAPI.getCardValue('zoom_fiscal_contrato') + " | Aprovado (automaticamente)<br>" +
			dataAtualFinal + ' - ' + hAPI.getCardValue('zoom_gestor_contrato') + " | Aprovado (automaticamente)";

			hAPI.setCardValue("txt_historico_Fiscal", str_historico + '<br>');

		}

		//historico do fiscal e gestor do contrato
		if	(WKNumState == 113 && NEXT_STATE == 115)
		{
			var txt_aprvadm = hAPI.getCardValue('aprovafiscal');
			var aprovado = "";

			if (txt_aprvadm == "sim")
				aprovado = "Aprovado";
			else if (txt_aprvadm == "ajuste")
				aprovado = "Solicitou Ajuste";
			else
				aprovado = "Não Aprovado";

			var str_historico = hAPI.getCardValue('txt_historico_Fiscal');
			hAPI.setCardValue("txt_historico_Fiscal", str_historico + dataAtualFinal + ' - ' + nomeUsuario + ' | ' + aprovado + '<br>');
		}


		if	(NEXT_STATE == 193)
		{
			var constraints = new Array();
			var emailDestino = "taschek@yahoo.com";

			//RETIRADO PARA TESTES EM PRODUÇÃO
			//emailDestino = hAPI.getCardValue("emailFornecedor");
			/*
			if (emailDestino == "")
				throw "ERRO -> Não foi informado o e-mail do credenciado! [emailFornecedor]";

			//monta e-mail e realiza o envio
			constraints.push(DatasetFactory.createConstraint("emailDestino", emailDestino, emailDestino, ConstraintType.MUST));
			var dsEnvio = DatasetFactory.getDataset("ds_SGF_envia_email_credenciado", null, constraints, null);

			if (dsEnvio != null && dsEnvio.rowsCount > 0) {
				for (var i = 0; i < dsEnvio.rowsCount; i++) {

					//if (dsEnvio.getValue(i, "erro") == "true")
					//	throw "ERRO -> " + dsEnvio.getValue(i, "retorno");
				}
			}


			//monta e-mail e realiza o envio (Cópia)
			constraints.push(DatasetFactory.createConstraint("emailDestino", "camille.campos@mt.sebrae.com.br", "camille.campos@mt.sebrae.com.br", ConstraintType.MUST));
			var dsEnvio = DatasetFactory.getDataset("ds_SGF_envia_email_credenciado", null, constraints, null);

			if (dsEnvio != null && dsEnvio.rowsCount > 0) {
				for (var i = 0; i < dsEnvio.rowsCount; i++) {

					//if (dsEnvio.getValue(i, "erro") == "true")
					//	throw "ERRO -> " + dsEnvio.getValue(i, "retorno");
				}
			}


			//monta e-mail e realiza o envio (Cópia)
			constraints.push(DatasetFactory.createConstraint("emailDestino", "luiz.souza@mt.sebrae.com.br", "luiz.souza@mt.sebrae.com.br", ConstraintType.MUST));
			var dsEnvio = DatasetFactory.getDataset("ds_SGF_envia_email_credenciado", null, constraints, null);

			if (dsEnvio != null && dsEnvio.rowsCount > 0) {
				for (var i = 0; i < dsEnvio.rowsCount; i++) {

					//if (dsEnvio.getValue(i, "erro") == "true")
					//	throw "ERRO -> " + dsEnvio.getValue(i, "retorno");
				}
			}

			 */
		}


		//Preenche o parecer
		if(WKNumState == 322){

			var parecer = hAPI.getCardValue("txa_parecerAssessorGerente");
			if (parecer != "") {

				hAPI.setCardValue("txa_parecerAssessorGerenteDir", parecer);
				hAPI.setCardValue("txt_parecerResponsavel", nomeUsuario);
				hAPI.setCardValue("dt_parecerAssessorGerente", dataAtualFinal);

				hAPI.setTaskComments(usuario, processo, 0, "<b>Parecer: " + parecer.toUpperCase() + "</b>.");


			}

		}

		//Limpa o parecer anterior
		if(NEXT_STATE == 322){
			hAPI.setCardValue("txa_parecerAssessorGerente", "");
		}


	}


}
