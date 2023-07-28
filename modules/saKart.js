
const steppers = document.querySelectorAll('.quantity-stepper.kart-stepper');
const promo_link = document.querySelector('#insertPromoCode'); 
const form_destination = document.querySelector('#formDestination');

export default class SaKart {
	
	
	/*
	*  Funzione per lo sepper nel carrello
	*/
	static kartStepper(){
		steppers.forEach(function(elem) {
			let input_field = elem.querySelector('.quantity-stepper__input');
			let up_btn 			= elem.querySelector('.quantity-stepper__plus');
			let down_btn 		= elem.querySelector('.quantity-stepper__minus');
			let step        = parseInt(input_field.dataset.stepValue);
			let start_qt    = parseInt(input_field.dataset.qtval);
			let key         = input_field.dataset.key;
			let min_val     = input_field.dataset.min;
			//click on plus button
			up_btn.addEventListener('click', function(){
				input_field.value = start_qt + step ;				
				document.querySelector("input[name='pCart[kart]["+key+"][art_qt]']").value = start_qt + step ;
        document.querySelector('form.form--register').submit();				
			})
			//click on minus button
			down_btn.addEventListener('click', function(){
				if(start_qt > min_val)
					input_field.value = start_qt - step;
				document.querySelector("input[name='pCart[kart]["+key+"][art_qt]']").value = start_qt - step ;
				document.querySelector('form.form--register').submit();	
				
			})
		})
		
	}//end kartStepper
	
	/*
	* Funzione per inserimento codice promo
	* al click su banner in carrello
	*/
	static insertPromoCode(){
		if(!promo_link)
			return;		
		promo_link.addEventListener('click',function(e){
			e.preventDefault();			
			let code = promo_link.dataset.promocode;
			//DEBUG--> console.log(document.querySelector('.checkout-summary__promocode'));
			document.querySelector('input.checkout-summary__promocode').value = code;
			document.querySelector('form.form--register').submit();	
		})
	}//end insert promo code
	
	/* 
	* funzione che Quando clicco invio sul codice promozionale blocco l'invio del form
	*/
	static blockPushInvio(){
		let input_cod = document.querySelector('input.checkout-summary__promocode');
		if(!input_cod)
			return;
		input_cod.addEventListener('focus', function(){
			document.addEventListener('keydown', function(event){
				 if( (event.keyCode == 13) ) {
					 event.preventDefault();
					 document.querySelector('form.form--register').submit();	
				 }
			})
		})
	}
	
	
	static toggleFormDestination(){
		if(!form_destination)
			return;
		//DEBUG--> 
		console.log('form_destination');
		
		let other_dest = new Array();
		//verifico se i campi dentro formDestination sono popolati oppure no
		document.querySelectorAll('#formDestination input').forEach(function(elem,index) {
			if(elem.value !==""){
					other_dest.push(elem.value);//salvo l'eventuale valore in un array
				}
		})
		//DEBUG--> console.log(other_dest);
		//se la parte di form altro luogo di consegna è gia popolata la mostro
		if(other_dest.length !== 0){
			form_destination.style.display = 'block';
			document.querySelector('.open-dest').classList.add('filter-select--open');
		}
		
		document.querySelector('.open-dest').addEventListener('click',function(el){
			//DEBUG-->
				console.log(this);
			this.classList.contains("filter-select--open") ? this.classList.remove("filter-select--open") : this.classList.add("filter-select--open");
		
			document.querySelector('#formDestination').style.display === 'block' ? document.querySelector('#formDestination').style.display = 'none' : document.querySelector('#formDestination').style.display = 'block' ;
		});
		
		//RESET FORM DESTINATARIO
		document.querySelector('#reset_form').addEventListener('click',function(el){
			
			document.querySelectorAll('#formDestination input').forEach(function(elem,index) {
				elem.value = "";
			});
		})
				
	}
	
	static openLoginKart(){
		let btn = document.querySelector('.sa_title_checkout_login')
		let form_wrapper = document.querySelector('.sa_open_login_kart');
		
		if(!btn)
			return
		
		form_wrapper.style.display = 'block';
		form_wrapper.style.maxHeight = '0';
		
		form_wrapper.style.overflow = 'hidden';
		form_wrapper.style.transition = 'max-height 1s';
		
		btn.addEventListener('click', () => {
			btn.classList.contains('open') ? btn.classList.remove('open') : btn.classList.add('open')
			
			if(btn.classList.contains('open'))
				form_wrapper.style.maxHeight = '100vh'
			else
				form_wrapper.style.maxHeight = '0'
					
			//console.log( document.querySelector('.sa_open_login_kart').offsetHeight  );  
			
		});
	}
	
	
	/* MINI KART MEGAMENU cart-cta */
	static miniKart(isMobile){
		console.log(isMobile);
		if(isMobile){
			let minik_btn = document.querySelector('.cart-cta');
			let minik     = document.querySelector('.cart-box');
			minik_btn.addEventListener('click', function(e){
				e.preventDefault();
				minik.classList.contains('active') ? minik.classList.remove('active') : minik.classList.add('active');
				if(isMobile && window.innerWidth < 992){
					document.body.classList.contains('ohns') ? document.body.classList.remove('ohns') : document.body.classList.add('ohns');
				}
			})
		}
		/** Vecchio funzionamento con apertura sotto menu
		let minik_btn = document.querySelector('.cart-cta');
		let minik     = document.querySelector('.cart-box');
		minik_btn.addEventListener('click', function(){
			minik.classList.contains('active') ? minik.classList.remove('active') : minik.classList.add('active');
			if(isMobile && window.innerWidth < 992){
				document.body.classList.contains('ohns') ? document.body.classList.remove('ohns') : document.body.classList.add('ohns');
			}
		})
		**/
	}/* end minikart */
	
	/* Inizializza la classe saKart */
	static init(isMobile){
		this.kartStepper()
		this.insertPromoCode()
		this.blockPushInvio()
		this.toggleFormDestination()
		this.miniKart(isMobile)
		//this.openLoginKart() // NON NECESSARIO SE USIAMO MODALE
		//DEBUG-->console.log('saKartModule');
	}


}//end SaKart

