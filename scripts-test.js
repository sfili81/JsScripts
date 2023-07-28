/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	05-02-2021 -> Copia esatta da file script.js
	05-02-2021 -> Ultima modifica a vanilla.js e script-test.js
	
	OBIETTIVO: Rimuovere tutti i riferimenti a Jquery e passare a Vanilla JS
	           tutti i commenti riguardano le funzioni che attualmente sono attive sul sito in produzione
			       ma tolte in sviluppo.
			       Sotto Jquery deve rimanere solo la pagina prodotto.
			   
	SVILUPPO:  Sotto il flag webtest caricheremo sia questo file sia il file vanilla.js in modo da testare le modifiche
	           in tempo reale
			   
	LOG: [05-02-2021] -> spostato 'aggiunge classe loaded' in vanilla.js
	                  -> spostato aggiungi classe a breadcrumbs in vanilla.js
					          -> spostato aggiungi classe a breadcrumbs in vanilla.js
					   
		   [11-02-2021] -> spostato SCRIPT ORDINAMENTO PAGINA CATALOGO 24-01-2020
			
			 [17-11-2021] -> gestione delle varie funzioni tramite moduli ed import (al momento solo alcune gallery hp)
			
			 [10-12-2021] -> gestione del megamenu
			
			 [13-12-2021] -> aggiunta di Headroom
	
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */
// JavaScript Document
//check tablet and mbile
const userAgent = navigator.userAgent.toLowerCase();
const isTablet  = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent); 
const isMobile  = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ( window.innerWidth < 992) ? true : false;

import SaHelper from './vanilla/saHelper.js';//HELPER MODULE

/* DA SOSTITUIRE CON QUELLO NUOVO  */
import SaMegamenuNew       from './vanilla/modules/saMegamenuNew.js';//GESTIONE MEGAMENU NUOV VERSIONE [18-2-2022]
import SaSplideGallery     from './vanilla/saSplideGallery.js';//GALLERY MODULE
import SaAccordionInfoPage from './vanilla/modules/saAccordionInfoPage.js';//ACCORDION MODULE
import SaKart              from './vanilla/modules/saKart.js';//FUNZIONI LEGATE AL CARRELLO
import SaModals            from './vanilla/modules/saModals.js';//FUNZIONI LEGATE AL CARRELLO
import SaFilters           from './vanilla/modules/saFilters.js';//FUNZIONI LEGATE AL CARRELLO
import SaAccordion         from './vanilla/modules/saAccordion.js';//FUNZIONI LEGATE ALL'ACCORDION
import SaTooltip           from './vanilla/modules/saTooltip.js';//FUNZIONI LEGATE AL TOOLTIP
import SaReadMore          from './vanilla/modules/saReadMore.js';//FUNZIONI LEGATE AL LEGGI DI PIU



//
import SaCountdown from './vanilla/modules/saCountdown.js';//GALLERY MODULE
	
	/*
	* Funzioni per caricare le varie gallerie Splide sparse in giro per il sito
	* sono settate all'interno del modulo JS saSplideGallery in assets/js/vanilla/
	*/
SaSplideGallery.galleries();
	
SaAccordionInfoPage.infoAccordion();
	
SaKart.init(isMobile);
	
SaModals.init();

SaFilters.init();

SaAccordion.init();

SaTooltip.init();
	
SaCountdown.init();
	
/*** READ MORE CATALOGO ***/
let t = document.querySelector('#sa-read-more-catalog');
if(t){
	SaReadMore.init({
		selector: "#sa-read-more-catalog",
		//moreTxt:  document.querySelector('#sa-read-more').dataset.more,
		//lessTxt:  document.querySelector('#sa-read-more').dataset.less,
		breakWords: '90',
		isAnimate: 'true'
	});
}

/*** READ MORE DETTAGLIO BRAND ***/
let rm_brand = document.querySelector('#sa-read-more-brand');
if(rm_brand){
	SaReadMore.init({
		selector: "#sa-read-more-brand",
		//moreTxt:  document.querySelector('#sa-read-more').dataset.more,
		//lessTxt:  document.querySelector('#sa-read-more').dataset.less,
		breakWords: '50',
		isAnimate: 'true'
	});
}

/*** READ MORE DESCRIZIONE SCHEDA PRODOTTO 
	   DA MODIFICARE ANCHE IN SCHEDA PRODOTTO AL MOMENTO 
	   QUESTO SELETTORE NON ESISTE
***/
let rm_product = document.querySelector('#sa-read-more-product');
if(rm_product){
	SaReadMore.init({
		selector: "#sa-read-more-product",
		moreTxt: rm_product.dataset.more,
		lessTxt: rm_product.dataset.less,
		breakWords: '100',
		isAnimate: 'true'
	});
}


	/** END MODULE FUNCTION ****************************************************************************************************************************** **/

/** GESTIONE MEGAMENU DA SOSTITUIRE CON QUELLO NUOVO *************************************************************************************************************************************/
//SaMegamenu.init();
SaMegamenuNew.init(); //Nuova versione [18-02-2022]
/* FINE MEGAMENU MOBILE */


/** FINE GESTIONE MEGAMENU *********************************************************************************************************************************/
    

/* PULSANTe TORNA SU */
	if(document.querySelector('.sa_back-to-top')){
		console.log('test');
		document.querySelector('.sa_back-to-top').addEventListener('click', function(){
			window.scrollTo(0, 0);
		});
	}

/** HEADROOM **/
	new Headroom(document.querySelector("header.header"), {
        offset: 38,
        tolerance: {
            up: 30,
            down: 0
        },
        classes: {
            initial: "hr",
            pinned: "header--pin",
            unpinned: "header--unpin",
            top: "header--top",
            notTop: "header--not-top",
            bottom: "header--bot",
            notBottom: "header--not-bot"
        }
    }).init();


//Inizializzo NICE-SELECT2
if(document.getElementById("state")){
	 NiceSelect.bind(document.getElementById("state"), {searchable: true});
}


// SE esiste il div #AdminInfo [05-02-2021]
	SaHelper.mainHeadAdmin();
	
	//Validazione Email SPOSTATA IN saHelper.js
	document.querySelector('button.button.button--light').addEventListener('click',function(){
		SaHelper.validateEmail();
		/*var email = $('div.newsletter__form input#pmail').val();
		SA_script.validateEmail.init(email);*/
	});
	
	//anchor url scroll down workaround only firefox-mozilla
	var browser=navigator.userAgent.toLowerCase();
	if(browser.indexOf('firefox') > -1) {
		var url = window.location.href;
		//console.log(url);
		var hash = url.substring(url.indexOf("#")+1);
		if(hash === 'filtri'){
			//console.log(hash);
			location.hash = "#" + hash;
		}
	}


/* GESTIONE  CLICK SU LOGO IN CHECKOUT */

if(document.body.classList.contains('checkout-step')){
	console.log('body class checkout-step');
	let link = document.querySelector('.logo-brand a');
	let nav_alert = document.querySelector('.nav-alert');
	console.log(nav_alert);
	link.addEventListener('click',function(e){
		e.preventDefault();
		nav_alert.style.display="block";
	})
	
}

	
	
    //Ci serve sa_tab_express è dentro il configuratore

		
    /*if(document.querySelector('input[name="pCart[art_var]"]')){
        let codice_iniziale = document.querySelector('input[name="pCart[art_var]"]').value;
        sa_tab_express(codice_iniziale);
    }*/


/********************************************************************************************************************************************************/
/* IL CODICE SEGUENTE E OK SOLO CHE NON FUNZIONA PER LA MANCANZA MOMENTANEA DIN WEBTEST DI JQUERY */
   /* if(document.querySelector('.product-configurator')){
			
			console.log('price first entry: '+document.querySelector('#sa_prezzo').value)
			
      Configurator.init({
        compact: true,
        product: {
          "code": "",
          "price": document.querySelector('#sa_prezzo').value,
          "discount": document.querySelector('#sa_sconto').value,
        },//
       options:JSON.parse(document.querySelector('input[name="jsonT"]').value)// {"01":{"code":"0142ROVE","label":"Nero","price":0},"05":{"code":"05C0SMAL","label":"Bianco","price":0},"06":{"code":"0661NO00","label":"Si","price":0}} //{"color":{"code":"01Y0BIAN","label":"Nero","price":0},"border":{"code":"05C0SMAL","label":"Bianco","price":0},"seat":{"code":"0661NO00","label":"Si","price":0}}      
	  });

			
		
        //recupero il valore attuale della variante del campo hidden per visualizzare l'immagine variante se esiste
	 // $('.option-choices__entry').on('click', function(){
	//	  var art_var_cod = $('input[name="pCart[art_var]"]').val();
	//	  SA_script.setActualImgVar.init(art_var_cod);
		  
	  //});
	  
		
    }//END CONFIGURATORE
*/

/********************************************************************************************************************************************************/
	//DEBUG -> Configurator 
	//console.log(Configurator.options);
	//console.log('prezzo iniziale: ' + $('#sa_prezzo').val() + Configurator.basePrice);
	//console.log('sconto listino sediarreda: ' + $('#sa_sconto').val());
	//console.log($('input[name="jsonT"]').val());
	
