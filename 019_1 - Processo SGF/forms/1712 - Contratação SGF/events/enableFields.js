function enableFields(form) {
	var atividade = getValue('WKNumState');

	disableAllFields(form);

	form.setEnabled("txt_fornecNome", true);
	form.setEnabled("txt_fornecCGCCFO", true);
	form.setEnabled("txt_fornecEmail", true);
	form.setEnabled("txt_fornecBanco", true);
	form.setEnabled("txt_fornecEndereco", true);
	form.setEnabled("txt_fornecEnderecoCEP", true);
	form.setEnabled("txt_fornecEnderecoNum", true);
	form.setEnabled("txt_fornecEnderecoCidade", true);
	form.setEnabled("txt_fornecEnderecoEstado", true);
	form.setEnabled("txt_fornecEnderecoBairro", true);
	form.setEnabled("txt_fornecConta", true);
	form.setEnabled("txt_formaPagto", true);
	form.setEnabled("txt_descCtaBancaria", true);
	form.setEnabled("txt_fornecAgencia", true);
	form.setEnabled("txt_fichaSebraeTec", true);
	form.setEnabled("txt_fichaSebraeTecEntregas", true);
	form.setEnabled("txt_etapas", true);
	form.setEnabled("txt_entregas", true);	
	form.setEnabled("txt_dataPagamentoFicha", true);
	form.setEnabled("txt_valorFichaTecnica", true);
	form.setEnabled("txt_cargaHorariaFicha", true);
	form.setEnabled("txt_recorrenciaCodigo", true);	
	form.setEnabled("txt_recorrenciaAno", true);
	form.setEnabled("txt_recorrenciaNomoeFicha", true);
	form.setEnabled("txt_recorrenciaNomeEmpresa", true);
	form.setEnabled("txt_recorrenciaNumeroSol", true);
	form.setEnabled("ta_detalhesFicha", true);
	form.setEnabled("txt_clienteRecorrente", true);
	form.setEnabled("txt_tipoParceiroRecorrente", true);
	form.setEnabled("txt_nomeClienteRecorrente", true);
	form.setEnabled("txt_codParceiroRecorrente", true);
	form.setEnabled("txt_cnpjCpfRecorrente", true);
	form.setEnabled("txt_hiddenCodigoFicha", true);	
	form.setEnabled("switchCutomizada", true);
	form.setEnabled("txt_totalEntregasEetapas", true);	
	form.setEnabled("txt_hiddenCodigoFicha", true);	
	form.setEnabled("txt_valorHoraSebraetec", true);
	form.setEnabled("txt_valorTotalSebraeTec", true);
	form.setEnabled("txt_qtdHorasSebraeTec", true);
	form.setEnabled("txt_valorDeslocamento", true);
	form.setEnabled("txt_conferenciaHoraEntrega", true);
	form.setEnabled("txt_numeroEntrega", true);
	form.setEnabled("hidden_ta_detalheEtapas", true);
	
	
	
	
	
	
	
	
	
	
	
	//campos ocultos
	form.setEnabled("txt_forcodcfo", true);
	form.setEnabled("txt_fornomefantasia", true);
	form.setEnabled("txt_fornome", true);

	
	form.setEnabled("txt_fluxo", true);

	form.setEnabled("txt_fornome", true);
	form.setEnabled("txt_fornome", true);
	form.setEnabled("txt_fornome", true);
	form.setEnabled("txt_fornome", true);
	form.setEnabled("txt_fornome", true);
	form.setEnabled("txt_fornome", true);
	form.setEnabled("txt_fornome", true);


	form.setEnabled("localidade", true);
	form.setEnabled("nomeCoordenador", true);
	form.setEnabled("idCoordenador", true);
	form.setEnabled("loginCoordenador", true);
	form.setEnabled("nomeGerenteRegional", true);
	form.setEnabled("idGerenteRegional", true);
	form.setEnabled("loginGerenteRegional", true);
	form.setEnabled("nomeDiretor", true);
	form.setEnabled("idDiretor", true);
	form.setEnabled("loginDiretor", true);
	form.setEnabled("tipoAvaliacaoCoordenador", true);
	form.setEnabled("tipoAvaliacaoGerenteReg", true);







	if (atividade == INICIO_0 || atividade == INICIO_6 || atividade == COMPL_CAD_XPERTS_154 || atividade == REVISAO_11 || 
			atividade == ANALISAR_SGF_21 || atividade == TRATAR_INTEGRACAO_103 || 
			atividade == ANALISAR_ERRO_INT_SGF_161 || atividade == ANALISAR_ERRO_INT_SGF_187 || atividade == 172) 
	{

		form.setEnabled("txtTermoDeclaracao", true);

		form.setEnabled("txt_datasol", true);
		form.setEnabled("chapaDiretor", true);
		form.setEnabled("LoginGestorContratacao", true);
		form.setEnabled("matriculaGestor", true);
		form.setEnabled("codUnidadeDemandante", true);
		form.setEnabled("unidadeDemandante", true);
		form.setEnabled("GestorContratacao", true);
		form.setEnabled("codven", true);
		form.setEnabled("descricaoSolicitacao", true);



		form.setEnabled("rd_sistemareceita", true);
		form.setEnabled("txt_fluig_receita", true);


		form.setEnabled("txt_idprd_SAS", true);
		form.setEnabled("txt_nomeprd_SAS", true);
		form.setEnabled("txt_produto_SAS", true);


		form.setEnabled("rd_formacontratacao", true);
		form.setEnabled("txt_cartacontrato", true);
		form.setEnabled("txt_cc", true);
		form.setEnabled("txtNroContrato", true);
		form.setEnabled("rd_tp_servico", true);
		form.setEnabled("rd_sistemareceita", true);

		form.setEnabled("rd_sistemacontratacao", true);
		form.setEnabled("uf", true);
		form.setEnabled("check_Consultoria", true);
		form.setEnabled("check_instrutoria", true);

		form.setEnabled("areaContratacao", true);
		form.setEnabled("z_area", true);
		form.setEnabled("subAreaContratacao", true);
		form.setEnabled("z_subarea", true);

		form.setEnabled("check_artesao", true);
		form.setEnabled("check_epp", true);
		form.setEnabled("check_me", true);
		form.setEnabled("check_mei", true);
		form.setEnabled("check_potencialempreendedor", true);
		form.setEnabled("check_produtorrural", true);
		form.setEnabled("check_outros", true);
		form.setEnabled("txa_outros", true);
		form.setEnabled("txt_CODTIP_contrato", true);
		form.setEnabled("zoom_tipo_faturamento_contrato", true);

		form.setEnabled("txa_objetocontratacao", true);
		form.setEnabled("txa_CodicaoPagamento", true);
		form.setEnabled("td_direitoAutorais", true);
		form.setEnabled("txt_historicoAlteracao", true);
		form.setEnabled("txa_justificativa", true);
		form.setEnabled("periodoinicial", true);
		form.setEnabled("periodofinal", true);
		form.setEnabled("data_fim_vigencia", true);


		form.setEnabled("razaoSocialFornecedorXperts", true);
		form.setEnabled("cnpjFornecedorXperts", true);
		form.setEnabled("solicitacaoPortalXperts", true);
		form.setEnabled("cepPrestacaoServico", true);


		form.setEnabled("msgprazo", true);
		form.setEnabled("txt_cep", true);
		form.setEnabled("txt_estado", true);
		form.setEnabled("txt_cidade", true);
		form.setEnabled("txt_bairro", true);
		form.setEnabled("txt_rua", true);
		form.setEnabled("txt_complemento", true);

		form.setEnabled("txt_forcodcfo", true);
		form.setEnabled("txt_fornomefantasia", true);
		form.setEnabled("txt_fornome", true);
		form.setEnabled("txt_foridcfo", true);
		//form.setEnabled("txt_fornecedor", true);
		form.setEnabled("txt_buscarFornecedor", true);
		form.setEnabled("rd_tipoBusca", true);
		form.setEnabled("razaoSocialFornecedor", true);
		form.setEnabled("cnpjFornecedor", true);
		form.setEnabled("txt_descCtaBancariaVenc", true);
		form.setEnabled("txt_fornecBancoVenc", true);
		form.setEnabled("txt_fornecAgenciaVenc", true);
		form.setEnabled("txt_fornecContaVenc", true);
		form.setEnabled("txt_formaPagtoVenc", true);
		form.setEnabled("txt_fornecEnderecoVenc", true);
		form.setEnabled("txt_porte_id", true);
		form.setEnabled("txt_porte", true);
		form.setEnabled("emailFornecedor", true);
		form.setEnabled("chkTermoResponsabilidade", true);
		form.setEnabled("cpf_usuario_fiscal_contrato", true);
		form.setEnabled("usuario_fiscal_contrato_RM", true);
		form.setEnabled("usuario_fiscal_contrato", true);
		form.setEnabled("zoom_fiscal_contrato", true);
		form.setEnabled("cpf_usuario_gestor_contrato", true);
		form.setEnabled("usuario_gestor_contrato_RM", true);
		form.setEnabled("usuario_gestor_contrato", true);
		form.setEnabled("zoom_gestor_contrato", true);
		form.setEnabled("rd_Viagem", true);




		form.setEnabled("txt_valor_total", true);
		form.setEnabled("txt_valor_total_entregas", true);
		form.setEnabled("txt_valor_total_deslocamento", true);
		//form.setEnabled("txt_valor_total_carga", true);



		//habilitando rateio

		form.setEnabled("txt_projeto", true);
		form.setEnabled("txt_acao", true);
		form.setEnabled("txt_recursos", true);
		form.setEnabled("txt_codprojeto", true);
		form.setEnabled("txt_codacao", true);
		form.setEnabled("txt_codrecurso", true);
		form.setEnabled("txt_percentual", true);
		form.setEnabled("txt_saldo", true);


		var indexes = form.getChildrenIndexes("centroDeCusto");
		for (var i = 0; i < indexes.length; i++) 
		{
			form.setEnabled("txt_projeto___" + indexes[i], true);
			form.setEnabled("txt_acao___" + indexes[i], true);
			form.setEnabled("txt_recursos___" + indexes[i], true);
			form.setEnabled("txt_codprojeto___" + indexes[i], true);
			form.setEnabled("txt_codacao___" + indexes[i], true);
			form.setEnabled("txt_codrecurso___" + indexes[i], true);
			form.setEnabled("txt_percentual___" + indexes[i], true);
			form.setEnabled("txt_saldo___" + indexes[i], true);
		}

		form.setEnabled("txt_valor_total", true);

		if (atividade == ANALISAR_SGF_21) 
		{
			form.setEnabled("aprovasgf", true);
			form.setEnabled("tb_sgf", true);
			form.setEnabled("dt_sgf", true);

			form.setEnabled("ck_escopo", true);
			form.setEnabled("ck_valor", true);
			form.setEnabled("ck_ajustes", true);
			form.setEnabled("ck_horas", true);
			form.setEnabled("ck_dados", true);
			form.setEnabled("ck_data", true);
		}

		if (atividade == ANALISAR_ERRO_INT_SGF_161) 
		{
			form.setEnabled("rd_fluxoCC", true);
			form.setEnabled("ta_obsDemandante2", true);
			form.setEnabled("obs_data", true);
		}

		if (atividade == TRATAR_INTEGRACAO_103 || atividade == ANALISAR_ERRO_INT_SGF_161)
		{
			form.setEnabled("txt_cc", true);
			form.setEnabled("txtNroContrato", true);

			//campos do tcu
			form.setEnabled("txt_tcu_ano_edi", true);
			form.setEnabled("txt_tcu_nro_edital", true);
			form.setEnabled("txt_tcu_dt_edital", true);
			form.setEnabled("txt_tcu_dt_homol", true);
			form.setEnabled("txt_tcu_valor_ref_obra", true);
			form.setEnabled("txt_tcu_perc_exec", true);

			form.setEnabled("txt_tcu_cat_obj", true);
			form.setEnabled("zoom_tcu_cat_obj", true);
			form.setEnabled("txt_tcu_cri_jul", true);
			form.setEnabled("zoom_tcu_cri_jul", true);
			form.setEnabled("txt_tcu_fas_obr", true);
			form.setEnabled("zoom_tcu_fas_obr", true);

			form.setEnabled("txt_tcu_gra_obr", true);
			form.setEnabled("zoom_tcu_gra_obr", true);
			form.setEnabled("txt_tcu_nat_obj", true);
			form.setEnabled("zoom_tcu_nat_obj", true);

			form.setEnabled("txt_tcu_obs_tcu", true);

		}



	}
	else if (atividade == APROVACAO_FISCAL_113) 
	{
		form.setEnabled("aprovafiscal", true);
		form.setEnabled("ta_obsfiscal", true);
		form.setEnabled("dt_fiscal", true);
		form.setEnabled("ck_termo_fiscal", true);

//		habilitando rateio

		form.setEnabled("txt_projeto", true);
		form.setEnabled("txt_acao", true);
		form.setEnabled("txt_recursos", true);
		form.setEnabled("txt_codprojeto", true);
		form.setEnabled("txt_codacao", true);
		form.setEnabled("txt_codrecurso", true);
		form.setEnabled("txt_percentual", true);
		form.setEnabled("txt_saldo", true);


		var indexes = form.getChildrenIndexes("centroDeCusto");
		for (var i = 0; i < indexes.length; i++) 
		{
			form.setEnabled("txt_projeto___" + indexes[i], true);
			form.setEnabled("txt_acao___" + indexes[i], true);
			form.setEnabled("txt_recursos___" + indexes[i], true);
			form.setEnabled("txt_codprojeto___" + indexes[i], true);
			form.setEnabled("txt_codacao___" + indexes[i], true);
			form.setEnabled("txt_codrecurso___" + indexes[i], true);
			form.setEnabled("txt_percentual___" + indexes[i], true);
			form.setEnabled("txt_saldo___" + indexes[i], true);
		}



	}
	/*else if (atividade == APROVACAO_GESTOR_114) 
    {
    	form.setEnabled("aprovagestor", true);
		form.setEnabled("ta_obsgestor", true);
		form.setEnabled("dt_gestor", true);
		form.setEnabled("ck_termo_gestor", true);
    }*/
	else if (atividade == APROVACAO_GESTOR_DEMANDANTE_7) 
	{
		form.setEnabled("aprovagerencia", true);
		form.setEnabled("ta_obsgerenciademandante", true);
		form.setEnabled("dt_gerenciaDemandante", true);
		form.setEnabled("ck_termo", true);
	}

	else if (atividade == APROVACAO_GESTOR_SEBRAETEC_15) 
	{
		form.setEnabled("aprovasebraetec", true);
		form.setEnabled("tb_SebraeTec", true);
		form.setEnabled("dt_SebraeTec", true);
	}

	else if (atividade == APROVACAO_GESTOR_TIC_144) 
	{
		form.setEnabled("aprovaTIC", true);
		form.setEnabled("tb_TIC", true);
		form.setEnabled("dt_TIC", true);
	}


	else if (atividade == APROVACAO_DIREX_17) 
	{
		form.setEnabled("aprovadirex", true);
		form.setEnabled("tb_direx", true);
		form.setEnabled("dt_direx", true);


		form.setEnabled("txa_parecerAssessorGerenteDir", true);


	}


	else if (atividade == VALIDACAO_COORDENADOR) 
	{
		form.setEnabled("aprovaCoordenador", true);
		form.setEnabled("tb_coordenador", true);
		form.setEnabled("dt_coordenador", true);
	}


	else if (atividade == VALIDACAO_GERENTE_REGIONAL) 
	{
		form.setEnabled("aprovaGerenteRegional", true);
		form.setEnabled("tb_gerenteRegional", true);
		form.setEnabled("dt_gerenteRegional", true);
	}


	else if (atividade == PARECER_ASSESSOR_GE) 
	{
		form.setEnabled("txa_parecerAssessorGerente", true);
	}




	else if (atividade == APROVACAO_GESTOR_SGF_58) 
	{
		form.setEnabled("aprovagerentefinanca", true);
		form.setEnabled("tb_GerenciaFinanca", true);
		form.setEnabled("dt_GerenciaFinanca", true);
		form.setEnabled("usuario_sgf", true);
		form.setEnabled("senha_sgf", true);


	}
	else if (atividade == EXPORTACAO_DADOS_SGF_198) 
	{
		form.setEnabled("txt_cc", true);
		form.setEnabled("nome_rep_legal", true);
		form.setEnabled("cpf_rep_legal", true);
		form.setEnabled("email_rep_legal", true);
		form.setEnabled("txtNroContrato", true);
		form.setEnabled("txt_data_ass_contrato", true);
		form.setEnabled("rd_fluxoCC", true);
		form.setEnabled("ta_obsDemandante2", true);
		form.setEnabled("obs_data", true);
		form.setEnabled("txt_forcodcfo", true);
		form.setEnabled("txt_fornomefantasia", true);
		form.setEnabled("txt_fornome", true);
		form.setEnabled("txt_foridcfo", true);
		//form.setEnabled("txt_fornecedor", true);
		form.setEnabled("txt_buscarFornecedor", true);
		form.setEnabled("rd_tipoBusca", true);
		form.setEnabled("razaoSocialFornecedor", true);
		form.setEnabled("cnpjFornecedor", true);
		form.setEnabled("txt_descCtaBancariaVenc", true);
		form.setEnabled("txt_fornecBancoVenc", true);
		form.setEnabled("txt_fornecAgenciaVenc", true);
		form.setEnabled("txt_fornecContaVenc", true);
		form.setEnabled("txt_formaPagtoVenc", true);
		form.setEnabled("txt_fornecEnderecoVenc", true);
		form.setEnabled("txt_porte_id", true);
		form.setEnabled("txt_porte", true);
		form.setEnabled("emailFornecedor", true);


		//campos do tcu
		form.setEnabled("txt_tcu_ano_edi", true);
		form.setEnabled("txt_tcu_nro_edital", true);
		form.setEnabled("txt_tcu_dt_edital", true);
		form.setEnabled("txt_tcu_dt_homol", true);
		form.setEnabled("txt_tcu_valor_ref_obra", true);
		form.setEnabled("txt_tcu_perc_exec", true);

		form.setEnabled("txt_tcu_cat_obj", true);
		form.setEnabled("zoom_tcu_cat_obj", true);
		form.setEnabled("txt_tcu_cri_jul", true);
		form.setEnabled("zoom_tcu_cri_jul", true);
		form.setEnabled("txt_tcu_fas_obr", true);
		form.setEnabled("zoom_tcu_fas_obr", true);

		form.setEnabled("txt_tcu_gra_obr", true);
		form.setEnabled("zoom_tcu_gra_obr", true);
		form.setEnabled("txt_tcu_nat_obj", true);
		form.setEnabled("zoom_tcu_nat_obj", true);

		form.setEnabled("txt_tcu_obs_tcu", true);



	}

	/*else if (atividade == CALCULA_DESLOCAMENTO_90) 
    {
    	form.setEnabled("rd_Viagem", true);
    	form.setEnabled("txt_valor_total", true);
    	form.setEnabled("txt_valor_total_entregas", true);
    	form.setEnabled("txt_valor_total_deslocamento", true);
    	form.setEnabled("txt_valor_total_carga", true);
    }



    else if (atividade == APROVACAO_DESLOCAMENTO_94) 
    {
    	form.setEnabled("rd_aprovaCalculo", true);
		form.setEnabled("txa_obsMemoriaCalculo", true);
    }
	 */

	else if (atividade == CONFIRMACAO_SERVICO_193) 
	{
		form.setEnabled("servicoConfirmado", true);
		form.setEnabled("tb_ConfServico", true);
		form.setEnabled("dt_ConfServico", true);
	}

	else if (atividade == GRAVAR_DADOS_RM_86) 
	{	
		form.setEnabled("txt_CODTIP_contrato", true);
		form.setEnabled("zoom_tipo_faturamento_contrato", true);

		form.setEnabled("txt_cc", true);
		form.setEnabled("txtNroContrato", true);


		form.setEnabled("txt_forcodcfo", true);
		form.setEnabled("txt_fornomefantasia", true);
		form.setEnabled("txt_fornome", true);
		form.setEnabled("txt_foridcfo", true);
		//form.setEnabled("txt_fornecedor", true);
		form.setEnabled("txt_buscarFornecedor", true);
		form.setEnabled("rd_tipoBusca", true);
		form.setEnabled("razaoSocialFornecedor", true);
		form.setEnabled("cnpjFornecedor", true);
		form.setEnabled("txt_descCtaBancariaVenc", true);
		form.setEnabled("txt_fornecBancoVenc", true);
		form.setEnabled("txt_fornecAgenciaVenc", true);
		form.setEnabled("txt_fornecContaVenc", true);
		form.setEnabled("txt_formaPagtoVenc", true);
		form.setEnabled("txt_fornecEnderecoVenc", true);
		form.setEnabled("txt_porte_id", true);
		form.setEnabled("txt_porte", true);
		form.setEnabled("emailFornecedor", true);


		//campos do tcu
		form.setEnabled("txt_tcu_ano_edi", true);
		form.setEnabled("txt_tcu_nro_edital", true);
		form.setEnabled("txt_tcu_dt_edital", true);
		form.setEnabled("txt_tcu_dt_homol", true);
		form.setEnabled("txt_tcu_valor_ref_obra", true);
		form.setEnabled("txt_tcu_perc_exec", true);

		form.setEnabled("txt_tcu_cat_obj", true);
		form.setEnabled("zoom_tcu_cat_obj", true);
		form.setEnabled("txt_tcu_cri_jul", true);
		form.setEnabled("zoom_tcu_cri_jul", true);
		form.setEnabled("txt_tcu_fas_obr", true);
		form.setEnabled("zoom_tcu_fas_obr", true);

		form.setEnabled("txt_tcu_gra_obr", true);
		form.setEnabled("zoom_tcu_gra_obr", true);
		form.setEnabled("txt_tcu_nat_obj", true);
		form.setEnabled("zoom_tcu_nat_obj", true);

		form.setEnabled("txt_tcu_obs_tcu", true);

	}
	else if (atividade == ATA_REUNIAO_211) 
	{
		form.setEnabled("reuniaoAlinhamento", true);
		form.setEnabled("ta_obsAta", true);
		form.setEnabled("dt_Ata", true);
	}


	//pai filho de itens
	form.setEnabled("filho_dadositens", true);
	form.setEnabled("txt_idprd", true);
	form.setEnabled("txt_nomefantasia", true);
	form.setEnabled("txt_codtb1fat", true);
	form.setEnabled("txt_codigoprd", true);


	form.setEnabled("txt_produto", true);
	form.setEnabled("txt_naturezaitem", true);
	form.setEnabled("txt_descnaturezaitem", true);
	form.setEnabled("sel_inciso", true);

	form.setEnabled("txt_quantidade", true);
	form.setEnabled("txt_valor", true);
	form.setEnabled("txt_valor_real", true);
	form.setEnabled("txt_totallinha", true);
	form.setEnabled("txt_CODTIP", true);
	form.setEnabled("zoom_tipo_faturamento", true);

	form.setEnabled("neto_dadositensmedicao", true);
	form.setEnabled("vl_nr_entrega_medicao_item", true);
	form.setEnabled("dt_medicao_item", true);
	form.setEnabled("vl_medicao_item", true);
	form.setEnabled("ds_descricao_entrega_item", true);
	form.setEnabled("vl_carga_horaria_item", true);
	form.setEnabled("vl_despesa_viagem_item", true);
	form.setEnabled("nomeArquivoUpload_item", true);
	form.setEnabled("idGEDDocumento_item", true);
	form.setEnabled("urlDownloadArquivo_item", true);



	var indexes = form.getChildrenIndexes("dadositens");
	for (var i = 0; i < indexes.length; i++) 
	{
		form.setEnabled("filho_dadositens___" + indexes[i], true);
		form.setEnabled("txt_idprd___" + indexes[i], true);
		form.setEnabled("txt_nomefantasia___" + indexes[i], true);
		form.setEnabled("txt_codtb1fat___" + indexes[i], true);
		form.setEnabled("txt_codigoprd___" + indexes[i], true);
		form.setEnabled("txt_produto___" + indexes[i], true);
		form.setEnabled("txt_naturezaitem___" + indexes[i], true);
		form.setEnabled("txt_descnaturezaitem___" + indexes[i], true);
		form.setEnabled("sel_inciso___" + indexes[i], true);
		form.setEnabled("txt_quantidade___" + indexes[i], true);
		form.setEnabled("txt_valor___" + indexes[i], true);
		form.setEnabled("txt_valor_real___" + indexes[i], true);
		form.setEnabled("txt_totallinha___" + indexes[i], true);
		form.setEnabled("txt_CODTIP___" + indexes[i], true);
		form.setEnabled("zoom_tipo_faturamento___" + indexes[i], true);
	}

	var indexes = form.getChildrenIndexes("dadositensmedicao");
	for (var i = 0; i < indexes.length; i++) 
	{
		form.setEnabled("neto_dadositensmedicao___" + indexes[i], true);
		form.setEnabled("vl_nr_entrega_medicao_item___" + indexes[i], true);
		form.setEnabled("dt_medicao_item___" + indexes[i], true);
		form.setEnabled("vl_medicao_item___" + indexes[i], true);
		form.setEnabled("ds_descricao_entrega_item___" + indexes[i], true);
		form.setEnabled("vl_carga_horaria_item___" + indexes[i], true);
		form.setEnabled("vl_despesa_viagem_item___" + indexes[i], true);
		form.setEnabled("nomeArquivoUpload_item___" + indexes[i], true);
		form.setEnabled("idGEDDocumento_item___" + indexes[i], true);
		form.setEnabled("urlDownloadArquivo_item___" + indexes[i], true);
	}



}


function habilitaCamposTCU(obj)
{

	form.setEnabled("txt_tcu_ano_edi", true);
	form.setEnabled("txt_tcu_nro_edital", true);
	form.setEnabled("txt_tcu_dt_edital", true);
	form.setEnabled("txt_tcu_dt_homol", true);
	form.setEnabled("txt_tcu_valor_ref_obra", true);
	form.setEnabled("txt_tcu_perc_exec", true);

	form.setEnabled("txt_tcu_cat_obj", true);
	form.setEnabled("zoom_tcu_cat_obj", true);
	form.setEnabled("txt_tcu_cri_jul", true);
	form.setEnabled("zoom_tcu_cri_jul", true);
	form.setEnabled("txt_tcu_fas_obr", true);
	form.setEnabled("zoom_tcu_fas_obr", true);

	form.setEnabled("txt_tcu_gra_obr", true);
	form.setEnabled("zoom_tcu_gra_obr", true);
	form.setEnabled("txt_tcu_nat_obj", true);
	form.setEnabled("zoom_tcu_nat_obj", true);

	form.setEnabled("txt_tcu_obs_tcu", true);

}

function disableAllFields(form) {
	var fields = form.getFormFields().toArray();
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i].getName(), false);
	}
}