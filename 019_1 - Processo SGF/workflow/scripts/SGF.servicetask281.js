function servicetask281(attempt, message) {

    try {
    	var solicitacaoXperts = hAPI.getCardValue("solicitacaoXperts");

        log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        log.info("@@@@@@@@@@@@@@@ Credenciado Contratação @@@@@@@@@@@@@@@@@@@@@@@@@@");
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

            var IdCredenciadoPFMembros = [parseInt(hAPI.getCardValue("IdCredenciadoPFMembros"))];
            var dataResposta = DataResposta();
            var dataEnvio = DataEnvio();
            var dadosCredenciado = {
                IdContratacao: "",
                CodContratacao : hAPI.getCardValue("codContratacao"),
                IdCredenciadoPJ : hAPI.getCardValue("IdCredenciadoPJ"),
                IdCredenciadoPF : hAPI.getCardValue("IdCredenciadoPF"),
                IdCredenciadoPFSubtituto : hAPI.getCardValue("IdCredenciadoPFSubtituto"),
                IdCredenciadoPFMembros : IdCredenciadoPFMembros,
                DataEnvio : dataEnvio,
                DataResposta : dataResposta
            }  
            
            log.info("@@@@ IdContratacao: " + "");
            log.info("@@@@ codContratacao: " + hAPI.getCardValue("codContratacao"));
            log.info("@@@@ IdCredenciadoPJ: " + parseInt(hAPI.getCardValue("IdCredenciadoPJ")));
            log.info("@@@@ IdCredenciadoPF: " + IdCredenciadoPFMembros);
            log.info("@@@@ IdCredenciadoPFSubtituto: " + parseInt(hAPI.getCardValue("IdCredenciadoPFSubtituto")));
            log.info("@@@@ IdCredenciadoPFMembros: " + IdCredenciadoPFMembros);
            log.info("@@@@ DataEnvio: " + dataEnvio);  
            log.info("@@@@ DataResposta: " + dataResposta);  

            log.info("@@@@ dadosCredenciado-> " + dadosCredenciado);

            var dataCredenciado = {
                    companyId: String(getValue('WKCompany')),               
                    serviceCode: 'integracaoSGF',
                    endpoint: '/api/Contratacao/EscolherCredenciadoContratacao',            
                    method: 'post',
                    timeoutService: '100',          
                    options: {
                        encoding : 'UTF-8',
                        mediaType: 'application/json',
                        useSSL : true
                    },
                    params : dadosCredenciado,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'TokenSGF' : String(token)
                    }            
            }

            //log.info("@@@@ JSON.stringify dataCREDENCIADO -> " + JSON.stringify(dataCredenciado));
            var vo = clientService.invoke(JSONUtil.toJSON(dataCredenciado));  
            var result = JSON.parse(vo.getResult());     
            log.info("@@@@ dataCredenciado result-> " + result);

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
                    log.info("@@@@@@@@@@@@@@@@@@ INTEGRAÇÃO CREDENCIADO INCLUIDO @@@@@@@@@@@@@@@@@@@@");
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


function DataEnvio() {
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

function DataResposta() {
    
    var dataResposta = new Date();
	var mes = dataResposta.getMonth() + 1;
    var ano = dataResposta.getFullYear();
    var dia = dataResposta.getDate();
    ano = ano.toString();
	mes = mes.toString();
	dia = dia.toString();
	var hora = dataResposta.getHours() + 1;
	hora = hora.toString();
	var minutos = dataResposta.getMinutes();
	minutos = minutos.toString();
	var segundos = dataResposta.getSeconds();
	segundos = segundos.toString();

	dataResposta = ano+'-'+mes+'-'+dia+' '+hora+':'+minutos+':'+segundos;
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ dataResposta "+dataResposta);
	return dataResposta;

}    