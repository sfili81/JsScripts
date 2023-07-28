/* GESTIONE DELLE MODALI GENERICHE 
	- Creo la funzione open/close-> cerca se ha display block se si nasconde se no setta display block
	- Cerco tutti gli elementi cliccabili che hanno attributi data-modal e ottengo un array
	- ciclo l'array e per ogni elemento:
	  1- recupero il valore di data-modal (corrisponde all'id della modale da aprire)
		2- aggiungo l'ascoltatore all'elemento
		3- al click ci associo la funzione open/close con parametro l'id della modale
*/


const nsl_modal_wrapper = document.querySelector('#modal-nsl');//contenitore della modale popup newsletter
const nsl_modal         = document.querySelector('#modal-nsl .sa-modal');// modale popup newsletter
const mysa_modal_list   = document.querySelectorAll('[data-modal]'); //tutte le modali   

export default class SaModals {
	
	/*
	* Funzione che gestisce l'apertura e la chiususra di una modale
	*
	*/
	static modal_openClose(el){		
		let modal = document.querySelector('#'+el);
		let body_el = document.querySelector('#'+el);

		let isOpen = window.getComputedStyle(modal).getPropertyValue('display');
		isOpen === 'flex' ? modal.style.display = "none" : modal.style.display = "flex";
		modal.style.display === "none" ? document.body.classList.remove("modal-open") : document.body.classList.add("modal-open") ;
	}	
	
	/* 
	*	Funzione per riportare ogni modale 
  * in posizione iniziale
	*/
	static resetModal(modal){	
		let items = document.querySelectorAll('#' + modal + " .modal-body > *");
		items.forEach(function(el,index) {
			//display block for first element, none for the others
			index > 0 ? el.style.display = "none" : el.style.display = "block";
		});
	}

	/* DA RIPENSARE TENENDO CONTO DELLE MODALI DELLA SCHEDA PRODOTTO
 	 * Funzione per inizializzare le modali
 	 * per ogni modale aggiungo gli ascoltatori al pulsante x e mostro/chiudo la modale
 	 */
	static initModals(){
		mysa_modal_list.forEach(el => {
			let modal = el.getAttribute('data-modal');
			console.log(modal);
  		el.addEventListener('click', (el) => {
				el.preventDefault();
				SaModals.modal_openClose(modal)
			});
	
			let el_x_modal = document.querySelector('#'+modal+' .sa-close-modal');
			el_x_modal.addEventListener('click',  () => {
				SaModals.modal_openClose(modal);
				SaModals.resetModal(modal);
			});
		
		});
	}//end initModals
	
	/*
	*  Funzione per la gestione del popup
	*  iscrizione newsletter
	*/
	static popupNewsletter(){
		
		if(!nsl_modal)
			return
		//mostro wrapper scuro popup newsletter
		nsl_modal_wrapper.style.display = 'block';
		//this.modal_openClose('modal-nsl')
		nsl_modal_wrapper.classList.add('an');//animazione background
		//mobile
		if(window.innerWidth < 460){
			nsl_modal.animate({
				left: "50%",
		  	}, 500);
		}else{//desktop
			nsl_modal.animate({
				left: "0",
		  	}, 500);
		}
		
		//close modal
		document.querySelector('.sa-close-modal').addEventListener('click', () => {
			nsl_modal_wrapper.classList.remove('an');//rimuovo animazione background
			nsl_modal.animate({
				left: "-100%",
			  }, 500,
			  function() {
					nsl_modal_wrapper.style.display = 'none';
			  }						  
			);
		});// end close modal
		
		//submit
		document.querySelector('#modal-submit').addEventListener('click' ,function(e){
			e.preventDefault();
			let email = document.querySelector('input.nsl_mail').value;
			let filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			
			if(filter.test(email)){
				document.querySelector('#modal-form-nsl').submit()
			}else{
				document.querySelector('.sa-modal .sa_nsl_error').style.display = 'block'
				
				document.querySelector('#modal-form-nsl').classList.add('nsl_mail_error');
				document.querySelector('#modal-submit').classList.add('nsl_button_error');
			}
			
		})//end submit
		
		
	}//end popupNewsletter
	
	/*
	*  Funzione per la gestione delLA MODALE DELLE LEINGUE
	*  
	*/
	static selectLanguage(){
		let modal_lang = document.querySelectorAll('[data-modal-lang="modal-language-selector"]'); 
		modal_lang.forEach(el => {
			let modal = el.getAttribute('data-modal-lang');
  		el.addEventListener('click', (el) => {
				el.preventDefault();
				SaModals.modal_openClose(modal)
			});
		});
		let el_x_modal = document.querySelector('#modal-language-selector .sa-close-modal');
			el_x_modal.addEventListener('click',  () => {
				SaModals.modal_openClose('modal-language-selector');
				//SaModals.resetModal(modal);
			});
	}
	
	
	/* Inizializza la classe SaModals */
	static init(){
		
			/*
		* se sono nella pagina prodotto allora le modali generiche non devono essere
		* inizializzate perchè esiste una classe in sa-product-page.js
		*/
		if(document.querySelector('.product-page')){
			console.log('product-page');
			return;
		}
			
		
		this.popupNewsletter();
		this.selectLanguage();
		this.initModals();
		//DEBUG-->console.log('saModalsModule');
	}


}//end SaModals

