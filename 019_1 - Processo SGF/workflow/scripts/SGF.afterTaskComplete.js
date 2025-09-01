function afterTaskComplete(colleagueId,nextSequenceId,userList){

	var CURRENT_STATE = getValue("WKNumState");
	
	

	if (CURRENT_STATE == 132){

		disparaEmailGestores();

	}	

}







function disparaEmailGestores(){

	log.info('@@@@@@@@@@@@@@@@@@@@@@@@@@ disparando e-mail >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

	var numeroSol = getValue("WKNumProces");
	var dataSolicitacao = getValue("txt_datasol");
	var objetoContratacao = getValue("txa_objetocontratacao");
	var valorContratacao = getValue("txt_valor_total");
	var solicitante = hAPI.getCardValue("txt_solicitante");
	var gerencia = hAPI.getCardValue("unidadeDemandante");


	log.info('@@@@@@@@@@@@@@@@@@@@@@@@@ >>>>>>>>>>>>>>>>>>>>> email do gerente do projeto' + numeroSol);

	var html ='';

	html += " <h4>AVISO: PROCESSO DE CONTRATAÇÃO SGF - FLUIG - SEBRAE/MT N°: " + numeroSol + " </h4>                                ";			  
	html += " <br />                                                                                                                ";
	html += " <br />                                                                                                                ";
	html += " <p>Caro(a) Gestor, </p>      																							";
	html += " <br />                                                                                                                ";
	html += " <br />                                                                                                                ";
	html += " <br />                                                                                                                ";
	html += " <p>Foi aberta uma solicitação no fluig, para o seu projeto, conforme os dados abaixo:</p>                             ";	
	html += " <br />                                                                                                                ";
	html += " <br />                                                                                                                ";	   
	html += " <p> Número da solicitação: "+numeroSol+"</p>                                                                          ";
	html += " <p> Data da Solicitação: "+dataSolicitacao+"</p>                                                                      ";
	html += " <p> Total Contratação: "+ valorContratacao+"</p>                                                                      ";
	html += " <p> Solicitante: " + solicitante+ " </p>                                                                              ";
	html += " <p> Gerência: " + gerencia + " </p>                                                                                   ";
	html += " <br />                                                                                                                ";
	html += " <br />                                                                                                                ";
	html += " <br />                                                                                                                ";
	html += " <h5> OBJETO CONTRATAÇÃO: </h5>                            									                        ";
	html += " <br />                                                                                                                ";
	html += " <p>"+objetoContratacao+"</p>                                                                                          ";


	
	
	
	
	try{
		//Monta mapa com parâmetros do template
		var parametros = new java.util.HashMap();

		parametros.put("CORPO_EMAIL", html);			   

		//Este parâmetro é obrigatório e representa o assunto do e-mail
		parametros.put("subject", "PROCESSO SGF - " + numeroSol);


		var destinatarios = new java.util.ArrayList();


		//INICIO DO CONTROLE DOS DESTINATÁRIOS
		var gestores = [];

		var indexes = hAPI.getChildrenIndexes("centroDeCusto");
		for (var i = 0; i < indexes.length; i++) {
			var projeto = hAPI.getCardValue("txt_codprojeto___" + indexes[i]);
			gestores.push(DatasetFactory.createConstraint('txt_CodigoProjeto', projeto, projeto, ConstraintType.SHOULD));

		}

		var dsConsultaGestores = DatasetFactory.getDataset('ds_consultaConfiguracaoCadastroGestores', null, gestores, null);

		for (var i = 0; i < dsConsultaGestores.rowsCount; i++) {

			if(dsConsultaGestores.getValue(i, "txt_UsuarioGestor") != hAPI.getCardValue("txt_wkUser")){

				destinatarios.add(dsConsultaGestores.getValue(i, "txt_UsuarioGestor"));

			}
		}


		//destinatarios.add("vagner.duarte@mt.sebrae.com.br");


		//Envia e-mail
		notifier.notify("774b35b6-6124-48de-996a-f3fbf3f53d42", "template_emailFluig", parametros, destinatarios, "text/html");
		//primeiro parâmetro e a chapa do remetente do e-mail (Tem que ser um usuário ativo no FLUIG).

	} catch(e){
		log.info(e);
	}	



}
