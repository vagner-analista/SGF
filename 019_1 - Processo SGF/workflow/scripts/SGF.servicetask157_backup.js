
function servicetask157(attempt, message) {
        
    try {
    	var solicitacaoXperts = hAPI.getCardValue("solicitacaoXperts");
    	if ((solicitacaoXperts == "1" && hAPI.getCardValue("cnpjFornecedor") != "") ||
    			(solicitacaoXperts == ""))
    	{
    		log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            log.info("@@@@@@@@@@@@@@@ Iniciando integração SGF @@@@@@@@@@@@@@@@@@@@@@@");
            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            
            var idPerfilAprovador = 0;
            var idUsuarioAprovador = 0;
            var token = "";
            
            var CodContratacao = "";
            var IdCredenciadoPJ = 0;
            var IdCredenciadoPF = 0;
            var IdCredenciadoPFSubtituto = 0;
            var IdCredenciadoPFMembros = 0;
            
            
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
	            
	            var nome = DatasetFactory.createConstraint('nomeUsuario', hAPI.getCardValue("zoom_gestor_contrato"), hAPI.getCardValue("zoom_gestor_contrato"), ConstraintType.MUST);
	            var tokenSGF = DatasetFactory.createConstraint('token', token, token, ConstraintType.MUST);
	            var dsUsuario = DatasetFactory.getDataset('ds_SGF_consulta_usuario', null, [nome, tokenSGF], null);

	            var idResponsavel = 0;
	            var nomeResponsavel = "";
	            var codigoSecao = 0;
	            
	            
	            if(dsUsuario.values.length > 0)
	            {
	            	idResponsavel = dsUsuario.getValue(0, 'idUsuario');
		            nomeResponsavel = dsUsuario.getValue(0, 'nome');
		            codigoSecao = dsUsuario.getValue(0, 'codigoSecao');
	            }
	            else
            	{
	            	throw "Erro na consulta de usuário";
            	}
	            
	            
	            var formaPrestacaoServ = 0; // FormaPrestacaoServ : 0=Presencial, 1=A Distância, 2=Híbrida
	            var naturezaPrincipal = "";
	            
	            if((hAPI.getCardValue("check_Consultoria") == 'on' && hAPI.getCardValue("check_instrutoria") == 'on') || (hAPI.getCardValue("check_Consultoria") == 'consultoria' && hAPI.getCardValue("check_instrutoria") == 'instrutoria')){
	            	naturezaPrincipal = 2;
	            } else if((hAPI.getCardValue("check_Consultoria") == 'on' && hAPI.getCardValue("check_instrutoria") != 'on') || (hAPI.getCardValue("check_Consultoria") == 'consultoria' && hAPI.getCardValue("check_instrutoria") != 'instrutoria')){
	            	naturezaPrincipal = 0;
	            } else if(hAPI.getCardValue("check_Consultoria") != 'on' && hAPI.getCardValue("check_instrutoria") == 'on' || (hAPI.getCardValue("check_Consultoria") != 'consultoria' && hAPI.getCardValue("check_instrutoria") == 'instrutoria')){
	            	naturezaPrincipal = 1;
	            }
	            
	            
	            // construção de um array de objetos do público alvo
	            var publicoAlvo = [];
	            
	            if(hAPI.getCardValue("check_artesao") == 'on')
	                publicoAlvo.push({IdPublicoAlvo : String(1)});
	            if(hAPI.getCardValue("check_epp") == 'on')
	                publicoAlvo.push({IdPublicoAlvo : String(2)});
	            if(hAPI.getCardValue("check_me") == 'on')
	                publicoAlvo.push({IdPublicoAlvo : String(3)});
	            if(hAPI.getCardValue("check_mei") == 'on')
	                publicoAlvo.push({IdPublicoAlvo : String(4)});
	            if(hAPI.getCardValue("check_potencialempreendedor") == 'on')
	                publicoAlvo.push({IdPublicoAlvo : String(5)});
	            if(hAPI.getCardValue("check_produtorrural") == 'on')
	                publicoAlvo.push({IdPublicoAlvo : String(6)});
	            if(hAPI.getCardValue("check_outros") == 'on')
	                publicoAlvo.push({IdPublicoAlvo : String(7)});
	            
	            
	            var IdArea = 0;
	            var IdSubarea = 0;
	            
	            if (hAPI.getCardValue("areaContratacao") != "" && hAPI.getCardValue("areaContratacao") != null)
	            	IdArea = hAPI.getCardValue("areaContratacao");
	            
	            if (hAPI.getCardValue("subAreaContratacao") != "" && hAPI.getCardValue("subAreaContratacao") != null)
	            	IdSubarea = hAPI.getCardValue("subAreaContratacao");
	            

	            var vlrHoraConsultoria = 0;
	            var vlrHoraInstrutoria = 0;
	            
	            var cargaHorariaConsultoria = 0;
	            var qtdeEntregasInstrutoria = 0;
	           

	            // montagem do array de objetos dos itens
	            var indexesItens = hAPI.getChildrenIndexes("dadositens");
	            var qtdItens = indexesItens.length;
	            var contratacaoSubArea = [];

	            for(var i = 1; i <= qtdItens; i++){
	                
	                //var tipoFaturamento = hAPI.getCardValue("zoom_tipo_faturamento___"+i);
	                var tipoFaturamento = hAPI.getCardValue("txt_CODTIP___"+i);
	                
	                log.info("@@@@@@@@@@ tipoFaturamento -> " + tipoFaturamento);
	                
	                if(tipoFaturamento == "001"){
	                    vlrHoraConsultoria = hAPI.getCardValue("txt_valor___"+i).replace(".","").replace(",",".");
	                    cargaHorariaConsultoria = hAPI.getCardValue("txt_quantidade___"+i).replace(".","").replace(",",".");
	                } else if(tipoFaturamento == "013"){
	                    vlrHoraInstrutoria = hAPI.getCardValue("txt_valor___"+i).replace(".","").replace(",",".");
	                    qtdeEntregasInstrutoria = hAPI.getCardValue("txt_quantidade___"+i).replace(".","").replace(",",".");
	                }
	                
	                cargaHorariaConsultoria = parseInt(cargaHorariaConsultoria);
	                qtdeEntregasInstrutoria = parseInt(qtdeEntregasInstrutoria);
	                
	                contratacaoSubArea.push({IdArea : "", IdSubArea : ""});                
	            }
	            
	            var somaEntregasConsultoria = 0;
	            var somaEntregasInstrutoria = 0;

	            // montagem do array de objetos das entregas
	            var indexesEntregas = hAPI.getChildrenIndexes("dadositensmedicao");
	            var qtdEntregas = indexesEntregas.length;                       
	            var entregas = [];
	            
	            for(var e = 1; e <= qtdEntregas; e++){
	                var natureza = "";
	                for(var n = 1; n <= qtdItens; n++){
	                    if(hAPI.getCardValue("neto_dadositensmedicao___"+e) == hAPI.getCardValue("filho_dadositens___"+n)){
	                        var tipoFaturamento = hAPI.getCardValue("txt_CODTIP___"+n);
	                        
	                        log.info("@@@@@@@@@@ txt_CODTIP___ - " + hAPI.getCardValue("txt_CODTIP___"+n));
	                        
	                        if(tipoFaturamento == "001"){
	                            natureza = 0;
	                            somaEntregasConsultoria++;
	                        } else if(tipoFaturamento == "013"){
	                            natureza = 1;
	                            somaEntregasInstrutoria++;
	                        } else {
	                            natureza = 2;
	                        }
	                    }
	                }
	                                
	                entregas.push({
	                    Valor : String("" + hAPI.getCardValue("vl_medicao_item___"+e).replace(".","").replace(",",".")),
	                    Descricao : String(hAPI.getCardValue("ds_descricao_entrega_item___"+e)),
	                    Natureza : String(natureza),
	                    Data : String(formataData(hAPI.getCardValue("dt_medicao_item___"+e)))
	                });
	            }
	            
	            
	            var indexesCCusto = hAPI.getChildrenIndexes("centroDeCusto");
	            var qtdOrcamento = indexesCCusto.length;
	            var orcamento = [];
	            
	            for(var o = 1; o <= qtdOrcamento; o++){
	                /*for(var n = 1; n <= qtdItens; n++){
	                    if(hAPI.getCardValue("neto_dadositensmedicao___"+o) == hAPI.getCardValue("filho_dadositens___"+n)){
	                        var tipoFaturamento = parseInt(hAPI.getCardValue("txt_CODTIP___"+o));
	                        
	                        log.info("@@@@@@@@@@ tipoFaturamento - " + tipoFaturamento);
	                        
	                        if(tipoFaturamento == 1){
	                            natureza = 0;
	                        } else if(tipoFaturamento == 13){
	                            natureza = 1;
	                        } else {
	                            natureza = 2;
	                        }
	                    }
	                }*/
	                
	                orcamento.push({
	                        Natureza : String(naturezaPrincipal),
	                        CodProjeto : String(hAPI.getCardValue("txt_codprojeto___"+o)),
	                        CodAcao : String(hAPI.getCardValue("txt_codacao___"+o)),
	                        CodUnidade : String(hAPI.getCardValue("txt_codrecurso___"+o)),
	                        Percentual : String(hAPI.getCardValue("txt_percentual___"+o))
	                    });
	            }
	               
	            
	            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	            log.info("@@@@@@@@@@@@@@@ Iniciando contratação @@@@@@@@@@@@@@@@@@@@@@@@@@");
	            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	            
	            var dadosContrato = {
	                            UFContratacao : String(hAPI.getCardValue("uf")),
	                            UFCredenciado : String(hAPI.getCardValue("uf")),
	                            FormaPrestacaoServ : String(formaPrestacaoServ),
	                            CodSecao : String(codigoSecao),
	                            Natureza : String(naturezaPrincipal),
	                            Responsavel : String(idResponsavel),
	                            ContratacaoSubArea : [ {
	                              IdArea : String(IdArea),                              
	                              IdSubarea : String(IdSubarea)
	                            } ],
	                            PublicoAlvo : publicoAlvo,
	                            Objeto : String(hAPI.getCardValue("txa_objetocontratacao")),
	                            JustificativaContratacao : String(hAPI.getCardValue("txa_justificativa")),
	                            DataInicio : String(formataData(hAPI.getCardValue("periodoinicial"))),
	                            DataFim : String(formataData(hAPI.getCardValue("periodofinal"))),
	                            Cep : String(hAPI.getCardValue("txt_cep")),
	                            ValorHoraConsultoria : parseFloat(vlrHoraConsultoria),
	                            CargaHorariaConsultoria : String(cargaHorariaConsultoria),
	                            QtdeEntregasConsultoria : String(somaEntregasConsultoria),
	                            DespesaViagemConsultoria : "",
	                            DescricaoDespesasConsultoria : "",
	                            ValorHoraInstrutoria : parseFloat(vlrHoraInstrutoria),
	                            CargaHorariaInstrutoria : String(qtdeEntregasInstrutoria),
	                            QtdeEntregasInstrutoria : String(somaEntregasInstrutoria),
	                            DespesaViagemInstrutoria : "",
	                            DescricaoDespesasInstrutoria : "",
	                            Entregas : entregas,
	                            DadosOrcamentarios : orcamento,
	                            IdProduto : "",
	                            OutroPublicoAlvo : String(hAPI.getCardValue("txa_outros")),
	                            JustificativaUFAlternativa : "AUTOMÁTICO - CAMPO NÃO DEFINIDO EM FORMULÁRIO"
	                        }    
	            
	            
	            
	            var dataContrato = {
	                    companyId: String(getValue('WKCompany')),               
	                    serviceCode: 'integracaoSGF',
	                    endpoint: '/api/Contratacao/IncluirContratacaoRodizio',            
	                    method: 'post',
	                    timeoutService: '100',          
	                    options: {
	                        encoding : 'UTF-8',
	                        mediaType: 'application/json',
	                        useSSL : true
	                    },
	                    params : dadosContrato,
	                    headers: {
	                        'Content-Type': 'application/json;charset=UTF-8',
	                        'TokenSGF' : String(token)
	                            }            
	                }
	            
	            log.info("@@@@ JSON.stringify dataContrato -> " + JSON.stringify(dataContrato));
	            
	            
	            var vo = clientService.invoke(JSON.stringify(dataContrato));
	            
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
	                    
	                	CodContratacao = result.Data["CodContratacao"];
	                	
	                	hAPI.setCardValue("idContratacao", result.Data["IdContratacao"]);
	                    hAPI.setCardValue("codContratacao", result.Data["CodContratacao"]);
	                    hAPI.setCardValue("txt_cc", result.Data["CodContratacao"]);
	                    
	                    log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	                    log.info("@@@@@@@@@@@@@@@@@@ CONTRATACAO INCLUIDA @@@@@@@@@@@@@@@@@@@@");
	                    log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	                    log.info("@@@@ idContratacao -> " + result.Data["IdContratacao"]);
	                    log.info("@@@@ codContratacao -> " + result.Data["CodContratacao"]);
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
	            
	            
	            
	            
	            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	            log.info("@@@@@@@@@@@@@@@@@@@ aprovação da contratação @@@@@@@@@@@@@@@@@@@");
	            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	            
	            
	            if (hAPI.getCardValue("codContratacao") != "")
		        {
	            	var dataAtual = new Date();
	    		    var tmpData = dataAtual.getDate()+"/"+parseInt(dataAtual.getMonth()+1)+"/"+dataAtual.getFullYear();
	    		    tmpData = formataData(tmpData);
	    		    
	    		    var dataEnvioformatada = tmpData + " 01:00:00";	
	    		    
	    		    
	            	var dadosAprovar = {
	            			CodContratacao : hAPI.getCardValue("codContratacao"),
	            			DataParecer : dataEnvioformatada
	                    }    
	            	
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
	                //var vo = clientService.invoke(JSON.stringify(dataAprovar));
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
	                        
	                        hAPI.setCardValue("idAprovacaoContratacao", result.Data.IdAprovacaoContratacao);
                        
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
	            
	            
	            
	            //*************************************************************************************
	            //caso for uma solicitação vinda do xperts, realiza a busca e atribuição do credenciado
	            //*************************************************************************************
	            
	            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	            log.info("@@@@@@@@@@@@@@@ Buscando Id's do credenciado @@@@@@@@@@@@@@@@@@@");
	            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");


	            if (hAPI.getCardValue("codContratacao") != "")
		        {
	            	//var cnpjFornecedor = hAPI.getCardValue("cnpjFornecedor").replace(".","").replace(".","").replace("/","").replace("-","");
	            	
	            	var dadosEnvio = {
	            			
	            			UFCredenciado : String(hAPI.getCardValue("uf")),
                            Natureza : String(naturezaPrincipal),
                            FormaPrestacaoServ : String(formaPrestacaoServ),
	        				Areas : [ {
	        					IdArea : String(IdArea),                              
	        					SubAreas : [ String(IdSubarea) ]
	                        } ]
	                    }    
	            	
	            	
	            	var dataConsultaCredenciado = {
		                    companyId: String(getValue('WKCompany')),               
		                    serviceCode: 'integracaoSGF',
		                    endpoint: '/api/Contratacao/GerarRodizio',            
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
	                
	            	//log.info("@@@@ JSON.stringify dataConsultaCredenciado -> " + JSON.stringify(dataConsultaCredenciado));
	            	
	                var vo = clientService.invoke(JSON.stringify(dataConsultaCredenciado));
	                var result = JSON.parse(vo.getResult());                                    

	                log.info("@@@@ result dataConsultaCredenciado -> " + result);
	                log.info("@@@@ result dataConsultaCredenciado -> " + JSON.stringify(result));
	                
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
	                        
	                    	var cnpjFornecedor = hAPI.getCardValue("cnpjFornecedor").replace(".","").replace(".","").replace("/","").replace("-","");
	                    	var solicitacaoXperts = hAPI.getCardValue("solicitacaoXperts");
	                    	
	                    	
	                    	log.info("@@@@ result.Data.length -> " + result.Data.length);
	                    	
	                    	for (var i = 0; i < result.Data.length; i++) 
	                    	{
	                    		
	                    		 
	                    		log.info("@@@@ result.Data[i].CNPJ -> " + result.Data[i].CNPJ);
	                    		log.info("@@@@ result.Data[i].IdCredenciadoPessoaJuridica -> " + result.Data[i].IdCredenciadoPessoaJuridica);
	                    		log.info("@@@@ result.Data[i].IdCredenciadoPessoaJuridica -> " + result.Data[i].IdCredenciadoPessoaJuridica);
	                    		
	                    		
	                    		if ((solicitacaoXperts == "1" && result.Data[i].CNPJ == cnpjFornecedor) ||
	                    			(solicitacaoXperts == ""))
	                    		{	
	                    			log.info("@@@@ entrou If " + result.Data[i].IdCredenciadoPessoaJuridica);
	                    			log.info("@@@@ result.Data[i].EquipeTecnica.length " + result.Data[i].EquipeTecnica.length);
		                    		
	                    			hAPI.setCardValue("IdCredenciadoPJ", result.Data[i].IdCredenciadoPessoaJuridica);
	                    			IdCredenciadoPJ = result.Data[i].IdCredenciadoPessoaJuridica;
	                    			
	                    			
			                        if (result.Data[i].EquipeTecnica.length == 0)
		                        	{
			                        	throw "Equipe técnica não definida. \n\n" + statusLog;   
		                        	}
			                        else if (result.Data[i].EquipeTecnica.length == 1)
		                        	{
			                        	log.info("@@@@ entrou If - 1 ");
			                        	
			                        	hAPI.setCardValue("IdCredenciadoPFSubtituto", result.Data[i].EquipeTecnica[0].IdCredenciadoPessoaFisica);
				                        hAPI.setCardValue("IdCredenciadoPF", result.Data[i].EquipeTecnica[0].IdCredenciadoPessoaFisica);
				                        hAPI.setCardValue("IdCredenciadoPFMembros", result.Data[i].EquipeTecnica[0].IdCredenciadoPessoaFisica);
		                        	
				                        IdCredenciadoPF = result.Data[i].EquipeTecnica[0].IdCredenciadoPessoaFisica;
				                        IdCredenciadoPFSubtituto =  result.Data[i].EquipeTecnica[0].IdCredenciadoPessoaFisica;
				                        IdCredenciadoPFMembros = result.Data[i].EquipeTecnica[0].IdCredenciadoPessoaFisica;
		                        	}
			                        
			                        //é necessário informar um PF substituto
			                        //se só tiver 1 PF, usa ele como substituto
			                        //caso contrário, usa o 2o PF como substituto
			                        
			                        else if (result.Data[i].EquipeTecnica.length > 1)
		                        	{
			                        	log.info("@@@@ entrou If - 2 ");
			                        	hAPI.setCardValue("IdCredenciadoPFSubtituto", result.Data[i].EquipeTecnica[1].IdCredenciadoPessoaFisica);
				                        hAPI.setCardValue("IdCredenciadoPF", result.Data[i].EquipeTecnica[0].IdCredenciadoPessoaFisica);
				                        hAPI.setCardValue("IdCredenciadoPFMembros", result.Data[i].EquipeTecnica[0].IdCredenciadoPessoaFisica);

				                        IdCredenciadoPF = result.Data[i].EquipeTecnica[0].IdCredenciadoPessoaFisica;
				                        IdCredenciadoPFSubtituto =  result.Data[i].EquipeTecnica[1].IdCredenciadoPessoaFisica;
				                        IdCredenciadoPFMembros = result.Data[i].EquipeTecnica[0].IdCredenciadoPessoaFisica;
				                        
		                        	}
			                        
			                        
			                        log.info("@@@@ codContratacao " + hAPI.getCardValue("codContratacao"));
			                        log.info("@@@@ IdCredenciadoPFSubtituto " + hAPI.getCardValue("IdCredenciadoPFSubtituto"));
			                        log.info("@@@@ IdCredenciadoPF " + hAPI.getCardValue("IdCredenciadoPF"));
			                        log.info("@@@@ IdCredenciadoPFMembros " + hAPI.getCardValue("IdCredenciadoPFMembros"));
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
	            
	            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	            log.info("@@@@@@@@@@@@@@@@@@@ Atribui o credenciado @@@@@@@@@@@@@@@@@@@@@");
	            log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	            
	            //chama a escolha do  fornecedor credenciado
	            if (hAPI.getCardValue("codContratacao") != "")
	            {
	    		    var dataAtual = new Date();
	    		    var tmpData = dataAtual.getDate()+"/"+parseInt(dataAtual.getMonth()+1)+"/"+dataAtual.getFullYear();
	    		    tmpData = formataData(tmpData);
	    		    
	    		    var dataEnvioFormatada = tmpData + " 06:00:00";	
	    		    var dataRespostaFormatada = tmpData + " 08:00:00";
	    		    
	            	var dadosEscolherCredenciado = {
	            			CodContratacao : CodContratacao,
	            			IdCredenciadoPJ: String(IdCredenciadoPJ),
	            			IdCredenciadoPF: String(IdCredenciadoPF),
	            			IdCredenciadoPFSubtituto: String(IdCredenciadoPFSubtituto),
	            			IdCredenciadoPFMembros: [String(IdCredenciadoPFMembros)],
	            		    DataEnvio: dataEnvioFormatada,
	            		    DataResposta: dataRespostaFormatada
	                    }  
	            	
	            	
	            	var dataEscolherCredenciado = 
		            {
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
		                    params : dadosEscolherCredenciado,
		                    headers: {
		                        'Content-Type': 'application/json;charset=UTF-8',
		                        'TokenSGF' : String(token)
		                            }            
	                }
	            	
	            	log.info("@@@@ dadosEscolherCredenciado -> " + dadosEscolherCredenciado);
	            	log.info("@@@@ dataEscolherCredenciado -> " + dataEscolherCredenciado);
	            	
	            	log.info("@@@@ JSON.stringify dadosEscolherCredenciado -> " + JSON.stringify(dadosEscolherCredenciado));
	            	log.info("@@@@ JSON.stringify dataEscolherCredenciado -> " + JSON.stringify(dataEscolherCredenciado));
	            	
	            	var vo = clientService.invoke(JSON.stringify(dataEscolherCredenciado));
	            	
	            	//(JSON.stringify(dataConsultaCredenciado));
		            var result = JSON.parse(vo.getResult());                                    

	            	if(vo.getResult()== null || vo.getResult().isEmpty())
		            {
		               throw "Houve um erro no retorno da integração com a escolha do credenciado. O restorno está vazio.";                          
		            } 
		            else if (vo.getHttpStatusResult() < 300)
		            {          
		                
		                if(result.Success == false)
		                {
		                    var statusLog = "";
		                    if(result.Message != undefined)
		                    {
		                        statusLog += result.Data+"\n";                      
		                    } 
		                    else 
		                    {                        
		                        for(var i = 0; i < result.Data.length; i++)
		                        {
		                            statusLog += result.Data[i]+"\n";
		                        }
		                    }
		                    
		                } 
		                                           
		            } 
		            else 
		            {
		                var statusLog = "";
		                if(result.Message != undefined){
		                	statusLog += result.Message+"\n";       
		                	
		                } else {                        
		                    for(var i = 0; i < result.Data.length; i++){
		                        statusLog += result.Data[i]+"\n";
		                    }
		                }                
		                
		                throw "Houve um erro na integração com SGF. (" + result.Success + ")\n\n" + statusLog;                          
		            }
	            }
	            
	            //*************************************************************************************
	            //caso NÃO for uma solicitação vinda do xperts, realiza o rodizio
	            //*************************************************************************************
	            
	            else
            	{
	            	
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