function servicetask101(attempt, message) 
{
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	log.info("@@@@@@@@@ Integração Geração de Contratos @@@@@@@@@@@@");
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	
	//verifica configuração de casas decimais RM. Caso não estiver OK, cancela integração
	var constraints = new Array();
    var dsVerificacao = DatasetFactory.getDataset("ds_verificacao_casas_decimais_RM", null, constraints, null);

    if (dsVerificacao != null)
	{
    	if (dsVerificacao.getValue(0, "formato_correto") == "false")
    		throw "Configuração de casas decimais com problema! Procure o administrador RM";
	}
    else
	{
    	throw "Verificação de casas decimais RM inexisente!";
	}
    
    
    
	var  result;
	
	try
	{  
	    var usuario = "";
	    var senha = "";
	    var codcoligada = "";
		var idCnt = hAPI.getCardValue("txtIdContratoRM");
	    
	    //busca usuário e senha para integração
		var datasetBase64 = DatasetFactory.getDataset("ds_user_wsecm", null, null, null);
		
		if (datasetBase64 != null && datasetBase64.values.length > 0) 
		{
			usuario = datasetBase64.getValue(0, "usuario");
			senha = datasetBase64.getValue(0, "senha");
			codcoligada = parseInt(datasetBase64.getValue(0, "codcoligada"));
		}
		
		//declaração do serviço
		var serviceName = "TBC_RM";
		var servicePath = "com.totvs.WsDataServer";
		var servico = ServiceManager.getServiceInstance(serviceName);
		var instancia = servico.instantiate(servicePath);
		var ws = instancia.getRMIwsDataServer();
		var serviceHelper = servico.getBean();
		var authService = null;
		
		if (idCnt == "")
		{
			var xml = createXmlContrato(codcoligada);
			authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", usuario, senha);	
			
			result = authService.saveRecord('CtrCntData', xml, 'codcoligada='+ codcoligada +';codusuario=' + usuario);
			
			log.info("@@@@@@[XML] ----> \n" + xml);
			
			if(isError(result.toString()))
			{
				throw result + "[XML] ----> \n" + xml;	    		
			}
			else
			{
				var nroContrato = hAPI.getCardValue("txtNroContrato");
				
				success = true;
				log.info('@@@@@@@@@@ Successo Integração Contrato -> ' + result.toString());
				hAPI.setCardValue("txtIdContratoRM", result.toString().split(";")[1]);
				idCnt = result.toString().split(";")[1];
				hAPI.setCardValue("txtContratoRM", nroContrato);
			}
		}
		
	    //Integração de Centro de Custo e Medição
		if (idCnt != "")
		{
	    	integraCentroCusto(idCnt, codcoligada);
	    	integraMedicao(idCnt, codcoligada);
		}
    }  
    catch (e)   
    {  
        if (e == null)
        	e = "Erro desconhecido!";  
        
    	var mensagemErro = "Ocorreu um erro ao salvar dados no RM: " + e;  
    	log.error("@@@@@@@@@@ erro: "+mensagemErro);
    	
    	throw mensagemErro;
        
	}
}
/**
 * Verifica se o retorno do RM eh erro de negocio.
 * 
 * @param result: Retorno do RM.
 * @returns boolean.
 */
function isError(result) {
	return isNaN(result.substring(0,1));
}