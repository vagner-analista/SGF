function integraCentroCusto(idCnt, codColigada){
	
	var result = "";
	
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	log.info("@@@@@@@  Preenchimento de Rateio do Contrato ->" + hAPI.getCardValue("txt_numsol") + "@@@@@@@@@@@@");
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	
	var valorTotal = (hAPI.getCardValue("txt_valor_total")).replace(".", "").replace(",", ".");
	var xml = "";
	
	//Cria XML de Rateios
	var rateios = 0;
	var indexes = hAPI.getChildrenIndexes("centroDeCusto");
	
	//Conta a quantidade de rateios com informação preenchida
	for (var x = 0; x < indexes.length; x++)
	{
		if (hAPI.getCardValue("txt_codprojeto___" + indexes[x]) != "")
		{
			rateios = rateios+1;
		}
	}
	//if (rateios > 0) 
	if (rateios == 1) /*Até a correção do SBC somente será inserido rateio quando houver apenas uma registro devido erro de percentual do SBC. Após correção do problema deve ser alterada essa condição*/ 
	{
	   for (var i = 0; i < indexes.length; i++) 
	   {
		   if (hAPI.getCardValue("txt_codprojeto___" + indexes[i]) != "")
			{
				var txt_codprojeto = hAPI.getCardValue("txt_codprojeto___" + indexes[i]);
				var txt_codacao = hAPI.getCardValue("txt_codacao___" + indexes[i]);
				var txt_codrecurso = hAPI.getCardValue("txt_codrecurso___" + indexes[i]);
				var txt_percentual = hAPI.getCardValue("txt_percentual___" + indexes[i]).replace(".", "").replace(",", ".");
				
				var valor = parseFloat((parseFloat(txt_percentual) * parseFloat(valorTotal))/parseFloat(100));
				
				xml += createNode("ZRATORCAMENTO");
				xml += setNode("CODCOLIGADA", codColigada);
				xml += setNode("CODCCUSTO", txt_codprojeto + "." + txt_codacao + "." + txt_codrecurso);
				xml += setNode("PERCENTUAL", txt_percentual);
				xml += setNode("VALOR", valor);
				xml += setNode("HISTORICO", "");
				xml += createNode("/ZRATORCAMENTO");
			}
			
	   }
	   //cria rateios de Centros de Custo via DataSet especifico
		var constraints = new Array();
	    constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
	    constraints.push(DatasetFactory.createConstraint("idCnt", idCnt, idCnt, ConstraintType.MUST));
	    constraints.push(DatasetFactory.createConstraint("rateios", xml, xml, ConstraintType.MUST));
	    var dsItens = DatasetFactory.getDataset("ds_gera_rateio_contrato", null, constraints, null);

	    if (dsItens != null)
		{
		    for (var i = 0; i < dsItens.rowsCount; i++) 
	    	{
				result = dsItens.getValue(i, "result");
	    	}
		}
	   
	}
	else{
		log.error("@@@@@@@@@@ Não há rateios no processo!");
	}
	
	return result;
}

function integraMedicao(idCnt, codColigada){
	
	var result = "";
	
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	log.info("@@@@@@@  FaturaMedicoesDoContrato ->" + hAPI.getCardValue("txt_numsol") + "@@@@@@@@@@@@");
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    var nSeqItmCnt = 0;
    var nSeqMedicao = 0;
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
			
			cntNeto = cntNeto + 1;
			
			if (idprd_TMP != idprd)
			{
				cnt = cnt + 1;
			}
			
			nSeqItmCnt = cnt;
			nSeqMedicao = cntNeto;
			
			var constr = new Array();
			constr.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
			constr.push(DatasetFactory.createConstraint("idCnt", idCnt, idCnt, ConstraintType.MUST));
			constr.push(DatasetFactory.createConstraint("nSeqItmCnt", nSeqItmCnt, nSeqItmCnt, ConstraintType.MUST));
			constr.push(DatasetFactory.createConstraint("nSeqMedicao", nSeqMedicao, nSeqMedicao, ConstraintType.MUST));
		    var dsItens2 = DatasetFactory.getDataset("ds_gera_faturamento_contrato", null, constr, null);
		    
		    sleep(1000);
		    
		    if (dsItens2 != null)
			{
			    for (var j = 0; j < dsItens2.rowsCount; j++) 
		    	{
			    	result = dsItens2.getValue(j, "result");
		    	}
			}
			
			idprd_TMP = idprd;
    	}
	}
	else{
		log.error("@@@@@@@@@@ Não há medições no processo!");
	}
    
	
	return result;
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

function sleep(milliseconds)
{
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++)
	{
	    if ((new Date().getTime() - start) > milliseconds)
	    {
	    	break;
	    }
	}
}
