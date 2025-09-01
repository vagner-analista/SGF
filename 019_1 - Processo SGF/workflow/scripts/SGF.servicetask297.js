function servicetask297(attempt, message) {

    try {
    	var solicitacaoXperts = hAPI.getCardValue("solicitacaoXperts");

        log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        log.info("@@@@@@@@@@@@@@@ Aprovar Contratação @@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        var clientService = fluigAPI.getAuthorizeClientService();
        var dsToken = DatasetFactory.getDataset("ds_SGF_busca_token", null, null, null);        
        
        if(dsToken.values.length > 0)
        {
            
            if(dsToken.getValue(0, 'resultado') == true)
            {
                var token = dsToken.getValue(0, 'token');
                var idPerfilAprovador = dsToken.getValue(0, 'idPerfilAprovador');
                var idUsuarioAprovador = dsToken.getValue(0, 'idUsuarioAprovador');
            } 

            var DataParecer = dataEnvio();
            var dadosAprovar = {
                CodContratacao : hAPI.getCardValue("codContratacao"),
                DataParecer : DataParecer
            }  

            log.info("@@@@ CodContratacao: " + hAPI.getCardValue("codContratacao"));
            log.info("@@@@ DataParecer: " + DataParecer);  

            var dataAprovar = {
                    companyId: String(getValue('WKCompany')),               
                    serviceCode: 'integracaoSGF',
                    endpoint: '/api/Contratacao/AprovarContratacao',            
                    method: 'post',
                    timeoutService: '100',          
                    options: {
                        encoding : 'UTF-8',
                        mediaType: 'application/json',
                        useSSL : true
                    },
                    params : dadosAprovar,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'TokenSGF' : String(token)
                    }            
            }

            //log.info("@@@@ JSON.stringify dataAprovar -> " + JSON.stringify(dataAprovar));
            var vo = clientService.invoke(JSONUtil.toJSON(dataAprovar));
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
                    
                } else if(result.Success == true){
                    
                    log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                    log.info("@@@@@@@@@@@@@@@@@@ INTEGRAÇÃO APROVAR CONTRATAÇÃO @@@@@@@@@@");
                    log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

                    log.info("@@@@ DATA CREDENCIADO -> " + result.Data);
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
    
    } catch(error) {       
        throw "Não conseguimos comunicação com o SGF. " + error;
    }
}


function dataEnvio() {
	var dataEnvio = new Date();
	var mes = dataEnvio.getMonth() + 1;
    var ano = dataEnvio.getFullYear();
    var dia = dataEnvio.getDate();
    ano = ano.toString();
	mes = mes.toString();
	dia = dia.toString();
	var hora = dataEnvio.getHours();
	hora = hora.toString();
	var minutos = dataEnvio.getMinutes();
	minutos = minutos.toString();
	var segundos = dataEnvio.getSeconds();
	segundos = segundos.toString();

	dataEnvio = ano+'-'+mes+'-'+dia+' '+hora+':'+minutos+':'+segundos;
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ dataEnvio "+dataEnvio);
	return dataEnvio;
}
