/******************************************************************************************************************************
    Federico Sfiligoi
    Javascript nuova area riservata

*******************************************************************************************************************************/

/* GESTIONE DELLe MODALI 
	- Creo la funzione open/close-> cerca se ha display block se si nasconde se no setta display block
	- Cerco tutti gli elementi cliccabili che hanno attributi data-modal e ottengo un array
	- ciclo l'array e per ogni elemento:
	  1- recupero il valore di data-modal (corrisponde all'id della modale da aprire)
		2- aggiungo l'ascoltatore all'elemento
		3- al click ci associo la funzione open/close con parametro l'id della modale
*/

const modal_openClose = (el) => {
	let modal = document.querySelector('#'+el);
	let body_el = document.querySelector('#'+el);
	
	let isOpen = window.getComputedStyle(modal).getPropertyValue('display');
	isOpen === 'flex' ? modal.style.display = "none" : modal.style.display = "flex";
	modal.style.display === "none" ? document.body.classList.remove("modal-open") : document.body.classList.add("modal-open") ;
	//modal.style.display === "none" ? modal.classList.remove("show") :  modal.classList.add("hide") ;
	
	//document.body.classList.remove("modal-off");
}	

/* RESET MODALE ************************
*	Funzione per riportare ogni modale 
  in posizione iniziale
***************************************/
function resetModal(modal){	
	let items = document.querySelectorAll('#' + modal + " .modal-body > *");
	items.forEach(function(el,index) {
		//display block for first element, none for the others
		index > 0 ? el.style.display = "none" : el.style.display = "block";
	});
}

/*******
 per ogni modale aggiungo gli ascoltatori al pulsante x e mostro/chiudo la modale
*******/
const mysa_modal_list = document.querySelectorAll('[data-modal]');
mysa_modal_list.forEach(el => {
	
	let modal = el.getAttribute('data-modal');
  el.addEventListener('click', (el) => {el.preventDefault();modal_openClose(modal)});
	
	let el_x_modal = document.querySelector('#'+modal+' .sa-close-modal');
	el_x_modal.addEventListener('click',  () => {modal_openClose(modal);resetModal(modal);});
		
});

/** GESTIONE MODALE ANOMALIA ORDINE **/
let btn_open_anomalia =document.querySelectorAll('.open-form-anomalia'); 
//console.log(btn_open_anomalia);
if(btn_open_anomalia){
	btn_open_anomalia.forEach(el => {		
		let modal = el.dataset.parent;
		let info_txt = document.querySelector('#'+modal+' .info-text');
		let form_anomalia = document.querySelector('#'+modal+' .form-anomalia');
		el.addEventListener('click',  () =>{
			info_txt.style.display = 'none';
			form_anomalia.style.display = 'block';
		});
		
		document.querySelector('#'+modal+' .sa-close-modal').addEventListener('click',  () =>{
			info_txt.style.display = 'block';
			form_anomalia.style.display = 'none';
		});
		
	});
}

/** END GESTIONE MODALI +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++**/

/** GESTIONE LA MIA NEWSLETTER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
if(document.querySelector('#mysa-newsletter-form')){//se esiste il form newsletter
	let nsl_switch = document.querySelector('#switch-nsl');
	let nsl_check  = document.querySelector('.sa-switch');
	let mysa_prv   = document.querySelector('.mysa_nsl_prv');
	let result     = document.querySelector('#nsl_switch_ok');
	let result_txt = document.querySelector('#nsl_switch_txt');
	//start position
	//nsl_check.checked ? mysa_prv.style.display = 'inline-block' : mysa_prv.style.display = 'none';
	
	//result.style.display='none';//nascondo il risultato
	
	nsl_check.addEventListener('click', (e)=>{
		e.stopPropagation();		
		//Json da passare all' endpoint
			let nsl_json = JSON.stringify({
						data:{
							type: "mysa-nsltoggle",
							id: '1',
							attributes:{
								nsl : nsl_check.checked
							}
						}
			});
		
		//console.log(nsl_json);
		//console.info('pre fetch ' + nsl_check.checked)
		fetch("https://www.sediarreda.com/it/api/v1/set", {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: nsl_json// --> json
		})
		.then( (response) => { 
			result.style.display='block';
			if(nsl_check.checked){
				result_txt.style.display='block';
			}
			nsl_check.disabled = true;
			setTimeout(function(){ 
				result.style.display='none';
			}, 5000);
		})
		.catch((error) => {
			console.error('Error:', error);
		});			
		
	});//close listener
}


/** END GESTIONE LA MIA NEWSLETTER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/** GESTIONE PASSWORD **/
if(document.querySelectorAll('.wrap-psw')){
										
	let togglePassword = document.querySelectorAll('.eye');
	//console.log(togglePassword);
	togglePassword.forEach(function(item) {
												
		item.addEventListener('click', () => {
			//console.log(item);
			const ip = item.previousElementSibling;
			//console.log(ip);
			const type = ip.getAttribute('type') === 'password' ? 'text' : 'password';
			//console.log(type);
			ip.setAttribute('type', type);
													
			item.classList.toggle('eye_off');
			item.classList.toggle('eye_on');
													
		});
	});
}
									
