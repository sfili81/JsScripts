/*******************************************************************************************************************/
	/** CLASSE VALIDAZIONE FORM 
	*    form             --> elemento form
	*    error_list       --> List degli errori definita in testa all'html
	*    type_form        --> tipo di submit richiesto default = POST, api = AJAX/FETCH
	*    validation_html5 --> indica se si voglio utlizzare [true] oppure no [false] i messaggi standard delle API HTML5 per la validazione dei campi
	**/
	class SaFormValidator {
		constructor(form, error_list, type_form = 'default', validation_html5 = true) {
			this.form = form //
			this.inputs = document.querySelectorAll('[required]') //tutti i campi che hanno un attributo required
			this.error_list = error_list // lista possibili errori già tradotta
			this.type_form = type_form //tipo di submit 
			this.validation_html5 = validation_html5 //attiva o disattiva la validazione standard
			//Se esiste un messaggio di ringraziamento
			if(document.querySelector('#messageSend')){
				this.messageSend = document.querySelector('#messageSend');	 
			}						
			let self //riferimento generico al contesto della funzione stessa , rende il this disponibile senza scoping
		}

		initialize() {
			//DEBUG --> console.log('class v 1.4.8');
			self = this;//generic context for class reference
			
			//se form è vuoto esco e non valido nulla
			if(!self.form || this.form === ""){
				return false;
			}			
			self.setValidationFormType()		
			//console.log(self.error_list);
			//self.setErrorObj();
			self.validate();
			self.validateOnSubmit();// --> here we call the fetch to the API and process the response
		}//end initialize
		
		/* setValidationFormType
		*   - rimuove la validazione base HTML5, i campi required funzionano ma la validazione viene
		*     implementata custom
		*/
		setValidationFormType(){
			if(!self.validation_html5)
				self.form.setAttribute("novalidate", true);
		}
				
		/* validate
		*   - aggiunge un ascoltatore a tutti i campi required
		*   - richiama la funzione ValidateField
		*/		
		validate() {
			this.inputs.forEach(function(input) {
				input.addEventListener('input', self.validateField)  //input
				input.addEventListener('focusout', self.validateField) 
			});
		}
		
		/* validateOnSubmit
		*   - Validazione al SUBMIT
		*     N.B: se usiamo fetch per chiamare una API basta usare poi 
		* 		new FormData(form); senza la necessita di trasformarlo in JSON [TESTARE]
		*/
		validateOnSubmit(){
			self.form.addEventListener('submit', function(e){
				e.preventDefault();
				//DEBUG-->console.log(form.checkValidity());							
				
				if (self.form.checkValidity() == false) {//validation don't pass [ probably form is set as novalidate]
					let list = self.form.querySelectorAll(':invalid');
					for (var item of list) {
						//console.log(item.validity);
						self.setStatus(item, 'error')
					}
				}else{
					switch(self.type_form){
						case 'api':	
							new FormData(form);
						break;
					case 'default':
						self.form.submit();	
						break;
					default:
						self.form.submit();
					}//end switch
					//new FormData(form);
				}
				
			});//end listener form submit
	
			//Listener per fetch data [QUI CHIAMATA API]
			//viene chiamato quando un formdata è stato creato
			self.form.addEventListener('formdata', (e) => {
				//DEBUG-->console.log('formdata fired on validator class');
				// Get the form data from the event object
				let data = e.formData;
				//DEBUG --> console.log(data);//in teoria basta questo per fetch [DA VERIFICARE]
				//DEBUG--> console.log(JSON.stringify(data.values()));
				//DEBUG--> console.log(data.keys());
				for (var value of data.values()) {
					//DEBUG-->console.log(value);
				}
				
				//FARE CHIAMATA FETCH QUI
				//faccio comparire un messaggio di corretto invio dei dati se tutto ok
				this.form.style.display = 'none';
				this.messageSend.style.display = 'block';
				
			});
		}//end validateOnSubmit
		
		/*
		* ValidateField
		*  - controlla se un campo (passato come parametro) è valido 
		*    e chiama la funzione setStatus 
		*/
		validateField(e) {
			let el = e.target; //valid_field			
			//qui devo controllare se sono anche nel ripeti password
			if(el.id === 'mysa_users_pwd_chk' || el.id === 'mysa_users_pwd'){
				self.checkPasswordConfirmValidity();
			}//mysa_users_pwd_chk
			
			console.log(this.labelStatus);
			
			if(el.validity.valid){// valid field
				self.setStatus(el, 'valid');
			}else{// invalid field					
				self.setStatus(el,'error');				
			}
		}//end ValidateField
		
		/* checkPasswordConfirmValidity
		*  - controlla che le password siano coincidenti 
		*    e setto il relativo errore
		*/
		checkPasswordConfirmValidity(){
			let psw = document.querySelector('#mysa_users_pwd');
			let psw_repeat = document.querySelector('#mysa_users_pwd_chk');
			if(!psw_repeat) return;//se non c'è il campo password repeat esco
			if ( psw.value === psw_repeat.value) {
        psw_repeat.setCustomValidity('');
      } else {
      	psw_repeat.setCustomValidity(self.error_list.customError);
      }
		}
		
		/* setStatus [campo input, stato validazione]
		*  - setta lo stato del campo input interessato a seconda del tipo di campo passato come parametro
		*/
		setStatus(input, status) {			
			//DEBUG-->
			console.log(input.type);console.log(input);
			//DEBUG-->
			console.log(status);
			if(input.type === 'checkbox'){//checkbox
				self.checkboxStatus(input, status);
			}else{//generic input 
				if(status === 'valid'){
					self.validStatus(input)
				}else if(status === 'error'){				
					self.errorStatus(input)
				}
				
			}
			self.labelStatus(input,status);
		}//end setStatus
		
		//setta lo stato della checkbox
		checkboxStatus(input, status){
			let label_cbk = input.nextElementSibling;
			if(status === 'valid'){
				self.validStatus(label_cbk)
			}else if(status === 'error'){				
				self.errorStatus(label_cbk)
			}			
		}//checkboxStatus
		
		/* labelStatus [campo input, stato validazione]
		*  - recupero il "titolo" a seconda del tipo di campo:
		*     1- Se input uso label for
		*     2- se textarea uso id
		*     3- se checkbox
		*    a seconda dello stato mostro il campo rosso oppure default
		*/
		labelStatus(element,status){
			//recupero name e setto la label di colore rosso se c'è un errore
			//let id_input = element.name;
			let id_input = element.id;
			console.log(id_input);
			let label;
  		//DEBUG--> console.log(id_input);
			if(id_input){
				
				switch (element.type) {
						case 'textarea':
							//label = document.querySelector("#testo");
							label = document.querySelector("[data-id='" +id_input+"']");
							break;
						
						case 'checkbox':
							//label = document.querySelector("#" +id_input+"");
							label = document.querySelector("[data-id='" +id_input+"']");
							break;
						
						case 'radio':
							//label = document.querySelector("#" +id_input+"");
							label = document.querySelector("[data-id*='" +id_input+"']");
							break;
						
						
						default:
							//label = document.querySelector("[for='" +id_input+"']");
							label = document.querySelector("[data-id='" +id_input+"']");
				}
				
				//DEBUG-->console.log(label);
				let label_error = 	label.querySelector(".formLabelError");
				
				switch (status) {
					case 'valid':
						label.style.color = '#231f20'; // standard color
						label_error.style.display = 'none';
						label_error.innerHTML = '';
						break;
					case 'error':						
						label.style.color = '#E14C3D';	// error color
						label_error.style.display = 'inline-block';						
						let x =element.validity
						let err_key;
						for(var key in x){//trovo l'errore 
							if(x[key])
								err_key =  key;
						}
						label_error.innerHTML = self.error_list[err_key];//setto l'errore
						break;
					default:
						label.style.color = '#231f20';
				}//end switch statement
			}
				
		}//end labelStatus
		
		/* validStatus [campo input]
		*   - aggiunge la classe valid_field e rimuove la classe invalid_field
		*/
		validStatus(element){
			element.classList.add('valid_field')
			element.classList.remove('invalid_field')
		}//end validStatus
		
		/* errorStatus [campo input]
		*   - aggiunge la classe invalid_field e rimuove la classe valid_field
		*/
		errorStatus(element){
			element.classList.add('invalid_field')
			element.classList.remove('valid_field')
		}//end errorStatus
		
		
}//end class SaFormValidator
	
	//const validateForm = new SaFormValidator(form,inputs,type_form,true);
	//validateForm.initialize();
	
	/** FINE CLASSE VALIDAZIONE FORM **/	
/*******************************************************************************************************************/
export default SaFormValidator
	