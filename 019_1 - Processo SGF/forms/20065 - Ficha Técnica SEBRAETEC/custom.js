$(document).ready(function (obj) {
    const numState = getWKNumState();
    let anoatual =  new Date().getFullYear();
    $('#txt_anoCadastro').val(anoatual);
    incrementaContador();
    
    aplicaMascara();
   
});

function adicionaCodigoAutomaticoEntregas(){	

    $("[name^='txt_codEntrega___']").each(function(indice){
        this.value = indice+1;
    });
    
}

function adicionaCodigoAutomaticoEtapas(){	

    $("[name^='txt_codEtapas___']").each(function(indice){
        this.value = indice+1;
    });
    
}


function aplicaMascara(){
//	$('.cpf').mask('000.000.000-00');	
//	$('.hora').mask('00:00');
//	$('.cnpj').mask('00.000.000/0000-00');
	$('.moeda').mask("#.##0,00", {reverse: true});

}








function setSelectedZoomItem(selectedItem) {
	
	 if(selectedItem.inputName == "z_area"){	
		reloadZoomFilterValues("z_subarea", "IdArea,"+selectedItem["idArea"]);
	}
	
}


function removedZoomItem(removedItem) {	
	if(removedItem.inputName=="z_area");
	window["z_subarea"].clear();
}


function incrementaContador(){
	
		let anoatual =  new Date().getFullYear();
		let txt_seqNumeroSup = $('#txt_codigoSolucao').val();
		console.log('Ano atual ' + anoatual);
		var filtroAno = DatasetFactory.createConstraint('txt_anoCadastro', anoatual, anoatual, ConstraintType.MUST);		
		var dsUltimoNumero = DatasetFactory.getDataset('dsFichaTecnicaSebraeTec', null, new Array(filtroAno), new Array('txt_codigoSolucao'));
	
	    if(dsUltimoNumero.values.length == 0){	    	
	    	
      	numContratoPrevisto = 1;      	
     	 $('#txt_codigoSolucao').val(numContratoPrevisto);
		 
	    }else {
	    	console.log('entrou no else');
	      	numContratoPrevisto = parseInt(dsUltimoNumero.values[dsUltimoNumero.values.length-1]["txt_codigoSolucao"]) + 1;	
	      
	      	 $('#txt_codigoSolucao').val(numContratoPrevisto);
			
	      }	
		
	
}

//
//function incrementaContador() {
//    let anoAtual = new Date().getFullYear();
//    console.log('Ano atual: ' + anoAtual);
//
//    let filtroAno = DatasetFactory.createConstraint('txt_anoCadastro', anoAtual.toString(), anoAtual.toString(), ConstraintType.MUST);
//    let dsUltimoNumero = DatasetFactory.getDataset('dsFichaTecnicaSebraeTec', null, [filtroAno], ['txt_codigoSolucao']);
//
//    let novoNumero = 1; // valor padrão se não houver registros válidos
//
//    if (dsUltimoNumero && dsUltimoNumero.values.length > 0) {
//        let maiorNumero = 0;
//
//        for (let i = 0; i < dsUltimoNumero.values.length; i++) {
//            let valor = dsUltimoNumero.values[i]['txt_codigoSolucao'];
//
//            if (valor && !isNaN(valor)) {
//                let numero = parseInt(valor, 10);
//                if (numero > maiorNumero) {
//                    maiorNumero = numero;
//                }
//            }
//        }
//
//        novoNumero = maiorNumero + 1;
//        console.log('Novo número gerado: ' + novoNumero);
//    } else {
//        console.log('Nenhum registro encontrado. Iniciando com 1.');
//    }
//
//    $('#txt_codigoSolucao').val(novoNumero);
//}




