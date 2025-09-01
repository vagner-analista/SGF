
function servicetask157(attempt, message) {
        
    try {
    	var solicitacaoXperts = hAPI.getCardValue("solicitacaoXperts");
    	
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
							DescricaoDespesasConsultoria : "Conforme resolução vigente.",
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

function dataEnvio() {
	var dataEnvio = new Date();
	var mes = dataEnvio.getMonth() + 1;ano = ano.toString()
	mes = mes.toString();
	var ano = dataEnvio.getFullYear();
	ano = ano.toString();
	var dia = dataEnvio.getDate();
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
