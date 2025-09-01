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
}

function calculaConsultoria(){
	$('#id_calculoConsultoria').show();
}

function ocultaConsultoria(){
	
	$('#id_calculoConsultoria').hide();
}

function calculaInstrutoria(){
	$('#id_CalculoInstrutoria').show();
}

function ocultaInstrutoria(){
	$('#id_CalculoInstrutoria').hide();
}
