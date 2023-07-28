/*
*	[18-02-2022]
*	GESTIONE DEL MEGAMENU NUOVA VERSIONE
*/

const navItem           = document.querySelectorAll('li.navigation__item');
const hamburger         = document.querySelector('#sa-menumob');   //('.header__cta--hamburger');
const plus_btn          = document.querySelectorAll('.mobile-navigation__button');
const firstLevel        = document.querySelectorAll('.navigation__item > a');
const megamenu_lang_sel = document.querySelector('#samegamenu-lang-selector'); 

//check tablet
const userAgent = navigator.userAgent.toLowerCase();
const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

// timing options
const animateOpt = { duration: 1000,iterations: 1, fill: 'forwards' 	}

export default class saMegamenuNew {	
	
	
	
	//Funzione per gestire il megamenu mobile
	static menuMobile(){
		//set the correct height
		this.setMobileHeight();
		//open the menu 
		this.openHamburger();
		//iterazione su ogni pulsante +
		plus_btn.forEach(item => {				
			item.addEventListener("click", function(){
				//recupero i data attribute del pulsante cliccato
				let target       = this.dataset.target;		
				let parent       = this.dataset.parent; 
				let toggle_state = this.dataset.toggle;//stato di partenza
				//verifico e chiudo tutti i menu aperti (se sono aperti)
				saMegamenuNew.checkToggle(parent);
				//mostro il relativo sottomenu e setto i data attribute relativi
				toggle_state  === 'collapse' ? 
					(document.querySelector(target).style.display = 'block', this.dataset.toggle = 'collapsed' ) 
					: (document.querySelector(target).style.display = 'none', this.dataset.toggle = 'collapse')
			});
		});//end foreach submenus
	}//end menuSa_mobile
	
	//gestione click su hamburger mobile
	static openHamburger(){
		// open/close menu mobile
		hamburger.addEventListener("click", function(){
			//Gestione apertura menu mobile e overflow su body
			saMegamenuNew.toggleMenuMobile();
		});
		
		//chiudo il megamenu per vedere la selezione lingue
		megamenu_lang_sel.addEventListener("click", function(){
			saMegamenuNew.toggleMenuMobile();
		});
		
	}//end openHamburger
	
	/*megamenu_lang_sel*/
	static toggleMenuMobile(){
		document.querySelector('.header__lower').style.display === 'block' ? (
				document.querySelector('.header__lower').style.display = 'none',
				document.body.style.overflow = 'auto',
				hamburger.classList.remove('hamburger__open')
			)	: ( 
				document.querySelector('.header__lower').style.display = 'block',
				document.body.style.overflow = 'hidden',
				hamburger.classList.add('hamburger__open')
			)
		
		//toggle chat widget
			let widget_chat = document.querySelectorAll('.zopim');
			let header = document.querySelector('header.header')			
			//let idx = widget_chat.style.zIndex;
		
		
		
		//new
		//console.log(widget_chat);
		
		/*widget_chat.forEach(item => {	
			console.log(item);
			hamburger.classList.contains('hamburger__open') ? item.style.display = 'none !important' : item.style.display = 'block' ;
		})*/
		
				
		if(hamburger.classList.contains('hamburger__open')){
			 widget_chat.forEach(item => {	
					item.style.display = 'none !important';
			})
		}else{
			widget_chat.forEach(item => {	
					item.style.display = 'block';
			})
		}
		
		
		//vecchio	
			//header.style.zIndex === idx ? header.style.zIndex = 20 : header.style.zIndex = idx 
	}
	
	//check toggle
	static checkToggle(parent = ""){		
		if(parent){
			//sono in un sottomenu quindi chiudo tutti i sotto menu figli di parent
			let sub_btn = document.querySelectorAll(parent+' button');
			//gestione  +/x pulsante 
			sub_btn.forEach(item => {
				item.dataset.toggle = 'collapse';
			});
			let submenus = document.querySelectorAll(parent+' ul');		
			submenus.forEach(item => {
				item.style.display = 'none'
				if(item.dataset.toggle === 'collapsed' ){
					item.dataset.toggle = 'collapse';
				}
			});
		}else{
			//sono in un menu di primo livello allora chiudo tutto
			plus_btn.forEach(item => {
				let toggle_state = item.dataset.toggle;
				let target = item.dataset.target;		
				//let parent = item.dataset.parent; VERIFICARE

				//controllo che toggle_state sia collapsed
				if(toggle_state === 'collapsed' ){  //&& parent == ""
					document.querySelector(target).style.display = 'none';//chiudo il menu
					item.dataset.toggle	= 'collapse';
				}  
			});
		}
	}//end checktoggle
	
	//reset inline css style for submenus and menu when resize from mobile to desktop
	static resetStyle(){
		document.querySelectorAll('.sub_nav').forEach(item => {
			item.removeAttribute('style');
		});
		document.querySelectorAll('.subnavigation__menu').forEach(item => {
			item.removeAttribute('style');
		});
		//rimuovo sottolineatura al livello ipad
		firstLevel.forEach(item => {
			item.classList.remove('linkActive');
		});
		
		console.log('reset style');
		//remove attribute overflow on body
		document.body.removeAttribute('style');
		
		//se il megamenu mobile è aperto chiuderlo
		if(hamburger.classList.contains('hamburger__open')){
			console.log('opened');
			hamburger.classList.remove('linkActive');
		}
			
			
	}//end resetStyle
	
	//mobile scroll shows mini logo
	static scrollMobile(){
		let started   = true;
		let logo_min  = document.querySelector('.sa_logo-mini');
		let logo_big  = document.querySelector('.sa_logo-big');
		window.addEventListener('scroll', function(){ 
				//Here you forgot to update the value
			let scrollpos = window.scrollY;
			

			if(scrollpos > 10 && started){
				logo_big.style.display = 'none';
				logo_min.style.display = 'block';
				started = false;
			}
			else if(scrollpos < 10 && !started) {
				logo_min.style.display = 'none';
				logo_big.style.display = 'block';
				started   = true;
			}
			//console.log(scrollpos);
		});
	}
	
	//start menuTablet
	static	menuTablet(){			
		let startTouch;
		firstLevel.forEach(item => {		 
			//blocco il click
			item.addEventListener('click', function(event) {
				event.preventDefault();
			});
			item.addEventListener('touchstart', function(event) {
				startTouch = Date.now();
				//console.log('start touchstart: ' + startTouch);
				event.preventDefault;
				return false;
			}, true);//end touchstart event
			//touchend event
			item.addEventListener('touchend', function(event) {
				var diff = Date.now() - startTouch;
				//apro link
				if(diff > 500){                
					//console.log('Go to page: ' + event.target);
					window.location.href =  event.target; //rimanda alla pagina
				}else{
					//apro sottomenu
					let submenu = document.querySelector(item.parentNode.dataset.subnavigation);						
					saMegamenuNew.resetStyle();//chiude se trova un menu aperto			
					item.classList.add('linkActive');
					submenu.style.display = 'block';
				}
			})//end touchevent event
		});//end foreach
	}//end menuTablet
	
	//start setMobileHeight
	static setMobileHeight(){
		let h = 0;
		let admin = document.querySelector('#AdminInfo');
		//let service_menu = document.querySelector('.service-menu');
		let header_upper = document.querySelector('.header__upper');
		let promo_banner = document.querySelector('.SApromo-banner');
		let megamenu     = document.querySelector('.header__lower');
		//service_menu ? h = h + service_menu.offsetHeight : ''
		admin ? h = h + admin.offsetHeight : ''
		header_upper ? h = h + header_upper.offsetHeight : ''
		promo_banner ? h = h + promo_banner.offsetHeight : ''
		megamenu.style.height = (window.innerHeight - h) +'px';
		//console.log('megamenu.style.height ' +megamenu.style.height);
	}//end setMobileHeight
	
	/* Inizializza la classe SaModals */
	static init(){
		//DEBUG-->
		//console.log('saMegamenuNew');
		//console.log('function sa-megamenu');
		//console.log(hamburger);
			
		if( window.innerWidth > 1140){
			//this.menuSA_hov();	
		}else{
			this.menuMobile();
			this.scrollMobile();
		}			
			
		if(isTablet){
			this.menuTablet();
		}
		
		/*if(isMobile){
			this.menuMobile();
		}*/
		
			
		window.addEventListener("resize", function(){
			if( window.innerWidth > 1140){
				saMegamenuNew.resetStyle();
			}
		});
		
		//this.megamenuDesktop();
		//this.megamenuMobile();
		
	}


}//end SaModals

