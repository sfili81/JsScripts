/* GESTIONE DELLE ACCORDION 
*
*  STRUTTURA : 
*  elemento per apertura accordion: [data-sa-accordion-target] -> OBBLIGATORIO id dell'elemento da aprire
*																		[data-accordion-state]  -> OBBLIGATORIO indica se il target è aperto oppure no
*																		[data-sa-accordion-parent] -> FACOLTATIVO indica il genitore, se presente allora esiste un sottolivello
*/

const filter_select   = document.querySelectorAll('.filter-select');

// timing options
const animateOpt = { duration: 3000,iterations: 1, fill: 'forwards' 	}

export default class SaAccordion {
		
	/* Funzione recupero tutti i pulsanti cliccabili per aprire l'accordion */
	static getAccordionOpener(){
		let opener = document.querySelectorAll('[data-sa-accordion-target]');
		return opener
	}
	
	/*
	 * Funzione Ricorsiva che si occupa dell'apertura e della chiusura di un elemento
	*/
	static toggleAccordion(target){
		//toggle on element display
		target.style.display === 'block' ? target.style.display = 'none' : target.style.display = 'block' 
		
		//cerco se l'elemento da aprire ha dei pulsanti che apron dei sottolivelli
		let target_child = target.querySelectorAll('[data-sa-accordion-target]');// trovo se il target ha pulsanti per  sottolivelli
		
		//se li ha cerco i pulsanti con data accordion state collapsed e chiudo il relativo target
		if(target_child.length > 0){
			target_child.forEach(function(tgt) {
				let sub_target_id = tgt.dataset.accordionTarget;
				let sub_target = document.querySelector('#'+sub_target_id);
				
				if(tgt.dataset.accordionState === 'collapsed'){
					SaAccordion.toggleClassOpener(tgt);
					SaAccordion.toggleAccordion(sub_target);
				}
					
			});
		}
	}
	
	/*
	* Funzione che aggiunge o rimuove la classe collapsed [ indica cosa deve fare il pulsante (ruotare etc etc)]
	* Inoltre aggiune lo stato dell'elemento da visualizzare tramite  dat-accordion-state
	*
	*/
	static toggleClassOpener(element){
		element.classList.contains('collapsed') ? element.classList.remove('collapsed') : element.classList.add('collapsed')
		let isCollapse = element.dataset.accordionState;
		
		isCollapse === 'collapse' ? element.setAttribute('data-sa-accordion-state', 'collapsed') : element.setAttribute('data-sa-accordion-state', 'collapse')
	}
	
	/* CAPIRE A COSA SERVE */
	static accordion(){
		const btn = this.getAccordionOpener();
		btn.forEach(function(elem) {
			
			elem.addEventListener('click', function(e){
				
				e.preventDefault();
				SaAccordion.toggleClassOpener(elem);
				let target_id = elem.dataset.accordionTarget;
				let target    = document.querySelector('#'+target_id);
				SaAccordion.toggleAccordion(target);//apro e chiudo
			});// end listener
			
			
		})//end forEach
		
	}
	
	
	/*static removeClassList(items){
		items.forEach(item => {
			item.classList.remove('filter-select--open');
		});
	}*/
	
	
	
	
	/* Inizializza la classe SaModals */
	static init(){
		//DEBUG-->console.log('saAccordion ');
		this.accordion();
	}


}//end SaModals



