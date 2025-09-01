function afterProcessCreate(processId){
	
    /* ====== Variaveis de sistema ====== */
	var solicitante = hAPI.getCardValue("txt_solicitante");
	var WKCompletTask = getValue("WKCompletTask");
	var user = getValue("WKUser");
	var numSolicitacao = getValue("processInstanceId");
	
	hAPI.setCardValue("txt_numsol", processId);
	hAPI.setCardValue("descricaoSolicitacao", "Data de início - " + hAPI.getCardValue("periodoinicial"));
	
	
	
	// redirencionando dados vindos do portal XPERTS
    if(WKCompletTask != "false" && WKCompletTask != false){
        
        var dataSolicitacao = new Date();
        
        var dia = String(dataSolicitacao.getDate());
        if(dia.length == 1) dia = "0" + dia;
        
        var mes = String(dataSolicitacao.getMonth() + 1);
        if(mes.length == 1) mes = "0" + mes;
        
        
        var status = "Aberto";
                
        //hAPI.getCardValue("TIPOGESTAO")
                
        hAPI.setCardValue("NUMEROTAREFA", numSolicitacao);
        hAPI.setCardValue("txt_datasol", dia + "/" + mes + "/" + dataSolicitacao.getFullYear());
        
        if(user == "iniciaratividadedesolicitacaodecadastrodesgfpartin") { 
            hAPI.seCardValue("txt_solicitante", "portal Xperts"); 
            hAPI.setCartValue("solicitacaoPortalXperts", "0");
        }        
               
        // endereço de realização do serviço
        hAPI.setCardValue("txt_estado", hAPI.getCardValue("_UfSolicitante"));
        hAPI.setCardValue("txt_cidade", hAPI.getCardValue("_cidadeSolicitante"));
        hAPI.setCardValue("txt_rua", hAPI.getCardValue("_enderecoSolicitante"));        
        
        hAPI.setCardValue("area", hAPI.getCardValue("areaContratacao"));
        hAPI.setCardValue("subarea", hAPI.getCardValue("subAreaContratacao"));
        
    }
	
    //disparaEmailGestores();
}



