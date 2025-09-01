/*
 * //    var check_sebraetec = $('[name="check_Consultoria"]:checked').val(); exemplo para pegar valor de um capmo tipo checkbok
 */

function Atividade(){

	
	mostraFormSebraeTec();
	setInterval(function(){		

		var rd_formacontratacao = "";
		var aprovafiscal = "";
		var aprovagestor = "";
		var aprovagerencia = "";
		var aprovagerenciaregional = "";
		var aprovasebraetec = "";
		var aprovaTIC = "";
		var setorsgf = "";
		var aprovadirex = "";
		var valortotalconsultoria = calculaTotal();
		var fluxo_ajuste = "";
		var gerentefinanca = "";
		var cc = "";
		//var deslocamento = "";


		if ($('[name="rd_formacontratacao"]:checked').val() != undefined)
			rd_formacontratacao = $('[name="rd_formacontratacao"]:checked').val();
		else
			rd_formacontratacao = $('[name="rd_formacontratacao"]').val();

		if ( $('[name="aprovagestor"]:checked').val() != undefined)
			aprovagestor =  $('[name="aprovagestor"]:checked').val(); 
		else
			aprovagestor = $('[name="aprovagestor"]').val();

		if ( $('[name="aprovafiscal"]:checked').val() != undefined)
			aprovafiscal =  $('[name="aprovafiscal"]:checked').val(); 
		else
			aprovafiscal = $('[name="aprovafiscal"]').val();

		if ( $('[name="aprovagerencia"]:checked').val() != undefined)
			aprovagerencia =  $('[name="aprovagerencia"]:checked').val(); 
		else
			aprovagerencia = $('[name="aprovagerencia"]').val();

		
		if ( $('[name="aprovaGerenteRegional"]:checked').val() != undefined)
			aprovagerenciaregional =  $('[name="aprovaGerenteRegional"]:checked').val(); 
		else
			aprovagerenciaregional = $('[name="aprovaGerenteRegional"]').val();

		
		

		if ( $('[name="aprovasebraetec"]:checked').val() != undefined)
			aprovasebraetec =  $('[name="aprovasebraetec"]:checked').val(); 
		else
			aprovasebraetec = $('[name="aprovasebraetec"]').val();


		if ( $('[name="aprovaTIC"]:checked').val() != undefined)
			aprovaTIC =  $('[name="aprovaTIC"]:checked').val(); 
		else
			aprovaTIC = $('[name="aprovaTIC"]').val();


		if ( $('[name="aprovasgf"]:checked').val() != undefined)
			setorsgf =  $('[name="aprovasgf"]:checked').val(); 
		else
			setorsgf = $('[name="aprovasgf"]').val();

		if ( $('[name="aprovadirex"]:checked').val() != undefined)
			aprovadirex =  $('[name="aprovadirex"]:checked').val(); 
		else
			aprovadirex = $('[name="aprovadirex"]').val();

		if ( $('[name="ajustedemandante"]:checked').val() != undefined)
			fluxo_ajuste =  $('[name="ajustedemandante"]:checked').val(); 
		else
			fluxo_ajuste = $('[name="ajustedemandante"]').val();

		if ( $('[name="aprovagerentefinanca"]:checked').val() != undefined)
			gerentefinanca =  $('[name="aprovagerentefinanca"]:checked').val(); 
		else
			gerentefinanca = $('[name="aprovagerentefinanca"]').val();

		if ( $('[name="rd_fluxoCC"]:checked').val() != undefined)
			cc =  $('[name="rd_fluxoCC"]:checked').val(); 
		else
			cc = $('[name="rd_fluxoCC"]').val();

		/*if ( $('[name="rd_aprovaCalculo"]:checked').val() != undefined)
			deslocamento =  $('[name="rd_aprovaCalculo"]:checked').val(); 
		else
			deslocamento = $('[name="rd_aprovaCalculo"]').val();
		 */


		if(rd_formacontratacao =="rodiziosebraetec" || rd_formacontratacao == "analisesgf" ){
			$('#divcc').hide(700);

		}


		if (aprovafiscal == "sim")
			$("#txt_fluxofiscal").val("analisegestor");
		else if (aprovafiscal == "nao")
			$("#txt_fluxofiscal").val("fim");
		else 
			$("#txt_fluxofiscal").val("ajuste");


		if (aprovagestor == "sim")
			$("#txt_fluxogestor").val("analisegerencia");
		else if (aprovagestor == "nao")
			$("#txt_fluxogestor").val("fim");
		else 
			$("#txt_fluxogestor").val("ajuste");


		if(((aprovagerencia == "sim" || aprovagerenciaregional == "sim" )&& rd_formacontratacao == "analisesgf") 
				|| ((aprovagerencia == "sim" || aprovagerenciaregional == "sim" ) && rd_formacontratacao == "continuidade")
		){

			//aqui verifica se segue para SGF ou passa por TIC antes
			if ($("#areaContratacao").val() == "11") //Tecnologia da Informação
			{
				$("#txt_fluxo").val("analiseTIC");
			}
			else
			{
				$("#txt_fluxo").val("analisesgf");	
			}

			$("#txt_tcu_dt_homol").val(moment(new Date()).format("DD/MM/YYYY"));

		}	
		else if ((aprovagerencia == "sim" || aprovagerenciaregional == "sim" )&& rd_formacontratacao == "rodiziosebraetec")
		{
			$("#txt_fluxo").val("analisesebraetec");
			$("#txt_tcu_dt_homol").val(moment(new Date()).format("DD/MM/YYYY"));
		}

		if(aprovagerencia =="ajuste"){

			$("#txt_fluxo").val("ajuste");

		}

		if(aprovagerencia == "nao"){

			$("#txt_fluxo").val("fim");
		}


		//aqui verifica se segue para SGF ou passa por TIC antes
		if(aprovasebraetec == "sim")
		{
			if ($("#areaContratacao").val() == "2") //Tecnologia da Informação
			{
				$("#txt_fluxosebraetec").val("analiseTIC");
			}
			else
			{
				$("#txt_fluxosebraetec").val("analisesgf");	
			}
		}

		if(aprovasebraetec == "ajustesebraetec")
		{
			$("#txt_fluxosebraetec").val("ajustesebraetec");		
		}

		if(aprovaTIC == "sim")
		{
			$("#txt_fluxoTIC").val("analisesgf");	
		}

		if(aprovaTIC == "ajusteTIC")
		{
			$("#txt_fluxoTIC").val("ajusteTIC");		
		}



		if(setorsgf=="sim"){


			var valorSolicitacao = converteValorJS($("#txt_valor_total").val());


			var c1 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
			var colunasDsFormCoordenadoresGerentes = new Array('vlrAprovacaoCoordenadorAte', 'vlrAprovacaoCoordenadorDe', 'vlrAprovacaoDiretoriaAte', 'vlrAprovacaoDiretoriaDe', 'vlrAprovacaoGerRegionalAte', 'vlrAprovacaoGerRegionalDe');
			var dsFormConfiguracao = DatasetFactory.getDataset('dsFormCoordenadoresGerentes', colunasDsFormCoordenadoresGerentes, new Array(c1), null);

			if(dsFormConfiguracao.values.length > 0){

				var vlrAprovacaoDiretoriaDe = converteValorJS(dsFormConfiguracao.values[0].vlrAprovacaoDiretoriaDe);
				var vlrAprovacaoDiretoriaAte = converteValorJS(dsFormConfiguracao.values[0].vlrAprovacaoDiretoriaAte);


				if(valorSolicitacao >= vlrAprovacaoDiretoriaDe && valorSolicitacao <= vlrAprovacaoDiretoriaAte){
					//Aprovar
					$("#txt_fluxosgf").val("analisardirex");

				}else{
					//Validar
					$("#txt_fluxosgf").val("contratarsgf");		

				}

			}else{

				alert("Não foi encontrado formulário de configuração.");

			}


		}
		if(setorsgf=="ajustesgf"){
			$("#txt_fluxosgf").val("ajustarsgf");		
		}



		if(aprovadirex=="sim"){
			$("#txt_fluxodirex").val("contratardirex");		
		}

		if(aprovadirex=="nao"){
			$("#txt_fluxodirex").val("naodirex");		
		}
		if(aprovadirex=="ajustedirex"){
			$("#txt_fluxodirex").val("ajustardirex");	
		}

		if(aprovadirex=="parecerdirex"){
			$("#txt_fluxodirex").val("parecerdirex");	
		}


		if(fluxo_ajuste=="gerencia"){
			$("#txt_ajuste").val("devolvegerencia");		
		}
		if(fluxo_ajuste=="sebraetec"){
			$("#txt_ajuste").val("devolvesebraetec");		
		}
		if(fluxo_ajuste=="sgf"){
			$("#txt_ajuste").val("devolvesgfc");		
		}
		if(fluxo_ajuste=="direx"){
			$("#txt_ajuste").val("devolvedirex");		
		}

		if (gerentefinanca=="sim"){

			$("#fluxo_financa").val("aprovadosim");
			$("#fluxo_cc").val("gravarRM");
		}
		if (gerentefinanca=="nao"){
			$("#fluxo_financa").val("aprovadonao");	
			$("#fluxo_cc").val("");

		}
		if (gerentefinanca=="ajustefinanca"){
			$("#fluxo_financa").val("ajuste");
			$("#fluxo_cc").val("ajuste");

		}
		if (cc=="gravarRM"){
			$("#fluxo_cc").val("gravarRM");

		}
		if (cc=="aguardaAss"){
			$("#fluxo_cc").val("aguardaAss");

		}
		/*if(cc == 'ajuste'){

			$("#fluxo_cc").val("ajuste");		
		}
		if(cc =="cancelado"){
			$("#fluxo_cc").val("cancelado");		
		}

		/*if(deslocamento == "sim"){
			$("#fluxo_cc").val("sim");
		}
		if(deslocamento == "nao"){

			$("#fluxo_cc").val("nao");
		}*/

	}, 1000); 



}

function calculaTotal(){

	calculaTotalItens();

	var txt_valor_total = parseFloat(0 + $("#txt_valor_total").val().replace(".","").replace(",","."));

	return txt_valor_total;
}
/*function fluxoCalculaDeslocamento(){

	let Viagem = $('[name="rd_Viagem"]:checked').val();


	if(Viagem == "nao")
		$("#fluxo_cc").val("gravar");		
	 else 
		$("#fluxo_cc").val("aprovacao");		

}
function fluxoAprovaDeslocamento(valor){

		$("#fluxo_cc").val(valor);
		$("#txt_controle").val(valor);
}*/

function mensagemError(msg){

	FLUIGC.toast({
		title: 'Atenção:',
		message: msg,
		type: 'danger'			    			
	}); 
}


function mensagemSucesso(msg){

	FLUIGC.toast({
		title: 'Atenção:',
		message: msg,
		type: 'sucess'			    			
	}); 
}


function mostraFormSebraeTec(){
	
var option = $('[name="rd_formacontratacao"]:checked').val();
	
	if(option == "rodiziosebraetec"){
		$('#panel_escolherFichaSebraeTec').show();
	}else{
		$('#panel_escolherFichaSebraeTec').hide();
	}
}


