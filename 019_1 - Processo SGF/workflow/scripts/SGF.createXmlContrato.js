function createXmlContrato(codColigada){
	
	var xml = "";
	
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	log.info("@@@@@@@  CRIAÇÃO DO CONTRATO SGF SOLICITAÇÃO ->" + hAPI.getCardValue("txt_numsol") + "@@@@@@@@@@@@");
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	
		
	xml="<CtrCnt>";
	xml = createTCNT(xml,codColigada);
	xml = createTCNTHISTORICO(xml,codColigada);
	xml = createTCNTCOMPL(xml,codColigada);
	xml = createTITMCNT(xml,codColigada);
	xml = createTITMCNTMEDICAO(xml,codColigada);
	
	xml=xml+"</CtrCnt>";
	
	return xml;
}

function createTCNT(xml,codColigada)
{
	var valorTotal = (hAPI.getCardValue("txt_valor_total")).replace(".", "").replace(",", ".");
	var index = 1;
	var dataIni = hAPI.getCardValue("periodoinicial");
	var dataInicio = dataIni.substring(6, 10) + "-" + dataIni.substring(3, 5) + "-"+ dataIni.substring(0, 2);
	
	var dataFi = hAPI.getCardValue("periodofinal");
	var dataFim = dataFi.substring(6, 10) + "-" + dataFi.substring(3, 5) + "-"+ dataFi.substring(0, 2);
	
	var dataCont = hAPI.getCardValue("txt_datasol");
	var dataContrato = dataCont.substring(6, 10) + "-" + dataCont.substring(3, 5) + "-"+ dataCont.substring(0, 2);
	
	var dataAss = hAPI.getCardValue("txt_data_ass_contrato");
	
	if (dataAss == "")
		dataAss = dataContrato;
	
	var dataAssinatura = dataAss.substring(6, 10) + "-" + dataAss.substring(3, 5) + "-"+ dataAss.substring(0, 2);
	
	
	var nroContrato = hAPI.getCardValue("txt_cc");
	var cartaContrato = hAPI.getCardValue("txtNroContrato");
	
	
	xml += createNode("TCNT");

    xml += setNode("CODCOLIGADA", codColigada);
    xml += setNode("CODCOLIGADA2", codColigada);
    xml += setNode("IDCNT", "-1");
    xml += setNode("CODTCN", "002");
    xml += setNode("CODFILIAL", "1");
    xml += setNode("CODUSUARIO", "fluig_sebraemt"); //Buscar login do ultimo usuario aprovador
    xml += setNode("CODSTACNT", "001");
    xml += setNode("NATUREZA", "1"); 
    xml += setNode("CODCPG", "01");		
    xml += setNode("CODIGOCONTRATO", cartaContrato);
    xml += setNode("NOME", nroContrato + " - " + cartaContrato);
    xml += setNode("CODCOLCXA", "1");
    xml += setNode("CODCXA", "");
    xml += setNode("CODDEPARTAMENTO", hAPI.getCardValue("codUnidadeDemandante"));
    xml += setNode("COMISSAOVEN", "0.00");
    xml += setNode("COMISSAOVEN2", "0.00");

    var objeto = "" + hAPI.getCardValue("txa_objetocontratacao").replace("&","e");
    
    xml += setNode("HISTORICOCURTO", objeto.substr(0,250));
	xml += setNode("CODTIP", hAPI.getCardValue("txt_CODTIP_contrato"));
	xml += setNode("CODCFO", hAPI.getCardValue("txt_forcodcfo"));  
    xml += setNode("CODCOLCFO", codColigada);
    
    //novos campos conforme analise marcelo henrique
    xml += setNode("DIAFATURAMENTO", "0");
    xml += setNode("DIASCARENPARAFAT", "0");
    xml += setNode("CODCOLCFODEST", codColigada);

    //gravando gestor e fiscal do contrato
    //fiscal no fluig -> gestor no RM
    if (hAPI.getCardValue("usuario_fiscal_contrato_RM") != "")
    	xml += setNode("CODVEN", hAPI.getCardValue("usuario_fiscal_contrato_RM"));
    else
    	xml += setNode("CODVEN", hAPI.getCardValue("codven"));
    
    //gestor no fluig -> gerente no RM
    if (hAPI.getCardValue("usuario_gestor_contrato_RM") != "")
    	xml += setNode("CODVEN2", hAPI.getCardValue("usuario_gestor_contrato_RM"));
    else
    	xml += setNode("CODVEN2", hAPI.getCardValue("codven"));
    
    xml += setNode("CODMOEVALORCONTRATO", "R$");
    xml += setNode("VALORCONTRATO", valorTotal);
    xml += setNode("DATAINICIO", dataInicio);
    xml += setNode("DATAFIM", dataFim);
    xml += setNode("DATACONTRATO", dataAssinatura);
    xml += setNode("DIAFATURAMENTO", "0");
    xml += setNode("DIASCARENPARAFAT", "0");
    xml += setNode("DIASCARENCANCFAT", "30");
    xml += setNode("IMPRIMEMOV", "1");
	xml += createNode("/TCNT");
	
	return xml;	
	
}

function createTCNTCOMPL(xml,codColigada)
{
	//var valorTotal = hAPI.getCardValue("txt_valor_total")).replace(".", "").replace(",", ".");
	var valorTotal = (hAPI.getCardValue("txt_valor_total")).replace(".", "").replace(",", ".");
	
	var dataIni = hAPI.getCardValue("periodoinicial");
	var dataInicio = dataIni.substring(6, 10) + "-" + dataIni.substring(3, 5) + "-"+ dataIni.substring(0, 2);
	
	var dataFi = hAPI.getCardValue("periodofinal");
	var dataFim = dataFi.substring(6, 10) + "-" + dataFi.substring(3, 5) + "-"+ dataFi.substring(0, 2);
	
	var data_fim_vigencia = hAPI.getCardValue("data_fim_vigencia");
	var dataFimVigencia = data_fim_vigencia.substring(6, 10) + "-" + data_fim_vigencia.substring(3, 5) + "-"+ data_fim_vigencia.substring(0, 2);
	
	
	
	xml += createNode("TCNTCOMPL");

	xml += setNode("CODCOLIGADA", codColigada);
	xml += setNode("IDCNT", "-1");
	xml += setNode("TIPOCONSISTENCIA", "1");
	xml += setNode("IDMOVORIGEMCNT", hAPI.getCardValue("txt_numsol"));
	xml += setNode("STATUSCONT", "01.023");

	xml += setNode("ADITIVOPRAZO", "0");
	xml += setNode("ADITIVOPRECO", "0");	
		
	if (hAPI.getCardValue("chapaDiretor") == "00000002")
		xml += setNode("DIREX", "SUP");
	else if (hAPI.getCardValue("chapaDiretor") == "00000033")
		xml += setNode("DIREX", "DT2");
	else if (hAPI.getCardValue("chapaDiretor") == "00000538")	
		xml += setNode("DIREX", "DT3");
	
	xml += setNode("MODALIDADE", "008");
	xml += setNode("ROTINEIRA", "0");
	xml += setNode("CESSAO", "0");
	
	
	if (hAPI.getCardValue("aprovasebraetec") != "")	
	{
		xml += setNode("SEBRAETEC", "01");
		xml += setNode("MODALIDADESEBRAETEC", "02");
	}
	else
	{
		xml += setNode("SEBRAETEC", "02");
	}
		
	xml += setNode("DATAINICVIGENCIA", dataInicio);
    xml += setNode("DATATERMVIGENCIA", dataFimVigencia);
	
	xml += setNode("DIRETORIA", "");
	//xml += setNode("NUMPROCESSO", "");
	xml += setNode("USAPRECOMP", "1");
	xml += setNode("TIPORATEIO", "1");	
	xml += setNode("VLRORIGINAL", valorTotal);
	

    //********************************************************
	//campos do TCU
	//********************************************************
	if (hAPI.getCardValue("txt_tcu_ano_edi") != "")
		xml += setNode("ANOEDITALTCU", hAPI.getCardValue("txt_tcu_ano_edi"));
	
	if (hAPI.getCardValue("txt_tcu_cat_obj") != "")
		xml += setNode("CATOBJETOTCU", hAPI.getCardValue("txt_tcu_cat_obj"));	
	
	if (hAPI.getCardValue("txt_tcu_cri_jul") != "")
		xml += setNode("CRITERIOTCU", hAPI.getCardValue("txt_tcu_cri_jul"));
	
	if (hAPI.getCardValue("txt_tcu_cri_jul") != "")
	{
		var txt_tcu_dt_edital = hAPI.getCardValue("txt_tcu_dt_edital");
		var txt_tcu_dt_edital = txt_tcu_dt_edital.substring(6, 10) + "-" + txt_tcu_dt_edital.substring(3, 5) + "-"+ txt_tcu_dt_edital.substring(0, 2);
		
		xml += setNode("DATAEDITALTCU", txt_tcu_dt_edital);	
	}
	
	if (hAPI.getCardValue("txt_tcu_dt_homol") != "")
	{
		var txt_tcu_dt_homol = hAPI.getCardValue("txt_tcu_dt_homol");
		var txt_tcu_dt_homol = txt_tcu_dt_homol.substring(6, 10) + "-" + txt_tcu_dt_homol.substring(3, 5) + "-"+ txt_tcu_dt_homol.substring(0, 2);
		
		xml += setNode("DATAHOMOLOGTCU", txt_tcu_dt_homol);	
	}
	
	if (hAPI.getCardValue("txt_tcu_fas_obr") != "")
		xml += setNode("FASEOBRATCU", hAPI.getCardValue("txt_tcu_fas_obr"));
	
	if (hAPI.getCardValue("txt_tcu_gra_obr") != "")
		xml += setNode("GRATOBRATCU", hAPI.getCardValue("txt_tcu_gra_obr"));
	
	if (hAPI.getCardValue("txt_tcu_nat_obj") != "")
		xml += setNode("NATOBJETOTCU", hAPI.getCardValue("txt_tcu_nat_obj"));
	
	if (hAPI.getCardValue("txt_tcu_nro_edital") != "")
		xml += setNode("NUMPROCESSO", hAPI.getCardValue("txt_tcu_nro_edital"));
	
	if (hAPI.getCardValue("txt_tcu_valor_ref_obra") != "")
	{
		var txt_tcu_valor_ref_obra = (hAPI.getCardValue("txt_tcu_valor_ref_obra")).replace(".", "").replace(",", ".");
		xml += setNode("VLRREFOBRGA", txt_tcu_valor_ref_obra);	
	}
	
	if (hAPI.getCardValue("txt_tcu_perc_exec") != "")
	{
		var txt_tcu_perc_exec = (hAPI.getCardValue("txt_tcu_perc_exec")).replace(".", "").replace(",", ".");
		xml += setNode("EXECFISICATCU", txt_tcu_perc_exec);	
	}
	
	if (hAPI.getCardValue("txt_tcu_obs_tcu") != "")
	{
		xml += setNode("obstcu", hAPI.getCardValue("txt_tcu_obs_tcu"));	
	}
	
	
	
	
    xml += createNode("/TCNTCOMPL");
    
    return xml;
}


function createTCNTHISTORICO(xml,codColigada)
{
	xml += createNode("TCNTHISTORICO");
	xml += setNode("CODCOLIGADA", codColigada);
	xml += setNode("IDCNT", "-1");
	 
	var objeto = "" + hAPI.getCardValue("txa_objetocontratacao").replace("&","e");
	    
    xml += setNode("HISTORICOCURTO", objeto.substr(0,250));
    xml += createNode("/TCNTHISTORICO");
    
    return xml;
}


function createTITMCNT(xml,codColigada)
{
	var txt_numsol = hAPI.getCardValue("txt_numsol");		
	var indexFornecedor = 1;
	var cnt = 0;
	var dataIni = hAPI.getCardValue("periodoinicial");
	var dataInicio = dataIni.substring(6, 10) + "-" + dataIni.substring(3, 5) + "-"+ dataIni.substring(0, 2);
	//var dataFi = hAPI.getCardValue("periodofinal");
	//var dataFim = dataFi.substring(6, 10) + "-" + dataFi.substring(3, 5) + "-"+ dataFi.substring(0, 2);

	var data_fim_vigencia = hAPI.getCardValue("data_fim_vigencia");
	var dataFimVigencia = data_fim_vigencia.substring(6, 10) + "-" + data_fim_vigencia.substring(3, 5) + "-"+ data_fim_vigencia.substring(0, 2);

	var constraints = new Array();
    //constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("txt_numsol", txt_numsol, txt_numsol, ConstraintType.MUST));
    var dsItens = DatasetFactory.getDataset("ds_itens_medicao_SGF", null, constraints, null);

    var idprd_TMP = ""; //variavel para controlar a não repetição dos itens
    
    if (dsItens != null)
	{
    	for (var i = 0; i < dsItens.rowsCount; i++) 
    	{
	    	 var idprd = dsItens.getValue(i, "idprd");
	    	 var codtb1fat = dsItens.getValue(i, "codtb1fat");
	    	 var CODTIP = dsItens.getValue(i, "CODTIP");
	    	 var vlquantidade = dsItens.getValue(i, "vlquantidade").replace(".", "").replace(",", ".");
	    	 var vlprd = dsItens.getValue(i, "vlprd").replace(".", "").replace(",", ".");
	    	 var vlsubtotal = dsItens.getValue(i, "vlsubtotal").replace(".", "").replace(",", ".");
	
	    	 if (idprd_TMP != idprd)
	    	 {
	    		 cnt = cnt + 1;

	    		 xml += createNode("TITMCNT");
				 xml += setNode("CODCOLIGADA", codColigada);
				 xml += setNode("IDCNT", "-1");
				 xml += setNode("NSEQITMCNT", cnt);
				 xml += setNode("CODMOEREAJUSTE", "R$");
				 xml += setNode("TIPOMEDICAO", "V");
				 xml += setNode("CODSTACNT", "001");
				 xml += setNode("CODCPG", "01");		
				 xml += setNode("CODDEPARTAMENTO", hAPI.getCardValue("codUnidadeDemandante"));
				 xml += setNode("QUANTIDADE", vlquantidade);
				 xml += setNode("PRECOFATURAMENTO", vlprd);
				 xml += setNode("PRECO", vlprd);
				 xml += setNode("VALORTOTAL", vlsubtotal);
				 xml += setNode("IDPRD", idprd);
				 xml += setNode("CODCFO", hAPI.getCardValue("txt_forcodcfo"));  
				 xml += setNode("CODCOLCFODEST", codColigada);  
				 xml += setNode("TIPOPREVISAOMEDICAO", "V");
				 xml += setNode("CODCOLCFO", codColigada);
				 xml += setNode("DATAINICIO", dataInicio);
				 xml += setNode("DATAFIM", dataFimVigencia);
				 xml += setNode("CODTMV", "1.1.80");
				 xml += setNode("CODMOEPRECOFATURAMENTO", "R$");
				 xml += setNode("EPERIODICO", "2");
				 xml += setNode("CODCFODEST", hAPI.getCardValue("txt_forcodcfo"));  
				 xml += setNode("CODTB1FAT", codtb1fat);
				 xml += setNode("CODFILIALFAT", "1");
				 xml += setNode("TIPODESTINATARIO", "C");
				
				 if (CODTIP != "")
					xml += setNode("CODTIP", CODTIP);
				
				 xml += setNode("NATUREZAIT", "1");
				
				 xml += setNode("CODCOLTBORCAMENTO", codColigada);
				 xml += setNode("CODTBORCAMENTO", "001");
				
				 xml += createNode("/TITMCNT");
				
				
				 idprd_TMP = idprd;
			
			}
			
    	}
	}
	
	return xml;	
        
}



function createTITMCNTMEDICAO(xml,codColigada)
{
	
	var txt_numsol = hAPI.getCardValue("txt_numsol");		
	var cnt = 0;
	var cntNeto = 0;
	
	var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("txt_numsol", txt_numsol, txt_numsol, ConstraintType.MUST));
    var dsItens = DatasetFactory.getDataset("ds_itens_medicao_SGF", null, constraints, null);

    var idprd_TMP = ""; //variavel para controlar a não repetição dos itens
    
    if (dsItens != null)
	{
	    for (var i = 0; i < dsItens.rowsCount; i++) 
    	{
	    	var idprd = dsItens.getValue(i, "idprd");
	    	var dt = dsItens.getValue(i, "dtmedicao");
	    	var data_medicao = dt.substring(6, 10) + "-" + dt.substring(3, 5) + "-"+ dt.substring(0, 2);
			var vl_medicao = dsItens.getValue(i, "vlmedicao").replace(".", "").replace(",", ".");
			
			cntNeto = cntNeto + 1;
			
			if (idprd_TMP != idprd)
			{
				cnt = cnt + 1;
			}
			
			xml += createNode("TITMCNTMEDICAO");
			xml += setNode("CODCOLIGADA", codColigada);
			xml += setNode("IDCNT", "-1");
			xml += setNode("NSEQITMCNT", cnt);
			xml += setNode("NSEQMEDICAO", cntNeto);
			xml += setNode("DATA", data_medicao);
			xml += setNode("QUANTIDADE", "1.00");
			xml += setNode("VALOR", vl_medicao);
			xml += setNode("VALORTOTAL", vl_medicao);
			xml += setNode("STATUS", "0");
			
			xml += createNode("/TITMCNTMEDICAO");
			
			idprd_TMP = idprd;
    	}
	}
	
	return xml;	
        
}


function setNode(node, valor)
{
	var line = createNode(node) + valor + createNode("/" + node);
	return line;
}

function createNode(node)
{
	return "<" + node + ">";
}

function buscarData()
{
	return new Date();
}

function buscarDiaAtual()
{
	return buscarData().getDate().toString();
}

function buscarMesAtual()
{
	return (buscarData().getMonth()+1).toString();
}

function buscarAnoAtual()
{
	return buscarData().getFullYear().toString();
}

function buscarDataAtualSistema()
{
	return formatarData(buscarDiaAtual(), buscarMesAtual(), buscarAnoAtual());
	//return formatarData(22, 12, 2017);
}

function formatarData(dia, mes, ano)
{
	if(dia.length == 1)
		dia = 0+dia;	
	if(mes.length == 1)
		mes = 0+mes;	
	return dia+"/"+mes+"/"+ano;
}

function stringToDate(dateString)
{
	var today = new java.util.Date();
	var format = new java.text.SimpleDateFormat("dd/MM/yyyy");
	var date = format.parse(dateString);  
	format = new java.text.SimpleDateFormat("yyyy-MM-dd");
	var data = format.format(date);
	
	return data;
}