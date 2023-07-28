/* GESTIONE DEI TOOLTIP
*/

const tooltips   = document.querySelectorAll('[data-satooltip-msg]');

// timing options
const animateOpt = { duration: 3000,iterations: 1, fill: 'forwards' 	}

export default class SaTooltip {
	
		
	static tooltip(){
		
		tooltips.forEach(item => {
			item.addEventListener('click',function(){
				item.classList.contains('sa-tooltip-show') ? item.classList.remove('sa-tooltip-show') : item.classList.add('sa-tooltip-show'); 											
			});
		});
		
	}//end function tooltip
	
	
	
	
	
	/* Inizializza la classe SaModals */
	static init(){
		this.tooltip()
		console.log('saSaTooltip');
	}


}//end SaModals



