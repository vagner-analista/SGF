var INICIO_0                        = 0;
var INICIO_6                        = 6;
var REVISAO_11                      = 11;
var COMPL_CAD_XPERTS_154            = 154;
var APROVACAO_FISCAL_113            = 113;
var APROVACAO_GESTOR_114            = 114;
var APROVACAO_GESTOR_DEMANDANTE_7   = 7;
var APROVACAO_GESTOR_SEBRAETEC_15   = 15;
var APROVACAO_GESTOR_TIC_144        = 144;
var ANALISAR_ERRO_INT_SGF_187       = 187;
var ANALISAR_ERRO_INT_SGF_161       = 161;
var ANALISAR_SGF_21                 = 21;
var APROVACAO_DIREX_17              = 17;
var APROVACAO_GESTOR_SGF_58         = 58;
var EXPORTACAO_DADOS_SGF_198 		= 198;
var CONFIRMAR_CONTRATACAO_SGF_176   = 176;
var GRAVAR_DADOS_RM_86              = 86;
var INTEGRACAO_COMPRAS_101          = 101;
var TRATAR_INTEGRACAO_103           = 103;
var FIM_88                          = 88;
var CONFIRMACAO_SERVICO_193			= 193;
var ATA_REUNIAO_211					= 211;
var TRATAR_INTEGRACAO_161           = 161;
var GATEWAY_APROVACAO_FISCAL        = 132;
var VALIDACAO_COORDENADOR = 348 ;
var VALIDACAO_GERENTE_REGIONAL = 312 ;
var PARECER_ASSESSOR_GE = 322;
var idFormulario = ""; // Guarda o ID que o formulárioi das fichas do SEBRAETEC foram cadatradas. Serve para recarergar os campos filhos da tabela de etapas e entregas SEBRAETEC;
var linhaEtapa = ""; // ao ser adicionado uma linha na tabela de etapa, guarda o código aqui para dar um reload em tempo de execução;



var indice = 1; // Controla o índice dos arquivos para as atividades aprovar e calcular desclocamento;
var indiceinstrutoria = 1;



//Variaveis para verificar se pode abrir contratação SEBRAETEC - Na atividade inicial

var codFichaSolicitando = "";
var codParceiroSolicitando="";
var anoContratacaoSolicitando="";
var temContratacaoNoAno="";


var anoContratado = "";
var codFichaContratado="";
var codParceiroSasContratado="";

var precoMaximodaFicha = "";



$(document).ready(function() {
	
	//
	
	//quando o botão Buscar Cliente for chamado
	
	$('#bnt_buscarCliente').off('click').on('click', function () {
        BuscarClienteSas();
    });
	
	
	
	recarregaOnchange();
	mostraFormSebraeTec();
	mostraRecorrencia()//Mostra a tabela de recorrência, caso encontre for encontrado na base
	FLUIGC.switcher.init('#switchCutomizada');
	OcultarCampo();
	
	mostrarSpanSubsidio(); // Se tiver percentual de desconto mostra a span de subsidio
	mostraValorSebraeEValorCliente();// se houver total da contratação, quer dizer que foi calculado e devemos mostrar o valor de cada
	
	
	
	
	setTimeout(function(){
		$('#divLoginSuperior').hide();//Ocultei este campo, por não saber do que si tratava.
	}, 3000);


	if($('#txtTermoDeclaracao').val() == ""){
		$('#txtTermoDeclaracao').append(`
				TERMO DE DECLARAÇÃO E RESPONSABILIDADE SOBRE GESTÃO E FISCALIZAÇÃO DE CONTRATAÇÃO

				Ambos colaboradores do SEBRAE/MT, DECLARAM que têm integral e irrestrito conhecimento da Contratação conforme consta nesta solicitação.

				Este pedido de solicitação de contratação descrito servirá de base para posterior realização do instrumento Contratual firmado entre a Empresa Contratada e o SEBRAE/MT, posto isso, DECLARAMOS que somos/seremos integralmente responsáveis pela gestão e fiscalização do Contrato e seus respectivos Termos Aditivos, comprometendo-nos, de forma inequívoca e irrecusável a comunicar em tempo hábil para solução de qualquer condição durante sua vigência, seja por condição alterada, seja por condição distorcida, a qual venha de qualquer modo evidenciar não cumprimento total ou cumprimento parcial das obrigações do futuro Contrato. Tal comunicação será feita formalmente à Unidade de Gestão de Contratos, bem como à Diretoria do SEBRAE/ MT.

				Declaramos ainda, nas condições de gestor e/ou fiscal do Contrato iremos comunicar qualquer fato que venha a comprometer a execução do mesmo, principalmente se for o caso de se tratar da relação do prestador de serviço contratado com seus funcionários, sublocados para atender as necessidades do contrato.

				I.  Comprometemos a efetuar o recebimento dos serviços e, ou materiais correspondentes ao Contrato, declarando a execução/recebimento, em carimbo apropriado, na Nota Fiscal do fornecedor.

				II. Comprometemos a solicitar a renovação do Contrato, com prazo mínimo de 120 dias, anterior ao término do prazo de execução do Contrato em caso de Contratos Continuados ou com o prazo mínimo de 30 dias para os demais contratos.

				III.    Comprometemos a realizar a gestão administrativa e o controle financeiro do contrato. (E em caso de Contratos Continuados que envolvem mão-de-obra terceirizada: realizar conferência das obrigações da contratada, notadamente as obrigações Trabalhistas desta em relação aos seus funcionários, alocados para execução do contrato junto ao SEBRAE/MT compreendendo folha de ponto, guias, certidões, impostos, relatórios, etc.).

				IV. Comprometemos a certificar que as informações cadastradas no sistema RM da Contratação e outros sistemas pertinentes ao processo estejam sempre atualizadas, tais como: gestor e responsável, prazo de execução, saldo a executar e que ao final da contratação iremos encerrar o status do Contrato no sistema no sistema RM;

				V.  Comprometo ainda, a conhecer o disposto na Lei Federal nº 12.846/13 (Lei Anticorrupção) e comunicar formalmente à Gerencia de Assuntos Jurídicos, bem como à Diretoria do SEBRAE/ MT, caso tenha conhecimento que sócios, diretores, administradores, empregados, assessores, prepostos e colaboradores da empresa CONTRATADA tenham cometido, auxiliado, incitado ou instigado terceiros a cometerem atos ilícitos, que incluem oferecer, conceder, requerer ou aceitar pagamentos, doações, compensação, benefícios ou quaisquer outras vantagens indevidas e/ou ilegais para si ou para terceiros, bem como o desvio de finalidade do presente Contrato, ou quaisquer outros atos lesivos expressamente previstos na Lei Federal nº 12.846/13, que constituam prática ilegal ou de corrupção, seja de forma direta ou indireta quanto ao objeto desta Contratação.                  

				`);

	}


	if($('#txa_CodicaoPagamento').val() == ""){
		$('#txa_CodicaoPagamento').append(`
				a. Forma de Pagamento: O pagamento será efetuado pelo contratante mediante depósito em conta corrente da pessoa jurídica contratada, após a realização dos serviços, sendo que o pagamento das horas técnicas estará condicionado ao número de horas efetivamente realizadas e empresas atendidas no período e entrega de relatórios e demais itens definidos no item ENTREGAS, com nota fiscal devidamente atestada pelo gestor do projeto e apresentação das Certidões Negativas de Débito do Receita Federal e do FGTS, com validade vigente.

				b. A entrega da Nota Fiscal e os respectivos comprovantes deverá ocorrer até o dia 20 de cada mês ou dia útil imediatamente anterior, juntamente com a comprovação de regularidade fiscal (certidões negativas de débitos federais, certidão unificada de FGTS), podendo ser aceitas as certidões positivas com efeitos de negativa. O SEBRAE/MT não receberá Nota Fiscal de Serviços/Fatura, no período de 21 a 30 e/ou 31 de cada mês.

				O SEBRAE/MT fará os pagamentos no prazo de até 15 (quinze) dias, contados da data de recebimento dos documentos de cobrança pelo GESTOR DO CONTRATO na sede do SEBRAE/MT a Gerência responsável.

				Só serão pagos os serviços efetivamente solicitados e devidamente realizados e atestados.
				`);

	}



	if($('#txtTermoDeclaracao').val() == ""){
		$('#txtTermoDeclaracao').append(`
				TERMO DE DECLARAÇÃO E RESPONSABILIDADE SOBRE GESTÃO E FISCALIZAÇÃO DE CONTRATAÇÃO

				Ambos colaboradores do SEBRAE/MT, DECLARAM que têm integral e irrestrito conhecimento da Contratação conforme consta nesta solicitação.

				Este pedido de solicitação de contratação descrito servirá de base para posterior realização do instrumento Contratual firmado entre a Empresa Contratada e o SEBRAE/MT, posto isso, DECLARAMOS que somos/seremos integralmente responsáveis pela gestão e fiscalização do Contrato e seus respectivos Termos Aditivos, comprometendo-nos, de forma inequívoca e irrecusável a comunicar em tempo hábil para solução de qualquer condição durante sua vigência, seja por condição alterada, seja por condição distorcida, a qual venha de qualquer modo evidenciar não cumprimento total ou cumprimento parcial das obrigações do futuro Contrato. Tal comunicação será feita formalmente à Unidade de Gestão de Contratos, bem como à Diretoria do SEBRAE/ MT.

				Declaramos ainda, nas condições de gestor e/ou fiscal do Contrato iremos comunicar qualquer fato que venha a comprometer a execução do mesmo, principalmente se for o caso de se tratar da relação do prestador de serviço contratado com seus funcionários, sublocados para atender as necessidades do contrato.

				I.  Comprometemos a efetuar o recebimento dos serviços e, ou materiais correspondentes ao Contrato, declarando a execução/recebimento, em carimbo apropriado, na Nota Fiscal do fornecedor.

				II. Comprometemos a solicitar a renovação do Contrato, com prazo mínimo de 120 dias, anterior ao término do prazo de execução do Contrato em caso de Contratos Continuados ou com o prazo mínimo de 30 dias para os demais contratos.

				III.    Comprometemos a realizar a gestão administrativa e o controle financeiro do contrato. (E em caso de Contratos Continuados que envolvem mão-de-obra terceirizada: realizar conferência das obrigações da contratada, notadamente as obrigações Trabalhistas desta em relação aos seus funcionários, alocados para execução do contrato junto ao SEBRAE/MT compreendendo folha de ponto, guias, certidões, impostos, relatórios, etc.).

				IV. Comprometemos a certificar que as informações cadastradas no sistema RM da Contratação e outros sistemas pertinentes ao processo estejam sempre atualizadas, tais como: gestor e responsável, prazo de execução, saldo a executar e que ao final da contratação iremos encerrar o status do Contrato no sistema no sistema RM;

				V.  Comprometo ainda, a conhecer o disposto na Lei Federal nº 12.846/13 (Lei Anticorrupção) e comunicar formalmente à Gerencia de Assuntos Jurídicos, bem como à Diretoria do SEBRAE/ MT, caso tenha conhecimento que sócios, diretores, administradores, empregados, assessores, prepostos e colaboradores da empresa CONTRATADA tenham cometido, auxiliado, incitado ou instigado terceiros a cometerem atos ilícitos, que incluem oferecer, conceder, requerer ou aceitar pagamentos, doações, compensação, benefícios ou quaisquer outras vantagens indevidas e/ou ilegais para si ou para terceiros, bem como o desvio de finalidade do presente Contrato, ou quaisquer outros atos lesivos expressamente previstos na Lei Federal nº 12.846/13, que constituam prática ilegal ou de corrupção, seja de forma direta ou indireta quanto ao objeto desta Contratação.                  

				`);

	}

	$("#txa_objetocontratacao" ).blur(function() {
		//$(this).val($(this).val().replace(/\n/g, " ").substr(0,5000));
		$(this).val($(this).val().substr(0,5000));
		$(this).val(removeSpecialChar($(this).val()));

		//observações do TCU - joga automatico
		$("#txt_tcu_obs_tcu").val($(this).val().substr(0,250));
	});

	$("#txt_tcu_obs_tcu" ).blur(function() {
		$(this).val($(this).val().substr(0,250));
	});


	$("#txa_justificativa" ).blur(function() {
		$(this).val(removeSpecialChar($(this).val()));
	});


	$("#txt_fluig_receita" ).blur(function() {

		carregaItensMedicaoReceita(this.value);

	});


	$("#chkTermoResponsabilidade" ).click(function() {
		if ($(this).prop("checked"))
			$("#div_termo_declaracao").show();
		else
			$("#div_termo_declaracao").hide();

		preparaMatriculasAprovacaoFiscal();
	});



	if ($("#chkTermoResponsabilidade" ).prop("checked") ||
			$("#_chkTermoResponsabilidade" ).prop("checked"))
	{
		$("#div_termo_declaracao").show();
		preparaMatriculasAprovacaoFiscal();
	}


	$(".money-mask").maskMoney(
			{	prefix : '',
				thousands : '.',
				decimal : ',',
				affixesStay : true,
				allowZero : true
			});

	$('[name="rd_sistemacontratacao"]').on("click", function() 
			{
		ocultaDivFormaContratacao();
			});

	ocultaDivFormaContratacao();



	$('[name="rd_sistemareceita"]').on("click", function() 
			{
		ocultaDivFluigReceita();
			});

	ocultaDivFluigReceita();


	$("#btNovoItem").on("click", function() 
			{
		adicionaItem();

			});

	//ocultando tabs
	$("#navtab3").hide();
	$("#navtab4").hide();
	$("#navtab5").hide();
	$("#navtab6").hide();
	$("#navtab_TIC").hide();
	$("#navtab7").hide();
	$("#navtab8").hide();
	$("#navtab10").hide();
	$("#navtab101").hide();
	$("#navtab11").hide();
	$("#navtab_alinhamento").hide();



	if ((CURRENT_STATE == INICIO_0 || CURRENT_STATE == INICIO_6 || 
			CURRENT_STATE == REVISAO_11 ||
			CURRENT_STATE == TRATAR_INTEGRACAO_103 || 
			CURRENT_STATE == ANALISAR_SGF_21 ||
			CURRENT_STATE == GRAVAR_DADOS_RM_86 ||
			CURRENT_STATE == COMPL_CAD_XPERTS_154 ||
			CURRENT_STATE == ANALISAR_ERRO_INT_SGF_161 ||
			CURRENT_STATE == ANALISAR_ERRO_INT_SGF_187
	) 
	&& (FORM_MODE != "VIEW")) 
	{
		setInterval(function(){
			TABLES.saveFieldsValue("dadositens");
			ajustaDownload();
			FLUIGC.calendar('.campo-data');
			$(".tdTipoFaturamento").show();
		}, 3000); 

		setTimeout(function(){
			TABLES.loadFields("dadositens");
			ajustaDownload();
			FLUIGC.calendar('.campo-data');
			$(".money-mask").unmask();
			$(".money-mask").mask("#.###.##0,00", { reverse : true });
			$(".tdTipoFaturamento").show();
		}, 5000);

		FLUIGC.calendar('.campo-data');

		$(".mascaraDinheiro").maskMoney(
				{	prefix : '',
					thousands : '.',
					decimal : ',',
					affixesStay : true,
					allowZero : true
				});

		ajustaDownload();

		if (CURRENT_STATE == TRATAR_INTEGRACAO_103 || CURRENT_STATE == GRAVAR_DADOS_RM_86)
		{
			$(".divAnexo").show();
			$(".tdTipoFaturamento").show();
			$("#navtab11").show();
		}

	}
	else
	{
		setTimeout(function(){
			TABLES.loadFields("dadositens");
			ajustaDownload();

			FLUIGC.calendar('.campo-data');

			$(".campo-data" ).change(function() {
				if(this.value != '')
					validateDate($(this));
			});

			$(".mascaraDinheiro").maskMoney(
					{	prefix : '',
						thousands : '.',
						decimal : ',',
						affixesStay : true,
						allowZero : true
					});


		}, 3000);

		setTimeout(function(){
			TABLES.disableAndHideAll("dadositens");

			$("#btNovoItem").hide();
			$("#add-grandchild").hide();
			$(".remove-child").hide();
			$(".remove-grandchild").hide();

			$(".upload").hide();

			ajustaDownload();
			calculaTotalItens();
		}, 6000);
	}


	document.getElementById("historico_Fiscal").innerHTML = $("#txt_historico_Fiscal").val();



	if ((CURRENT_STATE == INICIO_0 || CURRENT_STATE == INICIO_6 || 
			CURRENT_STATE == REVISAO_11 || CURRENT_STATE == TRATAR_INTEGRACAO_103 
			|| CURRENT_STATE == COMPL_CAD_XPERTS_154
			|| CURRENT_STATE == ANALISAR_ERRO_INT_SGF_161) 
			&& (FORM_MODE != "VIEW")) 
	{
		getSetor();
		var matriculaGestor = $('#matriculaGestor').val();
		//$("#panel_fornecedor").show();
		if(matriculaGestor == '' || matriculaGestor == null)
		{
			$("#divLoginSuperior").attr("hidden",false);
		}else{
			$("#divLoginSuperior").attr("hidden",true);
		}	

		if ($("#matriculas_aprovacao_fiscal").val() == "")
		{
			//preenchendo fiscal e gestor do contrato
			ZOOMS.executeQuandoPronto("zoom_fiscal_contrato", function(){
				$("#usuario_fiscal_contrato").val(getUser());
				window["zoom_fiscal_contrato"].setValue($("#txt_solicitante").val());
				$("#usuario_fiscal_contrato_RM").val(retornaUsuarioRM($("#usuario_fiscal_contrato").val()));
				preparaMatriculasAprovacaoFiscal();
			});


			//preenchendo fiscal e gestor do contrato
			ZOOMS.executeQuandoPronto("zoom_gestor_contrato", function(){

				if ($("#GestorContratacao").val() != "")
				{
					$("#usuario_gestor_contrato").val($("#matriculaGestor").val());
					window["zoom_gestor_contrato"].setValue($("#GestorContratacao").val());
					$("#usuario_gestor_contrato_RM").val(retornaUsuarioRM($("#usuario_gestor_contrato").val()));
					preparaMatriculasAprovacaoFiscal();
				}
			});
		}

		if (CURRENT_STATE == COMPL_CAD_XPERTS_154 && FORM_MODE == 'MOD')
		{
			$('[name="rd_sistemacontratacao"]').prop("checked", true);

			$("#cnpjSolicitante").val($("#cnpjFornecedor").val());
			$('[id="rd_rodizio"]').prop("checked", true);
			$('[name="rd_tp_servico"]').prop("checked", true);
			$("#panel_fornecedor").show();
			$("#div_tipo_contratacao").show();

			buscarFornecedor();

			var loading = FLUIGC.loading(window);
			loading.show();

			ZOOMS.executeQuandoPronto("z_area", function(){

				var area = $("#areaContratacao").val();
				var consts = new Array();

				consts.push(DatasetFactory.createConstraint("DsArea", area, area, ConstraintType.MUST));		
				var dsArea = DatasetFactory.getDataset("ds_SGF_area", null, consts, null);

				if (dsArea != null && dsArea.values.length > 0) 
				{
					window['z_area'].setValue(dsArea.values[0]['dsArea']);
					$("#areaContratacao").val(dsArea.values[0]['idArea']);
				}


			});

			ZOOMS.executeQuandoPronto("z_subarea", function(){

				var subarea = $("#subAreaContratacao").val();

				var consts = new Array();		
				consts.push(DatasetFactory.createConstraint("IdArea", $("#areaContratacao").val(), $("#areaContratacao").val(), ConstraintType.MUST));		
				consts.push(DatasetFactory.createConstraint("DsSubArea", subarea, subarea, ConstraintType.MUST));		
				var dsSubArea = DatasetFactory.getDataset("ds_SGF_subarea", null, consts, null);

				if (dsSubArea != null && dsSubArea.values.length > 0) 
				{
					window['z_subarea'].setValue(dsSubArea.values[0]['dsSubArea']);
					$("#subAreaContratacao").val(dsSubArea.values[0]['idSubArea']);
				}


			});

			loading.hide();

		}


		if (CURRENT_STATE == TRATAR_INTEGRACAO_103 || CURRENT_STATE == ANALISAR_ERRO_INT_SGF_161)
		{
			$(".divAnexo").show();
			$(".tdTipoFaturamento").show();
			$("#panel_fornecedor").show();
			$("#divLoginSuperior").attr("hidden",true);

			$("#obsfiscal").hide();
			$(".del_tbfiscal").hide();

			$("#obsgestor").hide();
			$(".del_tbgestor").hide();

			$("#obsgerenciademandante").hide();
			$(".del_tbgerencia").hide();

			$("#obsGestorSgf").hide();
			$(".del_tbsgf").hide();

			$("#obsGerenciaFinanca").hide();
			$(".del_tbGerenciaFinanca").hide();

			$("#obsGestorSebraeTec").hide();
			$(".del_tbSebraeTec").hide();

			$("#obsGestorTIC").hide();
			$(".del_tbTIC").hide();

			$("#obsDirex").hide();
			$(".del_tbdirex").hide();

			$("#btnovoprojetoacaounidade2").hide();
			$(".del_").hide();


			//exibe aba apenas se teve preenchimento
			if ($('[name="aprovasebraetec"]').val() == "" || $('[name="aprovasebraetec"]').val() == undefined)
				$("#navtab6").hide();

			if ($('[name="aprovadirex"]').val() == "" || $('[name="aprovadirex"]').val() == undefined)
				$("#navtab8").hide();

		}

	}
	else
	{
		$("#divLoginSuperior").attr("hidden",true);

		$("#btn_cc").hide();
		$(".btn_del_cc").hide();

		$("#obsfiscal").hide();
		$(".del_tbfiscal").hide();

		$("#obsgestor").hide();
		$(".del_tbgestor").hide();

		$("#obsgerenciademandante").hide();
		$(".del_tbgerencia").hide();

		$("#obsGestorSgf").hide();
		$(".del_tbsgf").hide();

		$("#obsGerenciaFinanca").hide();
		$(".del_tbGerenciaFinanca").hide();

		$("#obsGestorSebraeTec").hide();
		$(".del_tbSebraeTec").hide();

		$("#obsGestorTIC").hide();
		$(".del_tbTIC").hide();

		$("#obsDirex").hide();
		$(".del_tbdirex").hide();

		$("#obsAta").hide();
		$(".del_tbAta").hide();

		$("#btnovoprojetoacaounidade2").hide();
		$(".del_").hide();
	}


	/*if (CURRENT_STATE == INICIO_0 || CURRENT_STATE == INICIO_6 || CURRENT_STATE == REVISAO_11)
	{
		$("#panel_fornecedor").show();
	}

	else
	 */
	if (CURRENT_STATE == APROVACAO_FISCAL_113)
	{
		if (FORM_MODE != "VIEW")
		{
			$("#obsfiscal").show();
			$(".del_tbfiscal").show();
			$('[name="aprovafiscal"]').prop("checked", false);
		}


	}

	else if (CURRENT_STATE == APROVACAO_GESTOR_DEMANDANTE_7) 
	{
		if (FORM_MODE != "VIEW")
		{
			$("#obsgerenciademandante").show();
			$(".del_tbgerencia").show();
			$('[name="aprovagerencia"]').prop("checked", false);
		}

		$("#navtab5").show();

	}

	else if (CURRENT_STATE == APROVACAO_GESTOR_SEBRAETEC_15) 
	{
		if (FORM_MODE != "VIEW")
		{
			$("#obsGestorSebraeTec").show();
			$(".del_tbSebraeTec").show();
		}

	}


	else if (CURRENT_STATE == APROVACAO_GESTOR_TIC_144) 
	{
		if (FORM_MODE != "VIEW")
		{
			$("#obsGestorTIC").show();
			$(".del_tbTIC").show();
		}

	}

	else if (CURRENT_STATE == APROVACAO_DIREX_17) 
	{
		if (FORM_MODE != "VIEW")
		{
			$("#obsDirex").show();
			$(".del_tbdirex").show();
		}


	}
	else if (CURRENT_STATE == ANALISAR_SGF_21) 
	{
		if (FORM_MODE != "VIEW")
		{
			$("#obsGestorSgf").show();
			$(".del_tbsgf").show();

			$('[name="aprovasgf"]').prop("checked", false);
		}

	}
	else if (CURRENT_STATE == APROVACAO_GESTOR_SGF_58) 
	{
		if (FORM_MODE != "VIEW")
		{
			$("#obsGerenciaFinanca").show();
			$(".del_tbGerenciaFinanca").show();

			$('[name="aprovagerentefinanca"]').prop("checked", false);
		}

	}

	else if(CURRENT_STATE == EXPORTACAO_DADOS_SGF_198 
			|| CURRENT_STATE == GRAVAR_DADOS_RM_86
			|| CURRENT_STATE == TRATAR_INTEGRACAO_103
			|| CURRENT_STATE == ANALISAR_ERRO_INT_SGF_161)
	{
		if (CURRENT_STATE == EXPORTACAO_DADOS_SGF_198)
		{
			if (FORM_MODE != "VIEW")
			{
				//preenche campos automaticamente
				if ($("#txt_tcu_ano_edi").val()== "")
					preencheCamposTCU();


				$("#btnovoprojetoacaounidade2").show();
				$(".del_").show();
			}

			$("#panel_fornecedor").show();
			$("#rd_AguardaAss").hide();
		}
		else if(CURRENT_STATE == GRAVAR_DADOS_RM_86)
		{
			$("#panel_fornecedor").show();

			setTimeout(function(){
				$(".divItemZoom").prop("style","");
				$(".divAnexo").show();
				$(".tdTipoFaturamento").show();
				$(".tdTipoFaturamento").prop("style","");
			}, 8000);
		}
		$("#navtab11").show();

	}
	else if (CURRENT_STATE == CONFIRMACAO_SERVICO_193) 
	{
		if (FORM_MODE != "VIEW")
		{
			$("#obsConfServico").show();
			$(".del_tbConfServico").show();

			$('[name="servicoConfirmado"]').prop("checked", false);

			$("#navtab101").show();
		}
	}

	/*else if(CURRENT_STATE == EXPORTACAO_DADOS_SGF_198 || CURRENT_STATE == GRAVAR_DADOS_RM_86)
	{
		if(CURRENT_STATE == GRAVAR_DADOS_RM_86)
		{
			$("#panel_fornecedor").show();

	 		setTimeout(function(){
	 			$(".divItemZoom").prop("style","");
	 			$(".divAnexo").show();
	 	 		$(".tdTipoFaturamento").show();
	 			$(".tdTipoFaturamento").prop("style","");
		       	}, 8000);
		}
	}*/


	else if (CURRENT_STATE == FIM_88 || CURRENT_STATE == INTEGRACAO_COMPRAS_101)
	{
		if ($("#txt_cc").val() != "")
			$("#navtab11").show();

		setTimeout(function(){
			$("#panel_fornecedor").show();
			$(".tdTipoFaturamento").show();
			$(".divAnexo").show();
		}, 8000);
	}
	else if (CURRENT_STATE == ATA_REUNIAO_211)
	{
		if (FORM_MODE != "VIEW")
		{
			$("#obsAta").show();
			$(".del_tbAta").show();
		}

		$("#panel_ata_reuniao").show();
	}
	else if (CURRENT_STATE == ATA_REUNIAO_211)
	{
		$("#navtab_alinhamento").show();

		if (FORM_MODE != "VIEW")
		{
			$("#obsAta").show();
			$(".del_tbAta").show();
		}
	}

	if(CURRENT_STATE == TRATAR_INTEGRACAO_161)
	{
		preencheCamposTCU();
		$("#btnovoprojetoacaounidade2").show();
		$(".del_").show();
		$("#fluxo_cc").val('')
		$('input[name=rd_fluxoCC]').prop('checked',false);
	}

	//bloqueia campos
	if (CURRENT_STATE != EXPORTACAO_DADOS_SGF_198)
	{
		$("#_txt_tcu_dt_edital").addClass("isDisabled");
		$("#_txt_tcu_dt_homol").addClass("isDisabled");
		$("#_txt_tcu_valor_ref_obra").addClass("isDisabled");
	}

	//exibe abas se houver preenchimento de campos (em caso de revisao, mostra abas que já passaram pela analise

	//fiscal do contrato
	if 	((FORM_MODE != "VIEW" && $('[name="aprovafiscal"]').val() != undefined && $('[name="aprovafiscal"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="aprovafiscal"]:checked').val() != undefined && $('[name="aprovafiscal"]:checked').val() != ""))
	{
		$("#navtab3").show();
	}

	//gestor do contrato
	if 	((FORM_MODE != "VIEW" && $('[name="aprovagestor"]').val() != undefined && $('[name="aprovagestor"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="aprovagestor"]:checked').val() != undefined && $('[name="aprovagestor"]:checked').val() != ""))
	{
		$("#navtab4").show();
	}

	//gerencia
	if 	((FORM_MODE != "VIEW" && $('[name="aprovagerencia"]').val() != undefined && $('[name="aprovagerencia"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="aprovagerencia"]:checked').val() != undefined && $('[name="aprovagerencia"]:checked').val() != ""))
	{
		$("#navtab5").show();
	}

	//gestor sebraetec
	if 	((FORM_MODE != "VIEW" && $('[name="aprovasebraetec"]').val() != undefined && $('[name="aprovasebraetec"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="aprovasebraetec"]:checked').val() != undefined && $('[name="aprovasebraetec"]:checked').val() != ""))
	{
		$("#navtab6").show();
	}

	//gestor TIC
	if 	((FORM_MODE != "VIEW" && $('[name="aprovaTIC"]').val() != undefined && $('[name="aprovaTIC"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="aprovaTIC"]:checked').val() != undefined && $('[name="aprovaTIC"]:checked').val() != ""))
	{
		$("#navtab_TIC").show();
	}

	//gestor sgf
	if 	((FORM_MODE != "VIEW" && $('[name="aprovasgf"]').val() != undefined && $('[name="aprovasgf"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="aprovasgf"]:checked').val() != undefined && $('[name="aprovasgf"]:checked').val() != ""))
	{
		$("#navtab7").show();
	}

	//gestor Direx
	if 	((FORM_MODE != "VIEW" && $('[name="aprovadirex"]').val() != undefined && $('[name="aprovadirex"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="aprovadirex"]:checked').val() != undefined && $('[name="aprovadirex"]:checked').val() != ""))
	{
		$("#navtab8").show();
	}

	//gestor finança
	if 	((FORM_MODE != "VIEW" && $('[name="aprovagerentefinanca"]').val() != undefined && $('[name="aprovagerentefinanca"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="aprovagerentefinanca"]:checked').val() != undefined && $('[name="aprovagerentefinanca"]:checked').val() != ""))
	{
		$("#navtab10").show();
	}

	//exporta dados sgf
	if 	((FORM_MODE != "VIEW" && $('[name="rd_fluxoCC"]').val() != undefined && $('[name="rd_fluxoCC"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="rd_fluxoCC"]:checked').val() != undefined && $('[name="rd_fluxoCC"]:checked').val() != ""))
	{
		$("#navtab11").show();
	}


	//gestor finança
	if 	((FORM_MODE != "VIEW" && $('[name="servicoConfirmado"]').val() != undefined && $('[name="servicoConfirmado"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="servicoConfirmado"]:checked').val() != undefined && $('[name="servicoConfirmado"]:checked').val() != ""))
	{
		$("#navtab101").show();
	}

	//reunião de alinhamento
	if 	((FORM_MODE != "VIEW" && $('[name="reuniaoAlinhamento"]').val() != undefined && $('[name="reuniaoAlinhamento"]').val() != "") ||
			(FORM_MODE == "VIEW" && $('[name="reuniaoAlinhamento"]:checked').val() != undefined && $('[name="reuniaoAlinhamento"]:checked').val() != ""))
	{
		$("#navtab_alinhamento").show();
	}


	//Coordenador
	if 	(CURRENT_STATE == VALIDACAO_COORDENADOR){

		$("#navtab12").show();

	}else{

		if($('[name="aprovaCoordenador"]:checked').length > 0 || $('[name="_aprovaCoordenador"]:checked').length > 0){

			$("#navtab12").show();


		}else{
			$("#navtab12").hide();
		}


	}



	//Gerente Regional
	if 	(CURRENT_STATE == VALIDACAO_GERENTE_REGIONAL){

		$("#navtab13").show();

	}else{

		if($('[name="aprovaGerenteRegional"]:checked').length > 0 || $('[name="_aprovaGerenteRegional"]:checked').length > 0){

			$("#navtab13").show();


		}else{
			$("#navtab13").hide();
		}


	}



	//Assessor-GE - Parecer
	if 	(CURRENT_STATE == PARECER_ASSESSOR_GE)
	{
		$("#navtab14").show();
	}else{
		$("#navtab14").hide();
	}


	//exibe fornecedor
	if ($("#txt_forcodcfo").val() != "")
	{
		$("#panel_fornecedor").show();
	}

	if ($("#txtIdContratoRM").val() != "")
	{
		$("#panel_camposRM").show();
	}

	if ($("#codContratacao").val() != "")
	{
		$("#panel_camposSGF").show();
	}


	if ($('[name="reuniaoAlinhamento"]:checked').val() != undefined && $('[name="reuniaoAlinhamento"]:checked').val() != "")
	{
		$("#panel_ata_reuniao").show();
	}

	//exibe painel xperts
	if ($("#solicitacaoXperts").val() != "")
		$("#painel_xperts").show();

	FLUIGC.calendar('.campo-data');

	$(".campo-data" ).change(function() {
		if(this.value != '')
			validateDate($(this));
	});

	$(".mascaraDinheiro").maskMoney(
			{	prefix : '',
				thousands : '.',
				decimal : ',',
				affixesStay : true,
				allowZero : true
			});


	$("#txt_cc" ).blur(function() {
		var prefixo_contrato = "";

		if(this.value == '' || this.value.length != 12)
		{
			$(this).val('');
			prefixo_contrato = "";
			$("#txtNroContrato").val(prefixo_contrato);
		}
		else
		{
			/*var ano = parseInt($("#txt_cc").val().substr(4,4));

		   	if (ano == 2022)
		   		prefixo_contrato = "EE";
		   	else if (ano == 2023)
		   		prefixo_contrato = "FF";
		   	else if (ano == 2024)
		   		prefixo_contrato = "GG";
		   	else if (ano == 2025)
		   		prefixo_contrato = "HH";
		   	else if (ano == 2026)
		   		prefixo_contrato = "II";

		   	prefixo_contrato = prefixo_contrato + "." + $("#txt_cc").val().substr(8,4) + "." +  $("#txt_cc").val().substr(2,2);
			 */

			retornaNrContrato();
		}

		//$("#txtNroContrato").val(prefixo_contrato);
	});


	//quando se trata de uma solicitação xperts executa algumas regras particulares
	if ($("#cnpjFornecedorXperts").val() != "")
	{
		$("#check_instrutoria").show();

		var checkbox = document.getElementById('check_instrutoria');
		checkbox.disabled = true;

		$("#check_Consultoria").prop("checked", true);
	}

	//quando se trata de uma solicitação xperts executa algumas regras particulares
	if ($("#txt_cep").val() != "" && $("#txt_estado").val() == "")
	{
		ConsultaCEP();
	}

	if(CURRENT_STATE == COMPL_CAD_XPERTS_154){
		$('#rd_sistemacontratacaosgf').prop('disabled', true);
		//$('#rd_rodizio').prop('disabled', true);
		$('#rd_rodiciosebraetec').prop('disabled', true);
		$('#rd_continuidade').prop('disabled', true);
	}


	ajustaLabelsAtividadeInterior();
	exibeParecerAssessorGE();

});

function carregaItensMedicaoReceita(nrFluigReceita) {
	let loading = FLUIGC.loading(window);
	loading.show();
	if(nrFluigReceita != "") {

		//limpando informações antes de carregar novamente
		const elements = document.querySelectorAll('.remove-child');
		for (const element of elements) {
			var uuid = $(element).closest("tr")[0].getAttribute("uuid");
			if (uuid != null)
			{
				TABLES.removeGrandchildrenByUUID(uuid);
				TABLES.removeChild(element, $(element)[0].getAttribute("indice"));
			}
		}

		$("#periodoinicial").val("");
		$("#periodofinal").val("");
		$("#data_fim_vigencia").val("");
		$("#txa_objetocontratacao").val("");


		var dt_inicio = "";
		var dt_fim = "";

		//buscando informações do processo de receita
		var consts = new Array();		
		consts.push(DatasetFactory.createConstraint("txt_numsol", $("#txt_fluig_receita").val(), $("#txt_fluig_receita").val(), ConstraintType.MUST));		
		consts.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));		
		var dsReceita = DatasetFactory.getDataset("DSreceita", null, consts, null);

		var objetoContrato_entregas = "";

		if (dsReceita != null && dsReceita.values.length > 0) 
		{

			objetoContrato_entregas =  dsReceita.values[0]['objetoContrato'];

			var consts = new Array();		
			consts.push(DatasetFactory.createConstraint("txt_numsol", $("#txt_fluig_receita").val(), $("#txt_fluig_receita").val(), ConstraintType.MUST));		
			var dsItensReceita = DatasetFactory.getDataset("ds_itens_receita", null, consts, null);

			if (dsItensReceita != null && dsItensReceita.values.length > 0) 
			{
				var idprd = 0;
				var index = 0;

				for (i=0; i< dsItensReceita.values.length; i++)
				{

					if (idprd != dsItensReceita.values[i]['idprd'])
					{
						var filho_dadositens = dsItensReceita.values[i]['filho_dadositens'];

						//adiciona linha pai
						index = adicionaItem();

						var chave_gerada = $("#filho_dadositens_" + index).closest("tr")[0].getAttribute("uuid");
						$("#filho_dadositens___" + index).val(chave_gerada);

						$("#txt_idprd_Filho_" + index).val(dsItensReceita.values[i]['idprd']);
						$("#txt_nomefantasia_Filho_" + index).val(dsItensReceita.values[i]['dsprd']);
						$("#txt_codtb1fat_Filho_" + index).val(dsItensReceita.values[i]['codtb1fat']);
						$("#txt_codigoprd_Filho_" + index).val(""); // ???
						window["txt_produto_Filho_" + index].setValue(dsItensReceita.values[i]['dsprd']);

						$("#txt_naturezaitem_Filho_" + index).val(""); // ??? DE ACORDO COM ANALISE FEITA, ESTE CAMPO NÃO É UTILIZADO EM LUGAR ALGUM
						$("#txt_descnaturezaitem_Filho_" + index).val(""); // ??? DE ACORDO COM ANALISE FEITA, ESTE CAMPO NÃO É UTILIZADO EM LUGAR ALGUM
						$("#sel_inciso_Filho_" + index).val(""); // ???

						$("#txt_quantidade_Filho_" + index).val(dsItensReceita.values[i]['vlquantidade']);
						$("#txt_valor_Filho_" + index).val(dsItensReceita.values[i]['vlprd']);

						$("#txt_valor_real_Filho_" + index).val(dsItensReceita.values[i]['vlsubtotal']);
						$("#txt_totallinha_Filho_" + index).val(dsItensReceita.values[i]['vlsubtotal']);



						//buscando medições
						var consts = new Array();		
						consts.push(DatasetFactory.createConstraint("txt_numsol", $("#txt_fluig_receita").val(), $("#txt_fluig_receita").val(), ConstraintType.MUST));		
						consts.push(DatasetFactory.createConstraint("filho_dadositens", filho_dadositens, $("#txt_fluig_receita").val(), ConstraintType.MUST));		
						var dsMedicoesReceita = DatasetFactory.getDataset("ds_itens_medicao_receita", null, consts, null);filho_dadositens

						if (dsMedicoesReceita != null && dsMedicoesReceita.values.length > 0) 
						{
							//var qtd_medicoes = 0;
							for (j=0; j< dsMedicoesReceita.values.length; j++){

								var idx_neto = TABLES.addTableGrandchildRow(chave_gerada);
								//qtd_medicoes ++;

								$("#vl_nr_entrega_medicao_item_Neto_" + idx_neto).val(dsMedicoesReceita.values[j]['vlEntrega']);
								$("#dt_medicao_item_Neto_" + idx_neto).val(dsMedicoesReceita.values[j]['dtmedicao']);
								$("#vl_medicao_item_Neto_" + idx_neto).val(dsMedicoesReceita.values[j]['vlmedicao']);
								$("#ds_descricao_entrega_item_Neto_" + idx_neto).val(dsMedicoesReceita.values[j]['dsDescricaoEntrega']);



								//registrando 1a data das medições (inicio)
								if (dt_inicio == "")
									dt_inicio = dsMedicoesReceita.values[j]['dtmedicao'];	

								dt_fim = dsMedicoesReceita.values[j]['dtmedicao'];

								objetoContrato_entregas = objetoContrato_entregas + "\n " + dsMedicoesReceita.values[j]['dsDescricaoEntrega'];


							}
						}
					}		

				}

				//guardando datas
				$("#periodoinicial").val(dt_inicio);
				$("#periodofinal").val(dt_fim);
				atualizaDataVigencia($("#periodofinal").val());
			}

			$("#txa_objetocontratacao").val(objetoContrato_entregas);

			$(".money-mask").unmask();
			$(".money-mask").mask("#.###.##0,00", { reverse : true });
		}
	}

	calculaTotalItens();
	loading.hide();
}


function adicionaItem()
{
	var index = TABLES.appendChild("dadositens");

	$(".money-mask").maskMoney(
			{	prefix : '',
				thousands : '.',
				decimal : ',',
				affixesStay : true,
				allowZero : true
			});

	$(".consultaSaldo" ).show();


	ZOOMS.executeQuandoPronto("zoom_fiscal_contrato", function(){
		reloadZoomFilterValues("zoom_fiscal_contrato", "ds_funcao,analista");
	});

	ZOOMS.executeQuandoPronto("zoom_gestor_contrato", function(){
		reloadZoomFilterValues("zoom_gestor_contrato", "ds_funcao,gerente");
	});	

	return index;
}


function retornaNrContrato()
{
	var ano = parseInt($("#txt_cc").val().substr(4,4));
	var prefixo_contrato = "";

	if (ano == 2022)
		prefixo_contrato = "EE";
	else if (ano == 2023)
		prefixo_contrato = "FF";
	else if (ano == 2024)
		prefixo_contrato = "GG";
	else if (ano == 2025)
		prefixo_contrato = "HH";
	else if (ano == 2026)
		prefixo_contrato = "II";

	prefixo_contrato = prefixo_contrato + "." + $("#txt_cc").val().substr(8,4) + "." +  $("#txt_cc").val().substr(2,2);

	$("#txtNroContrato").val(prefixo_contrato);

}


function ocultaDivFormaContratacao()
{
	var value = $('[name="rd_sistemacontratacao"]:checked').val();

	if (value == undefined || value == "sgc")
	{
		$("#div_tipo_contratacao").hide();
		$('[name="rd_formacontratacao"]').prop("checked", false);
	}
	else
		$("#div_tipo_contratacao").show();
}

function ocultaDivFluigReceita()
{
	var value = $('[name="rd_sistemareceita"]:checked').val();

	if (value == undefined || value == "nao")
	{
		$("#div_nro_receita").hide();
	}
	else
	{
		$("#div_nro_receita").show();
	}
}


//prepara matriculas para a atividade de aprovação fiscal / comitê
function preparaMatriculasAprovacaoFiscal()
{
	var strMatriculas = "";
	var strEnviaAprovacaoFiscal = "não";

	if($("#localidade").val() == "SEDE"){
		if ($("#usuario_fiscal_contrato").val() != "" && $("#usuario_fiscal_contrato").val()!= getUser() && $("#usuario_fiscal_contrato").val() != $("#matriculaGestor").val())
		{
			strMatriculas = $("#usuario_fiscal_contrato").val();
			strEnviaAprovacaoFiscal = "sim";
		}
		
		if ($("#usuario_gestor_contrato").val() != "" && $("#usuario_gestor_contrato").val()!= getUser() && $("#usuario_gestor_contrato").val() != $("#matriculaGestor").val())
		{
			if (strMatriculas != "")
				strMatriculas = strMatriculas + ",";
	
			strMatriculas = strMatriculas + $("#usuario_gestor_contrato").val();
			strEnviaAprovacaoFiscal = "sim";
		}
			
	}else if($("#localidade").val() == "INTERIOR"){
		if ($("#usuario_fiscal_contrato").val() != "" && $("#usuario_fiscal_contrato").val()!= getUser() && $("#usuario_fiscal_contrato").val() != $("#matriculaGestor").val()
			&& $("#usuario_gestor_contrato").val() != $("#idCoordenador").val())
		{
			strMatriculas = $("#usuario_fiscal_contrato").val();
			strEnviaAprovacaoFiscal = "sim";
		}
			
		if ($("#usuario_gestor_contrato").val() != "" && $("#usuario_gestor_contrato").val()!= getUser() && $("#usuario_gestor_contrato").val() != $("#matriculaGestor").val()
		&& $("#usuario_gestor_contrato").val() != $("#idCoordenador").val())
		{
			if (strMatriculas != "")
				strMatriculas = strMatriculas + ",";
	
			strMatriculas = strMatriculas + $("#usuario_gestor_contrato").val();
			strEnviaAprovacaoFiscal = "sim";
		}
	}
	
	$("#matriculas_aprovacao_fiscal").val(strMatriculas);
	$("#envia_aprovacao_fiscal").val(strEnviaAprovacaoFiscal);
}




function buscaCPFPorLogin(login, campoCPF) {
	DatasetFactory.getDataset("ds_dados_usuario_RM", [ login ], null, null, {
		success : function(data) {
			if(data != null && data.values.length > 0) {
				$("#" + campoCPF).val(data.values[0].CPF);
				$("#" + campoCPF).mask("999.999.999-99");
			} else { 
				console.error("Nenhum registro encontrado no RM para o login " + login);
			}
		}, error: function(err) {
			console.error("Erro ao buscar o CPF: ", err);
		}
	});
}

function getSetor() {

	// --------------------------------------------------------------------------------------------
	// FUNCTION DE RETORNO DOS DADOS DE SUPERIORES DE TERCEIROS
	// DEV: GILSON CARVALHO
	// --------------------------------------------------------------------------------------------

	if ($("#GestorContratacao").val() == 'undefined'){

		var matricula = $("#txt_wkUser").val();
		var consts = new Array();		
		consts.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST));		
		var dsColleagueSolicitante = DatasetFactory.getDataset("colleague", null, consts, null);
		if (dsColleagueSolicitante != null && dsColleagueSolicitante.values.length > 0) {
			var loginSolicitante = dsColleagueSolicitante.values[0]['login'];
		}
		
		var consts = new Array();		
		consts.push(DatasetFactory.createConstraint("CHAVEFLUIG_PRESTADOR", matricula, matricula, ConstraintType.MUST));		
		var dataset = DatasetFactory.getDataset("dsTerceirizado", null, consts, null);

		if (dataset != null &&  dataset.values != undefined) {
			if(dataset.values.length > 0) {
				$("#unidadeDemandante").val(dataset.values[0]["NOMESECAO_GERENTE"]);
				var codSuperior = dataset.values[0]['LOGIN_GERENTE'];
				$("#localidade").val('SEDE');

				if (codSuperior == loginSolicitante) {
					codSuperior = dataset.values[0]['CODDIRETOR'];
				}

				var dsGestor = DatasetFactory.getDataset('ds_consultaDadosUsuario_novoTBC', [codSuperior], null, null);		
				if (dsGestor != null && dsGestor.values.length > 0) 
				{

					var loginCoordenador = dsGestor.values[0]['LOGIN_COORDENADOR'];
					$("#loginCoordenador").val(loginCoordenador);
					$("#matriculaGestor").val(getMatriculaFluig(loginCoordenador));	
					$('#GestorContratacao').val(dsGestor.values[0]['NOME_COORDENADOR']);	
				}

				var datasetDiretor = DatasetFactory.getDataset("ds_dados_usuario_RM", new Array(codSuperior), null, null);
				if (datasetDiretor != null &&  datasetDiretor.values != undefined) 
				{
					if(datasetDiretor.values.length > 0)
					{
						var loginDiretor = datasetDiretor.values[0]['CODDIRETOR']
						$("#loginDiretor").val(loginDiretor);
						$("#nomeDiretor").val(datasetDiretor.values[0]['NOME']);
						$("#idDiretor").val(getMatriculaFluig(loginDiretor));
					}
				}
			}
		}
	}	
}

//Retorna o chave fluig
function getMatriculaFluig(login){
	var dsColleagues = null;	
	var c1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("login", login, login, ConstraintType.MUST);
	dsColleagues = DatasetFactory.getDataset("colleague", null, new Array(c1, c2), null);
	
	if (dsColleagues != null && dsColleagues.values.length > 0) 
	{		
		return dsColleagues.values[0]['colleaguePK.colleagueId'];
	}	
	return null;
}


function addCc(){
	var index = wdkAddChild("centroDeCusto");
}



var controlaLinhaNeto = 0;

function addFilho(tabela){
	
	linhaEtapa = wdkAddChild(tabela);
	
	
	if (tabela == "tb_etapaFichaTecnica"){
		reloadZoomFilterValues("txt_etapas___"+linhaEtapa, "documentoid,"+idFormulario);
		

		if(controlaLinhaNeto == 0){ //vagner
			
			adicionaItem();
			
			window["txt_produto_Filho_1"].setValue('Consultoria em Sustentabilidade');
			window["zoom_tipo_faturamento_Filho_1"].setValue('001 - Consultoria'); 
			$('#txt_codtb1fat_Filho_1').val('03.02.34');
			$("#txt_idprd_Filho_1").val('43519');
			$("#txt_codigoprd_Filho_1").val('02.03.0193');
			$('#txt_quantidade_Filho_1').val($('#txt_qtdHorasSebraeTec').val());
			$('#txt_quantidade_Filho_1').prop('readonly', true);
			$('#txt_valor_Filho_1').prop('readonly', true);
			$('#txt_valor_Filho_1').val($('#txt_valorHoraSebraetec').val());
			$('#btNovoItem').prop('disabled', true);			
			$('#txt_totallinha_Filho_1').val( $('#txt_valorTotalSebraeTec').val() );
			
			$('.addMedicao').prop('disabled', true);
			$('.sgfInativo').prop('readonly', true);
			$('.sgfInativo').prop('readonly', true);
			
			
			
			calculaSubTotal('txt_valor');
			
			
			controlaLinhaNeto ++;
		}
	
		
	}
	
	
	if(tabela == "tb_EntregaFichaTecnica"){
		reloadZoomFilterValues("txt_entregas___"+linhaEtapa, "documentoid,"+idFormulario);		
		
	}
	
	
}





function addObs(tb)
{

	var index = wdkAddChild(tb);


	if (tb == "tb_obsfiscal")
	{
		$("#dt_fiscal___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}
	else if (tb == "tb_obsCoordenador")
	{
		$("#dt_coordenador___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}
	else if (tb == "tb_obsGerenteRegional")
	{
		$("#dt_gerenteRegional___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}
	else if (tb == "tb_obsgerencia")
	{
		$("#dt_gerenciaDemandante___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}
	else if (tb == "tb_obsSebraeTec")
	{
		$("#dt_SebraeTec___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}
	else if (tb == "tb_obssgf")
	{
		$("#dt_sgf___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}
	else if (tb == "tb_obsDirex")
	{
		$("#dt_direx___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}
	else if (tb == "tb_obsGerenciaFinanca")
	{
		$("#dt_GerenciaFinanca___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}
	else if (tb == "tb_obsDemandante2")
	{
		$("#obs_data___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}
	else if (tb == "tb_obsSebraeTec")
	{
		$("#dt_SebraeTec___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}

	else if (tb == "tb_obsTIC")
	{
		$("#dt_TIC___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}

	else if (tb == "tb_obsConfServico")
	{
		$("#dt_ConfServico___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}

	else if (tb == "tb_obsAta")
	{
		$("#dt_Ata___" + index).val(moment(new Date()).format("DD/MM/YYYY"));
	}


}




function fnCustomDelete(oElement)
{
	fnWdkRemoveChild(oElement);
	calculaTotalItens();

}


function removeFilho(oElement) {
    let objeto = oElement.id;
    let tabela = objeto.split('___')[0];
    let index  = objeto.split('___')[1]; // ex: 4

    if (tabela == "del_tbEntregasSolucao") {

        fnWdkRemoveChild(oElement);
        calculaTotalSebraeTec();

    } else if (tabela == 'del_EntregaFichaTecnica') {
        
        // Remove a linha do filho
        fnWdkRemoveChild(oElement);

        // Procura a linha neta com o mesmo índice
        let $linhaNeto = $(".remove-grandchild[indice='" + index + "']");
        
        if ($linhaNeto.length) {
            // passa o <i> para o Fluig remover corretamente a linha neta
            fnWdkRemoveChild($linhaNeto[0]);
        }

    } else {

        fnWdkRemoveChild(oElement);

    }
}




function setSelectedZoomItem(selectedItem) {

	var index = selectedItem.inputId.split("___")[1];
	var campo = selectedItem.inputId.split("___")[0];

	if(campo == "txt_fornecedor")
	{			
		var endereco = "";
		var rua = selectedItem.RUA;
		var tipoRua = selectedItem.TIPORUA;
		rua = rua.replace(/(  )+/g, '');

		var digitoconta = selectedItem.DIGITOCONTA;
		var digitoagencia = selectedItem.DIGITOAGENCIA;
		var descricaoCTA = selectedItem.CTADESCRICAO;
		var formaPagamento = selectedItem.FORMAPAGAMENTO;
		var numeroBanco = selectedItem.NUMEROBANCO;
		var codigoAgencia = selectedItem.CODIGOAGENCIA;
		var codigoConta = selectedItem.CONTACORRENTE;

		if (descricaoCTA == null || descricaoCTA == '' || descricaoCTA == 'undefined' || descricaoCTA == undefined){
			descricaoCTA = '';
		}
		if (formaPagamento == null || formaPagamento == '' || formaPagamento == 'undefined' || formaPagamento == undefined){
			formaPagamento = '';
		}
		if (numeroBanco == null || numeroBanco == '' || numeroBanco == 'undefined' || numeroBanco == undefined){
			numeroBanco = '';
		}
		if (codigoAgencia == null || codigoAgencia == '' || codigoAgencia == 'undefined' || codigoAgencia == undefined){
			codigoAgencia = '';
		}
		if (codigoConta == null || codigoConta == '' || codigoConta == 'undefined' || codigoConta == undefined){
			codigoConta = '';
		}
		if (digitoconta == null || digitoconta == '' || digitoconta == 'undefined' || digitoconta == undefined){
			digitoconta = '';
		}
		if (digitoagencia == null || digitoagencia == '' || digitoagencia == 'undefined' || digitoagencia == undefined){
			digitoagencia = '';
		}						

		if(selectedItem.TIPORUA != null && selectedItem.TIPORUA != ""){				
			tipoRua = tipoRua.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
			endereco = endereco + tipoRua + " ";
		}
		if(selectedItem.RUA != null && selectedItem.RUA != ""){
			endereco = endereco + rua;
		}else{
			endereco = endereco + "Sem rua cadastrada";
		}
		if(selectedItem.NUMERO != null && selectedItem.NUMERO != ""){
			endereco = endereco + ", " + selectedItem.NUMERO;
		}
		if(selectedItem.BAIRRO != null && selectedItem.BAIRRO != ""){
			endereco = endereco + ", " + selectedItem.BAIRRO;
		}
		if(selectedItem.CIDADE != null && selectedItem.CIDADE != ""){
			endereco = endereco + ", " + selectedItem.CIDADE;
		}
		if(selectedItem.CODETD != null && selectedItem.CODETD != ""){
			endereco = endereco + ", " + selectedItem.CODETD;
		}
		if(selectedItem.CEP != null && selectedItem.CEP != ""){
			endereco = endereco + " - " + selectedItem.CEP;
		}

		if(selectedItem.FORMAPAGAMENTO == 'D'){
			formaPagamento = 'DOC (Comp)';
		}
		if(selectedItem.FORMAPAGAMENTO == 'T'){
			formaPagamento = 'Crédito em Conta Corrente no mesmo Banco';
		}
		if(selectedItem.FORMAPAGAMENTO == 'C'){
			formaPagamento = 'Cheque Administrativo';
		}
		if(selectedItem.FORMAPAGAMENTO == 'I'){
			formaPagamento = 'Título de Cobrança (Boleto)';
		}
		if(selectedItem.FORMAPAGAMENTO == 'N'){
			formaPagamento = 'Pagamento Eletrônico a Concessionários';
		}
		if(selectedItem.FORMAPAGAMENTO == 'P'){
			formaPagamento = 'Crédito em Conta de Poupança';
		}
		if(selectedItem.FORMAPAGAMENTO == 'R'){
			formaPagamento = 'Ordem de Pagamento à disposição';
		}
		if(selectedItem.FORMAPAGAMENTO == 'X'){
			formaPagamento = 'Crédito em Conta Real Time';
		}
		if(selectedItem.FORMAPAGAMENTO == 'Y'){
			formaPagamento = 'TED CIP';
		}
		if(selectedItem.FORMAPAGAMENTO == 'Z'){
			formaPagamento = 'TED STR';
		}
		if(selectedItem.FORMAPAGAMENTO == 'A'){
			formaPagamento = 'DARF';
		}
		if(selectedItem.FORMAPAGAMENTO == 'G'){
			formaPagamento = 'GPS';
		}
		if(selectedItem.FORMAPAGAMENTO == 'E'){
			formaPagamento = 'Débito Automático';
		}
		if(selectedItem.FORMAPAGAMENTO == 'M'){
			formaPagamento = 'Crédito em Conta Corrente de Mesma Titularidade';
		}
		if(selectedItem.FORMAPAGAMENTO == 'B'){
			formaPagamento = 'IPTU/ISS/Outros Tributos Municipais';
		}
		if(selectedItem.FORMAPAGAMENTO == 'F'){
			formaPagamento = 'DARJ';
		}
		if(selectedItem.FORMAPAGAMENTO == 'J'){
			formaPagamento = 'GARE - SP ICMS';
		}
		if(selectedItem.FORMAPAGAMENTO == 'L'){
			formaPagamento = 'FGTS - GFIP';
		}
		if(selectedItem.FORMAPAGAMENTO == 'O'){
			formaPagamento = 'GNRE e Tributos Estaduais c/ Cód. Barras';
		}

		$('#txt_forcodcfo').val(selectedItem.CODCFO);
		$('#txt_fornomefantasia').val(selectedItem.NOMEFANTASIA);
		$('#txt_fornome').val(selectedItem.NOME);
		$('#razaoSocialFornecedor').val(selectedItem.NOME);
		$('#cnpjFornecedor').val(selectedItem.CGCCFO);
		$('#emailFornecedor').val(selectedItem.EMAIL);
		$('#txt_porte').val(selectedItem.PORTE);
		$('#txt_porte_id').val(selectedItem.PORTE2);
		$('#txt_fornecEnderecoVenc').val(endereco);
		$('#txt_descCtaBancariaVenc').val(descricaoCTA);
		$('#txt_formaPagtoVenc').val(formaPagamento);		
		$('#txt_fornecBancoVenc').val(numeroBanco);
		$('#txt_fornecAgenciaVenc').val(codigoAgencia + "-" + digitoagencia);
		$('#txt_fornecContaVenc').val(codigoConta + "-" + digitoconta);			
		window['txt_fornecedor'].setValue(selectedItem.NOMEFANTASIA);
	}


	else if (campo == "txt_produto_SAS") 
	{	
		$('#txt_idprd_SAS').val(selectedItem.CODIGO);
		$('#txt_nomeprd_SAS').val(selectedItem.NOME);
		window['txt_produto_SAS'].setValue(selectedItem.CODIGO + ' - ' + selectedItem.NOME);
	}

	else if(campo == "zoom_tipo_faturamento_contrato")
	{	
		$('#txt_CODTIP_contrato').val(selectedItem.CODIGO);		
	}

	else if(campo == "txt_projeto")
	{
		$('#txt_codprojeto___'+index).val(selectedItem.CODIGO);
		$('#txt_nomeprojeto___'+index).val(selectedItem.NOME);

		window["txt_projeto___"+index].setValue(selectedItem.NOME);
		atualizaZoomFilterAcao(selectedItem.CODIGO,index);
	}

	else if(campo == "txt_acao")
	{
		$('#txt_codacao___'+index).val(selectedItem.CODIGO);
		$('#txt_nomeacao___'+index).val(selectedItem.NOME);
		window["txt_acao___"+index].setValue(selectedItem.NOME);

		var codProjeto = $('#txt_codprojeto___'+index).val();
		atualizaZoomFilterRecursos(codProjeto, selectedItem.CODIGO,index);
		atualizaSaldo(codProjeto,selectedItem.CODIGO,index);
	}

	else if(campo == "txt_recursos")
	{
		$('#txt_codrecurso___'+index).val(selectedItem.CODIGO);
		$('#txt_nomerecurso___'+index).val(selectedItem.NOME);
		window['txt_recursos___'+index].setValue(selectedItem.NOME);
	}

	else if (selectedItem.inputId.startsWith("txt_produto_Filho")) 
	{	
		var index = selectedItem.inputId.split("_Filho_")[1];

		//if (!verificaDuplicidadeTabela("tbody_dadositens", "txt_idprd", selectedItem.IDPRD, selectedItem.inputId))
		//{	
			$('#txt_idprd_Filho_'+index).val(selectedItem.IDPRD);
			$('#txt_nomefantasia_Filho_'+index).val(selectedItem.NOMEFANTASIA);
			$('#txt_codtb1fat_Filho_'+index).val(selectedItem.CODTB1FAT);
			$('#txt_codtb1fat_Filho_'+index).val(selectedItem.CODTB1FAT);
			$('#txt_codigoprd_Filho_'+index).val(selectedItem.CODIGOPRD);
			$('#txt_naturezaitem_Filho_'+index).val(selectedItem.CODTB1FAT);
			$('#txt_descnaturezaitem_Filho_'+index).val(selectedItem.DESCRICAO);

			window['txt_produto_Filho_'+index].setValue(selectedItem.NOMEFANTASIA);

			if (selectedItem.NOMEFANTASIA.toString().toLowerCase().indexOf("consultoria") != -1)
			{
				$('#txt_CODTIP_Filho_'+index).val("001");
				window['zoom_tipo_faturamento_Filho_'+index].setValue("001 - Consultoria");

				AjustaTipoFaturamento();
			}
			else if (selectedItem.NOMEFANTASIA.toString().toLowerCase().indexOf("instrutoria") != -1)
			{
				$('#txt_CODTIP_Filho_'+index).val("013");
				window['zoom_tipo_faturamento_Filho_'+index].setValue("013 - Instrutoria");

				AjustaTipoFaturamento();
			}

		//}
	}

	else if (selectedItem.inputId.startsWith("zoom_tipo_faturamento_Filho")) 
	{	
		var index = selectedItem.inputId.split("_Filho_")[1];
		$('#txt_CODTIP_Filho_'+index).val(selectedItem.CODIGO);

		AjustaTipoFaturamento();
	}

	else if(selectedItem.inputId == "zoom_fiscal_contrato"){	
		$("#usuario_fiscal_contrato").val(selectedItem.colleagueId);
		preparaMatriculasAprovacaoFiscal();

		buscaCPFPorLogin(selectedItem.login, "cpf_usuario_fiscal_contrato");
		$("#usuario_fiscal_contrato_RM").val(retornaUsuarioRM($("#usuario_fiscal_contrato").val()));
	}
	else if(selectedItem.inputId == "zoom_gestor_contrato"){	
		$("#usuario_gestor_contrato").val(selectedItem.colleagueId);
		preparaMatriculasAprovacaoFiscal();
		buscaCPFPorLogin(selectedItem.login, "cpf_usuario_gestor_contrato");
		$("#usuario_gestor_contrato_RM").val(retornaUsuarioRM($("#usuario_gestor_contrato").val()));
	}

	else if(selectedItem.inputName == "z_area"){

		$("#areaContratacao").val(selectedItem.idArea);

		reloadZoomFilterValues("z_subarea", "IdArea,"+selectedItem["idArea"]);
	}
	else if(selectedItem.inputName == "z_subarea"){


		$("#subAreaContratacao").val(selectedItem.idSubArea);
	}

	else if(selectedItem.inputId == "zoom_tcu_cat_obj")
	{	
		$('#txt_tcu_cat_obj').val(selectedItem.CODIGO);		
	}

	else if(selectedItem.inputId == "zoom_tcu_cri_jul")
	{	
		$('#txt_tcu_cri_jul').val(selectedItem.CODIGO);		
	}

	else if(selectedItem.inputId == "zoom_tcu_fas_obr")
	{	
		$('#txt_tcu_fas_obr').val(selectedItem.CODIGO);		
	}

	else if(selectedItem.inputId == "zoom_tcu_gra_obr")
	{	
		$('#txt_tcu_gra_obr').val(selectedItem.CODIGO);		
	}

	else if(selectedItem.inputId == "zoom_tcu_nat_obj")
	{	
		$('#txt_tcu_nat_obj').val(selectedItem.CODIGO);		
	}
	else if(selectedItem.inputId == "txt_fichaSebraeTec")
	{	
		
		idFormulario = selectedItem.documentid;
		codFichaSolicitando = selectedItem.txt_codigoFichaTecnica;
		
		
		$('#txt_hiddenCodigoFicha').val(selectedItem.txt_codigoFichaTecnica);
		var precomaximo = selectedItem.txt_precoMaximo;
		var natureza = selectedItem.select_natureza;
		var codigoFicha = selectedItem.txt_codigoFichaTecnica;
		var tipo = selectedItem.select_solucao;
		var area = selectedItem.z_area;
		var subArea = selectedItem.z_subarea;
		precoMaximodaFicha = precomaximo;
		
				
		$('#ta_detalhesFicha').val('NATUREZA DA CONTRATAÇÃO: ' + natureza + '\n'
		+'CÓDIGO DA FICHA: ' + codigoFicha + '\n'
		+'TIPO DE SOLUÇÃO: ' + tipo + '\n'
		+'PREÇO MÁXIMO: ' + precomaximo + '\n'
		+'ÁREA: ' + area + '\n'
		+'SUBAREA: ' + subArea
		
		);	
		mostraFormSebraetec();	
		
	}else if (selectedItem.inputId.startsWith("txt_etapas")) {

	    // pega o valor atual do textarea
	    var objetoOriginal = $('#txa_objetocontratacao').val().trim();

	    // pega os valores do zoom
	    var descritivo = selectedItem.ta_detalheEtapas || "";
	    var txt_etapas = selectedItem.txt_etapas || "";

	    // monta a linha formatada
	    var novaLinha = txt_etapas + " - " + descritivo;

	    // se já existe algo no campo, adiciona quebra de linha antes
	    if (objetoOriginal !== "") {
	        $('#txa_objetocontratacao').val(objetoOriginal + "\n \n" + novaLinha);
	    } else {
	        $('#txa_objetocontratacao').val(novaLinha);
	    }
	}else if(selectedItem.inputId.startsWith("txt_entregas")){
		
		
		var index = selectedItem.inputId.split("___")[1];
		console.log('>>>>>>>>>>>>> ' + index + '>>>>>>>>>>>>>>>>>>>>>>>>>' + selectedItem.ta_entregaSolucao);
			
		$('#hidden_ta_detalheEtapas___'+index).val(selectedItem.ta_entregaSolucao);
	}

	

	//bloqueiaCamposDataInicioFim();   txt_fichaSebraeTecEntregas

}

var objetoOriginal="";
function removedZoomItem(removedItem) {


	if(removedItem.inputId == "txt_fornecedor"){
		$('#txt_forcodcfo').val("");
		$('#txt_fornomefantasia').val("");
		$('#txt_fornome').val("");
		$('#cnpjFornecedor').val("");
		$('#razaoSocialFornecedor').val("");
		$('#emailFornecedor').val("");
		$('#txt_porte').val("");
		$('#txt_porte_id').val("");
		$('#txt_fornecEnderecoVenc').val("");
		$('#txt_descCtaBancariaVenc').val("");
		$('#txt_formaPagtoVenc').val("");
		$('#txt_fornecBancoVenc').val("");
		$('#txt_fornecAgenciaVenc').val("");
		$('#txt_fornecContaVenc').val("");
	}

	if(removedItem.inputId == "zoom_tipo_faturamento_contrato")
	{	
		$('#txt_CODTIP_contrato').val("");		
	}

	else if (removedItem.inputId == "txt_produto_SAS") 
	{	
		$('#txt_idprd_SAS').val("");
		$('#txt_nomeprd_SAS').val("");
	}

	else if(removedItem.inputId == "z_area"){

		$("#areaContratacao").val("");
		window["z_subarea"].clear();
		reloadZoomFilterValues("z_subarea", "IdArea,999");
	}

	else if(removedItem.inputName == "z_subarea"){

		$("#subAreaContratacao").val("");
	}

	else if (removedItem.inputId.startsWith("txt_produto"))
	{
		var index = removedItem.inputId.split("_Filho_")[1];

		$('#txt_idprd_Filho_'+index).val("");
		$('#txt_nomefantasia_Filho_'+index).val("");
		$('#txt_codtb1fa_Filho_'+index).val("");
		$('#txt_codigoprd_Filho_'+index).val("");
		$('#txt_naturezaitem_Filho_'+index).val("");
		$('#txt_descnaturezaitem_Filho_'+index).val("");
		$('#txt_CODTIP_Filho_'+index).val("");
		window['zoom_tipo_faturamento_Filho_'+index].clear();

		calculaTotalItens();

		AjustaTipoFaturamento();
	}

	if (removedItem.inputId.startsWith("zoom_tipo_faturamento_Filho")) 
	{	
		var index = removedItem.inputId.split("_Filho_")[1];
		$('#txt_CODTIP_Filho_'+index).val("");

		AjustaTipoFaturamento();
	}

	else if(removedItem.inputId.startsWith("txt_projeto"))
	{
		var index = removedItem.inputId.split("___")[1];

		$('#txt_codprojeto___'+index).val("");
		$('#txt_nomeprojeto___'+index).val("");
		$('#txt_saldo___'+index).val("");

		$('#txt_codacao___'+index).val("");
		$('#txt_nomeacao___'+index).val("");
		window['txt_acao___'+index].clear();
		atualizaZoomFilterAcao("",index);

		$('#txt_codrecurso___'+index).val("");
		$('#txt_nomerecurso___'+index).val("");
		window['txt_recursos___'+index].clear();
		atualizaZoomFilterRecursos("","",index);
	}
	else if(removedItem.inputId.startsWith("txt_acao"))	
	{
		var index = removedItem.inputId.split("___")[1];

		$('#txt_codacao___'+index).val("");
		$('#txt_nomeacao___'+index).val("");
		$('#txt_saldo___'+index).val("");

		$('#txt_codrecurso___'+index).val("");
		$('#txt_nomerecurso___'+index).val("");
		window['txt_recursos___'+index].clear();
		atualizaZoomFilterRecursos("","",index);
	}
	else if(removedItem.inputId.startsWith("txt_recursos"))	
	{
		var index = removedItem.inputId.split("___")[1];

		$('#txt_codrecurso___'+index).val("");
		$('#txt_nomerecurso___'+index).val("");
	}
	else if(removedItem.inputId == "zoom_fiscal_contrato"){	
		$("#usuario_fiscal_contrato").val("");
		preparaMatriculasAprovacaoFiscal();
		$("#usuario_fiscal_contrato_RM").val("");
	}

	else if(removedItem.inputId == "zoom_gestor_contrato"){	
		$("#usuario_gestor_contrato").val("");
		preparaMatriculasAprovacaoFiscal();
		$("#usuario_gestor_contrato_RM").val("");
	}

	else if(removedItem.inputId == "zoom_tcu_cat_obj")
	{	
		$('#txt_tcu_cat_obj').val("");	
	}

	else if(removedItem.inputId == "zoom_tcu_cri_jul")
	{	
		$('#txt_tcu_cri_jul').val("");
	}

	else if(removedItem.inputId == "zoom_tcu_fas_obr")
	{	
		$('#txt_tcu_fas_obr').val("");	
	}

	else if(removedItem.inputId == "zoom_tcu_gra_obr")
	{	
		$('#txt_tcu_gra_obr').val("");		
	}

	else if(removedItem.inputId == "zoom_tcu_nat_obj")
	{	
		$('#txt_tcu_nat_obj').val("");		
	}
	else if(removedItem.inputId == "txt_fichaSebraeTec");
	
	{	
		$('#ta_detalhesFicha').val('');
		$('#txt_nomeClienteRecorrente').val('');
		$('#txt_cnpjCpfRecorrente').val('');
		$('#txt_codParceiroRecorrente').val('');
		$('#txt_tipoParceiroRecorrente').val('');
//		$('#percentualDesconto').text('');
//		$('#percentualDesconto').hide();
		
		ocultarSpanSubsidio();
		removerLinhasTabela('tb_recorrenciaFicha');
		
		idFormulario ="";
	}


}

function atualizaSaldo(projeto,acao,index)
{
	var saldo = 0;
	var codcusto = projeto + "." + acao;
	var data_termino = $('#periodofinal').val();
	var mes = data_termino.substring(3,5);
	var ano = data_termino.substring(6,10);

	var dataset = DatasetFactory.getDataset("ds_consulta_saldo_ccusto_RM", new Array(codcusto,mes,ano), null, null);
	var saldoFinal = 0;

	if (dataset != null &&  dataset.values != undefined) 
	{
		if(dataset.values.length > 0){

			saldo = dataset.values[0]['SALDO'];
			saldoFinal = parseFloat(saldo);
			saldoFinal = saldoFinal.toFixed(2);
			saldoFinal = saldoFinal.toString().replace(".",",");
		}
	}

	$('#txt_saldo___'+index).val(saldoFinal);	
}

function AtualizaSaldosOrcamento()
{
	var loading = FLUIGC.loading(window);
	loading.show();

	var index = 0;
	var codProjeto = 0;
	var codAcao = 0;

	$.each($("input[name*='txt_codprojeto_']"), function() {
		index = $(this).prop("name").split("_").slice(-1)[0];

		codProjeto = $('#txt_codprojeto___'+index).val();
		codAcao = $('#txt_codacao___'+index).val();

		atualizaSaldo(codProjeto, codAcao, index);

		//console.log("AtualizaSaldosOrçamento"+codProjeto+ "-" +codAcao);


	});

	loading.hide();

}

function AjustaTipoFaturamento()
{
	setInterval(function(){

		let retorno = true;
		let aux = "";
		let aux_descricao = "";
		let indice = 0;

		$('#txt_CODTIP_contrato').val("");
		window['zoom_tipo_faturamento_contrato'].setValue("xxxxxxxxxxxxxx");

		$.each($("input[name*='txt_CODTIP_']"), function() {

			if ($(this).prop("name") != "txt_CODTIP_contrato")
			{
				if (aux == "")
				{
					aux = $(this).val();
					indice = $(this).prop("id").split("___")[1];
					aux_descricao = $("#zoom_tipo_faturamento___" + indice).text();
				}

				if (aux != $(this).val())
					retorno = false;
			}

		});

		if (retorno)
		{
			$('#txt_CODTIP_contrato').val(aux);
			window['zoom_tipo_faturamento_contrato'].setValue(aux_descricao);
		}
		else
		{
			$('#txt_CODTIP_contrato').val("40");
			window['zoom_tipo_faturamento_contrato'].setValue("Consultoria/Instrutoria");
		}


	}, 3000); 
}



function ConsultaCEP(){


	$.getJSON("//viacep.com.br/ws/"+$("#txt_cep").val()+"/json/",function(dados){

		if(dados.logradouro == "" || dados.logradouro == null){

			FLUIGC.toast({
				title: 'Oops: ',
				message: 'CEP inválido ou não existe na base de dados, por favor, preencha o endereço manualmente!',
				type: 'danger'
			});
			$("#txt_estado").attr("readonly",false);
			$("#txt_cidade").attr("readonly",false);
			$("#txt_bairro").attr("readonly",false);
			$("#txt_rua").attr("readonly",false);	


		} else


			$("#txt_rua").val(dados.logradouro);
		$("#txt_bairro").val(dados.bairro);
		$("#txt_cidade").val(dados.localidade);
		$("#txt_estado").val(dados.uf);
	})

}

function calculaSubTotal(objeto)
{
	var valor = 0;

	var rowIndex = getIndexItem(objeto);
	var qtde = $("#txt_quantidade_Filho_"+rowIndex).maskMoney("unmasked")[0];
	var unitario =  $("#txt_valor_Filho_"+rowIndex).maskMoney("unmasked")[0];
	var subTotal = qtde * unitario;

	subTotal = subTotal.toFixed(2);

	$("#txt_totallinha_Filho_"+rowIndex).val(subTotal);
	calculaTotalItens();

	$(".money-mask").unmask();
	$(".money-mask").mask("#.###.##0,00", { reverse : true });


	//console.log("objeto"+objeto);

	validaTotalMedicao(objeto, false);
}

function validaTotalMedicao(objetoMedicao, booValidaTotal)
{
	var rowIndex = getIndexItem(objetoMedicao);
	var uuid = $("#"+objetoMedicao).closest("tr")[0].getAttribute("uuid");
	var lines = $("#main_dadositens").find("tr");
	var vlrSutTotalItem = 0;
	var vlrMedicao = 0;	
	var retorno = true;

	for(var i = 0; i < lines.length; i++)
	{
		if($(lines[i]).attr("uuid") == uuid)
		{
			//localizando a linha principal do item
			if ($(lines[i]).attr("class") != "info")
			{
				vlrMedicao = 0;
				vlrSutTotalItem = $(lines[i]).find("input[name^='txt_totallinha_Filho_']").first().maskMoney("unmasked")[0];
			}
			//linha da medição
			else
			{
				vlrMedicao = vlrMedicao + $(lines[i]).find("input[name^='vl_medicao_item_Neto_']").first().maskMoney("unmasked")[0];
			}
		}

	}

	if ((vlrMedicao > vlrSutTotalItem && !booValidaTotal) || (vlrMedicao != vlrSutTotalItem && booValidaTotal))
	{
		FLUIGC.toast({
			title: "Valores Inválidos",
			message: "Os valores informados nas medições não condizem com o valor total do item",
			type: "warning"
		});

		for(var i = 0; i < lines.length; i++)
		{
			if($(lines[i]).attr("uuid") == uuid)
			{
				if ($(lines[i]).attr("class") == "info")
				{
					$(lines[i]).find("input[name^='vl_medicao_item_Neto_']").first().val("0,00");
				}
			}

		}

		retorno = false;
	}	


	calculaTotalItens();

	return retorno;
}


function retornaUsuarioRM(matriculaFluig)
{
	var consts = new Array();		
	var matriculaRM = null;

	consts.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", matriculaFluig, matriculaFluig, ConstraintType.MUST));		

	var dsColleagueSolicitante = DatasetFactory.getDataset("colleague", null, consts, null);

	if (dsColleagueSolicitante != null && dsColleagueSolicitante.values.length > 0) 
	{
		var loginSolicitante = dsColleagueSolicitante.values[0]['login'];
		var dataset = DatasetFactory.getDataset("ds_dados_usuario_RM", new Array(loginSolicitante), null, null);

		if (dataset != null &&  dataset.values != undefined) 
		{
			if(dataset.values.length > 0)
			{
				matriculaRM =  dataset.values[0]['CODVEN'];
			}
		}
	}

	return matriculaRM;
}



function calculaTotalItens()
{
	var valor = 0;
	var total = 0;

	//calcula totais dos itens
	var qtde_indice = retornaArrayTBody('tbody_dadositens');
	var qtde_indice_medicao = retornaArrayTBody('tbody_dadositensmedicao');


	for (var i = 0; i <= qtde_indice.length-1; i++) 
	{
		if ($("#txt_totallinha_Filho_"+qtde_indice[i].Pos).val() != undefined)
		{
			valor = $("#txt_totallinha_Filho_"+qtde_indice[i].Pos).maskMoney("unmasked")[0];

			total = total + valor;
		}
	}

	var formato = { minimumFractionDigits: 2 }
	$("#txt_valor_total").val(total.toLocaleString('pt-BR', formato));


	//calcula totais das medições
	total = 0;




	for (var i = 0; i <= qtde_indice_medicao.length-1; i++) 
	{
		if ($("#vl_medicao_item_Neto_"+qtde_indice_medicao[i].Pos).val() != undefined)
		{
			valor = $("#vl_medicao_item_Neto_"+qtde_indice_medicao[i].Pos).maskMoney("unmasked")[0];

			total = total + valor;
		}
	}

	total = total.toFixed(2);

	var formato = { minimumFractionDigits: 2 }
	$("#txt_valor_total_entregas").val(total.toLocaleString('pt-BR', formato));


	//calcula totais das cargas horarias
	total = 0;

	for (var i = 0; i <= qtde_indice_medicao.length-1; i++) 
	{
		if ($("#vl_carga_horaria_item_Neto_"+qtde_indice_medicao[i].Pos).val() != undefined)
		{
			valor = parseInt(0 + $("#vl_carga_horaria_item_Neto_"+qtde_indice_medicao[i].Pos).val());

			total = total + valor;
		}
	}

	$("#txt_valor_total_carga").val(total);
	$(".money-mask").unmask();
	$(".money-mask").mask("#.###.##0,00", { reverse : true });

}

function message(msg){
	
	FLUIGC.toast({
		title: "ATENÇÃO:",
		message: msg,
		type: "danger"
	});
}

var beforeSendValidate = function(numState, nextState) {

	$(".money-mask").unmask();
	$(".money-mask").mask("#.###.##0,00", {
		reverse : true
	});
	
if(numState == INICIO_0 || numState == numState){
		
		var tipoContratacao = $('[name="rd_formacontratacao"]:checked').val();		

		if(tipoContratacao == "rodiziosebraetec"){
			
			var fichaTecnica = $('#txt_fichaSebraeTec').val();
			var codParc = $('#txt_codParceiroRecorrente').val();
			if(fichaTecnica == ""){
				message('Para contratação SEBRAETEC, é obrigatório informar a ficha técnica!');
				return false;
			}else if(codParc == ""){
				message('Para contratação SEBRAETEC, é obrigatório informar o cliente cadastrado no SAS!');
				return false;
			}else if(codFichaSolicitando == codFichaContratado && codParceiroSolicitando == codParceiroSasContratado && temContratacaoNoAno == "sim"){
				
				message(' Contratação bloqueada! Já existe contratação para este cliente, utilizando a mesma ficha técnica neste ano.');
				return false;
			}else if(horasFrancaoMaior){
				message('O total de horas nas etapas, é maior que o total de horas, solicitada na contratação');
				return false;
				
			}
			
			
		}
	}

	if(numState == APROVACAO_DIREX_17){

		return validaTemParecer();

	}

	if(nextState == GATEWAY_APROVACAO_FISCAL){

		//IDENTIFICA O TIPO DE APROVAÇÃO
		tipoAvaliacaoAtividadeInterior();

	}

	if(CURRENT_STATE == TRATAR_INTEGRACAO_161 || CURRENT_STATE == EXPORTACAO_DADOS_SGF_198){

		if($("#txt_tcu_nro_edital").val() > $("#txt_tcu_dt_homol").val()){
			throw "É obrigatório selecionar um radio button na aba Carta Contrato!";
		}
	}


	if (CURRENT_STATE == TRATAR_INTEGRACAO_161){
		if (document.getElementById('rd_cancelado').checked == false && document.getElementById('rd_ajusteprocesso').checked == false 
				&& document.getElementById('rd_calculaDeslocamento').checked == false && document.getElementById('rd_AguardaAss').checked == false)
		{
			throw "É obrigatório selecionar um radio button na aba Carta Contrato!";
		}
	}

	if (CURRENT_STATE == COMPL_CAD_XPERTS_154) {

		var entrega_neto = $("[id^='ds_descricao_entrega_item_Neto_']").length;
		if (entrega_neto > 0){
			for (i=1; i<=entrega_neto; i++){
				if($("#ds_descricao_entrega_item_Neto_"+i).val() == null || $("#ds_descricao_entrega_item_Neto_"+i).val() == '') {				
					throw "O campo 'Entrega/Pagamento' não foi informado!";
				}
			}
		}else{
			throw "É obrigatório informar a medição do item!";
		}

		var data_neto = $("[id^='dt_medicao_item_Neto_']").length;
		if (data_neto > 0){
			for (i=1; i<=data_neto; i++){
				if($("#dt_medicao_item_Neto_"+i).val() == null || $("#dt_medicao_item_Neto_"+i).val() == '') {
					throw "O campo 'Data Pagamento' não foi informado!";
				}
			}
		}

		var vl_medicao = $("[id^='vl_medicao_item_Neto_']").length;
		if (vl_medicao > 0){
			for (i=1; i<=vl_medicao; i++){
				if($("#vl_medicao_item_Neto_"+i).val() == null || $("#vl_medicao_item_Neto_"+i).val() == '') {
					throw "O campo 'valor' não foi informado!";
				}
			}
		}

		var cargaH_medicao = $("[id^='vl_carga_horaria_item_Neto_']").length;
		if (cargaH_medicao > 0){
			for (i=1; i<=cargaH_medicao; i++){
				if($("#vl_carga_horaria_item_Neto_"+i).val() == null || $("#vl_carga_horaria_item_Neto_"+i).val() == '') {
					throw "O campo 'Carga Horaria' não foi informado!";
				}
			}
		}

		if ($("#rd_sistemacontratacaosgf").prop("checked") == false && $("#rd_sistemacontratacaosgc").prop("checked") == false){
			throw "Por favor, informe a forma de contratação!";
		}		
	}

}



function verificaDuplicidadeTabela(ds_body, ds_campo, ds_valor_selecionado, ds_zoom)
{
	var qtde_indice = retornaArrayTBody(ds_body);
	var ds_valor_campo = "";

	for (var i = 0; i <= qtde_indice.length-1; i++) 
	{
		ds_valor_campo = $("#" + ds_campo + "___"+qtde_indice[i].Pos).val();

		if ((ds_valor_campo != undefined) && (ds_valor_campo == ds_valor_selecionado))
		{
			FLUIGC.toast({
				title: "Erro",
				message: 'Registro Duplicado !',
				type: 'warning'
			});

			window[ds_zoom].clear();
			return true;
		}
	}
}


function retornaArrayTBody(obj)
{
	var elementos = $("#" + obj + " input");
	var arrRetorno = [];

	var aux = 0;

	for(var i in elementos)
	{

		if(elementos[i].id != undefined && elementos[i].id.indexOf("___") > -1)
		{
			var indice = elementos[i].id.split("___")[1];
			if (aux !=indice)
			{
				arrRetorno.push({ "Pos": indice });

				aux = indice;
			}
		}

	}

	return arrRetorno;
}





function getIndexItem(name)
{
	var index = (""+name).split("_Filho_");

	//se não encontrou pelo filho, procura pelo neto
	if (index.length == 1)
		index = (""+name).split("_Neto_");


	return (index != null && index.length > 0) ? index[1] : -1;
}

function atualizaZoomFilterAcao(codProjeto, index){

	reloadZoomFilterValues("txt_acao___"+index, "codProjeto,"+codProjeto);	
}

function atualizaZoomFilterRecursos(codProjeto, codAcao, index)
{
	codProjeto = codProjeto.split('.')[0];
	reloadZoomFilterValues("txt_recursos___"+index, "codProjeto,"+codProjeto+",codAcao,"+codAcao);
}

function gravarHistorico(){

	var objeto = $('#txa_objetocontratacao').val();
	var historico = $('#txt_historicoAlteracao').val();

	if($('#aprovasgfajuste').val() == 'ajustesgf'){
		$('#txt_historicoAlteracao').val(
				historico +				
				objeto + '\n \n'+
		'************************************************************************************************************************************************************************************************************');
	}



}




const enviarAnexo = function (parentId, fileName, blob, callback) {
	$.ajax({
		async: false,
		type: "POST",
		url: '/api/public/2.0/contentfiles/upload/?fileName=' + fileName,
		cache: false,
		contentType: 'application/octet-stream',
		processData: false,
		data: blob,

		error: function () {
			FLUIGC.toast({
				title: '',
				message: "Falha ao enviar, tente novamente e se o problema persistir contate a equipe responsavel pelo Fluig.",
				type: 'danger'
			});
		},

		success: function (data) {
			const today = new Date();
			today.setDate(today.getDate() + 1);

			$.ajax({
				async: false,
				type: "POST",
				contentType: "application/json;",
				url: '/api/public/ecm/document/createDocument',

				data: JSON.stringify({
					"description": fileName,
					"parentId": '' + parentId,
					"expirationDate": today.toISOString().split('T')[0],
					"attachments": [{
						"fileName": fileName
					}],
				}),

				error: function () {
					//console.log(data);
					FLUIGC.toast({
						title: '',
						message: "Falha ao enviar, tente novamente e se o problema persistir contate a equipe responsavel pelo Fluig.",
						type: 'danger'
					});
				},

				success: function (data) {
					callback(data);
				},
			});
		},
	});
};




function pegaArquivoDoInput(obj){

	var files = $("#"+obj.id)[0].files;
	var file = files[0];
	let blob = new Blob([file], { type: 'application/octet-stream' });


	var indice = obj.name.split("___")[1];

	/* Chama a função para enviar o anexo onde as variáveis são: 
	1. Código da pasta onde os arquivos serão salvos 
	2. O nonme do arqivo, que você pega do retorno anterior
	3. Objeto Blob
	4. A função callback.
	 */

	enviarAnexo('17809', file.name, blob, function (data) {
		//a pasta em produção é:    17809 (alterar quando for migrar);
		//a pasta em HOMOLOGAÇÃO é: 3399 (alterar quando for migrar);
		// Salva id do documento no ecm.
		if (data.content != undefined) {
			var arquivo = data.content.id; // recebe a id do documento
			var apiURL = "/api/public/2.0/documents/getDownloadURL/" + arquivo; // chama a API para obter o link do arquivo
			$.get(apiURL, function (data) {
				var URLarquivo = data.content;

				$('#nomeArquivoUpload___'+indice).val(file.name);
				$('#idGEDDocumento___'+indice).val(arquivo);
				$('#urlDownloadArquivo___'+indice).val(URLarquivo);


				$('#nomeArquivoUpload___'+indice).parent().find('.refNomeArquivo').text(file.name);           
				$('#nomeArquivoUpload___'+indice).parent().find('.dsFileLink').attr("href", URLarquivo);

				// console.log(URLarquivo);



			});
		}
	});
}	

function recarregaOnchange(){

	$('[name^=planilhaInstrutoria___]').attr("onchange","pegaArquivoDoInput(this)");

}

function formataNumero(valor) {

	valor = String(valor);

	if (valor.indexOf(',') == -1) {

	} 
	else {
		valor = valor.split(".").join("").replace(",",".");
	}
	valor = parseFloat(valor);

	valor = valor.toFixed(2);

	return valor;
}

function ajustaDownload(){

	var indice = 0;

	$('.uploadGED').each(function(){

		indice = $(this).prop("id").split("_Neto_")[1];

		$("[name^='nomeArquivoUpload_item_Neto_"+indice+"']").parent().find('.refNomeArquivo').text($("[name^='nomeArquivoUpload_item_Neto_"+indice+"']").val());
		$("[name^='urlDownloadArquivo_item_Neto_"+indice+"']").parent().find('.dsFileLink').attr("href", $("[name^='urlDownloadArquivo_item_Neto_"+indice+"']").val());

	});
}


function deleteDoGed(obj){

	var indice = obj.name.split("___")[1]; 
	var idDoc = $("#idGEDDocumento___"+indice).val();

	$.ajax({
		async : false,
		type : "POST",
		contentType: "application/json",
		url : '/api/public/ecm/document/remove',
		data: JSON.stringify({
			"id": idDoc,
		}),
		error: function(e) {

			console.log(e);



		},
		success: function(data){

			FLUIGC.toast({
				title: 'Atenção:',
				message: 'Anexo '+idDoc +' Removido!',
				type: 'warning'

			});


		},
	});
}

function pegaArquivo(obj){

	var files = $("#"+obj.id)[0].files;
	var file = files[0];
	let blob = new Blob([file], { type: 'application/octet-stream' });

	var indice = obj.name.split("_item_Neto_")[1];

	/* Chama a função para enviar o anexo onde as variáveis são: 
	1. Código da pasta onde os arquivos serão salvos 
	2. O nonme do arqivo, que você pega do retorno anterior
	3. Objeto Blob
	4. A função callback.
	 */

	enviarAnexo('17809', file.name, blob, function (data) {
		//a pasta em produção é:    17809 (alterar quando for migrar);
		//a pasta em HOMOLOGAÇÃO é: 3399 (alterar quando for migrar);
		// Salva id do documento no ecm.
		if (data.content != undefined) {
			var arquivo = data.content.id; // recebe a id do documento
			var apiURL = "/api/public/2.0/documents/getDownloadURL/" + arquivo; // chama a API para obter o link do arquivo
			$.get(apiURL, function (data) {
				var URLarquivo = data.content;

				$('#nomeArquivoUpload_item_Neto_'+indice).val(file.name);
				$('#idGEDDocumento_item_Neto_'+indice).val(arquivo);
				$('#urlDownloadArquivo_item_Neto_'+indice).val(URLarquivo);


				$('#nomeArquivoUpload_item_Neto_'+indice).parent().find('#refNomeArquivo_item_Neto_'+indice).text(file.name);           
				$('#nomeArquivoUpload_item_Neto_'+indice).parent().find('#dsFileLink_item_Neto_'+indice).attr("href", URLarquivo);

			});
		}
	});
}





function validateDate(objeto){
	var aDate   = moment(objeto.val(), 'DD/MM/YYYY', true);
	var isValid = aDate.isValid();

	if(!isValid){
		FLUIGC.toast({
			title: 'Data: ',
			message: 'Data Inválida',
			type: 'warning'
		});
		objeto.val("");
		objeto.focus();
	}
}	


function verificaData(){

	var datainicio = $('#periodoinicial').val();
	var consultoria = $('#check_Consultoria').val(); 
	var instrutoria = $('#check_instrutoria').val();
	// var atividade = $('#CURRENT_STATE');


	const data = datainicio.split('/');
	//	exemplo se fosse 30/03/2019

	const dia = data[0]; // 30
	const mes = data[1]; // 03
	const ano = data[2]; // 2019

	datainicial = new Date(ano, mes - 1, dia);

	const qtddias = Math.abs(new Date().getTime() - datainicial.getTime());
	const totaldias = Math.ceil(qtddias / (1000 * 60 * 60 * 24));

	//alert(totaldias);


	if(totaldias <= 10){
		$('#aviso').show(1000);
		$('#avisoprazo').show(1000);
		$('#msgprazo').focus();



	} else if(totaldias > 10){
		$('#aviso').hide(1000);
		$('#avisoprazo').hide(1000);

	}	 
}


function atualizaDataVigencia(dataTermino){

	var arrDataTermino = dataTermino.split('/');
	var stringFormatada = arrDataTermino[1] + '-' + arrDataTermino[0] + '-' + arrDataTermino[2];
	var dataFormatada = new Date(stringFormatada);
	dataFormatada.setDate(dataFormatada.getDate() + 180);


	if (dataFormatada.getDate() < 10){
		var dia = '0'+dataFormatada.getDate();
	}else{
		var dia = dataFormatada.getDate();
	}
	if (dataFormatada.getMonth() < 9){
		var mes = '0'+(dataFormatada.getMonth()+1);
	}else{
		var mes = (dataFormatada.getMonth()+1);
	}
	var ano = dataFormatada.getFullYear();

	$('#data_fim_vigencia').val(dia+"/"+mes+"/"+ano);

}

function mostraEocultacampo(){

	var consultoria = $('[name^="check_Consultoria"]:checked').val();
	var instrutoria = $('[name^="check_instrutoria"]:checked').val();
	var devolucao =  $('[name^="aprovasgf"]:checked').val();

	if(consultoria =='consultoria'){
		$('#painel_consultoriavalor').show();
		$('#painel_consultoriaentrega').show();
		$('#painel_consultoriaviagem').show();

	}
	if (instrutoria =='instrutoria'){
		$('#entrega_instrutoria').show();
		$('#entrega_instrutoria2').show();
	}
	if(consultoria == null){
		$('#painel_consultoriavalor').hide();
		$('#painel_consultoriaentrega').hide();
		$('#painel_consultoriaviagem').hide();
	}

	if (instrutoria == null){
		$('#entrega_instrutoria').hide();
	}

	if(devolucao == 'ajustesgf'){

		$('#div_motivoDevolucao').show();
	}
	if(devolucao == 'sim'){
		$('#div_motivoDevolucao').hide();
	}


	if (consultoria =='consultoria' && (instrutoria == null || instrutoria == ""))
	{
		$("#txt_CODTIP_contrato").val("001");
		window["zoom_tipo_faturamento_contrato"].setValue("001 - Consultoria")
	}

	else if (instrutoria =='instrutoria' && (consultoria == null || consultoria == ""))
	{
		$("#txt_CODTIP_contrato").val("013");
		window["zoom_tipo_faturamento_contrato"].setValue("013 - Instrutoria")
	}

	else if (consultoria =='consultoria' && instrutoria == 'instrutoria')
	{
		$("#txt_CODTIP_contrato").val("40");
		window["zoom_tipo_faturamento_contrato"].setValue("40 - Consultoria/instrutoria")
	}



}


function preencheCamposTCU()
{

	var consultoria = $('[name^="_check_Consultoria"]:checked').val();
	var instrutoria = $('[name^="_check_instrutoria"]:checked').val();

	if(consultoria == undefined && instrutoria == undefined){
		consultoria = $('[name^="check_Consultoria"]:checked').val();
		instrutoria = $('[name^="check_instrutoria"]:checked').val();
	}

	//regra de valor fixo para TCU
	if (instrutoria =='instrutoria' && (consultoria == null || consultoria == ""))
	{
		$("#txt_tcu_cat_obj").val("40");

		ZOOMS.executeQuandoPronto("zoom_tcu_cat_obj", function(){
			window["zoom_tcu_cat_obj"].setValue("Outros");
		});
	}

	else if (consultoria =='consultoria' && instrutoria == 'instrutoria')
	{
		$("#txt_tcu_cat_obj").val("1");
		ZOOMS.executeQuandoPronto("zoom_tcu_cat_obj", function(){
			window["zoom_tcu_cat_obj"].setValue("Mais de uma categoria");
		});

	}

	else if (consultoria =='consultoria' && (instrutoria == null || instrutoria == ""))
	{
		$("#txt_tcu_cat_obj").val("26");

		ZOOMS.executeQuandoPronto("zoom_tcu_cat_obj", function(){
			window["zoom_tcu_cat_obj"].setValue("Serviços de consultoria");
		});
	}

	//$("#txt_tcu_ano_edi").val("2023");
	$("#txt_tcu_ano_edi").val("2025");
	//$("#txt_tcu_nro_edital").val("001/2023");
	$("#txt_tcu_nro_edital").val("001/25");

	$("#txt_tcu_cri_jul").val("1");

	ZOOMS.executeQuandoPronto("zoom_tcu_cri_jul", function(){
		window["zoom_tcu_cri_jul"].setValue("Menor Preço");
	});

	//if ($("#txt_tcu_dt_edital").val() != "")
	//	$("#txt_tcu_dt_edital").val(moment(new Date()).format("DD/MM/YYYY"));
	//$("#txt_tcu_dt_edital").val("20/06/2023");
	$("#txt_tcu_dt_edital").val("24/04/2025");
	$("#txt_tcu_dt_homol").val("29/04/2025");


	$("#txt_tcu_nat_obj").val("2");

	ZOOMS.executeQuandoPronto("zoom_tcu_nat_obj", function(){
		window["zoom_tcu_nat_obj"].setValue("Serviço");
	});

	retornaNrContrato();
}

function removeSpecialChar(texto)
{
	return texto.replace(/[*”&$"']/g, '');
}




var formatter = new Intl.NumberFormat('pt-BR', {
	minimumFractionDigits: 2,
});


function adicionarLinha(botao) {
    // 1. acha a linha pai (child) do botão
    let trPai = $(botao).closest("tr");
    
    // 2. pega o uuid do filho (campo hidden que começa com filho_dadositens___)
    let uuid = trPai.find("input[name^='filho_dadositens___']").val();

    if (!uuid) {
        FLUIGC.toast({
            title: 'Erro:',
            message: 'UUID do item pai não encontrado!',
            type: 'danger'
        });
        return;
    }

    // 3. usa a função oficial da aplicação (mesma do botão original)
    TABLES.id = "dadositens"; // garante que o objeto TABLES sabe em qual contexto está
    let idxNeto = TABLES.addTableGrandchildRow(uuid);

    return idxNeto;
}
 


/**
 * Pai x Filho x Neto
 */
let TABLES = {
		id : null,
		tablesId : { 
			dadositens : {
				child : "dadositens",
				grandchild : "dadositensmedicao"
			}
		},

		getNewUUID : function() {
			return FLUIGC.utilities.randomUUID();
		},

		appendChild : function(id, uuid) {
			this.id = id;
			let index = this.addTableRow(this.id);
			let selectedUUID = uuid === null || uuid === undefined ? this.getNewUUID() : uuid;  
			$("#filho_" + this.tablesId[id].child + "___" + index).val(selectedUUID);
			this.addTplChildRow(index, selectedUUID); //this.addTplChildRow(index, uuid);
			return index;
		},


		addTableRow : function() {
			let table = this.tablesId[this.id].child;
			let index = wdkAddChild(table);



			var inputs = $("[mask]");
			MaskEvent.initMask(inputs); 

			$(".money-mask").maskMoney(
					{	prefix : '',
						thousands : '.',
						decimal : ',',
						affixesStay : true,
						allowZero : true
					});

			return index;
		},

		addTplChildRow : function(index, uuid) {
			let tbody = $("#main_" + this.tablesId[this.id].child).find("tbody")[0];
			let html = Mustache.render($("#tpl_" + this.tablesId[this.id].child).html(), {index, uuid});
			$(tbody).append(html);
			this.bindChild(index);
			hasZoom();
		},

		bindChild : function(index) {
			let that = this;
			$(".add-grandchild").unbind();
			$(".add-grandchild").on("click", function() {
				var idx_neto = that.addTableGrandchildRow($("#filho_" + that.tablesId[that.id].child + "___" + this.getAttribute("indice")).val());


				FLUIGC.calendar('.campo-data');

				$(".campo-data" ).change(function() {
					if(this.value != '')
						validateDate($(this));
				});

				$(".money-mask").maskMoney(
						{	prefix : '',
							thousands : '.',
							decimal : ',',
							affixesStay : true,
							allowZero : true
						});

			});
			$(".remove-child").unbind();
			$(".remove-child").on("click", function() {
				let currentIndex = $(this).parent().parent().find("input")[0].id.split("_").slice(-1)[0];
				that.removeChild(this, currentIndex);

				calculaTotalItens();
			});
		},

		hasGrandchild : function(uuid) {
			let lines = $("#main_" + this.tablesId[this.id].child).find("tr");
			let totalLines = 0;

			for(let i = 0; i < lines.length; i++){
				if($(lines[i]).attr("uuid") == uuid)
					totalLines++;
			}
			return totalLines > 1;
		},

		removeChild : function(element, index) {
			let that = this;
			let uuid = $(element).closest("tr")[0].getAttribute("uuid");

			if(this.hasGrandchild(uuid)){
				FLUIGC.message.confirm({
					message: 'Se remover esse registro todos os demais itens também serão removidos. Deseja remover mesmo assim?',
					title: 'Remover registro',
					labelYes: 'Sim',
					labelNo: 'Não'
				}, (result, el, ev) => {
					if(result){
						that.removeGrandchildrenByUUID($("#filho_" + that.tablesId[this.id].child + "___" + index).val());
						$(element).closest("tr").remove();
						fnWdkRemoveChild($("#filho_" + that.tablesId[this.id].child + "___" + index).parent().parent().find("i")[0]);


						//verifica se há itens adicionados. caso houver, mantem bloqueado contrato e etapa.
						//if (parseInt(retornaIndiceTBody("tbody_table_item_etapa")) == 0 &&
						//		parseInt(retornaIndiceTBody("tbody_tablecomponenteitem")) == 0)
						//{
						//window["zoom_contrato"].disable(false);
						//	window["zoom_etapa"].disable(false);
						//	window["zoom_fornecedor"].disable(false);
						//}
					}
				});
			} else {
				that.removeGrandchildrenByUUID($("#filho_" + that.tablesId[this.id].child + "___" + index).val());
				$(element).closest("tr").remove();
				fnWdkRemoveChild($("#filho_" + that.tablesId[this.id].child + "___" + index).parent().parent().find("i")[0]);
			}

			//verifica se há itens adicionados. caso houver, mantem bloqueado contrato e etapa.
			//if (parseInt(retornaIndiceTBody("tbody_table_item_etapa")) == 0 &&
			//		parseInt(retornaIndiceTBody("tbody_tablecomponenteitem")) == 0)
			//{
			//	window["zoom_contrato"].disable(false);
			//	window["zoom_etapa"].disable(false);
			//	window["zoom_fornecedor"].disable(false);
			//}

			calculaTotalItens();

		},

		removeGrandchildrenByUUID : function(uuid) {
			let lines = $("#main_" + this.tablesId[this.id].child).find("tbody tr");
			for(let i = 0; i < lines.length; i++) {
				if($(lines[i]).attr("uuid") == uuid){
					let index = $($(lines[i]).find("input")[0]).attr("id").split("_").slice(-1)[0];
					$(lines[i]).remove();
					this.removeGrandchild(index);
				}    			
			}
		},

		addTableGrandchildRow : function(uuid) {
			var idx_pai = this.getIndexByUUID(uuid);

			//verifica se item pai foi selecionado/preenchido
			if ($("#txt_idprd_Filho_" + idx_pai).val() == "")
			{
				FLUIGC.toast({
					title: 'Item: ',
					message: 'Item não informado',
					type: 'warning'
				});

				return;
			}


			//consultaSaldoMedicao





			let table = this.tablesId[this.id].grandchild;
			let index = wdkAddChild(table);





			$("#neto_" + table + "___" + index).val(uuid);
			this.addTplGrandchildRow(uuid, index);

			MaskEvent.initMask($('[mask]'));

			$("#vl_nr_entrega_medicao_item_Neto_" + index).val($(".custoDeslocamento").length);



			return index;
		},

		getIndexByUUID : function(uuid) {
			let lines = $("table[tablename='" + this.tablesId[this.id].child + "']").find("tbody tr");
			let input = $(lines).find("input[name^='filho_dadositens___']");
			let index = null;

			for(let i = 0; i < input.length; i++){
				if($(input[i]).val() == uuid){
					index = $(input[i]).attr("id").split("___")[1];
					break;
				}

			}
			return index;
		},

		addTplGrandchildRow : function(uuid, index) {
			let lastField = this.getLastFieldByUUID(uuid);
			let html = Mustache.render($("#tpl_" + this.tablesId[this.id].grandchild).html(), {index, uuid});
			$(lastField).after(html);
			this.bindGrandchild(index);
			hasZoom();

			let childIndex = this.getIndexByUUID(uuid);//TEMP



		},


		bindGrandchild : function(index) {
			let that = this;
			$(".remove-grandchild").unbind();
			$(".remove-grandchild").on("click", function() {
				let index = this.getAttribute("indice");
				$(this).closest("tr").remove();
				that.removeGrandchild(index);
			});
		},

		removeGrandchild : function(index) {
			fnWdkRemoveChild($("#neto_" + this.tablesId[this.id].grandchild + "___" + index).parent().parent().find("i")[0]);
		},

		getLastFieldByUUID : function(uuid) {
			let lastTR = null;
			let lines = $("#main_" + this.tablesId[this.id].child).find("tr")

			for(let i = 0; i < lines.length; i++) {
				if($(lines[i]).attr("uuid") == uuid)
					lastTR = lines[i];
			}
			return lastTR;
		},

		saveFieldsValue : function(id) {
			let lines = $("#main_" + this.tablesId[id].child).find("tbody tr");

			for(let i = 0; i < lines.length; i++) {
				this.putValuesIntoTableFields(lines[i]);
			}
		},

		putValuesIntoTableFields : function(line) {
			let fields = $(line).find("input, select, textarea");

			for(let i = 0; i < fields.length; i++) {
				if(fields[i].id.indexOf("_Filho_") > -1 || fields[i].id.indexOf("_Neto_") > -1) {
					let originalField = fields[i].id;
					let tableField = fields[i].id.indexOf("_Filho_") > -1 ? fields[i].id.replace("_Filho_", "___") : fields[i].id.replace("_Neto_", "___");

					if(fields[i].nodeName.toUpperCase() == "INPUT") {
						if(fields[i].getAttribute("type") == "text" || fields[i].getAttribute("type") == "hidden"){
							$("input[name='" + tableField + "']").val(fields[i].value);
						} else if(fields[i].getAttribute("type") == "checkbox") {
							$("input[name='" + tableField + "']").prop("checked", $(fields[i]).is(":checked"));
						} else if(fields[i].getAttribute("type") == "radio") {
							$("input[name='" + tableField + "']").val(fields[i].value);
						}
					} else if(fields[i].nodeName.toUpperCase() == "TEXTAREA") 
					{
						$("textarea[name='" + tableField + "']").val(fields[i].value);
					} 
					else if(fields[i].nodeName.toUpperCase() == "SELECT") 
					{
						if(fields[i].getAttribute("type") == "zoom" && window[originalField].getSelectedItems() == null)
						{
							window[tableField].clear();
						}
						else if(fields[i].getAttribute("type") == "zoom" && window[originalField].getSelectedItems() != null) 
						{
							//temp 
							//ZOOMS.executeQuandoPronto(tableField, function(){

							//});

							try
							{
								window[tableField].setValue(window[originalField].getSelectedItems());
							}
							catch(e)
							{
								alert('erro, carregue a pagina novamente');
							}

						} 
						else 
						{
							$("select[name='" + tableField + "']").val(fields[i].value);
						}
					}
				}
			}
		},

		loadFields : function(id){

			let that = this;

			setTimeout(function() {
				that.id = id;
				let childLines = $("table[tablename='" +  that.tablesId[id].child + "']").find("tbody tr");
				let grandchildLines = $("table[tablename='" +  that.tablesId[id].grandchild + "']").find("tbody tr");


				for(let i = 1; i < childLines.length; i++){
					let index = $(childLines[i]).find("input")[0].id.split("___")[1];
					let uuid = $("#filho_" + that.tablesId[id].child + "___" + index).val();
					that.addTplChildRow(index, uuid);
					that.putValuesIntoFields(childLines[i], index, "_Filho_");
				}
				for(let i = 1; i < grandchildLines.length; i++){
					let index = $(grandchildLines[i]).find("input")[0].id.split("___")[1];
					let uuid = $("#neto_" + that.tablesId[id].grandchild + "___" + index).val();
					that.addTplGrandchildRow(uuid, index);
					that.putValuesIntoFields(grandchildLines[i], index, "_Neto_");
				}
			}, 2500);
		},

		putValuesIntoFields : function(line, index, type) {
			let fields = $(line).find("input, select, textarea");

			for(let i = 0; i < fields.length; i++) {
				let originalField = fields[i].id;
				let tableField = fields[i].id.replace("___", type);

				if(fields[i].nodeName.toUpperCase() == "INPUT") 
				{
					if((fields[i].getAttribute("type") == "text" || fields[i].getAttribute("type") == "hidden") && 
							!fields[i].getAttribute("name").startsWith("zoom_") && 
							fields[i].getAttribute("data-zoom") == null)
					{
						$("input[id='" + tableField + "']").val(fields[i].value);
					} 
					else if((fields[i].getAttribute("type") == "text" || fields[i].getAttribute("type") == "hidden") && fields[i].getAttribute("name").startsWith("zoom_")){

						//temp
						//ZOOMS.executeQuandoPronto(tableField, function(){

						//});

						try
						{
							window[tableField].setValue(fields[i].value);
						}
						catch(e)
						{
							alert('erro, carregue a pagina novamente');
						}

					}else if(fields[i].getAttribute("type") == "checkbox") {
						$("input[id='" + tableField + "']").prop("checked", $(fields[i]).is(":checked"));
					} else if(fields[i].getAttribute("type") == "radio") {
						$("input[name='" + tableField + "']").val(fields[i].value);
					}
					else if (fields[i].getAttribute("data-zoom") != null)
					{


						//temp
						// ZOOMS.executeQuandoPronto(tableField, function(){
						window[tableField].setValue(window[originalField].value);
						// });

					}

				} else if(fields[i].nodeName.toUpperCase() == "TEXTAREA") {
					$("textarea[id='" + tableField + "']").val(fields[i].value);
				} else if(fields[i].nodeName.toUpperCase() == "SELECT") {
					if(fields[i].getAttribute("type") == "zoom") 
					{

						//temp
						//ZOOMS.executeQuandoPronto(tableField, function(){
						try
						{
							window[tableField].setValue(window[originalField].getSelectedItems());
						}
						catch(e)
						{
							alert('erro, carregue a pagina novamente');
						}
						//});

					}
					else 
					{
						$("select[id='" + tableField + "']").val(fields[i].value);
					}
				}

			}
		},

		disableAllFields: function(id, field) {
			let fields = $("#main_" + this.tablesId[id].child).find("input, select, textarea");

			for(let i = 0; i < fields.length; i++) {
				if(field !== null && fields[i].id.indexOf(field) === -1)
					continue;
				if(fields[i].getAttribute("type") == "zoom") {
					window[fields[i].id].disable(true);
				} else {
					$(fields[i]).prop("disabled", true);
				}
			}
		},

		hideTrashIcon : function(id) {
			let icons = $("#main_" + this.tablesId[id].child).find("i");

			for(let i = 0; i < icons.length; i++) {
				if($(icons[i]).hasClass("fluigicon-trash")) {
					$(icons[i]).hide();
				}
			}
		},

		hideAppendGrandchild : function(id) {
			let icons = $("#main_" + this.tablesId[id].child).find(".add-grandchild").hide();
		},

		disableAndHideAll : function(id) {
			this.disableAllFields(id, null);
			this.hideTrashIcon(id);
			this.hideAppendGrandchild(id);
		}
};

let ZOOMS = {
		interval: {}

, isReady(zoomId){
	return window[zoomId] != undefined && window[zoomId] != null && window[zoomId].open != null;
}
, executeQuandoPronto: function(zoomId, callback){
	ZOOMS.interval[zoomId] = setInterval(function(){
		if(ZOOMS.interval[zoomId] > 0 && ZOOMS.isReady(zoomId)){
			callback();
			ZOOMS.clearInterval(zoomId);
		}
	});
}

, clearInterval: function(zoomId){
	window.clearInterval(ZOOMS.interval[zoomId]);
	ZOOMS.interval[zoomId] = 0;
}
}

//testes..

function aplicaMascara(tipo){
	if (tipo === "cpf"){
		$('#txt_buscarFornecedor').val('');
		$('#txt_buscarFornecedor').mask('000.000.000-00');
	}else{

		$('#txt_buscarFornecedor').val('');
		$('#txt_buscarFornecedor').mask('00.000.000/0000-00');
	}
}

function buscarFornecedor(){	

	var tipoBusca = $('[name="rd_tipoBusca"]:checked').val();

	if($("#cnpjFornecedorXperts").val() != ''){

		var fornecedorXperts = $("#cnpjFornecedorXperts").val();
		$('#txt_buscarFornecedor').val(fornecedorXperts);
		$('[name="rd_tipoBusca"]').prop("checked", true);
		fornecedorXperts = fornecedorXperts.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
		retornaFornecedor(fornecedorXperts);
	}else{
		if(tipoBusca === "" || tipoBusca === undefined){

			FLUIGC.toast({
				title: "Atenção",
				message: "Informe se irá buscar por CPF ou pelo CPNJ!!!",
				type: "warning"
			});

		}else {

			var CPFCNPJ = $('#txt_buscarFornecedor').val();

			if (CPFCNPJ == ""){
				FLUIGC.toast({
					title: "Atenção",
					message: "Informe o CPF ou CNPJ para buscar o fornecedor!!!",
					type: "warning"
				});
			}else{			
				retornaFornecedor(CPFCNPJ);
			}	
		}
	}

}

function retornaFornecedor(cpfCnpj){

	var dsFornecedor  = DatasetFactory.getDataset("ds_fornecedor_RM_AQ",  new Array(cpfCnpj), null, null);

	if (dsFornecedor.values.length >= 1){
		//console.log('entrou aqui, é maior que 1')
		for (var i=0; i < dsFornecedor.values.length; i++){

			var digitoconta = dsFornecedor.values[i]["DIGITOCONTA"];
			var codigoFornecedor =  dsFornecedor.values[i]["CODCFO"];
			var digitoagencia = dsFornecedor.values[i]["DIGITOAGENCIA"];
			var descricaoCTA = dsFornecedor.values[i]["CTADESCRICAO"];
			var formaPagamento = dsFornecedor.values[i]["FORMAPAGAMENTO"];
			var numeroBanco = dsFornecedor.values[i]["NUMEROBANCO"];
			var contaCorrente = dsFornecedor.values[i]["CONTACORRENTE"];
			var codAgencia = dsFornecedor.values[i]["CODIGOAGENCIA"];				
			var razaoSocial =  dsFornecedor.values[i]["NOME"];
			var cpf = dsFornecedor.values[i]["CGCCFO"];
			var email = dsFornecedor.values[i]["EMAIL"];
			var rua = dsFornecedor.values[i]["RUA"];
			var cep = dsFornecedor.values[i]["CEP"];
			var numero = dsFornecedor.values[i]["NUMERO"];
			var cidade = dsFornecedor.values[i]["CIDADE"];
			var estado = dsFornecedor.values[i]["CODETD"];
			var bairro = dsFornecedor.values[i]["BAIRRO"];
			var Pgto = dsFornecedor.values[i]["FORMAPAGAMENTO"];
			var formaPagamento = "";
			var nomeFantasia = dsFornecedor.values[i]["NOMEFANTASIA"]; 



			switch (Pgto){

			case 'D':
				formaPagamento = 'DOC (Comp)';
				break;

			case 'T':
				formaPagamento = 'Crédito em Conta Corrente no mesmo Banco';

				break;

			case 'C':
				formaPagamento = 'Cheque Administrativo';
				break;

			case 'I':
				formaPagamento = 'Título de Cobrança (Boleto)';
				break;

			case 'N':
				formaPagamento = 'Pagamento Eletrônico a Concessionários';					
				break;

			case 'P':
				formaPagamento = 'Crédito em Conta de Poupança';

				break;

			case 'R':
				formaPagamento = 'Ordem de Pagamento à disposição';
				break;

			case 'X':
				formaPagamento = 'Crédito em Conta Real Time';
				break;

			case 'Y':
				formaPagamento = 'TED CIP';
				break;

			case 'Z':
				formaPagamento = 'TED STR';

				break;

			case 'A':
				formaPagamento = 'DARF';

				break;

			case 'G':
				formaPagamento = 'GPS';

				break;

			case 'E':
				formaPagamento = 'Débito Automático';

				break;
			case 'M':
				formaPagamento = 'Crédito em Conta Corrente de Mesma Titularidade';

				break;
			case 'B':
				formaPagamento = 'IPTU/ISS/Outros Tributos Municipais';

				break;
			case 'F':
				formaPagamento = 'DARJ';

				break;
			case 'J':
				formaPagamento = 'GARE - SP ICMS';

				break;
			case 'L':
				formaPagamento = 'FGTS - GFIP';

				break;
			case 'O':
				formaPagamento = 'GNRE e Tributos Estaduais c/ Cód. Barras';

				break;

			}


			$('#txt_fornecNome').val(razaoSocial);
			$('#txt_fornecCGCCFO').val(cpf);
			$('#txt_fornecEmail').val(email);
			$('#txt_fornecBanco').val(numeroBanco);
			$('#txt_fornecEndereco').val(rua);
			$('#txt_fornecEnderecoCEP').val(cep);
			$('#txt_fornecEnderecoNum').val(numero);
			$('#txt_fornecEnderecoCidade').val(cidade);
			$('#txt_fornecEnderecoEstado').val(estado);
			$('#txt_fornecEnderecoBairro').val(bairro);
			$('#txt_fornecConta').val(contaCorrente);
			$('#txt_formaPagto').val(formaPagamento);
			$('#txt_descCtaBancaria').val(descricaoCTA);
			$('#txt_fornecAgencia').val(codAgencia);



			//preenchendo os campos ocultos
			$('#txt_forcodcfo').val(codigoFornecedor);

			//console.log('codigo do fornecedor >>>>>>>>>>>>>>>>>>>>>>>>>>>'+codigoFornecedor);
			$('#txt_fornomefantasia').val(nomeFantasia);
			$('#txt_fornome').val(razaoSocial);

			
		}

		var dsToken = DatasetFactory.getDataset("ds_SGF_busca_token", null, null, null);        

		if(dsToken.values.length > 0)
		{
			var token = dsToken.values[0]["token"]; 
		}

		var cnpj = $("#txt_buscarFornecedor").val();
		cnpj = cnpj.replace('.', '');
		cnpj = cnpj.replace('.', '');
		cnpj = cnpj.replace('/', '');
		cnpj = cnpj.replace('-', '');
		var constraints = new Array();
		constraints.push(DatasetFactory.createConstraint("cnpj", cnpj, cnpj, ConstraintType.MUST));
		constraints.push(DatasetFactory.createConstraint("token", token, token, ConstraintType.MUST));
		var ds_Credenciado = DatasetFactory.getDataset("ds_SGF_busca_credenciado", null, constraints, null); 

		if (ds_Credenciado.values.length > 0){
			//console.log('### ds_Credenciado'+ds_Credenciado)
			for (var i=0; i < ds_Credenciado.values.length; i++){
				var IdCredenciadoPJ = ds_Credenciado.values[i]["IdCredenciadoPJ"];
				var IdCredenciadoPF =  ds_Credenciado.values[i]["IdCredenciadoPF"];
			}

			$("#IdCredenciadoPJ").val(IdCredenciadoPJ);
			var IdCredenciadoPF = JSON.parse(IdCredenciadoPF);
			//console.log(IdCredenciadoPF)

			if (IdCredenciadoPF.length > 0)
			{   
				IdCredenciadoPF = IdCredenciadoPF[0].EquipeTecnica;  
				if (IdCredenciadoPF.length > 0)
				{
					var IdCredenciadoPF = IdCredenciadoPF[0].IdCredenciadoPF;
					$("#IdCredenciadoPF").val(IdCredenciadoPF);	
				}            			
			} 
		}
		$("#IdCredenciadoPFMembros").val(IdCredenciadoPF);
		//IdCredenciadoPF = IdCredenciadoPF + 1;
		$("#IdCredenciadoPFSubtituto").val(IdCredenciadoPF);

	} else {
		FLUIGC.toast({
			title: "Erro:",
			message: "Cpf ou Cnpj invalido, ou o fornecedor não está cadastrado no RM!",
			type: "danger"
		});
	}
}

$(document).on("keydown", "#txa_objetocontratacao", function () {
	var caracteres = 0;
	var caracteresDigitados = parseInt($(this).val().length);
	caracteresDigitados = caracteres + caracteresDigitados;

	$(".caracteres").text(caracteresDigitados);
});



function consultaGestores(){


	var dsConfiguracaoAtividades = DatasetFactory.getDataset('dsFormCoordenadoresGerentes', null, null, null);

}


function tipoAvaliacaoAtividadeInterior(){


	//Depois, controlar por campo

	var valorSolicitacao = converteValorJS($("#txt_valor_total").val());


	var c1 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
	var colunasDsFormCoordenadoresGerentes = new Array('vlrAprovacaoCoordenadorAte', 'vlrAprovacaoCoordenadorDe', 'vlrAprovacaoDiretoriaAte', 'vlrAprovacaoDiretoriaDe', 'vlrAprovacaoGerRegionalAte', 'vlrAprovacaoGerRegionalDe');
	var dsFormConfiguracao = DatasetFactory.getDataset('dsFormCoordenadoresGerentes', colunasDsFormCoordenadoresGerentes, new Array(c1), null);

	if(dsFormConfiguracao.values.length > 0){

		var vlrAprovacaoCoordenadorDe = converteValorJS(dsFormConfiguracao.values[0].vlrAprovacaoCoordenadorDe);
		var vlrAprovacaoCoordenadorAte = converteValorJS(dsFormConfiguracao.values[0].vlrAprovacaoCoordenadorAte);

		var vlrAprovacaoGerRegionalDe = converteValorJS(dsFormConfiguracao.values[0].vlrAprovacaoGerRegionalDe);
		var vlrAprovacaoGerRegionalAte = converteValorJS(dsFormConfiguracao.values[0].vlrAprovacaoGerRegionalAte);

		var vlrAprovacaoDiretoriaDe = converteValorJS(dsFormConfiguracao.values[0].vlrAprovacaoDiretoriaDe);
		var vlrAprovacaoDiretoriaAte = converteValorJS(dsFormConfiguracao.values[0].vlrAprovacaoDiretoriaAte);


		if(valorSolicitacao >= vlrAprovacaoCoordenadorDe && valorSolicitacao <= vlrAprovacaoCoordenadorAte){
			//Aprovar

			$("#tipoAvaliacaoCoordenador").val("aprovar");  



		}else{
			//Validar

			$("#tipoAvaliacaoCoordenador").val("validar");  


		}

		if(valorSolicitacao >= vlrAprovacaoGerRegionalDe && valorSolicitacao <= vlrAprovacaoGerRegionalAte){
			//Aprovar

			$("#tipoAvaliacaoGerenteReg").val("aprovar");  



		}else{
			//Validar

			$("#tipoAvaliacaoGerenteReg").val("validar");  



		}


		if(valorSolicitacao >= vlrAprovacaoDiretoriaDe && valorSolicitacao <= vlrAprovacaoDiretoriaAte){
			//Aprovar


		}else{
			//Validar


		}



	}else{

		alert("Não foi encontrado formulário de configuração.");

	}




}



function ajustaLabelsAtividadeInterior(){

	var tipoAvaliacaoCoordenador = $("#tipoAvaliacaoCoordenador").val();  
	var tipoAvaliacaoGerenteReg = $("#tipoAvaliacaoGerenteReg").val();  

	if(tipoAvaliacaoCoordenador == "aprovar"){

		$(".labelCoordenador").text("Aprovação");
		$(".labelCoordenador_2").text("Aprovar");


	}else if(tipoAvaliacaoCoordenador == "validar"){

		$(".labelCoordenador").text("Validação");
		$(".labelCoordenador_2").text("Validar");



	}


	if(tipoAvaliacaoGerenteReg == "aprovar"){

		$(".labelGerenteRegional").text("Aprovação");
		$(".labelGerenteRegional_2").text("Aprovar");


	}else if(tipoAvaliacaoGerenteReg == "validar"){

		$(".labelGerenteRegional").text("Validação");
		$(".labelGerenteRegional_2").text("Validar");


	}


}


function converteValorJS(valor){

	return Number(valor.replaceAll(".","").replace(",","."));


}


function exibeParecerAssessorGE(){

	var parecer = $("#txa_parecerAssessorGerenteDir").val();

	if(parecer != ""){

		$("#parecerAssesorDivDiretor").show();
	}else{

		$("#parecerAssesorDivDiretor").hide();

	}

}

function validaTemParecer(){

	var parecer = $("#txa_parecerAssessorGerente").val();

	if(parecer != "" && $("#aprovadirexparecer")[0].checked){

		return confirm("Atenção: a opção selecionada foi de Solicita Parecer, porém, um parecer já foi realizado para esta solicitação. Deseja realmente enviar esta solicitação para um novo parecer? Clique no 'OK' para continuar.");

	}



}

function mostraFormSebraetec(){
	
	var tipoContratacao = $('[name="rd_formacontratacao"]:checked').val();
	
	
	if(tipoContratacao = "rodiziosebraetec"){
		
		$('#panel_etapasSebraeTec').show();
		$('#switchCutomizada').show();
		
	}else{
		$('#panel_etapasSebraeTec').hide();
		$('#switchCutomizada').hide();
	}
}

function verificaSeJaTemContratacaoNoAno() {
	
    var dataStr = $('#txt_datasol').val(); // Ex: "09/06/2025"
    var codigoFicha = $('#txt_hiddenCodigoFicha').val();
    var codParceiro = $('#txt_codParceiroRecorrente').val();
    var anoAtual = null;
    
    if (dataStr && dataStr.includes('/')) {
        var partesData = dataStr.split('/'); // ["09", "06", "2025"]
        anoAtual = partesData[2]; // Pega "2025"
    }

    var whereCodigoFicha = DatasetFactory.createConstraint('txt_hiddenCodigoFicha', codigoFicha, codigoFicha, ConstraintType.MUST);	
    var whereAno = DatasetFactory.createConstraint('anoContrato', anoAtual, anoAtual, ConstraintType.MUST);	
    var whereFornecedor = DatasetFactory.createConstraint('txt_codParceiroRecorrente', codParceiro, codParceiro, ConstraintType.MUST);

    var dsContratacao = DatasetFactory.getDataset('dsSGF', null, [whereCodigoFicha, whereFornecedor, whereAno], null);

    if (dsContratacao && dsContratacao.values && dsContratacao.values.length > 0) {
        temContratacaoNoAno = 'sim';
        //console.log('FOI ENCONTRADO CONTRATAÇÕES NO ANO');
    } else {
        temContratacaoNoAno = 'nao';
        //console.log('NÃO FOI ENCONTRADO CONTRATAÇÕES NO ANO');
    }

    buscaRecorrencia();
}



function buscaRecorrencia() {
    var codigoFicha = $('#txt_hiddenCodigoFicha').val() || '';
    var codParceiro = $('#txt_codParceiroRecorrente').val() || '';

    var whereCodigoFicha = DatasetFactory.createConstraint('txt_hiddenCodigoFicha', codigoFicha, codigoFicha, ConstraintType.MUST);
    var whereFornecedor  = DatasetFactory.createConstraint('txt_codParceiroRecorrente', codParceiro, codParceiro, ConstraintType.MUST);

    var dsContratacao = null;
    try {
        dsContratacao = DatasetFactory.getDataset('dsSGF', null, [whereCodigoFicha, whereFornecedor], null);
    } catch (e) {
        console.error('Erro ao chamar dsSGF:', e);
    }

    // Normaliza linhas (evita acessar .values sem existir)
    var rows = (dsContratacao && dsContratacao.values && Array.isArray(dsContratacao.values))
        ? dsContratacao.values
        : [];

    var qtdRegistros = rows.length;
    // console.log('qtdRegistros:', qtdRegistros); // <- seguro

    if (qtdRegistros === 0) {
        removerLinhasTabela('tb_recorrenciaFicha');
        $('#txt_percentualSubsidio').val('70');
        $('#percentualDesconto').text('Subsídio: ' + $('#txt_percentualSubsidio').val() + '%');
        mostrarSpanSubsidio();
        return; // encerra aqui quando não tem dados
    }

    // Tem dados
    calcularPercentualSubsidio(qtdRegistros);

    $("#tb_recorrenciaFicha tr:not([style*='display:none'])").remove();
    for (var i = 0; i < rows.length; i++) {
        var r = rows[i] || {};
        var index = wdkAddChild('tb_recorrenciaFicha');

        $('#txt_recorrenciaCodigo___'   + index).val(r["txt_hiddenCodigoFicha"]      || '');
        $('#txt_recorrenciaNomeEmpresa___' + index).val(r["txt_nomeClienteRecorrente"] || '');
        $('#txt_recorrenciaAno___'      + index).val(r["anoContrato"]                || '');
        $('#txt_recorrenciaNomoeFicha___' + index).val(r["txt_fichaSebraeTec"]        || '');
        $('#txt_recorrenciaNumeroSol___' + index).val(r["txt_numsol"]                 || '');

        // se você precisa dessas variáveis globais:
        anoContratado             = r["anoContrato"] || '';
        codFichaContratado        = r["txt_hiddenCodigoFicha"] || '';
        codParceiroSasContratado  = r["txt_codParceiroRecorrente"] || '';
    }
}




function calcularPercentualSubsidio(qtdLinhas){
	//console.log('Quantidade de linhas >>>>>>>>>>>>>>>>>>>> ' + qtdLinhas);
	
	switch(qtdLinhas){
	
	
	case 1:
		$('#txt_percentualSubsidio').val('60');	
		
		break;
		
	case 2:
		$('#txt_percentualSubsidio').val('50'); 
		break
		
	case 3:
		$('#txt_percentualSubsidio').val('40'); 
		break;
		
	case 4:
		$('#txt_percentualSubsidio').val('30');	
		break;
		
	case 5:
		$('#txt_percentualSubsidio').val('20');		
		break;		
		
	case 6:
		$('#txt_percentualSubsidio').val('10');		
		break;		
	case 7:
		$('#txt_percentualSubsidio').val('0'); 
		
		break;
		
		default:
			//console.log('testando a linha 3811');
		$('#txt_percentualSubsidio').val('0'); 
		$('#percentualDesconto').show();
		//console.log('testando a linha 3814');
	}
	
	
	$('#percentualDesconto').text('Subsídio: ' + $('#txt_percentualSubsidio').val() + '%');
	$('#percentualDesconto').show();
}

function mostrarSpanSubsidio(){
	
	
	var percentualSubsidio = $('#txt_percentualSubsidio').val();
	//console.log('valor do percentual hoje 04/07');
	
	if(percentualSubsidio){
		
		$('#percentualDesconto').show();
	}else{
		
		$('#percentualDesconto').hide();
	}
}

function ocultarSpanSubsidio(){
	
	//Caso a ficha seja trocada, limpa o percentual de desconto e oculta
	
	$('#percentualDesconto').hide();
	$('#txt_percentualSubsidio').val('');
	$('#ValorSebrae').hide();
	$('#ValorCliente').hide();
	
}

function  vericaSubsidioAplicado(){
	
	let tipoContratacao = $('[name="rd_formacontratacao"]:checked').val(); //verifica o tipo da contratação, se é SEBRAETEC
	let valorSubsidio = $('#txt_percentualSubsidio').val(); // pega o subsidio aplicado;
	let valorContratacao = $('#txt_valorTotalSebraeTec').val(); // total da solicitação
	//precoMaximodaFicha
;}




function BuscarClienteSas(){
	
	
	
	var documento = "";
	var fichaTecnica="";
	

		 	documento = $('#txt_clienteRecorrente').val(); //pega CPN/CPNJ
		 fichaTecnica = $('#txt_fichaSebraeTec').val();	// Pega a ficha técnica
		 
		 
		 
		 var dataStr = $('#txt_datasol').val(); // Ex: "09/06/2025"
			
		 if (dataStr && dataStr.includes('/')) {
		        var partesData = dataStr.split('/'); // ["09", "06", "2025"]
		        anoContratacaoSolicitando = partesData[2]; // Pega "2025"
		    }if (documento == "" || fichaTecnica == "" ) {
		    	
		    	FLUIGC.toast({ title: 'Atenção: ', message: 'Informe o CPF/ CNPJ do cliente e a ficha Ténica para consulta.', type: 'warning' });	       
		        return;
		       
		    }else{
		    		
		    		 // Remove formatação
				    var documentoLimpo = documento.replace(/\D/g, '');
				    

				    // Define tipo com base no tamanho
				    var tipo = documentoLimpo.length === 11 ? 'Fisica' : 'Juridica';
				    
				    // Cria constraints
				    var c1 = DatasetFactory.createConstraint('tipo', tipo, tipo, ConstraintType.MUST);
				    var c2 = DatasetFactory.createConstraint('cpfCNPJ', documentoLimpo, documentoLimpo, ConstraintType.MUST);
				    
				    // Chamada do dataset
				    var dataset = DatasetFactory.getDataset('ds_SAS_clientes', null, [c1, c2], null);


			    if (dataset && dataset.values && dataset.values.length > 0) {
			    	
			    	var cliente = dataset.values[0];
			        if (cliente.CgcCpf) {
			        	
			        	 if(cliente.Tipo_Pessoa == 'F'){  
			        		 
			        		 //console.log('pessoa física');
				            	
			            	 $('#txt_clienteRecorrente').mask('000.000.000-00');	            	
			            	 $('#txt_tipoParceiroRecorrente').val('Pessoa Física');
			            }else{
			            	
			            	 //console.log('pessoa jurídica');
			            	$('#txt_clienteRecorrente').mask('00.000.000/0000-00');
			            	$('#txt_tipoParceiroRecorrente').val('Pessoa Jurídica');
			            }
			           
			        	$('#txt_nomeClienteRecorrente').val(cliente.NomeRazaoSocial);
			            $('#txt_codParceiroRecorrente').val(cliente.CodParceiro);
			            $('#txt_cnpjCpfRecorrente').val(documento);
			            
			            codParceiroSolicitando = cliente.CodParceiro;  
				    	  verificaSeJaTemContratacaoNoAno();
				    	  mostraRecorrencia();
			           
			        } else {
			            FLUIGC.toast({ title: 'Atenção: ', message: 'Cliente não encontrado.', type: 'warning' });
			        }
			    } else {
			        FLUIGC.toast({ title: 'Erro: ', message: 'Não foi possível consultar o cliente.', type: 'danger' });
			    }
		    	
		    	
		    } 

}



function mostraRecorrencia(){
	
	  const $tabela = $('#tb_recorrenciaFicha');
	    const linhasCorpo = $tabela.find('tbody tr').length;
	    if(linhasCorpo >1){
	    	$('#tabelaRecorrenciaSebraetec').show();
	    }
}

function removerLinhasTabela(nomeTabela){
	
	 // Busca qualquer campo da linha da tabela (não precisa saber o nome exato)
    $("table#" + nomeTabela + " tr").each(function () {
        // Procura por qualquer campo com name que contenha ___ (linha pai x filho)
        if ($(this).find("input[name*='___']").length > 0) {
            fnWdkRemoveChild($(this).find("input[name*='___']")[0]);
        }
    });
    
   
}




function OcultarCampo(){
	
	 var checked = $('#switchCutomizada').is(':checked');
	 //console.log('chamou a função ' + checked);
	    
	    if (checked === true) {
	        $('#panel_entregasEtapas').fadeOut();
	        
	    } else {
	    	 $('#panel_entregasEtapas').fadeIn();
	    	    $('#ValorSebrae').hide();
		        $('#ValorCliente').hide();
	    }
	
	
}


function CalculaTotalFichaSebraeTec() {
    var total = 0;
    var totalHoras = 0;
    // Percorre todos os inputs da tabela com name começando por txt_valorFichaTecnica
    $("input[name^='txt_valorFichaTecnica___']").each(function () {
        var valorStr = $(this).val();

        // Remove máscara R$ e converte para número
        if (valorStr) {
            // Substitui ponto por vazio e vírgula por ponto para formato brasileiro
            var valor = parseFloat(valorStr.replace(/\./g, '').replace(',', '.'));
            if (!isNaN(valor)) {
                total += valor;
            }
        }
    });

    // Formata o total de volta para o formato brasileiro e insere no campo total
    var totalFormatado = total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    $("#txt_totalEntregasEetapas").val(totalFormatado);
}

function SomarTotalSebraetec(){
	
	var total = 0;
	var qtdHoraSebraetec = $('#txt_qtdHorasSebraeTec').val();
	var valorHoraSebratec = $('#txt_valorHoraSebraetec').val(); 
	
	var valorHoraFormatado = parseFloat(valorHoraSebratec.replace(/\./g, '').replace(',', '.'));
	total = parseFloat (valorHoraFormatado) * parseInt (qtdHoraSebraetec);
	var totalFormatadoSebraetec =  total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	
	$('#txt_valorTotalSebraeTec').val(totalFormatadoSebraetec);
	
	
	calculaTotalSebraeECliente();
	
		
}

function SomaDeslocamento(){
	
	SomarTotalSebraetec();
	let vlrDeslocamento = $('#txt_valorDeslocamento').val();
	let vlrSolicitacao = $('#txt_valorTotalSebraeTec').val();
	
	let vlrDeslocamentoFormatado = parseFloat(vlrDeslocamento.replace(/\./g, '').replace(',', '.'));
	let vlrSolicitacaoFormatado = parseFloat(vlrSolicitacao.replace(/\./g, '').replace(',', '.'));
	
	let totalGeral = parseFloat(vlrDeslocamentoFormatado) + parseFloat(vlrSolicitacaoFormatado);
	
	
	$('#txt_valorTotalSebraeTec').val(totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
	calculaTotalSebraeECliente();
	
	
}


function calculaTotalSebraeECliente() {
    var percentualSubsidio = $('#txt_percentualSubsidio').val();
    var totalContratacao = $('#txt_valorTotalSebraeTec').val().replace(/\./g, '').replace(',', '.');

    var valorSebrae = (parseFloat(percentualSubsidio) * parseFloat(totalContratacao)) / 100;
    var valorCliente = parseFloat(totalContratacao) - valorSebrae;

    $('#ValorSebrae').text( 'Valor Sebrae  '+ formatarParaReal(valorSebrae));
    $('#ValorCliente').text('Valor Cliente '+ formatarParaReal(valorCliente));
    
    $('#txt_ValorSebrae').val(formatarParaReal(valorSebrae));
    $('#txt_valorCliente').val(formatarParaReal(valorSebrae));
    
    
    mostraValorSebraeEValorCliente();
}


const formatarParaReal = (valor) => {
	  return new Intl.NumberFormat('pt-BR', {
	    style: 'currency',
	    currency: 'BRL',
	    minimumFractionDigits: 2
	  }).format(valor);
	};



function mostraValorSebraeEValorCliente(){
	
	
	//console.log('chamou a função mostraValorSebraeEValorCliente');
	
	let sebrae = $('#txt_ValorSebrae').val();
	let cliente = $('#txt_valorCliente').val();
	
	
	
	
	if(sebrae && cliente){
		$('#ValorSebrae').show();
		$('#ValorCliente').show();
		
	}else{
		$('#ValorSebrae').hide();
		$('#ValorCliente').hide();
	}
	
}

var totalHoraEtapas = 0;



function calculaTotalSebraeTec() {
    var vlrHora = parseFloat($('#txt_valorHoraSebraetec').val().replace(/\./g, '').replace(',', '.')) || 0;
    var totalGeral = 0;

    if (vlrHora === 0) {
        message('Informe o valor da hora!');
        return;
    }

    // 1. Percorre cada linha e calcula subtotal
    $("[name^='txt_cargaHorariaFicha___']").each(function () {
        var index = this.name.split("___")[1];
        var cargaHoraria = parseFloat(this.value.replace(',', '.')) || 0;

        var subTotalHora = cargaHoraria * vlrHora;

        $('#txt_valorFichaTecnica___' + index).val(subTotalHora.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));
    });

    // 2. Soma todos os valores da coluna txt_valorFichaTecnica___
    $("[name^='txt_valorFichaTecnica___']").each(function () {
        var valor = parseFloat(this.value.replace(/\./g, '').replace(',', '.')) || 0;
        totalGeral += valor;
    });

    // 3. Atualiza total geral
    $('#txt_totalEntregasEetapas').val(totalGeral.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }));

    // 4. Chama a função de carga horária
    somaCargaHorariaEntregas();
}


var horasFrancaoMaior = false;

function somaCargaHorariaEntregas(){
	
	var totalCargaHoraria = 0;
	var totalHoraSolicitado = $('#txt_totalEntregasEetapas').val();
	
	    $("input[name^='txt_cargaHorariaFicha___']").each(function () {
	       
	    	var qtdHora = $(this).val();
        	
	    	// Substitui ponto por vazio e vírgula por ponto para formato brasileiro
            var qtdHora = parseFloat(qtdHora.replace(/\./g, '').replace(',', '.'));
            if (!isNaN(qtdHora)) {
            	totalCargaHoraria += qtdHora;
            }
	       
	    });
		
	    $('#txt_conferenciaHoraEntrega').val(totalCargaHoraria);
	    $('#_txt_valor_total_carga').val(totalCargaHoraria);
	   
	    
	    
	
	    
	    
    if(totalCargaHoraria > totalHoraSolicitado ){
    	horasFrancaoMaior = true;
    }
	
}

function geraCodigoEntrega(){

    $("[name^='txt_numeroEntrega___']").each(function(indice){
        this.value = indice+1;
    });
    
}



function espelhaDadosEntrega() {
	
	  
	  $(".remove-grandchild").hide(); // Oculta o botão de delte, para que somente seja possível pelo botão de deletar da tabela entregas
	  
	  $('#tb_EntregaFichaTecnica tbody tr').each(function (rowPos) {
	    const $tr = $(this);

	    // Descobre o index do Fluig na linha (___N). Fallback: posição visual (1-based)
	    let idx = null;
	    const $p = $tr.find('[id*="___"],[name*="___"]').first();
	    if ($p.length) {
	      const token = $p.attr('id') || $p.attr('name') || '';
	      const m = token.match(/___(\d+)$/);
	      if (m) idx = m[1];
	    }
	    if (!idx) idx = String(rowPos + 1);

	    // Coleta os valores da linha pai (colunas 2..5)
	    //const valEntregas = $tr.find('td:eq(2) :input').first().val() || '';
	    const valEntregas = $tr.find('[name^="hidden_ta_detalheEtapas"]').val() || ''; //vagner
	    const valData     = $tr.find('td:eq(3) :input').first().val() || '';
	    const valCarga    = $tr.find('td:eq(4) :input').first().val() || '';
	    const valValor    = $tr.find('td:eq(5) :input').first().val() || '';
	    
	    
	    $('#vl_nr_entrega_medicao_item_Neto_' + idx).prop('readonly', true);
	    $('#ds_descricao_entrega_item_Neto_' + idx).prop('readonly', true);
	    $('#dt_medicao_item_Neto_' + idx).prop('readonly', true);
	    $('#vl_carga_horaria_item_Neto_' + idx).prop('readonly', true);
	    $('#vl_medicao_item_Neto_' + idx).prop('readonly', true);
	   
	    
	    $('#ds_descricao_entrega_item_Neto_' + idx).val(valEntregas);
	    $('#dt_medicao_item_Neto_' + idx).val(valData);
	    $('#vl_carga_horaria_item_Neto_' + idx).val(valCarga);
	    $('#vl_medicao_item_Neto_' + idx).val(valValor);
	    
	  });
	}

