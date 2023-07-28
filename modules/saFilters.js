/* GESTIONE DEI FILTRI
*/

const filter_select   = document.querySelectorAll('.filter-select');
const all_filters_btn = document.querySelector('.filters__entry--all > button');//pulsante tutti i filtri
const allFilters      = all_filters_btn ? all_filters_btn.parentNode.closest('.filters__entry') : '';
const ord_wrapper     = document.querySelector('#collapseOrd');
// timing options
const animateOpt = { duration: 3000,iterations: 1, fill: 'forwards' 	}

export default class SaFilters {
	
	/* CAPIRE A COSA SERVE */
	static ordSite(){
		let ord_site = document.querySelector('.ord-site');
		if(!ord_site)
			return;	
		
		//DEBUG-->console.log('ordinamento presente');  //offsetWidth
		let width = ord_site.offsetWidth;
		//set element width element.style.width = "100px";
		ord_wrapper.style.width = width+"px";
		window.onresize = function(event) {
			//DEBUG-->console.log('resizing...');
			width = ord_site.offsetWidth;
			ord_wrapper.style.width = width+"px";
		};

		document.querySelector('.ord-site p:first-child').addEventListener('click',function(){
			
			//animo la freccetta
			this.querySelector('span').classList.contains('arrow-rotate') ? this.querySelector('span').classList.remove('arrow-rotate') : this.querySelector('span').classList.add('arrow-rotate')
			
			//animate select
			ord_wrapper.style.display === 'block' ? ord_wrapper.style.display = 'none' : ord_wrapper.style.display = 'block';			
			
		});
	
	}
	
	
	static removeClassList(items){
		items.forEach(item => {
			item.classList.remove('filter-select--open');
		});
	}
	
	
	
	static filters(){
		if(!filter_select)
			return
		
		filter_select.forEach(item => {
			//TEST
			item.addEventListener('click', e =>{
			
				//if filter is open: close it and esc
				if(e.target.closest('.filter-select').classList.contains('filter-select--open')){
					e.target.closest('.filter-select').classList.remove('filter-select--open');
					return false;//esco
				}

				//if exist some filter open: close it
				let filter_active = document.querySelector('.filter-select--open');
				if(filter_active){
						filter_active.classList.remove('filter-select--open');
				}	
				//toggle class open
				e.target.closest('.filter-select').classList.contains('filter-select--open') ? e.target.closest('.filter-select').classList.remove('filter-select--open') : e.target.closest('.filter-select').classList.add('filter-select--open');
				
			});//end click listener
		
		});//end filter-select
		
		//if exist all filters element
		if(allFilters){
			all_filters_btn.addEventListener('click', e => {
						
				allFilters.classList.contains('filters__entry--open') ? allFilters.classList.remove('filters__entry--open') : allFilters.classList.add('filters__entry--open');
				
				//close all filters open
				filter_select.forEach(item => {
					if(item.classList.contains('filter-select--open')){
						item.classList.remove('filter-select--open');
					}
				});
				
			});
		
			//close filters
			let filterClose = document.querySelector('.filters__close');
			filterClose.addEventListener('click', e => {
				allFilters.classList.remove('filters__entry--open');
			});
			
		}//end allFilters		
		
	}
	
	/* Inizializza la classe SaModals */
	static init(){
		this.ordSite()
		this.filters()
		//DEBUG-->console.log('saFiltersModule 3');
	}


}//end SaModals



