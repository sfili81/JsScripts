/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		sa_product_page.js
		Funzionijavascript per la gestione della pagina prodotto
		Creazione: 09-04-2021
		Ultima modifica: 09-04-2021
		
		N.B. Splide è stata inserita in partial/head.tpl principale
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */

const modal = document.querySelector('#modal-addKart');

// FLAG PER SAPER SE HO APERTO LA MODALE ADD_KART 
var flag_addKart = false;
/* lista dei pulsanti che aprono la modale add_kart */
const modal_list = document.querySelectorAll('[data-modal]');
/* elemento della modale dove verranno aggiunti i dettagli della variante scelta */
const target = document.querySelector('#modal-addKart .modal-artvar-desc ');	
/* pulsante open modal principale */
const primary_addkart_modal = document.querySelector('#art-open-mdal'); 
/* div blocco magazzino */
const gest_mag = document.querySelector('#art-gestmag');
/* lista di tutti gli oln del prodotto */
const art_oln_list = JSON.parse(document.querySelector('input[name="art_oln_list"]').value);	//lista var oln let

/* selettore per pulsante wishlist */
const btn_wish = document.querySelector('#add-wishlist');
/* codice articolo */
const art_cod = document.querySelector('input[name="pPar[art_cod]"]').value;	

/* lista elementi button per aprire la modale da sezione pronta consegna */
const btn_open_addkart_pc = document.querySelectorAll('.prontaconsegna-addKart');
/* liste elementi cliccabili per sezione accordion */
const sa_collapses = document.querySelectorAll('.accordion_link');
/**/
const qt_field    = document.querySelector('#qt-stepper');
/* lista pulsanti varianti configuratore*/
const choices = document.querySelectorAll('.option-choices__entry');
/* Glightbox */
const lightbox = GLightbox({ });
/* wrapper pronta consegna modale */
const wrapper_modal_prontaC = document.querySelector('#modal_prontaconsegna');
/* wrappper modal date prontaconsegna */
const wrap_modal_date_prontaconsegna = document.querySelector('#sa_express_wrap');
/* wrapper modal date su ordinazione */
const wrap_modal_date_suord = document.querySelector('#sa_no_express_wrap');
/* array varianti express art_var_cod:qt */
const array_art_express = JSON.parse(document.querySelector('input[name="sa_jons_expr"]').value);  
/* selettore quantità in pronta consegna modale */
const modal_express_qt = document.querySelector('#express_qt'); 
/* contenitore giftcard */
const is_giftcard = document.querySelector('#giftcard-form');
/* codice completo variante */
let art_var_cod;
//oggetto primary slider
let slide_reference = false;
//oggetto slider immagini mobile
let slide_reference_mob = false;
/* flag per sapere se apro la modale dal blocco pronta consegna  */
let is_prontaconsegna = false;

const close_config = document.querySelectorAll('.sa-pdp-close-config');
/****************************************************************************************************************************************/

const artMmodal = (() => {
	return{
		init(){
			//console.log('start art_modal Fn()');
			this.bindEvent();
		},//end init
		
		//Gestione ascoltatori
		bindEvent(){
			this.openListener();//ascoltatore per aprire modale
			this.closeListener();//ascoltatore sul pulsante X della modale	
			this.closeModalByOutsideClick();//chiusura modale cliccando foru dall modale stessa
		},//end bindEvent
		
		openListener(){
			modal_list.forEach(item => {
				let modal = item.getAttribute('data-modal');		
				let art_var_expr;
				//console.log(item);
				
				//apertura modale
				item.addEventListener('click', (el) => {
					
					//definisco art_var_cod 
					/*art_var_cod = document.querySelector('input[name="pCart[art_var]"]').value;
					QtaStepper.init();*/
					
					if(item.dataset.artVar){
						is_prontaconsegna = true;//se esiste data-art-var ho cliccato sicuramente da gallery pronta consegna
						this.setConfigurator(item.dataset.artVar);		
						checkProntaConsegna();
						art_var_expr = item.dataset.artVar;
					}else{
						art_var_expr = document.getElementsByName("pCart[art_var]")[0].value;
					}
					
					//Se la variante selezionata è in pronta consegna
					if(array_art_express[art_var_expr]){
						modal_express_qt.innerText= array_art_express[art_var_expr];
					}
										
					//Chiama funzione per gestire visualizzazione dati pronta consegna
					toggleProntaconsegna(parseInt(qt_field.value));//ci passo la quantità iniziale
				
					el.preventDefault();
					
					
					if(is_giftcard){//se esiste il form gift card
						//call to validation
						FormGiftCard.validateGiftForm() ? sendToKart() : false;
						console.log('dentro is_giftcard');
					}else{
						this.modalOpenClose();
					}
					
					
					//console.log('è - aperta modal-addKart? '+ flag_addKart);
					if(flag_addKart)
						this.createDescModalVar();
				});
			});
		},
		
		//Funzione per mostrare/nascondere la modale
		modalOpenClose(){
			//console.log('call modalOpenClose Fn() ');
			console.log(modal);
			let isOpen = window.getComputedStyle(modal).getPropertyValue('display');
			isOpen === 'flex' ? modal.style.display = "none" : modal.style.display = "flex";
			modal.style.display === "none" ? document.body.classList.remove("modal-open") : document.body.classList.add("modal-open") ;
			//set flag_addKART
			(modal.style.display !== "none")? flag_addKart = true : flag_addKart = false;
			
			
			//Reset Stepper
			QtaStepper.resetStepper();
			QtaStepper.checkPlusState();
				
		},//end modalOpenClose
		
		//Gestione ascoltatore Su X della modale
		closeListener(){			
			let el_x_modal = document.querySelector('#modal-addKart .sa-pdp-close-modal');
				//chiusura modale
			el_x_modal.addEventListener('click',  () => {
				//let modal = el_x_modal.getAttribute('data-modal');
				this.modalOpenClose();
				//console.log('è - aperta modal-addKart? '+ flag_addKart);
				this.resetDescModalVar();
			});
			
			
			
		},//end Close Listener
		
		//Funzione chiusura modale quand clicco fuori dalla modale stessa
		closeModalByOutsideClick(){
			document.querySelector('#modal-addKart').addEventListener('click', function(e) {
				e.stopPropagation();
				if (e.target.id == "modal-addKart") {
					artMmodal.modalOpenClose();
					artMmodal.resetDescModalVar();
				}
			});
		},//end closeModalByOutsideClick
		
		//Funzione che setta il configuratore con la variante in pronta consegna cliccata
		setConfigurator(art_var){
			//console.log('call setConfigurator Fn() ' + art_var);
			//set art_var to form input
			document.getElementsByName("pCart[art_var]")[0].value  = art_var; 
			let json_var_expr = document.querySelector('input[name="'+ art_var +'"]').value; 
			//rimuovi le classi alle selezioni del configuratore
			document.querySelectorAll('.option-choices__entry').forEach(option => {
					option.classList.remove("selected");
			});
			//Reimposto il configuratore. NB il configuratore è scritto in application.js
			Configurator.setOptions( JSON.parse(json_var_expr));
			//delego al configuratore la configurazione del prezzo
			Configurator.applyConfigurations();
			//setto l'immagine nella gallery
			setImgVar(art_var,slide_reference);
			//set flag pronta consegna true
			is_prontaconsegna = true;
		},//end setConfigurator
		
		//Funzione che crea la lista dele opzioni oln della variante scelta nella modale
		createDescModalVar(){ 
			art_var_cod = document.querySelector('input[name="pCart[art_var]"]').value;
		
			let ul = document.createElement('ul');
			//split art_var_cod every 8 char
			let oln = art_var_cod.match(/.{8}/g);
			//ciclo sull'array degli oln
			oln.forEach(function(oln_cod) {
				let li = document.createElement('li');
				let div = document.createElement('div');
				div.setAttribute('class', 'sing-oln');
				//creo l'immagine piccola
				let img = document.createElement("img");
				img.setAttribute('src', art_oln_list[oln_cod]['oln_imm']);
				img.setAttribute('alt', "art_oln_list[oln_cod]['opt_desc']" + "art_oln_list[oln_cod]['oln_desc']");

				div.appendChild(img);
				div.insertAdjacentHTML('beforeend','<p><span>'+ art_oln_list[oln_cod]['opt_desc'] +'</span><br>'+art_oln_list[oln_cod]['oln_desc']+'</p>')

				li.appendChild(div);
				ul.appendChild(li);	
			});
			//appendo l'html risultante
			let fragment = document.createDocumentFragment();
			fragment.appendChild(ul);
			target.appendChild(fragment);
		},//end createDescModalVar()
		
		//Funzione che resetta la lista dele opzioni oln della variante scelta nella modale
		resetDescModalVar(){
			while (target.firstChild) {
				target.removeChild(target.firstChild);//target is constant
			}
		},
		
	}//end return
})();//end artVar Modal

/******* GESTIONE QT STEPPER ********/

/** FUNCTION STEPPER **/
const QtaStepper = (() => {
	let s;	
	let base_qt     = parseInt(qt_field.dataset.stepValue);
	let start_value = parseInt(qt_field.value);
	let actual_val  = parseInt(qt_field.value);
	let plus_btn    = document.querySelector('#plus');
	let minus_btn   = document.querySelector('#minus');
	
	return {
		//al momento non serve verificare se servira
		settings() {
			return {}
    },
		
    init() {
    	s = this.settings();
      this.bindEvents();
    },
		
		bindEvents() {
      this.plus();
			this.minus();
			//inizialmente il meno è disabilitato
			minus_btn.classList.add('disabled');
			
    },
		
		//plus function
		plus(){
			qtmax = 99;
						
			plus_btn.addEventListener( 'click', e =>{
				//se ho la classe disabled esco				
				if(plus_btn.classList.contains('disabled'))
					return false;
				
				//console.log('click on plus event 4');	
				const initial_plus_value = actual_val; 
							
				//console.log('sa_gestmag js product page stepper: ');
				//console.log(sa_gestmag);
				if(sa_gestmag && sa_artlist_expr[art_var_cod]){
					qtmax = sa_artlist_expr[art_var_cod];
					
				}
				//
				console.log('quantita max: '+qtmax);
							
				
				if(actual_val < qtmax){
					actual_val = actual_val + base_qt;
				}
				
				this.checkPlusState();
				
				qt_field.value = actual_val;
					/* rimuovo classe disabled dal pulsante minus */
					minus_btn.classList.remove('disabled');
								
				//Chiama funzione per gestire visualizzazione dati pronta consegna
				toggleProntaconsegna(actual_val);//ci passo la quantità iniziale
				
				
				
				//se il flags is_prontaconsegna e true
				/*if(is_prontaconsegna){
					 console.log(sa_artlist_expr[art_var_cod]);//sa_artlist_expr è definito in pHtmlCatalogPdp
					 //console.log(art_var_cod);
				} */
			});
		},//end plus function
		
		minus(){
			minus_btn.addEventListener( 'click', e =>{
				//remove pulsante disabled per pulsante +
				actual_val = actual_val - base_qt;
				if(actual_val <= base_qt){
					actual_val = base_qt;//riposiziono al valore di partenza
					//set pulsante minus disabled
					minus_btn.classList.add('disabled');
				}
				
				this.checkPlusState()
				//setto il valore dell'input
				qt_field.value = actual_val;
				//Chiama funzione per gestire visualizzazione dati pronta consegna
				toggleProntaconsegna(actual_val);//ci passo la quantità iniziale
			});

		},//end minus function
		
		/* Funzione che determina se pulsante + stepper è attivo oppure no quando ho gestmag acceso */
		checkPlusState(){
			qtmax = 99;//modificare 4 luglio 2023
			
			art_var_cod = document.querySelector('input[name="pCart[art_var]"]').value;
			if(sa_gestmag && sa_artlist_expr[art_var_cod]){
				qtmax = sa_artlist_expr[art_var_cod];
			}
			//console.log('sa_gestmag js product page stepper checkPlusState: ');
			//console.log(sa_gestmag);
			
			
			//controllo la quantita massima nel caso di sconto su un unica variante
			if(sa_artprice_var && sa_artprice_var[art_var_cod] && sa_artlist_expr[art_var_cod]){
				console.log(sa_artprice_var);
				qtmax = sa_artlist_expr[art_var_cod];
			}
			
			
			if(actual_val === qtmax){
				plus_btn.classList.add('disabled');
			}else if(actual_val < qtmax){ 
				plus_btn.classList.remove('disabled');
			}
			
		},
		
		//reset stepper to start value
		resetStepper (){
			console.log('function resetStepper');
			minus_btn.classList.add('disabled');//reset pulsante -
			plus_btn.classList.remove('disabled');//reset pulsante +			
			actual_val = base_qt;//riposiziono al valore di partenza
			qt_field.value = base_qt;//setto il valore di partenza
		}
		
	}//end return
})();

/***** GESTIONE EVENTUALE FORM GIFT CARD *****/
const FormGiftCard = (() =>{

		let name   = document.getElementById('nome-giftCard');
		let email  = document.getElementById('mail-giftCard');

		let hiddenGiftName = document.getElementById('hidden-card-name');
		let hiddenGiftMail = document.getElementById('hidden-card-mail');
	
		let is_valid_name = false;
		let is_valid_mail = false;

		return{
			init(){
				this.btnState();
				this.bindEvent();
			},//end init
			bindEvent(){
				email.addEventListener('blur',function(e) {
					FormGiftCard.validateGiftForm();
				});	
				name.addEventListener('blur',function() {
					FormGiftCard.validateGiftForm();
				});		
			},//end bindEvent
			validateMail(){
				let val = email.value;
				let filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				let lbl = document.querySelectorAll('label[for="mail-giftCard"]');
				let spn = lbl[0].firstElementChild;
					
				if( !filter.test(val)){
					lbl[0].classList.add('err-giftcard');
					spn.style.display = "inline";
					return false;
				}else{
					lbl[0].classList.remove('err-giftcard');
					spn.style.display = "none";
					hiddenGiftMail.value = val;
					is_valid_mail = true;
					document.querySelector('input[name="pCart[giftcard_mail]"]').value = val;
					return true;
				}
			},//end validateMail
			
			validateName(){
				let val_name = name.value;
				let lbl = document.querySelectorAll('label[for="nome-giftCard"]');
				let spn = lbl[0].firstElementChild;

				if(!val_name ){
					lbl[0].classList.add('err-giftcard');
					spn.style.display = "inline";
					return false;
				}else{
					lbl[0].classList.remove('err-giftcard');
					spn.style.display = "none";
					is_valid_name = true;
					document.querySelector('input[name="pCart[giftcard_name]"]').value = val_name;
					return true;
				}
			},//end validateName
			
			validateGiftForm(){
				is_valid_name = this.validateName();
				is_valid_mail = this.validateMail();
				let is_valid_form = is_valid_name && is_valid_mail;
				/*if(is_valid_form){
					 primary_addkart_modal.classList.remove('sa-btn-disaled');
				}*/
				is_valid_form ? primary_addkart_modal.classList.remove('sa-btn-disaled'): primary_addkart_modal.classList.add('sa-btn-disaled')
				return is_valid_form;
			},
			
			btnState(){
				if(is_valid_name && is_valid_mail){
					primary_addkart_modal.classList.remove('sa-btn-disaled');//primo avvio bottone disabilitato
				}else{
					primary_addkart_modal.classList.add('sa-btn-disaled');//primo avvio bottone disabilitato
				}
			}//end btnState

		}//end return

	})(); //end arrow function


/**** END GESTIONE MODALE **************************************************************************************************************/

/******* GESTIONE WISHLIST ********/
btn_wish.onclick = () =>{ 												
	fetch('https://www.sediarreda.com/it/mysa/wlistdo', {
		method: 'POST',
		body: 'mysa_artcod='+art_cod,
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		}
	}).then(function (response) {
			if (response.ok) {
				return response.json();
			}
			return Promise.reject(response);
	}).then(function (data) {
			//console.log('tutto ok' + data);
			btn_wish.classList.toggle('active');
	}).catch(function (error) {
		console.warn('Something went wrong.', error);
	});
}//end arrow function
/******* FINE GESTIONE WISHLIST ********/

		
//click su add to kart   pCart[submit]
document.querySelector('#add_to_kart').addEventListener( 'click', e =>{
	//console.log('sendToKart');
	sendToKart();
});
/******* FINE GESTIONE QT STEPPER ********/	

/*****  GESTIONE ACCORDION *****/
sa_collapses.forEach(function (el, index) {//sa_collapses const defined on row 25
	el.addEventListener('click', function(e){
		e.preventDefault();
		let el_collapse = el.dataset.collapse;
		el.classList.toggle('in'); 
		document.querySelector(el_collapse).classList.toggle('accordion-open'); 
	})
});


/*****  GESTIONE MODALE DESCRIZIONE GRUPPO OPT *****/
const ModalConfiguratore = (() => {		
		let modal = document.querySelector('#descGroup');
		let openBtn = document.querySelectorAll('.sa-desc-info');//button info
		let closeBtn = document.querySelector('.sa-pdp-close-modal');
		let wrapperDesc = document.querySelector('.sa-modal-body');//tutti i contenitori
		//document.querySelectorAll('.option-choices__category');
		
		return {	
			init(){
				//console.log(modal);
				openBtn.forEach(item => {
					let father = item.parentNode;//get father
					
					if(father.dataset.group){//se esiste la descrizione aggiungo l'ascoltatore
						item.addEventListener('click', () => {
							this.toggleModal();
							let oln_desc_rif= father.dataset.group;//recupero id del div da clonare
							let target = document.querySelector(oln_desc_rif +' .opt_text');
							let cloned = target.cloneNode(true);
							wrapperDesc.appendChild(cloned);					
							
						});
					}
					
				});
				
				//add listener to Close modal button
				closeBtn.addEventListener('click', () => {
					this.toggleModal();//chiudo modale
					//to remove content
					let removeDiv = document.querySelector('.sa-modal-body .opt_text');
					wrapperDesc.removeChild(removeDiv);
				});
			},//end init
			toggleModal(){
				//console.log(document.body.classList);
				modal.style.display === 'none' ? 
					(modal.style.display = 'flex', document.body.classList.add("modal-open") )
				: (modal.style.display = 'none',document.body.classList.remove("modal-open") );
			}//toggleModal
		}//end return
	
	})();//end function				
					
	ModalConfiguratore.init();


/***********************************************************************************************************************************************/

document.addEventListener( 'DOMContentLoaded', function () {	
	
	/* GESTIONE GALLERY */
	const GestGallerySuggested = (() =>{
		//PARAMETRI
		//pulsanti per switch tab
		const btn_switch = document.querySelectorAll('.art-suggested-selection button');
		//selettore gallery Visti (history)
		const id_history_gallery = 'history';
		//Prendo il valore iniziale della gallery		
		var start_index = 0;
		/* Controllo img primo ingresso RIATTIVARE SOLO SE RICHIESTO */
		//art_var_cod = document.getElementsByName("pCart[art_var]")[0].value;
		
		//art_photo_var è definita in tpl pHtmlCatalogList
		let startLiEl = document.getElementsByClassName(art_photo_var);//document.getElementsByClassName(art_var_cod);
		
		if (startLiEl.length > 0) {
			start_index = startLiEl[0].getAttribute('data-index');
		}
		
		return {
			init(){
				//console.log('start gestGallerySuggested function');
				//ascolto eventi
				this.bindEvents();
			},			
			
			bindEvents(){
				this.productGallery();
				//this.syncVarGallery();
				this.prontaConsegnaGallery();
				this.historyGallery();
				this.suggestedGallery();
				this.mobileGallery();
			},
			
			//Gestione gallery immagini prodotto
			productGallery(){
				
				//opzioni gallery primaria
				let options_primaryGallery = {
							type       : 'slide',
							heightRatio:	1,
							start      : start_index,
							focus      : 'center',
							pagination : false,
							arrows     : false,
							cover      : false,
							trimSpace  : true,
							lazyLoad   : 'nearby',
							preloadPages : 2,
							breakpoints : {
								'600': {
									drag : true,
									//destroy: true, 
								}
							}
				 }
				//opzioni gallery primaria
				let options_secondaryGallery =  {
						//fixedWwidth  : 70,
						height      : 70,
						rewind   : true,
						gap         : 10,
						start       : start_index,	
						cover       : true,
						pagination  : false,
						isNavigation: true,
						perPage: 6,
						focus       : 0,
						breakpoints : {
							'600': {
								fixedWidth: 60,
								height    : 60,
								//destroy: true, 
							}
						},
					}
				
				//create secondary slider
				const secondarySlider = this.createGallery('#secondary-slider',options_secondaryGallery);
				//create primary slider
				const primarySlider = this.createGallery('#primary-slider',options_primaryGallery);
				
				primarySlider.on( 'mounted', function () {
					 slide_reference = primarySlider;
				} );

				primarySlider.sync( secondarySlider ).mount();
				
				//console.log('nuova gestione');
				
			},//fine product Gallery
			
			//Gallery varianti pronta consegna
			prontaConsegnaGallery(){
				const prontaconsegna_gallery = document.getElementById("prontaconsegna-gallery");
				if (typeof(prontaconsegna_gallery) != 'undefined' && prontaconsegna_gallery != null){
					
					let options = {
							type   : 'slide',
							perPage: 3,
							gap: '30px',
							breakpoints: {
								768: {
									perPage: 2,
									arrows: false,
								},
								500:{
									perPage: 1,
									arrows: false,
								}
							}
						}
					this.createGallery('#prontaconsegna-gallery',options);
						//console.timeEnd('start gallery pronta consegna');
					}
			},
			
			//creazione gallery mobile
			mobileGallery(){
				let options = {
							type    : 'slide',
							perPage : 1,
							start   : start_index,
							arrows  : false,					
							lazyLoad   : 'nearby',
							gap     : '30px',
							heightRatio: 0.6,
							breakpoints: {
								500: {
									heightRatio: 1,
								}
							}
						}
					let mob_gallery = this.createGallery('#mobile-slider',options);
					//DEBUG-->console.log('trace');
				  document.querySelector('.cont-art-gallery-mobile').style.height = 'auto';
					slide_reference_mob = mob_gallery;
					//console.log('slide_reference mob');
				  //console.log(slide_reference_mob);
					mob_gallery.on( 'mounted', function () {
						slide_reference_mob = mob_gallery;
					} );
			},
			
			//creazione gallery suggested
			suggestedGallery(){  
				let start_gallery_id = "";
				let temp_id = "";
				btn_switch.forEach( ( (btn) => {
				
					if(btn.classList.contains('switch-active') && document.documentElement.clientWidth >= 768){
					  start_gallery_id = btn.dataset.target;
						toggleVisibility(document.querySelectorAll(start_gallery_id), 'block');
						this.createGallery(start_gallery_id);
					}else{
						temp_id = btn.dataset.target;
					}
					
					start_gallery_id != "" ? this.createGallery(start_gallery_id) : this.createGallery(temp_id);
					
					btn.addEventListener('click', ( (el) => {
						let ref_gal_id = el.target.dataset.target;
						let all_gallery_suggested = document.querySelectorAll('.gallery_suggested'); 
						//Gestione rimozione/aggiunta classe switch-active al bottone
						let active_btn = document.querySelector('.switch-active');
						active_btn.classList.remove('switch-active');//rimuvo la classe active dell'elemento 
						el.target.classList.add('switch-active');//aggiungo la classe all'elemento cliccato
						/* GESTIONE TABS GALLERY
						* appena ho effettuato un click su una tab
						* per prima cosa nascondo tutte le gallery
						* poi mostro quella relativa al button cliccato
						*/
						//nascondo tutte le gallery per prima cosa
						toggleVisibility(all_gallery_suggested, 'none');
						let test = document.querySelectorAll(ref_gal_id);
						//nascondo tutte le gallery per prima cosa
						toggleVisibility(test, 'block');
						this.createGallery(ref_gal_id);
					}));//end clidk listener
					
				}));	
			},//end suggested gallery
			
			//creazione gallery history
			historyGallery(){
				//creo la gallery visti di recente solo se esiste il contenitore 	
				let hs_el = document.getElementById(id_history_gallery);
				if(typeof(hs_el) != 'undefined' && hs_el != null){
					this.createGallery('#'+id_history_gallery);
				} 
			},
			
			//creazione gallery generica
			createGallery(id,options = false){
				//GEnerate options
				if(!options){
					options = {
						type   : 'slide',
						perPage: 6,
						gap: '15px',
						breakpoints: {
							768: {
								perPage: 2,
								arrows: false,
							},
						}
					}
				}
				options.arrowPath = 'M1.65,40A1.65,1.65,0,0,1,.48,37.18L17.66,20,.48,2.82A1.65,1.65,0,0,1,2.82.48L21.17,18.83a1.67,1.67,0,0,1,0,2.34L2.82,39.52A1.66,1.66,0,0,1,1.65,40Z';
				/*console.log(options);*/
				//generate gallery
				let splide = new Splide( id , options).mount();
				return splide;//restituisco il riferimento alla gallery
			},
			
			//ascoltatore su oln configuratore
			/*syncVarGallery(){
				choices.forEach(item => { // choices constante dichiarata in riga 29  
					item.addEventListener('click', event => {	
						let var_cod = item.dataset.code;
									
					})
				})
			}*/
		}
	})();   
	//start gestione gallerie
	GestGallerySuggested.init();

});//edn document loaded


if(is_giftcard){//se esiste il form
	FormGiftCard.init();
}
//Inizializzazione Funzioni
/* commentato 30/05/2022 spostata quando apro la modale */
QtaStepper.init();
artMmodal.init();
/****** GESTIONE READMORE ********/
if( document.querySelector('#sa-read-more')){
	ReadMore.init({
		selector: "#sa-read-more",
		moreTxt:  document.querySelector('#sa-read-more').dataset.more,
		lessTxt:  document.querySelector('#sa-read-more').dataset.less
	});
}
/****** END GESTIONE READMORE ********/


/****** FUNZIONE PER GESTIONE IMMAGINE SLIDER ******/
function setImgVar(var_cod,primarySlider){
	//console.log('function setimgVar');	
	let liEl = document.getElementsByClassName(var_cod);
	//console.log(var_cod);	
	//check if image on gallery exist
	if(liEl.length > 0){
		let slide_index = liEl[0].getAttribute('data-index');	//get index of splide	
			primarySlider.go( slide_index );//go to index splide
		}
}
/* FUNZIONE DI SUPPORTO PER MOSTRARE O NASCONDERE UN ELEMENTO */
function toggleVisibility(elements, value = false){
	//console.log(elements);
	//elements è un oggetto di tipo NODE
	if (!value)
		value = 'block';
	elements.forEach( (el) =>  {
		let display = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).display;
	  (display == 'none') ? el.style.display = value : 	el.style.display = 'none';
	});
}
/* Funzione per la gestione della visualizzazione della pronta consegna */
function toggleProntaconsegna(qt){
	//prendo il valore attuale della variante selezionata
	art_var_cod = document.querySelector('input[name="pCart[art_var]"]').value;
	//vedere se arrivo da gallery prodotto pronta consgne is_prontaconsegna = true
	if(sa_artlist_expr[art_var_cod] >= qt){
		wrapper_modal_prontaC.classList.add('isprontaconsegna');
		wrap_modal_date_prontaconsegna.style.display = 'block';
		wrap_modal_date_suord.style.display = 'none';
	}else{
		wrapper_modal_prontaC.classList.remove('isprontaconsegna');
		wrap_modal_date_prontaconsegna.style.display = 'none';
		wrap_modal_date_suord.style.display = 'block';
	}
	/* isprontaconsegna */
}



function checkProntaConsegna(){
	let t = Configurator.getCode();
	let express  = document.querySelector('.sanew_express');
	let standard = document.querySelector('.sanew_standard');
	if(array_art_express[t] && express.classList.contains('sa-exhide')){
		//console.log('2 express è nascosto');
		express.classList.add('sa-show');
		express.classList.remove('sa-exhide');
		standard.classList.add('sa-exhide');
		standard.classList.remove('sa-show');
			
	}else if(!array_art_express[t] && standard && express ){
		//console.log('2 standard');
		standard.classList.add('sa-show');
		standard.classList.remove('sa-exhide');
		express.classList.add('sa-exhide');
		express.classList.remove('sa-show');
	}
						
}
choices.forEach(item => { /* choices constante dichiarata in riga 29  */
					item.addEventListener('click', event => {	
						  setTimeout(function() {
								checkProntaConsegna();								
								let var_cod = Configurator.getCode();
								console.log('test');
								//console.log(array_art_express);
								if(gest_mag && sa_gestmag && !array_art_express[var_cod]){
									//console.log('2 gestmag + no express');
										gest_mag.classList.remove('hide');
										//nascondo dettaglio consegna
										document.querySelector('.art-disponibilita').classList.add('hide');
									
										primary_addkart_modal.classList.add('hide');
									  /*document.querySelector('.sanew_express').classList.add('sa-exhide');
										document.querySelector('.sanew_standard').classList.add('sa-exhide');
										document.querySelector('.sanew_express').classList.remove('sa-show');
										document.querySelector('.sanew_standard').classList.remove('sa-show');*/
								}else if(gest_mag && sa_gestmag && array_art_express[var_cod]) {
										//	console.log('2 gestmag + express');
										gest_mag.classList.add('hide');
									//mostro dettaglio consegna
										document.querySelector('.art-disponibilita').classList.remove('hide');
										primary_addkart_modal.classList.remove('hide');
								}
								
								/* al momento in test in SA-H
								console.log('set_gest_mag da sa_product_page.js:');
								set_gest_mag(var_cod);	
								*/
								setImgVar(var_cod, slide_reference);		//funzione generica per sincronizzare 
								setImgVar(var_cod, slide_reference_mob);	//funzione generica per sincronizzare gallery mobile		
							},20)
					})
				})

function sendToKart(){
	actual_val = qt_field.value;
	document.querySelector('input[name="pCart[art_qt]"]').value = actual_val;
	document.querySelector('input[name="pCart[submit]"]').value = true;
	document.querySelector('form[name="cFormBuy"]').submit();
}


/****** FUNZIONE GESTIONE INGRANDIMENTO OLN *******/
		//queste costanti verranno definite nel file generico javascript in modo da porte essere utilizzate da tutti
		//RImuovere suffisso test
		const userAgentTest = navigator.userAgent.toLowerCase();
		const isMobileTest = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth < 992) ? true : false;
		//check tablet
		const isTabletTest = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgentTest);
		
		/* Function detail Oln [Only DESKTOP] */
		const ViewOlnDetail = (() => {
			let wrapperOln   = document.querySelector('.sa-wrapper-oln');//wrapper
			let containerOln = document.querySelector('.sa-wrapper-oln .sa-cont-oln');//contenitore del visualizzatore
			let oln          = document.querySelectorAll('.option-choices__entry.default');//elemento contenitore oln
			let oln_img;
			let oln_label; // per salvare la label
			let oln_desc;  //per settare l'elemento testuale			
			let opt_label; // per salvare la label del gruppo
			let opt_desc;  // per salvare la label del gruppo
			
			let wrapperImage = document.querySelector('.sa-wrapper-oln img');//src 
			//DEBUG VARIANTE
			//console.log('v 3.5') 
			
			return {	
				init(){
				
					oln.forEach(item => {
						item.addEventListener('mouseenter', () => {							
							//console.log('mouse enter');
							oln_label = item.dataset.label;//titolo dell'OLN
							opt_label = item.dataset.keyLabel;//titolo del GRUPPO
							wrapperOln.style.display = 'flex';//mostro wrapper
							oln_img = document.createElement("img");
							oln_img.setAttribute('src', item.dataset.image);  	
						  //creo p 
							opt_desc = document.createElement("p");
							//add text GRUPPO
							opt_desc.insertAdjacentHTML('beforeend', opt_label);
							//creo span
							oln_desc = document.createElement("span");
							//aggiungo oln desc
							oln_desc.textContent = ' '+oln_label;
							//add span to p
							opt_desc.appendChild( oln_desc);
							//add html to container
							containerOln.appendChild(oln_img);
							containerOln.appendChild(opt_desc);
						});
						
						item.addEventListener('mouseleave', () => {
							this.hideWrapper();
						});
						
					});//end forEach
					
				},//end init
				hideWrapper(){
					wrapperOln.style.display = 'none'; //nascondo wrapper
					containerOln.removeChild(oln_img); //rimuovo immagine
					containerOln.removeChild(opt_desc); //rimuovo descrizione
				}
			}//end return
		})();//end function				
		
		//only desktop
		if (!isTabletTest && !isMobileTest){
			ViewOlnDetail.init();
		}
		
		
/****** FUNZIONE ASCOLTATORE SU X GRUPPO DESC ******/
close_config.forEach(item => {
			item.addEventListener('click', () => {
				//console.log('close config');
				setTimeout(function(){
					document.querySelector('.product-options__choices--open').classList.remove('product-options__choices--open');
					document.querySelector('.product-configurator--selecting').classList.remove('product-configurator--selecting');
				}, 5);
			});
		});

/***********************************************************************************************************************************************/

/**  
 * Funzione che controlla se esiste un prezzo di una variante prodotto specificato
 * in un array sa_artprice_var[codice variante]
 * tale array viene definito in setup_flags.php
 * e definito in una variabile js all'inizio della scheda prodotto
**/
function set_artvar_price(price, artvar_code){
	let final_price;
	const prezzoBar = document.getElementById('prezzo_barrato');
	console.info('[set_artvar_price]');
	//DEBUG --> 
	//console.log('price: '  +price);
	//console.log('sa_artprice_var[artvar_code]: '  +sa_artprice_var[artvar_code]);
					
	if(sa_artprice_var){
		sa_artprice_var[artvar_code] ? final_price = sa_artprice_var[artvar_code] : final_price = price;
	}else{
		final_price = price;
	}	
	
	let wrap_price = document.querySelector('.wrap-price-full');
	
	
	//$('.sa_col_promo_price').show();
	
	if(price === final_price && prezzoBar !== null ){
		prezzoBar.innerHTML = '';
		$('.wrap-price-full ').show();
		
		// .replace(/(\.|\s)|(\,)/g,(m,p1,p2) => p1 ? "" : ".");  
		//console.log('1 if');
	}else if(prezzoBar !== null && !sa_artpromolabel) {
		prezzoBar.innerHTML = '';
		
		console.info('[set_artvar_price] CASO: prezzoBar !== null && !sa_artpromolabel')
		/* OLD
		prezzoBar.innerHTML =  '<div class="sa_col_promo_price"> <span class="product__string-promo ">Promo</span></div>' ;
		prezzoBar.innerHTML += '<span class="no-line">'+ price + "&euro;</span>";
		*/
		
		prezzoBar.innerHTML = '<span class="product__string-promo ">Promo</span>'
		prezzoBar.innerHTML += '<span class="product__full-p-pieno" >'+ price + '&euro;</span>'
		//TEST 04 luglio 2023
		price = price.replace(/(\.|\s)|(\,)/g,(m,p1,p2) => p1 ? "" : "."); //parseFloat(price.replace(",","."))
		//final_price = final_price.replace(/(\.|\s)|(\,)/g,(m,p1,p2) => p1 ? "" : "."); 
		let sa_percent =100 - ( (final_price * 100) /price);
		
		sa_percent >= 10 ? sa_percent = Math.round(sa_percent) : sa_percent = sa_percent.toFixed(1);
		prezzoBar.innerHTML += '<span class="sa-catalog-percent-barr">-'+sa_percent+'%</span>';
		
		
		
		
		//nascondo elemento precedente
		$('.wrap-price-full ').hide();
	}else if(prezzoBar !== null && sa_artpromolabel && sa_artprice_var[artvar_code] ) {
		prezzoBar.innerHTML = '';		
		
		console.info('[set_artvar_price] CASO 2: prezzoBar !== null && sa_artpromolabel && sa_artprice_var[artvar_code]')
		
		//DEBUG -->				
		console.log(document.querySelector('.product__full-price'));
						
		if(document.querySelector('.product__full-price') == null){
			/* OLD
			prezzoBar.innerHTML = '<span class="no-line">'+ price + "&euro;</span>";
			*/
			prezzoBar.innerHTML += '<span class="no-line">'+ price + '&euro;</span>'
			//TEST 04 luglio 2023
			price = price.replace(/(\.|\s)|(\,)/g,(m,p1,p2) => p1 ? "" : "."); //parseFloat(price.replace(",","."))
			//final_price = final_price.replace(/(\.|\s)|(\,)/g,(m,p1,p2) => p1 ? "" : "."); //parseFloat(price.replace(",","."))
			let sa_percent =100 - ( (final_price * 100) /price);
			sa_percent >= 10 ? sa_percent = Math.round(sa_percent) : sa_percent = sa_percent.toFixed(1);
			prezzoBar.innerHTML += '<span class="sa-catalog-percent-barr">-'+sa_percent+'%</span>';
			//prezzoBar.innerHTML += '<span class="sa-catalog-percent"> ciao</span>';
			//DEBUG -->
			console.info('entro qui?');
			
		}
			
			
	} 
	
	console.info('[Fn set_artvar_price] stringa variante ' + artvar_code)
	
	if(sa_artprice_var && !sa_artprice_var[artvar_code] && sa_artpromolabel){
		$('.sa_col_promo_price').hide();
		console.info('[Fn set_artvar_price] esiste sa_artprice_var &&  NON esiste sa_artprice_var[artvar_code] ')
		console.info('[Fn set_artvar_price] in questo caso devo nascondere la label saldi')
	}else if(sa_artprice_var && sa_artprice_var[artvar_code] && sa_artpromolabel){
		$('.sa_col_promo_price').show();
		console.info('[Fn set_artvar_price] esiste sa_artprice_var &&  esiste sa_artprice_var[artvar_code] ')
		console.info('[Fn set_artvar_price] in questo caso devo mostro la label saldi')
	}
						
		//DEBUG --> console.log('3 if v1.5');
	
	/*console.info( $('#prezzo_barrato').is(':empty') );
	if(sa_percent > 0){
	*/

	return final_price;
}

