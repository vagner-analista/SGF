function validateForm(form){
	
	
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	log.info("@@@@@@@@@ validateForm @@@@@@@@@@");
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	
	
	var atividade = parseInt(getValue("WKNumState"));
	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");
	
	//temp
	//return;
	
	var mensagemErro = "";
	var	lineBreaker = "<br>";
	
	if(!COMPLETED_TASK || atividade == NEXT_STATE)
		return;
	
	
	
	if(atividade == VALIDACAO_COORDENADOR)
	{
		if(form.getValue("aprovaCoordenador")==""){		
			mensagemErro += "Atenção: Informar se a contração será autorizada, recusada ou enviada para ajuste!"  + lineBreaker;
		}
		
		/*if (form.getValue("aprovadirex") != "sim" && indexes3.length == 0)
		{			
			mensagemErro += "Atenção, Informe o parecer da gerência no campo Observações/Detalhamento "  + lineBreaker;			
		}
		*/
	}
	//Gerente Regional
	else if(atividade == VALIDACAO_GERENTE_REGIONAL)
	{
		if(form.getValue("aprovaGerenteRegional")==""){		
			mensagemErro += "Atenção: Informar se a contração será autorizada, recusada ou enviada para ajuste!"  + lineBreaker;
		}
		
		
		
	}
	
	//Assessor - GE
	else if(atividade == PARECER_ASSESSOR_GE)
	{
		if(form.getValue("txa_parecerAssessorGerente")==""){		
			mensagemErro += "Atenção: Informar o parecer solicitado pela Diretoria!"  + lineBreaker;
		}
		
		
	}
	
	

	
	
	
	
	var indexes = form.getChildrenIndexes("centroDeCusto");//Aqui vai o nome da minha tabela Pai e filho e verifica se tem campo adicionado;
	var indexes2 = form.getChildrenIndexes("tb_obsgerencia");
	var indexes3 = form.getChildrenIndexes("tb_obsDirex");
	var indexes_itens = form.getChildrenIndexes("dadositens");
	
	//1==2 && 
	//Atividade de Início
	if (((atividade == INICIO_0 || atividade == INICIO_6 || atividade == ANALISAR_ERRO_INT_SGF_161 || 
			atividade == ANALISAR_ERRO_INT_SGF_187 || atividade == COMPL_CAD_XPERTS_154) 
			&& getValue("WKUser") != "iniciaratividadedesolicitacaodecadastrodesgfpartin") || atividade == REVISAO_11)
	
		/*if (((atividade == INICIO_0 || atividade == INICIO_6 || atividade == ANALISAR_ERRO_INT_SGF_161 || 
				atividade == ANALISAR_ERRO_INT_SGF_187 || atividade == COMPL_CAD_XPERTS_154  || atividade == REVISAO_11) 
				&& getValue("WKUser") != "iniciaratividadedesolicitacaodecadastrodesgfpartin" 
					&& form.getValue("solicitacaoXperts") != "" && form.getValue("solicitacaoXperts") != "OK")
				)*/

	
	{
		/*if (form.getValue("txt_buscarFornecedor") == "" || form.getValue("txt_buscarFornecedor") == null)
			{
				mensagemErro += "Fornecedor não foi informado. " + lineBreaker;
			}*/
		
		if (form.getValue("chkTermoResponsabilidade") == "" || form.getValue("chkTermoResponsabilidade") == null)
		{
			mensagemErro += "Termo de Declaração não foi informado. " + lineBreaker;
		}
		
		/*if (form.getValue("txt_idprd_SAS") == "" || form.getValue("txt_idprd_SAS") == null)
		{
			mensagemErro += "Produto SAS não foi informado. " + lineBreaker;
		}*/
		
		if(form.getValue("rd_sistemareceita") == "" || form.getValue("rd_sistemareceita") == null){
			mensagemErro +=  "Por favor, informe se há um processo de Receita"  + lineBreaker;
		}
		
		
		if(form.getValue("rd_sistemacontratacao") == "" || form.getValue("rd_sistemacontratacao") == null){
			mensagemErro +=  "Por favor, informe o Tipo de Serviço!"  + lineBreaker;
		}
		
		//se for sistema de contratação Experts, não exige o preenchimento da forma de contratação
		/*if(form.getValue("rd_sistemacontratacao") != "sgc"){
			
			if(form.getValue("rd_formacontratacao")==""){
				
				mensagemErro +=  "Por favor, informe a forma de contratação!"  + lineBreaker;
			}
			
			//if(form.getValue ("rd_formacontratacao")=="continuidade" && form.getValue("txt_cartacontrato") == ""){
			//	
			//	mensagemErro +=  "Atenção, para a modalidade continuidade, deve ser informado o numero da carta contrato!"  + lineBreaker;
			//}
		}*/
		
		if(form.getValue ("uf")=="00" || form.getValue ("uf")==""){
			
			mensagemErro += "Localização da empresa credenciada não foi informada. " + lineBreaker;
		}
		
		if(form.getValue("check_Consultoria") == "" && form.getValue("check_instrutoria") == ""){
			mensagemErro +=  "Atenção, Informar a natureza da prestação de Servico Instrutoria/Consultoria"  + lineBreaker;	
		}
		
		/*if(form.getValue ("areaContratacao") == "" || form.getValue("areaContratacao")==null){
			mensagemErro +=  "Atenção, Informe o campo Área"  + lineBreaker;
		}
		
		if(form.getValue ("subAreaContratacao") == "" || form.getValue("subAreaContratacao")==null){
			mensagemErro +=  "Atenção, Informe o campo Sub Área"  + lineBreaker;
		}*/
		log.info("@@@@@@@@@@@@@@@@@ ");
		
		log.info("@@@@@@ check_artesao " + form.getValue("check_artesao"));
		
		if(form.getValue("check_artesao")=="" && form.getValue ("check_epp")=="" && form.getValue("check_me")=="" && form.getValue("check_mei")=="" && form.getValue("check_potencialempreendedor")==""
			&& form.getValue("check_potencialempresario")=="" && form.getValue("check_produtorrural")=="" && form.getValue("check_outros")==""){
		
			mensagemErro +=  "Atenção, Informe o Público Alvo!"  + lineBreaker;
		}
		
		if (form.getValue("check_outros")=="outros" && form.getValue ("txa_outros")==""){
			mensagemErro +=  "Atenção, Informe qual o público!"  + lineBreaker;
		}
		
		if(form.getValue("txa_objetocontratacao")==""){
			mensagemErro +=  "Atenção, o campo Objeto da contratação deve ser informado!"  + lineBreaker;
			
		}
		
		/*if(form.getValue("periodoinicial")=="" || form.getValue("periodofinal")==""){
			mensagemErro +=  "Atenção, o período inicial e final da contratação, deve ser informado!"  + lineBreaker;
		}*/
		
		if(form.getValue("periodoinicial")=="" || form.getValue("periodofinal")=="" || form.getValue("data_fim_vigencia")=="")
		{
			mensagemErro +=  "Por favor, informe a o periodo inicial e final!" + lineBreaker;
		}
		else
		{
		
			var datainicio = form.getValue("periodoinicial");
			var datafim = form.getValue("periodofinal");
			
			
			const data = datainicio.split('/');
			const dataf = datafim.split('/');
			
			const dia = data[0]; // 30
			const mes = data[1]; // 03
			const ano = data[2]; // 2019
			
			const diafim = dataf[0];
			const mesfim = dataf[1];
			const anofim = dataf[2]; 
			
			datainicial = new Date(ano, mes - 1, dia);
			datafinal = new Date(anofim, mesfim - 1, diafim);
			
			const qtddias = Math.abs(new Date().getTime() - datainicial.getTime());
			const totaldias = Math.ceil(qtddias / (1000 * 60 * 60 * 24));
			
			
			if(datafinal < datainicial){
				
				mensagemErro +=  "Atenção, Data final não pode ser menor que a data Inicial da Contratação!"  + lineBreaker;
				
			}
		}
		if(form.getValue("data_fim_vigencia")==""){
			
			mensagemErro +=  "Por favor, informe a Data do término da vigência!";
		}
		
		if(totaldias <= 10 && form.getValue("msgprazo")==""){
			
			if( atividade == 0 || atividade == 6)
			{
				mensagemErro += "Atenção, Informe a justificativa no atraso da Contratação!"  + lineBreaker;	
			}
			
		}
		
		if(form.getValue("txt_cep") =="" || form.getValue ("txt_estado") =="" || form.getValue("txt_cidade")=="" || form.getValue("txt_bairro") =="" || form.getValue("txt_rua") ==""){
			mensagemErro += "Atenção, Apenas o campo, complemento do endereço, não é obrigatório ser informado!"  + lineBreaker;		
		}
		
		/*if(indexes.length == 0){
			
			mensagemErro += "Atenção, o rateio é obrigatório!"  + lineBreaker;
	
		}*/
		
		if(indexes_itens.length == 0){
			
			mensagemErro += "Atenção, não foi informado itens!"  + lineBreaker;
	
		}
		
		
		
		if (indexes.length >0){
			
			for(var i=0; i<indexes.length; i++){ // Aqui percorro todos os campos criados. OBS: colocar 3 undescore na frente dos campos para controle do fluig
				
				if(form.getValue("txt_projeto___"+indexes[i]) == "" || form.getValue("txt_acao___"+indexes[i]) == "" || form.getValue("txt_recursos___"+indexes[i]) == "" || 
						form.getValue("txt_percentual2___"+indexes[i]) == ""){
					mensagemErro += "Atenção, Informe todos os campos do rateio!"  + lineBreaker;
				}
				
			}	
		}
		
		
		//============================================================================== 
		// validação saldo centro de custos - rateio 
		//==============================================================================
		/*
		var totalPorcentagem = 0.0;
		var totalAquisicao = 0.0;
		
		if (form.getValue("txt_valor_total") != "")
		{
			totalAquisicao = form.getValue('txt_valor_total');
			
			totalAquisicao = totalAquisicao.toString().replace(".","");
			totalAquisicao = totalAquisicao.toString().replace(",",".");
			totalAquisicao = parseFloat(totalAquisicao);
		}
		
		if(form.getValue("data_fim_vigencia") != "")
		{
			
		
			var indexesRateio = form.getChildrenIndexes("centroDeCusto");
		    if (indexesRateio.length > 0) 
		    {
		       var dataAtual = new Date();
		       var anoAtual = dataAtual.getFullYear();
		       anoAtual = parseInt(anoAtual);
		       var data_fim = form.getValue('data_fim_vigencia')
		       var anoFim = data_fim.substring(6, 10);
		       
		       anoFim = parseInt(anoFim);
		       
		       for (var i = 0; i < indexesRateio.length; i++) 
		       { 
		    	   var saldoCC = form.getValue('txt_saldo___' + indexesRateio[i]);
		    	  
		    	   saldoCC = saldoCC.toString().replace(".","");
		    	   saldoCC = saldoCC.toString().replace(",",".");
		    	   saldoCC = parseFloat(saldoCC);
		    	   
		    	   if(form.getValue('txt_codprojeto___' + indexesRateio[i]) == null || form.getValue('txt_codprojeto___' + indexesRateio[i]) == '') {
			           	mensagemErro += "Selecione o Projeto da linha "+ (i+1) + lineBreaker;
		    	   }
			       if(form.getValue('txt_codacao___' + indexesRateio[i]) == null || form.getValue('txt_codacao___' + indexesRateio[i]) == '') {
			        	mensagemErro += "Selecione a Ação da linha "+ (i+1) + lineBreaker;
			       }
			       if(form.getValue('txt_codrecurso___' + indexesRateio[i]) == null || form.getValue('txt_codrecurso___' + indexesRateio[i]) == '') {
			        	mensagemErro += "Selecione a Unidade da linha "+ (i+1) + lineBreaker;
			       }		       
			       if(form.getValue('txt_percentual___' + indexesRateio[i]) == null || form.getValue('txt_percentual___' + indexesRateio[i]) == '') {
			        	mensagemErro += "Insira a porcentagem do Rateio "+ (i+1) + lineBreaker;
			       }else
			       {
			    	   if((parseFloat(form.getValue('txt_percentual___' + indexesRateio[i]))*0.01*totalAquisicao) > saldoCC ) {
			    		   if(anoFim <= anoAtual)
			    		   {
			    			   mensagemErro += "Não há saldo no Centro de Custo "+ (i+1) + lineBreaker;
			    		   }
				       }
			       }
				   	var totalRateio = form.getValue('txt_percentual___' + indexesRateio[i]);
					totalRateio = totalRateio.replace(",", ".");
					totalRateio = parseFloat(totalRateio);		       
			       	//totalPorcentagem += parseFloat(form.getValue('txt_percentual___' + indexesRateio[i]));
					totalPorcentagem += totalRateio;
					log.info("@@@@@@@@@@@@@@@ totalPorcentagem "+totalPorcentagem);
			   }
		       if(totalPorcentagem != 100)
		       {
		    	   mensagemErro += "O valor total da porcentagem do Rateio deve ser igual à 100(%)." + lineBreaker;
		       } 
			}
		   	else
		   	{
		   		mensagemErro += " Insira um Projeto/Ação/Unidade." + lineBreaker;
		   	}
		}
		*/
		
		//============================================================================== 
		//validação das medições 
		//==============================================================================
		
		var indexes_dados_itens = form.getChildrenIndexes("dadositens");
		var indexes_dados_medicoes = form.getChildrenIndexes("dadositensmedicao");
		
		var valor_item = 0;
		var valor_medicao = 0;
		
		for (var i = 0; i < indexes_dados_itens.length; i++) 
    	{ 
			valor_item = parseFloat(0 + form.getValue('txt_totallinha___' + indexes_dados_itens[i]).replace(".","").replace(",","."));
			valor_medicao = 0;
			
			
			log.info("@@@@@@@@@@@@@@@");
			log.info("@@@@@valor_item ->"+valor_item);
			
			
	    	var booAchou = false;
    		for (var x = 0; x < indexes_dados_medicoes.length; x++) 
	    	{ 
	    		if (form.getValue('neto_dadositensmedicao___' + indexes_dados_medicoes[x]) 
	    				== form.getValue('filho_dadositens___' + indexes_dados_itens[i]))
	    			{
	    				valor_medicao = parseFloat(0 + valor_medicao) + parseFloat(0 + form.getValue('vl_medicao_item___' + indexes_dados_medicoes[x]).replace(".","").replace(",","."));
	    				
	    				booAchou = true
	    			}
	    		
	    		
	    		var tipoContratacao = form.getValue('rd_sistemacontratacao');
	    		
	    		if(tipoContratacao == "sgc"){
	    			var dt_medicao = form.getValue('dt_medicao_item___' + indexes_dados_medicoes[x]);
		        	
					if (dt_medicao == "")
					{	
						mensagemErro += "Data da medição não informada " + (i+1);
			    		throw mensagemErro + lineBreaker + lineBreaker;
					}	
					else
					{
						log.info("@@@@@@@@@@ entrou");
						
						var dt_final = form.getValue('periodofinal');
		    			
						log.info("@@@@@@@@@@ dt_final > "+dt_final);
						log.info("@@@@@@@@@@ dt_medicao > "+dt_medicao);
						
		    			if (dt_final != "")
		    			{
		    				var obj_data_medicao = dt_medicao.split('/');
			    			var obj_data_final = dt_final.split('/');
			    			
			    			var data_medicao = new Date(obj_data_medicao[2], obj_data_medicao[1] - 1, obj_data_medicao[0]);
			    			data_final = new Date(obj_data_final[2], obj_data_final[1] - 1, obj_data_final[0]);
			    			
			    			if(data_medicao > data_final){
			    				
			    				mensagemErro += "Data inválida na medição do item " + (i+1);
			    		    	throw mensagemErro + lineBreaker + lineBreaker;
			    			}
			    			
			    			
			    			//verifica se data é um sábado ou domingo
			    			if (data_medicao.getDay() == 0 || data_medicao.getDay() == 6)
		    				{
			    				mensagemErro += "Data inválida na medição do item (final de semana) " + (i+1);
			    		    	throw mensagemErro + lineBreaker + lineBreaker;
		    				}
			    			
			    			//verifica se a última data é diferente da data final do contrato
			    			log.info("x+1->"+(x+1));
			    			log.info("indexes_dados_medicoes.length->"+indexes_dados_medicoes.length);
			    			if ((x+1) == indexes_dados_medicoes.length)
			    			{
			    				if (form.getValue("dt_medicao_item___" + indexes_dados_medicoes[x]) != form.getValue("periodofinal"))
			    				{
			    					mensagemErro += "Data inválida na medição do item (Última medição com data diferente da Data de término) " + (i+1);
						    		throw mensagemErro + lineBreaker + lineBreaker;
			    				}
			    			}
			    			
		    			}
		    			else
	    				{
		    				mensagemErro += "Data Término do contrato não informada";
				    		throw mensagemErro + lineBreaker + lineBreaker;
	    				}
		    			
					}
	    			
	    		}
	    		
	    		
		    		
	    	}
    		
    		log.info("@@@@@@@@@@@@@@@");
			log.info("@@@@@valor_medicao ->"+valor_medicao);
			
    		if (!booAchou)
    		{
		    	mensagemErro += "Não foi informado medição para o item " + (i+1);
		    	throw mensagemErro + lineBreaker + lineBreaker;
			}
    		
    		if (valor_item != valor_medicao)
    		{
    			mensagemErro += "Total da medição não bate com o valor do item " + (i+1);
		    	throw mensagemErro + lineBreaker + lineBreaker;
				
    		}
    		else
			{
    			/*var dt_final = form.getValue('periodofinal');
    			log.info("@@@@@dt_final ->"+dt_final);
    			if (dt_final != "")
    			{
    				var data_medicao = valor_medicao.split('/');
    			
	    			var data_final = dt_final.split('/');
	    			
	    			if(data_medicao < data_final){
	    				
	    				mensagemErro += "Data inválida na medição do item " + (i+1);
	    		    	throw mensagemErro + lineBreaker + lineBreaker;
	    			}
    			}*/
    			
			}
    	}
		
		
		/*if(form.getValue ("txt_forcodcfo")=="")
		{
			mensagemErro += "Atenção, Informar o fornecedor"  + lineBreaker;
		}
		*/
	}
	else if (atividade == APROVACAO_FISCAL_113)
	{
		if(form.getValue("aprovafiscal") == "" || form.getValue ("aprovafiscal") == null)
		{
			mensagemErro += "Atenção, o campo Aprovar Solicitação? deve ser informado!"  + lineBreaker;
		}
		
		else if(form.getValue("aprovafiscal") == "sim" && (form.getValue("ck_termo_fiscal") ==""  || form.getValue ("ck_termo_fiscal") == null))
		{
			mensagemErro += "Atenção, para aprovação da contratação, é necessário assinar o termo de declaração!"  + lineBreaker;
		}
	}
	else if (atividade == CONFIRMACAO_SERVICO_193)
	{
		if(form.getValue("servicoConfirmado") == "" || form.getValue ("servicoConfirmado") == null)
		{
			mensagemErro += "Atenção, o campo Serviço Confirmado? deve ser informado!"  + lineBreaker;
		}
	}
		
		
	/*
	else if (atividade == APROVACAO_DESLOCAMENTO_94)
	{
		if(form.getValue("rd_aprovaCalculo") == "" || form.getValue ("rd_aprovaCalculo") == null)
		{
			mensagemErro += "Atenção, o campo 'Aprova Memória de Cálculo?' deve ser informado!"  + lineBreaker;
		}
	}
	
	else if (atividade == CALCULA_DESLOCAMENTO_90)
	{
		if (form.getValue("rd_Viagem")==""||form.getValue("rd_Viagem")==undefined){
			mensagemErro += "Atenção, Informe o campo 'Haverá Deslocamento?'"  + lineBreaker;
		}
	}*/
	
	else if(atividade == APROVACAO_GESTOR_SEBRAETEC_15)
	{
		if(form.getValue("aprovasebraetec")==""){	
			mensagemErro += "Atenção: Informar se a contração será autorizada ou enviada para ajuste!"  + lineBreaker;
		}
	}
	else if(atividade == APROVACAO_GESTOR_TIC_144)
	{
		if(form.getValue("aprovaTIC")==""){	
			mensagemErro += "Atenção: Informar se a contração será autorizada ou enviada para ajuste!"  + lineBreaker;
		}
	}
	
	else if(atividade == APROVACAO_GESTOR_DEMANDANTE_7)
	{
		if (form.getValue("aprovagerencia")==""||form.getValue("aprovagerencia")==undefined){
			//mensagemErro += "Atenção, o campo Aprovar Solicitação? deve ser informado!"  + lineBreaker;
		}
		
		if(form.getValue("aprovagerencia") =="sim" && form.getValue("ck_termo") =="")
			mensagemErro += "Atenção, para aprovação da contratação, é necessário assinar o termo de declaração!"  + lineBreaker;
		
	}
	
	//Coordenador
	else if(atividade == VALIDACAO_COORDENADOR)
	{
		if(form.getValue("aprovaCoordenador")==""){		
			mensagemErro += "Atenção: Informar se a contração será autorizada, recusada ou enviada para ajuste!"  + lineBreaker;
		}
		
		/*if (form.getValue("aprovadirex") != "sim" && indexes3.length == 0)
		{			
			mensagemErro += "Atenção, Informe o parecer da gerência no campo Observações/Detalhamento "  + lineBreaker;			
		}
		*/
	}
	//Gerente Regional
	else if(atividade == VALIDACAO_GERENTE_REGIONAL)
	{
		if(form.getValue("aprovaGerenteRegional")==""){		
			mensagemErro += "Atenção: Informar se a contração será autorizada, recusada ou enviada para ajuste!"  + lineBreaker;
		}
		
		
		
	}
	
	//Assessor - GE
	else if(atividade == PARECER_ASSESSOR_GE)
	{
		if(form.getValue("txa_parecerAssessorGerente")==""){		
			mensagemErro += "Atenção: Informar o parecer solicitado pela Diretoria!"  + lineBreaker;
		}
		
		
	}
	
	
	//Direx
	else if(atividade == APROVACAO_DIREX_17)
	{
		if(form.getValue("aprovadirex")==""){		
			mensagemErro += "Atenção: Informar se a contração será autorizada, recusada ou enviada para ajuste!"  + lineBreaker;
		}
		
		if (form.getValue("aprovadirex") != "sim" && indexes3.length == 0)
		{			
			mensagemErro += "Atenção, Informe o parecer da gerência no campo Observações/Detalhamento "  + lineBreaker;			
		}
		
	}
	
	
	//Atividade Gestor SGF
	else if(atividade == ANALISAR_SGF_21)
	{
		if(form.getValue("aprovasgf")==""){	
			mensagemErro += "Atenção: Informar se a contração será autorizada, recusada ou enviada para ajuste!"  + lineBreaker;
		}
	}
	
	//Atividade Diretoria
	else if(atividade == APROVACAO_DIREX_17)
	{
		if(form.getValue("aprovadirex")=="")
		{
			mensagemErro += "Atenção: Informar se a contração será autorizada, recusada ou enviada para ajuste!"  + lineBreaker;
		}
	}

	//Atividade exportar dados para o SGF
	else if(atividade == EXPORTACAO_DADOS_SGF_198  || atividade == GRAVAR_DADOS_RM_86)
	{
		if(form.getValue("rd_fluxoCC")=="gravarRM" && form.getValue ("txt_cc")=="")
		{
			mensagemErro += "Atenção, Informar o Número da Carta Contratado gerado pelo sistema SGF/SGC"  + lineBreaker;
		}
		
		if(form.getValue("rd_fluxoCC")=="gravarRM" && form.getValue ("txtNroContrato")=="")
		{
			mensagemErro += "Atenção, Informar o Número do Contrato"  + lineBreaker;
		}

		if(form.getValue("rd_fluxoCC")=="gravarRM" && form.getValue ("txt_data_ass_contrato")=="")
		{
			mensagemErro += "Atenção, Informar a Data de Assinatura do Contrato"  + lineBreaker;
		}
		
		if(form.getValue ("rd_fluxoCC")=="")
		{
			mensagemErro += "Atenção, Informar se o Processo será devolvido ou finalizado"  + lineBreaker;
		}
		
		if(form.getValue("rd_fluxoCC")=="gravarRM" && form.getValue ("txt_forcodcfo")=="")
		{
			mensagemErro += "Atenção, Informar o fornecedor"  + lineBreaker;
		}
		
		if (atividade == EXPORTACAO_DADOS_SGF_198)
		{
			if(form.getValue("nome_rep_legal") == "" || form.getValue("cpf_rep_legal") == "" || form.getValue("email_rep_legal") == "")
			{
				mensagemErro += "Atenção, Informar todos os dados do Representante Legal"  + lineBreaker;
			}
		}
		
		if (atividade == GRAVAR_DADOS_RM_86)
		{
			if(form.getValue ("txt_CODTIP_contrato") == "")
			{
				mensagemErro += "Atenção: Informar Tipo para Faturamento!"  + lineBreaker;
			}
			
			if(form.getValue ("razaoSocialFornecedor") == "")
			{
				mensagemErro += "Atenção: Informar a Razão Social!"  + lineBreaker;
			}	
		}
		
	}
	
	//Atividade aprovação gerente de finanças
	else if(atividade == APROVACAO_GESTOR_SGF_58)
	{
		if(form.getValue ("aprovagerentefinanca") == "")
		{
			mensagemErro += "Atenção: Informar se a contração será autorizada, recusada ou enviada para ajuste!"  + lineBreaker;
		}
		
		if(form.getValue ("usuario_sgf") == "")
		{
			mensagemErro += "Atenção: Informar o usuário de integração com o SGF!"  + lineBreaker;
		}
		if(form.getValue ("senha_sgf") == "")
		{
			mensagemErro += "Atenção: Informar a senha de integração com o SGF!"  + lineBreaker;
		}
		
	}
	
	//Atividade Gravar dados RM
	/*else if(atividade == GRAVAR_DADOS_RM_86)
	{
		if(form.getValue ("txt_CODTIP_contrato") == "")
		{
			mensagemErro += "Atenção: Informar Tipo para Faturamento!"  + lineBreaker;
		}
		
		if(form.getValue ("razaoSocialFornecedor") == "")
		{
			mensagemErro += "Atenção: Informar a Razão Social!"  + lineBreaker;
		}
	}*/
	else if(atividade == ATA_REUNIAO_211)
	{
		if(form.getValue ("reuniaoAlinhamento") == "")
		{
			mensagemErro += "Atenção: Informar se a reunião de alinhamento foi realizada ou não!"  + lineBreaker;
		}
		else if(form.getValue ("reuniaoAlinhamento") == "nao")
		{
			var indexes_dados_itens = form.getChildrenIndexes("tb_obsAta");
			
			if (indexes_dados_itens.length == 0)
	    	{ 
				mensagemErro += "Atenção: Informar um motivo para a não realização da reunião de alinhamento nas observações!"  + lineBreaker;
	    	}
		}
	}
	
	if (mensagemErro != ""){
	    throw mensagemErro;
    }

}