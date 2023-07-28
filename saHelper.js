export default class SaHelper {
	
	static toggleClass( element, el_class ){
		element ? (element.classList.contains(el_class) ? element.classList.remove(el_class) : element.classList.add(el_class)) : "";
	}//toggleClass
	
	
	/*
	* Funzione che gestisce lo switch tra display none e display.
	* display_type può essere block/flex etc.
	* @element Element elemento DOM a cui applicare il toggle
	*
	*/
	static toggleDisplay(element, display_type=''){
		display_type ? "" : display_type = 'block';
		element ? (element.style.display == 'none' ? element.style.display = display_type : element.style.display = 'none') : "";
	}//toggleDisplay
	
	
	/*
	* Funzione che viene usata per verificare o meno l'esistenza di un elemento DOM
	* @element Element elemento DOM del quale verificare l'esistenza
	* 
	*/
	static elementExist(element){
		let res;
		(typeof(element) != 'undefined' && element != null) ? res =  true : res =  false ;
		return res;
	}//elementExist
	
	
	
/* FUNZIONI APPOGGIO */	
	
	
	/*
	* Funzione aprie e chiudere il blocco admin SE ESISTE
	*
	*
	*/
	static mainHeadAdmin(){
		let admin_info = document.querySelector('#AdminInfo');
		//DEBUG-->console.log(admin_info);
		if(!this.elementExist(admin_info)) return;
		
		document.querySelector('#AdminInfoContent').style.display = 'none';
		document.querySelector('#AdminInfoToggle').addEventListener('click', ()=>{
			SaHelper.toggleDisplay(document.querySelector('#AdminInfoContent'));
		})
		
	}
	
	
	/*
	* Funzione per validare l'email nel campo iscrizione newsletter del pre-footer
	*
	*
	*/
	static validateEmail(email_selector){
			
		let email_field = document.querySelector('div.newsletter__form input#pmail');
		let email = email_field.value;
		let popover = document.querySelector('div.sa_popover');
		var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		
		email_field.addEventListener('keyup', (event) => {
			//console.log(`key: ${event.key} has been released`);
			popover.style.display = 'none';
		});
		if(filter.test(email)){
			document.querySelector('#cFormNewsletter').submit();
		}else{
			popover.style.display = 'block';
			//DEBUG-->console.log('email non valida');
		}
	}//end validationEmail

}//end SaHelper