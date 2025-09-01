function servicetask239(attempt, message) {
	        
    try {
	    	var solicitacaoXperts = hAPI.getCardValue("solicitacaoXperts");
    	if ((solicitacaoXperts == "1" && hAPI.getCardValue("cnpjFornecedor") != "") ||
    			(solicitacaoXperts == ""))
    	{
    		log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            log.info("@@@@@@@@@@@@@@@ Andamento na integração SGF @@@@@@@@@@@@@@@@@@@@@@@");
            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            
            var idPerfilAprovador = 0;
            var idUsuarioAprovador = 0;
            var token = "";
            
	        var clientService = fluigAPI.getAuthorizeClientService();
	        var dsToken = DatasetFactory.getDataset("ds_SGF_busca_token", null, null, null);        
	        
	        if(dsToken.values.length > 0)
	        {
	            
	            if(dsToken.getValue(0, 'resultado') == true)
	            {
	                token = dsToken.getValue(0, 'token');
	                idPerfilAprovador = dsToken.getValue(0, 'idPerfilAprovador');
	                idUsuarioAprovador = dsToken.getValue(0, 'idUsuarioAprovador');
	            } 
	            
	            
	            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	            log.info("@@@@@@@@@@@@@@@@@@@ envio para aprovação @@@@@@@@@@@@@@@@@@@@@@@");
	            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	            
	            if (hAPI.getCardValue("codContratacao") != "")
		        {
	            	var dataAtual = new Date();
	    		    var tmpData = dataAtual.getDate()+"/"+parseInt(dataAtual.getMonth()+1)+"/"+dataAtual.getFullYear();
	    		    tmpData = formataData(tmpData);
	    		    
	    		    var dataEnvioformatada = tmpData + " 00:00:00";	
	    		    
	            	var dadosEnvio = {
	            			CodContratacao : hAPI.getCardValue("codContratacao"),
	            			DataEnvio : dataEnvioformatada,
	        				ListaAprovadores : [ {
	        					IdPerfilAprovador : idPerfilAprovador,                              
	        					IdUsuarioAprovador : idUsuarioAprovador,
	        					OrdemAprovacao : "1"
	                        } ]
	                    }    
	            	
	            	var dataEnvio = {
		                    companyId: String(getValue('WKCompany')),               
		                    serviceCode: 'integracaoSGF',
		                    endpoint: '/api/Contratacao/EnviarContratacaoAprovacao',            
		                    method: 'post',
		                    timeoutService: '100',          
		                    options: {
		                        encoding : 'UTF-8',
		                        mediaType: 'application/json',
		                        useSSL : true
		                    },
		                    params : dadosEnvio,
		                    headers: {
		                    	'Content-Type': 'application/json;charset=UTF-8',
		                        'TokenSGF' : String(token)
		                            }            
		                }
	                
	            	//log.info("@@@@ JSON.stringify dataEnvio -> " + JSON.stringify(dataEnvio));
	            	
	                var vo = clientService.invoke(JSONUtil.toJSON(dataEnvio));
	                //var vo = clientService.invoke(JSON.stringify(dataEnvio));
	                var result = JSON.parse(vo.getResult());

	            	if(vo.getResult()== null || vo.getResult().isEmpty()){
	                   throw "Houve um erro no retorno da integração com SGF. O restorno está vazio.";                          
	                } else if (vo.getHttpStatusResult() < 300){          
	                    
	                    if(result.Success == false){
	                        var statusLog = "";
	                        if(result.Message != undefined){
	                            statusLog += result.Data+"\n";                      
	                        } else {                        
	                            for(var i = 0; i < result.Data.length; i++){
	                                statusLog += result.Data[i]+"\n";
	                            }
	                        }
	                        
	                    } 
	                                    
	                                               
	                } else {
	                    var statusLog = "";
	                    if(result.Message != undefined){
	                    	statusLog += result.Message+"\n"
	                    } else {                        
	                        for(var i = 0; i < result.Data.length; i++){
	                            statusLog += result.Data[i]+"\n";
	                        }
	                    }                
	                    
	                    throw "Houve um erro na integração com SGF. (" + result.Success + ")\n\n" + statusLog;                          
	                } 
		        }
	            
	        }     
    	}
                            
    } catch(error) {       
       throw "Não conseguimos comunicação com o SGF. " + error;
    }
    
}


function formataData(data){
    // converte do formato 00/00/0000 para 0000-00-00
    var str = "";
    if(data != ""){
        str = data.split("/");                
    }
    return str[2]+"-"+str[1]+"-"+str[0];
}