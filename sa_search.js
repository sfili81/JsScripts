/**
* 24-05-2021
* SA_SEARCH PURE JS
*
**/

const Sa_search = (() =>{
	let modalContainer      = document.querySelector('.sa-search-container');
  let openModalField      = document.querySelectorAll('.cta_search');
  let inputField          = document.querySelector('.search__input');
  let closeButton         = document.querySelector('#search_close');
  let resetButton         = document.querySelector('#search_reset');
  let submitButton        = document.querySelector('#search_submit'); 
	let defaultSearch       = document.querySelectorAll('.static-search');
	let btnToTop            = document.querySelector('#btn-top');
  let html_start_col_dx   = "";
  let tpl_categories      = "";
  let tpl_predictive_f    = "";
  let tpl_suggestions     = "";
  let tpl_recommendations = "";
	return {
		init: function(){
			//DEBUG --> console.log('start vanilla search js');
			this.bindEvents();
			//Call reset function on click
			resetButton.addEventListener('click', e => {
				this.searchReset();
			});
		},
		
		bindEvents: function(){
			this.openModal();
			this.closeModal();
			this.doSearch();
			
		},//end bindEvents
		
		//open modal
		openModal:function(){
			openModalField.forEach(item => {
				item.addEventListener('click', e => {
				
					//attivo clerk per prodotti raccomandati sul click
					Clerk('content', '#clerk-search-racc');

					let h = 0;
					let promoBanner = document.querySelector('.SApromo-banner');
					let serviceMenu = document.querySelector('.service-menu');
					let adminInfo   = document.querySelector('#AdminInfo');
					//if exist top stripe banner
					if(promoBanner){
						 h += serviceMenu.offsetHeight;
						 h += promoBanner.offsetHeight;
						 modalContainer.style.top = h+'px';
					}

					//check if exist id admin
					if(adminInfo){
						h += adminInfo.offsetHeight;
						modalContainer.style.top = h+'px';
					}

					modalContainer.style.display = 'block';//display search

					this.setFocus();//set focus to search input element when open the modal search

					document.body.style.overflow = 'hidden'//remove body scroller
				});
			});
			
			
		},//end openModal
		
		//closeModal
		closeModal: function(){
			closeButton.addEventListener('click', e => {
				document.body.style.overflow = 'auto'// automize scrolling
				modalContainer.style.display = 'none';//hide search
				//RESET FORM
				this.resetForm();
			});
		},//end closeModal
		
		//searchReset
		searchReset: function(){
			
			resetButton.style.display = 'none'; //hide cancel button
			inputField.value = '';//reset input field
			let contSuggestion = document.querySelector('ul.cont-suggestions');
			contSuggestion.innerHTML = "";//remove results from html 
			inputField.classList.remove('search-input-reset');//Remove reset input class
			
			document.querySelector('.search-from-clerk').style.display = 'none';//hide search div
			//defaultSearch.style.display = 'flex'; //show static search
			this.toggleStaticSearch();
			
			if((window.innerWidth <= 480)){
				 contSuggestion.classList.remove('suggestion-border');//Remove border bottom to suggestion container
			 }
			
			btnToTop.style.display = 'none';//hide bottom to top
		},//end searchReset
		
		
		//searchSuggestions
		searchSuggestions: function(query){
			Clerk("call", "search/suggestions",{
					limit: 8,
					query: query
				},function(response){
					let contSuggestion = document.querySelector('ul.cont-suggestions');
					 //DEBUG --> console.log('risultati chiamata diretta');
           //DEBUG -->console.log(response.result);
					 contSuggestion.innerHTML = "";
					//iterate over response and append suggestions
					response.result.forEach(function(value, index){
						contSuggestion.innerHTML += '<li data-query="'+value+'">'+ value + '</li>';
					});
				
					Sa_search.clickSuggestion();
				
				  if((window.innerWidth <= 480)){
						contSuggestion.classList.add('suggestion-border');//Add border bottom to suggestion container
						inputField.classList.add('search-input-reset');//Add reset input class
						btnToTop.style.display = 'block'; //Show button top
					}

				},function(response){ 
					console.error(response); 
				}
			);
		},//end searchSuggestions
		
		doSearch:function(){
			
			inputField.addEventListener('keyup', e => {
				//console.log(e);
				let sa_query = e.target.value;
				//DEBUG --> console.log(sa_query);
				if(sa_query === ""){
          resetButton.style.display = 'none';      
          this.searchReset(); //CALL TO RESET
				}else{
					resetButton.style.display = 'block';
					//CALL TO API CLERK search/suggestions
          this.searchSuggestions(sa_query);
					
					document.querySelector('.search-from-clerk').style.display = 'flex';//show search div
					//defaultSearch.style.display = 'none'; //hide static search
					
					this.toggleStaticSearch();
					
					
				}
				
			});
			
		},//end doSearch
		
		clickSuggestion: function(){
			let contSuggestion_el = document.querySelectorAll('ul.cont-suggestions li');
			contSuggestion_el.forEach(item => {
				//DEBUG --> console.log(item);
				item.addEventListener('click', e =>{
					let sa_query = item.dataset.query;
					//DEBUG --> console.log(sa_query);
					inputField.value = sa_query;
					document.querySelector('#clerkIstantSearch').click();//trigger?
					resetButton.style.display = 'block';
				});
				
			});
		},
		
		//toggleStatiSearch
		toggleStaticSearch: function(){
			//console.log(defaultSearch);
			defaultSearch.forEach(item => {
				console.log( item.classList);
				item.classList.contains('hideS') ? item.classList.remove('hideS') : item.classList.add('hideS');
			});
		},//end toggleStatiSearch
		
		//setFocus
		setFocus: function(){
			inputField.focus();
		},//end setFocus
		
	}
	
})();   
//initialize Sa_search
Sa_search.init();

