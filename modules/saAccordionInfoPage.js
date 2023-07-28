
const tabs = document.querySelectorAll('.single-tab');//tutte le tabs
const head_switch = document.querySelectorAll('.heading__switch');//tutti i link per cambiare tab

export default class SaAccordionInfoPage {
	
	
	static desktopAccordion(){

		tabs.forEach(function(tab) {
			let id_tab = tab.id;
			let container = document.querySelector('.sped-tabs');
			if(tab.id){
				container.insertAdjacentElement('beforeend', tab);
				tab.querySelector('h3').style.display = 'block';
				//mostro sempre il contrassegno
				tab.id === 'contr' ? (tab.classList.remove('hidden'),
														 document.querySelector('.heading__switch[data-target="#contr"]').classList.add('heading__switch--active') )	: '';
			}
		})
	}
	
	static mobileAccordion(){
		tabs.forEach(function(tab) {
			let id_tab = tab.id;
		//console.log(tab);
			let head_tab = document.querySelector('.heading__switch[data-target="#'+ id_tab+'"]');
		//console.log(x);
			if(head_tab){
				head_tab.classList.remove('heading__switch--active');
				head_tab.insertAdjacentElement('afterend', tab);
				tab.classList.add('hidden');
				//SaAccordionInfoPage.slideUp(tab);
				tab.querySelector('h3').style.display = 'none';
			}						
		});		
	}//end mobile accordion	
		
	
	static cleanAll(){
		//remove class active to all tabs
		head_switch.forEach(function(elem) {
			elem.classList.remove('heading__switch--active');	
			let target_id = elem.dataset.target;				
			let target_tab =document.querySelector(target_id);
			target_tab.classList.add('hidden');
		});	
	}
	
	
	
	static infoAccordion(){
			
		document.documentElement.clientWidth <= 480 ? SaAccordionInfoPage.mobileAccordion() : SaAccordionInfoPage.desktopAccordion()
		
		window.addEventListener('resize', function(){
			document.documentElement.clientWidth <= 480 ? SaAccordionInfoPage.mobileAccordion() : SaAccordionInfoPage.desktopAccordion()
		});
		
		/* accordion engine */
		head_switch.forEach(function(el) {
			el.addEventListener('click',function(){
				//remove class active to all tabs switch ad hidden all related 
				SaAccordionInfoPage.cleanAll()
				//add class active to clicked tab
				el.classList.add('heading__switch--active');	
				let target_id = el.dataset.target;				
				let target_tab =document.querySelector(target_id);
				target_tab.classList.remove('hidden');
				
				
					window.scrollTo(0, el.offsetTop);
			});
			
		});
			
		
		//console.log(document.documentElement.clientWidth);
		
		
	}
	


}//end SaHelper


/*
 
    //TAB PER PAGINE INFORMATIVE  -- SPOSTATO IN INFO-PAGE.js
    if( $(window).width()<= 480 ){
        mobileAccordion();
    }else if($(window).width() > 480){
       deskTab() ; 
    }  
    
    $(window).resize(function(){
      if( $(window).width()<= 480 ){
            mobileAccordion();
        }else if($(window).width() > 480){
           deskTab() ; 
        }      
    });
		
		
		

//SPOSTATO IN INFO-PAGE.js
function deskTab(){
	
	console.log('info tab');
	
    $('.single-tab').each(function(){
         var id = $(this).attr('id');
         $("#"+id).insertAfter('.sped-tabs');
         $("#"+id).show(); 
         $("#"+id+" h3").show();
    });
}
*/