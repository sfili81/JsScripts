/* GESTIONE DEL MEGAMENU
*/

//DA VERIFICARE
const navItem    = document.querySelectorAll('li.navigation__item');
const firstLevel = document.querySelectorAll('.navigation__item > a');



//CORRETTE
const hamburger      = document.querySelector('.header__cta--hamburger');
const navItemListDsk = document.querySelectorAll('.navigation__item a[data-subnavigation]');//link navgazione megamenu versione DESKTOP
const plus_btn       = document.querySelectorAll('button[data-toggle="collapse"]')
const allSubmenu     = document.querySelectorAll('.mobile-navigation__submenu')
//check tablet and mbile
const userAgent = navigator.userAgent.toLowerCase();
const isTablet  = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent); 
const isMobile  = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ( window.innerWidth < 992) ? true : false;

// timing options
const animateOpt = { duration: 1000,iterations: 1, fill: 'forwards' 	}


export default class SaMegamenu {	
	
	/* 
	*	Funzione per gestire il megamenu VERSIONE DESKTOP
  * 
	*/
	static megamenuDesktop(){	
		//DEBUG-->console.log('megamenuDesktop');
		navItemListDsk.forEach(navItem => {
			let subTarget;

			if (navItem.dataset.subnavigation) {
				let timer;
				let data = navItem.dataset.subnavigation;
				subTarget = document.querySelector('#' + data);

				navItem.addEventListener('mouseenter', function(){
					timer = setTimeout(function(){  
						navItem.classList.add('open-submenu');
						subTarget.classList.add('active');
						document.querySelector('.cart-box').classList.remove('active');
					},100);
				});

				navItem.addEventListener('mouseleave', function(){
					navItem.classList.remove('open-submenu')
					subTarget.classList.remove('active');
					clearTimeout(timer);
				});
			}//end if
		});
		
		document.querySelectorAll('.subnavigation').forEach(subItem => {
				let navTarget = subItem.id;

				subItem.addEventListener('mouseenter', function(){
					document.querySelector('.navigation__item a[data-subnavigation="' + navTarget + '"]').classList.add('open-submenu');
				});
				subItem.addEventListener('mouseleave', function(){
					document.querySelector('.navigation__item a[data-subnavigation="' + navTarget + '"]').classList.remove('open-submenu');
				});

		})
		
	}

	
	/*
   * Funzione che gestisce lapertura del megamenu mobile al click sull'hamburger
	 */
	static openHamburger(){
		if (isMobile) {
			//DEBUG-->console.log('mobile');
			document.body.classList.add('ism');

			hamburger.addEventListener('click', function(e){
				e.preventDefault();
				let headerHeight = document.querySelector('header.header').offsetHeight;
				let header = document.querySelector('.header')
				let mob_nav = document.querySelector('.mobile-navigation');

				header.classList.contains('header--mobile-open') ? header.classList.remove('header--mobile-open') : header.classList.add('header--mobile-open') ;
				document.body.classList.contains('ohns') ? document.body.classList.remove('ohns') : document.body.classList.add('ohns');
				mob_nav.style.paddingTop = headerHeight + 'px';
				mob_nav.classList.contains('mobile-navigation--active') ? mob_nav.classList.remove('mobile-navigation--active') : mob_nav.classList.add('mobile-navigation--active')	
			})//end listener

		}//end if
	}//end openHamburger function

	
	
	static closeAll(){
		
	}
	
	
	
	static megamenuMobile(){
		this.openHamburger();
		
		//click on plus button
		plus_btn.forEach(btn => {
			
			btn.addEventListener("click", function(){
				
				let isSubmenu = this.parentNode.classList.contains('sa-primolivello-mob'); 
				//DEBUG-->console.log(isSubmenu);
				//se sono in sottomenu prendo parent
				if(isSubmenu){
					let parent = this.dataset.parent;
					//DEBUG-->console.log(parent);
					SaMegamenu.checkToggle(parent)
				}else{
					SaMegamenu.checkToggle()
				}
				
				//giro la x
				//aggiungo animazione per la x
				this.getAttribute("aria-expanded") === 'false' ? this.setAttribute("aria-expanded", "true") : this.setAttribute("aria-expanded", "false")

				//recupero i data attribute del pulsante cliccato
				let target = this.dataset.target;		
				//let parent = this.dataset.parent; 
				
				let toggle_state = this.dataset.toggle;//stato di partenza
				//DEBUG
				//console.log('target: ' + target);				
				//console.log('toggle_state: ' + toggle_state);				
				
				//apro sottomenu target
				document.querySelector(target).style.display = 'block';
	
			 	document.querySelector(target).animate([
					// keyframes
					{ maxHeight: 0,height:'auto' },
					{ maxHeight: '1500vh' }
				], animateOpt);
							
				
			});//end listener
			
			
		})//end foreach
		
		
	}//end megamenuMobile

	//check toggle
	static checkToggle(parent = ""){
			
		if(parent){
			//sono in un sottomenu quindi chiudo tutti i sotto menu figli di parent
			let sub_btn = document.querySelectorAll(parent+' button');
			//gestione  +/x pulsante 
			sub_btn.forEach(item => {
				item.setAttribute("aria-expanded", "false")
			});
				
			let submenus = document.querySelectorAll(parent +' div.sa-second-level');
			//console.log(submenus);				
			submenus.forEach(item => {
				item.style.display = 'none'
			});
				
			}else{
				//sono in un menu di primo livello allora chiudo tutto
				allSubmenu.forEach(item => {					
					item.style.display = 'none'
					//riposiziono la x del menu
					item.parentNode.querySelector('button').setAttribute("aria-expanded", "false")
				});
			}//end if-else
	}// end checkToggle
	
	
	
	/* Inizializza la classe SaModals */
	static init(){
		window.addEventListener('resize', function(){
			window.innerWidth < 992 ? document.body.classList.add('ism') : document.body.classList.remove('ism')
		});
		
		this.megamenuDesktop();
		this.megamenuMobile();
		//DEBUG-->console.log('saMegamenu v2');
	}


}//end SaModals

