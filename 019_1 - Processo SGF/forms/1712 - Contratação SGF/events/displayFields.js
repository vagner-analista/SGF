function displayFields(form,customHTML){ 

	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	log.info("@@@@@@@@@@@@@@@@@@@@@ displayFields @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

	//=================================================================
	//busca dataset ds_user_wsecm.js - localizando coligada vigente
	//=================================================================
	var dsConfig = DatasetFactory.getDataset("ds_user_wsecm", null, null, null);
	var codColigada = 1;

	if (dsConfig != null && dsConfig.values.length > 0) 
	{
		codColigada = dsConfig.getValue(0, "codcoligada");
	}

	form.setValue("codcoligada", codColigada);


	form.setShowDisabledFields(true);
	form.setHidePrintLink(false);


	customHTML.append("<script> var CURRENT_STATE = "+getValue("WKNumState")+";</script>"); 
	customHTML.append("<script>function getUser(){ return '"+ getValue("WKUser") + "'; }</script>");
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");

	var usuario = getValue("WKUser");
	var atividade = getValue("WKNumState");
	var modo = form.getFormMode();

	log.info("@@@@@@@@@@@@@@@@@@@@@ atividade " + atividade);

	if (atividade ==  INICIO_0 || atividade == INICIO_6 || atividade == COMPL_CAD_XPERTS_154)
	{
		//if (modo == "ADD" || modo == "MOD")
		//{
		form.setValue("txt_solicitante", getNome(usuario));		
		form.setValue("txt_wkUser",getValue("WKUser"));

		var data = new Date();
		var ano = data.getFullYear();
		var dataformatada = formatadata(data.getDate())+"/"+formatadata(data.getMonth()+1)+"/"+data.getFullYear();
		form.setValue("txt_datasol", dataformatada);
		form.setValue("anoContrato", ano);

		form.setValue("txt_data_inicio", dataformatada);
		form.setValue("txt_data_fim", dataformatada);

		//}

		if (atividade ==  COMPL_CAD_XPERTS_154)
		{

			form.setValue("txt_fornecedor", form.getValue("razaoSocialFornecedor"));
			form.setValue("razaoSocialFornecedorXperts", form.getValue("razaoSocialFornecedor"));		
			form.setValue("cnpjFornecedorXperts", form.getValue("cnpjFornecedor"));
			form.setValue("solicitacaoPortalXperts", "ok");

			if(form.getValue("cepPrestacaoServico") != "")
			{
				var cep = 	form.getValue("cepPrestacaoServico").substring(0,5) + "-" + 
				form.getValue("cepPrestacaoServico").substring(5,8);

				form.setValue("txt_cep", cep);
			}

		}



		if(form.getValue("localidade") == ""){
			
			var c1 = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint('colleaguePK.colleagueId', usuario, usuario, ConstraintType.MUST);
			var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(c1, c2), null);
			var loginUsuario = datasetColleague.getValue(0, "login");

			var dsDadosSolicitante = DatasetFactory.getDataset('ds_consultaDadosUsuario_novoTBC', [loginUsuario], null, null);

			if(dsDadosSolicitante.rowsCount > 0){
				
				var localidade = dsDadosSolicitante.getValue(0,"LOCALIZACAO");
				//getMatriculaFluig
				
				if(localidade == "SEDE"){
					
					var secaoDemandante = dsDadosSolicitante.getValue(0,"SECAO_FUNCIONARIO");
					var loginGerenteSede = dsDadosSolicitante.getValue(0,"LOGIN_COORDENADOR");
					var nomeGerenteSede = dsDadosSolicitante.getValue(0,"NOME_COORDENADOR");
					var loginDiretor = dsDadosSolicitante.getValue(0,"USUARIO_DIRETOR");
					var nomeDiretor = dsDadosSolicitante.getValue(0,"NOME_DIRETOR");
					var codUnidadeDemandante = dsDadosSolicitante.getValue(0,"CODDEPTO_FUNCIONARIO");
					
					

					form.setValue("localidade", localidade);					
					form.setValue("nomeDiretor", nomeDiretor); 		
					form.setValue("loginDiretor",loginDiretor); 
					form.setValue("matriculaGestor",getMatriculaFluig(loginGerenteSede));
					form.setValue("unidadeDemandante",secaoDemandante);
					form.setValue("GestorContratacao",nomeGerenteSede);
					form.setValue("idDiretor", getMatriculaFluig(loginDiretor)); 
					form.setValue("codUnidadeDemandante", codUnidadeDemandante); 
					
					
					
				}else{
					
					
					
					var funcaoConfianca = dsDadosSolicitante.getValue(0,"CONFIANCA");
					
					if (funcaoConfianca == "MT02"){						
						//Coordenador no interior
						

						
						var secaoDemandante = dsDadosSolicitante.getValue(0,"SECAO_FUNCIONARIO");	//
						var loginGerenteRegional = dsDadosSolicitante.getValue(0,"LOGIN_GERENTE");
						var nomeGerenteRegional = dsDadosSolicitante.getValue(0,"NOME_GERENTE");					
						var nomeCoordenador = dsDadosSolicitante.getValue(0,"NOME_FUNCIONARIO");
						var loginCoordenador = dsDadosSolicitante.getValue(0,"CODUSUARIO_FUNCIONARIO");
						var loginDiretor = dsDadosSolicitante.getValue(0,"USUARIO_DIRETOR");
						var nomeDiretor = dsDadosSolicitante.getValue(0,"NOME_DIRETOR");
						var codUnidadeDemandante = dsDadosSolicitante.getValue(0,"CODDEPTO_FUNCIONARIO");				
						
						
						form.setValue("localidade", localidade);					
						form.setValue("GestorContratacao",nomeGerenteRegional);
						form.setValue("unidadeDemandante",secaoDemandante); 
						form.setValue("nomeCoordenador", nomeCoordenador); 	
						form.setValue("loginCoordenador", loginCoordenador); 	
						form.setValue("nomeGerenteRegional", nomeGerenteRegional); 
						form.setValue("loginGerenteRegional", loginGerenteRegional); 
						form.setValue("loginDiretor",loginDiretor); 
						form.setValue("nomeDiretor",nomeDiretor);
						
						form.setValue("idCoordenador",getMatriculaFluig(loginCoordenador)); 
						form.setValue("idGerenteRegional", getMatriculaFluig(loginGerenteRegional));
						form.setValue("idDiretor", getMatriculaFluig(loginDiretor)); 
						form.setValue("codUnidadeDemandante", codUnidadeDemandante);
						form.setValue("matriculaGestor",getMatriculaFluig(loginGerenteRegional));
						
						
					} else if (funcaoConfianca == "01"){
						// Gerente no interior
						
						var secaoDemandante = dsDadosSolicitante.getValue(0,"SECAO_FUNCIONARIO");	//
						var loginGerenteRegional = dsDadosSolicitante.getValue(0,"LOGIN_GERENTE");
						var nomeGerenteRegional = dsDadosSolicitante.getValue(0,"NOME_GERENTE");					
						var nomeCoordenador = dsDadosSolicitante.getValue(0,"NOME_FUNCIONARIO");
						var loginCoordenador = dsDadosSolicitante.getValue(0,"CODUSUARIO_FUNCIONARIO");
						var loginDiretor = dsDadosSolicitante.getValue(0,"USUARIO_DIRETOR");
						var nomeDiretor = dsDadosSolicitante.getValue(0,"NOME_DIRETOR");
						var codUnidadeDemandante = dsDadosSolicitante.getValue(0,"CODDEPTO_FUNCIONARIO");				
						
						
						form.setValue("localidade", localidade);					
						form.setValue("GestorContratacao",nomeDiretor);
						form.setValue("unidadeDemandante",secaoDemandante); 
						form.setValue("nomeCoordenador", nomeCoordenador); 	
						form.setValue("loginCoordenador", loginCoordenador); 	
						form.setValue("nomeGerenteRegional", nomeGerenteRegional); 
						form.setValue("loginGerenteRegional", loginGerenteRegional); 
						form.setValue("loginDiretor",loginDiretor); 
						form.setValue("nomeDiretor",nomeDiretor);
						
						form.setValue("idCoordenador",getMatriculaFluig(loginCoordenador)); 
						form.setValue("idGerenteRegional", getMatriculaFluig(loginGerenteRegional));
						form.setValue("idDiretor", getMatriculaFluig(loginDiretor)); 
						form.setValue("codUnidadeDemandante", codUnidadeDemandante);
						form.setValue("matriculaGestor",getMatriculaFluig(loginDiretor));
						
					}
					
					else{
						
						//colaborador do interior
						var secaoDemandante = dsDadosSolicitante.getValue(0,"SECAO_FUNCIONARIO");	//
						var loginGerenteRegional = dsDadosSolicitante.getValue(0,"LOGIN_GERENTE");
						var nomeGerenteRegional = dsDadosSolicitante.getValue(0,"NOME_GERENTE");					
						var nomeCoordenador = dsDadosSolicitante.getValue(0,"NOME_COORDENADOR");
						var loginCoordenador = dsDadosSolicitante.getValue(0,"LOGIN_COORDENADOR");
						var loginDiretor = dsDadosSolicitante.getValue(0,"USUARIO_DIRETOR");
						var nomeDiretor = dsDadosSolicitante.getValue(0,"NOME_DIRETOR");
						var codUnidadeDemandante = dsDadosSolicitante.getValue(0,"CODDEPTO_FUNCIONARIO");
						
						
						
						form.setValue("localidade", localidade);					
						form.setValue("GestorContratacao",nomeCoordenador);
						form.setValue("unidadeDemandante",secaoDemandante); 
						form.setValue("nomeCoordenador", nomeCoordenador); 	
						form.setValue("loginCoordenador", loginCoordenador); 	
						form.setValue("nomeGerenteRegional", nomeGerenteRegional); 
						form.setValue("loginGerenteRegional", loginGerenteRegional); 
						form.setValue("loginDiretor",loginDiretor); 
						form.setValue("nomeDiretor",nomeDiretor);
						
						form.setValue("idCoordenador",getMatriculaFluig(loginCoordenador)); 
						form.setValue("idGerenteRegional", getMatriculaFluig(loginGerenteRegional));
						form.setValue("idDiretor", getMatriculaFluig(loginDiretor)); 
						form.setValue("codUnidadeDemandante", codUnidadeDemandante);
						form.setValue("matriculaGestor",getMatriculaFluig(loginCoordenador));
					}
					
					
				}


			}else{

				var mensagemAlerta = "Não foi possível encontrar os dados de localidade para o usuário " + loginUsuario;

				customHTML.append("<script> alert('"+mensagemAlerta+"');</script>"); 



			}			

		}


	}

	if (atividade !=  INICIO_0 && atividade != INICIO_6 && atividade != COMPL_CAD_XPERTS_154){

		var nomeSOL = form.getValue("txt_solicitante")
		var c1 = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('colleagueName', nomeSOL, nomeSOL, ConstraintType.MUST);
		var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(c1, c2), null);
		var loginUsuario = datasetColleague.getValue(0, "login");

		var dsDadosSolicitante = DatasetFactory.getDataset('ds_consultaDadosUsuario_novoTBC', [loginUsuario], null, null);
		if(dsDadosSolicitante.rowsCount > 0){
			var codUnidadeDemandante = dsDadosSolicitante.getValue(0,"CODDEPTO_FUNCIONARIO");
			form.setValue("codUnidadeDemandante", codUnidadeDemandante); 
		}
	}


}

function getNome(matricula)
{
	var dsColleagues = null;

	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	dsColleagues = DatasetFactory.getDataset("colleague", null, new Array(c1, c2), null);

	if (dsColleagues != null && dsColleagues.values.length > 0) 
	{
		return dsColleagues.getValue(0,"colleagueName");
	}

	return null;
}



//Retorna o chave fluig
function getMatriculaFluig(login)
{
	
	var dsColleagues = null;	
	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("login", login, login, ConstraintType.MUST);
	dsColleagues = DatasetFactory.getDataset("colleague", null, new Array(c1, c2), null);
	
	if (dsColleagues != null && dsColleagues.values.length > 0) 
	{	
		
		return dsColleagues.getValue(0, "colleaguePK.colleagueId");
		
	}
	
	return null;
}
