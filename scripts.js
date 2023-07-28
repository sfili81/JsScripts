// JavaScript Document
import SaSplideGallery from './vanilla/saSplideGallery.js?v=0005';//GALLERY MODULE
import SaMegamenuNew 	 from './vanilla/modules/saMegamenuNew.js';//GESTIONE MEGAMENU NUOV VERSIONE [18-2-2022]
import SaReadMore      from './vanilla/modules/saReadMore.js';//FUNZIONI LEGATE AL LEGGI DI PIU
import SaTooltip       from './vanilla/modules/saTooltip.js';//FUNZIONI LEGATE AL TOOLTIP


$(document).ready(function() {
    
	/* aggiunge classe loaded se non c'è la slideshow */
  $('.wrapper-bf').addClass('loaded');
	$('.wrapper-ws').addClass('loaded');
	
	
	/*
	* Funzioni per caricare le varie gallerie Splide sparse in giro per il sito
	* sono settate all'interno del modulo JS saSplideGallery in assets/js/vanilla/
	* importata dal module SaSplideGallery
	*/
	SaSplideGallery.galleries();
	
	
	SaMegamenuNew.init(); //Nuova versione [18-02-2022]
	
	SaTooltip.init();
	
/*** READ MORE CATALOGO ***/
/*let t = document.querySelector('#sa-read-more-catalog');
if(t){
	SaReadMore.init({
		selector: "#sa-read-more-catalog",
		moreTxt:  t.dataset.more,
		lessTxt:  t.dataset.less,
		breakWords: '80',
		isAnimate: 'true'
	});
}*/

/*** READ MORE DETTAGLIO BRAND ***/
let rm_brand = document.querySelector('#sa-read-more-brand');
if(rm_brand){
	SaReadMore.init({
		selector: "#sa-read-more-brand",
		moreTxt:  rm_brand.dataset.more,
		lessTxt:  rm_brand.dataset.less,
		breakWords: '50',
		isAnimate: 'true'
	});
}


    
	
/** END MODULE FUNCTION ****************************************************************************************************************************** **/
	
	/* PULSANTe TORNA SU */
	if(document.querySelector('.sa_back-to-top')){
		document.querySelector('.sa_back-to-top').addEventListener('click', function(){
			window.scrollTo(0, 0);
		});
	}
	
    //countdown
   /* if($('#countdown').length){
        startCountdown(countdown_el,countdown_date,countdown_totalH); 
    }*/
    
    if($('input[name="pCart[art_var]"]').length){
        var codice_iniziale = $('input[name="pCart[art_var]"]').val();
        sa_tab_express(codice_iniziale);
    }
    
    
	//Aggiunge la classe perchè bcumbs viene direttamente 
	$( "nav.breadcrumbs ul.breadcrumbs__list li" ).addClass( "breadcrumbs__item" );
	
	//click su richiedi campione [o in generale dve c'è un tooltip] in modo che resti aperto e non perda il focus
	$('a[data-toggle="tooltip"]').on('click',function(e){
		e.preventDefault();
		return false;
	});

    if($('.product-configurator').length){
      Configurator.init({
        compact: $('.product-configurator--compact').length ? true : false,
        product: {
          "code": "",
          "price": $('#sa_prezzo').val(),
          "discount": $('#sa_sconto').val(),
        },//
       options:JSON.parse($('input[name="jsonT"]').val())// {"01":{"code":"0142ROVE","label":"Nero","price":0},"05":{"code":"05C0SMAL","label":"Bianco","price":0},"06":{"code":"0661NO00","label":"Si","price":0}} //{"color":{"code":"01Y0BIAN","label":"Nero","price":0},"border":{"code":"05C0SMAL","label":"Bianco","price":0},"seat":{"code":"0661NO00","label":"Si","price":0}}      
	  });
		
		
        //recupero il valore attuale della variante del campo hidden per visualizzare l'immagine variante se esiste
	  $('.option-choices__entry').on('click', function(){
		  var art_var_cod = $('input[name="pCart[art_var]"]').val();
//		  /SA_script.setActualImgVar.init(art_var_cod);
		  
	  });
	  
		
    }
	//DEBUG -> Configurator 
	//console.log(Configurator.options);
	//console.log('prezzo iniziale: ' + $('#sa_prezzo').val() + Configurator.basePrice);
	//console.log('sconto listino sediarreda: ' + $('#sa_sconto').val());
	//console.log($('input[name="jsonT"]').val());
	
	/* SCRIPT ORDINAMENTO PAGINA CATALOGO 24-01-2020*/
    if($('.ord-site').length){
        var w = $('.ord-site').width();
         //console.log(w);
        $('#collapseOrd').css('width',w);
        $(window).resize(function(){
            w = $('.ord-site').width();
            $('#collapseOrd').css('width',w);
        });
            
            
            $('.ord-site p:first-child').on('click',function(){
                $(this).find('span').toggleClass('arrow-rotate');
            });
        }
	
	// SE esiste il div #AdminInfo
	if($('#AdminInfo').length){
		SA_script.mainHeadAdmin.init();
	}
	
	/*
	// SE esiste il div #modal-nsl bootstrap 4
	if($('#modal-nsl').length){
		$('#modal-nsl').modal();
	}
	*/
	
	//SE esiste la modale custom
	if($('#modal-nsl').length){
		
		//DEBUG -->console.log('modale nsl');
		
		//mostro wrapper scuro popup newsletter
		$('#modal-nsl').show();
		$('#modal-nsl').addClass('an');//animazione background
		
		//mobile
		if($(window).width() < 460){
			$('.sa-modal').animate({
				left: "50%",
		  	}, 500);
		//desktop	
		}else{
			$('.sa-modal').animate({
				left: "0",
		  	}, 500);   
		}
		
		
		
		$('.sa-close-modal').on('click',function(){
			$('#modal-nsl').removeClass('an');//animazione background	
			
			$('.sa-modal').animate({
				left: "-100%",
			  }, 500,
			  function() {
				$('#modal-nsl').hide();
			  }						  
			);
		});
		//click su submit
		$('#modal-submit').on('click',function(e){
			e.preventDefault();
			//DEBUG -->console.log('form block click button');
			var email = $('input.nsl_mail').val();
			var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			
			/*$('div.newsletter__form input#pmail').keyup(function(){
				$('div.sa_popover').hide('fast');
			});*/
			
			if(filter.test(email)){
				//DEBUG -->console.log('mail corretta');//posso fare submit
				//$('.sa-modal .sa_popover').hide();
				$('#modal-form-nsl').submit();
				//$("#cFormNewsletter").submit();
			}else{
				$('.sa-modal .sa_nsl_error').show();
				//add error to input field
				//$('#modal-form-nsl').addClass('nsl_mail_error');
				$('#modal-form-nsl .wrapper-nsl-input').addClass('nsl_mail_error');
				
				if(!$('#newsletter-checkbox').is(':checked')){
					$('#modal-form-nsl .newsletter-privacy-error').show();
				}
				
				$('#modal-submit').addClass('nsl_button_error');
				
			}
			
			//DEBUG -->console.log(email);
		});
		
	}
	//fine popup newsletter
	
	//Validazione Email
	$('button.button.button--light').on('click',function(){
		var email = $('div.newsletter__form input#pmail').val();
		SA_script.validateEmail.init(email);
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
	
    if($('.set_kart a.button').length){
       //DEBUG --> console.log('pulsante caricato');
    }
	
	//Pulsante inserisci nel carrello prodotto
	/** DISMESSA SPOSTATA IN SA_PRODUCTPAGE:JS
	$('.set_kart a.button').on('click',function(e){
         
        // Se trovo il 'form' della gift card 
       if( $('#nome-giftCard').length ){ 
		    //console.log('is gift card');
            let filtro = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
            let email  = $('#mail-giftCard'); 
            let name   = $('#nome-giftCard');
			let isverified = false;
			
			//primo giro
			$('label[for="mail-giftCard"]').removeClass('err-giftcard');
			$('label[for="mail-giftCard"]').children().css('display', 'none');
			$('label[for="nome-giftCard"]').removeClass('err-giftcard');
			$('label[for="nome-giftCard"]').children().css('display', 'none');
			
            //validate email field
            if(!filtro.test(email.val())){
				//DEBUG -->console.log('formato email non corretto');
				$('label[for="mail-giftCard"]').addClass('err-giftcard');
				$('label[for="mail-giftCard"]').children().css('display', 'inline');
			}
			if(!name.val()){
			   	$('label[for="nome-giftCard"]').addClass('err-giftcard');
				$('label[for="nome-giftCard"]').children().css('display', 'inline');
			}
			
			//se è tutto ok check
			if( name.val() && filtro.test(email.val()) ) {
				
		        //aggiungere i dati ai campi input hidden per il carrello qui sotto
				$('input[name="pCart[giftcard_name]"]').val(name.val()); 
				$('input[name="pCart[giftcard_mail]"]').val(email.val());
				
				//faccio il submit
				$('input[name="pCart[submit]"]').val('TRUE');
				$('form[name="cFormBuy"]').submit();
				e.preventDefault();
				return false;
			} 
            
        }else{
            $('input[name="pCart[submit]"]').val('TRUE');
            $('form[name="cFormBuy"]').submit();
            e.preventDefault();
            return false;
        } 
	});
	***********/
	
	//Pulsante inserisci nel carrello Pagina prodotto sezione pronta consegna
	$('.set_pronta_cons a.button').on('click',function(e){
		if( !$(this).hasClass('button--disabled') ){
			$('input[name="pCart[submit]"]').val('TRUE');
			$('form[name="cFormBuy"]').submit();
		}
		e.preventDefault();
		return false;
	});
	
	
	//SE ESISTE LA SEZIONE CONSIGLIATI
	if($('#recent-suggested').length){
		SA_script.tabView.init();
	}
	
	//INIZIALIZZAZIONE GALLERY PER LANDING PAGE
	if($('#lp-slideshow').length){
		SA_script.lpSlide.init();
		//SA_script.lpSlide.resize();
	}
	
	//PAGINA CARRELLO ORD02
	if($('#formDestination').length){
		SA_script.toggleFormDestination.init();
	}
	
	//CHECK PASSWORD
	if($('#psw_recovery').length){
		SA_script.checkPsw.init();
	}
	
    /*
        Quando clicco invio sul codice promozionale blocco l'invio del form
    */
    $('.checkout-summary__promocode').on('focus',function(){
        $(window).keydown(function(event){
            if( (event.keyCode == 13) ) {   
              event.preventDefault();
              $(this).setAttribute('value', this.value);
              $('.form--register').submit(); 
            }
          });
  }); 
    
	//GESTIONE APERTURA/CHIUSURA FORM LOGIN CARRELLO
	if($('.sa_title_checkout_login').length){
		$('.sa_title_checkout_login').on('click',function(){
			$(this).toggleClass("open");
			$('.sa_open_login_kart').slideToggle();
		});
	}
	
	//AGGIUNGI QUANTITA A CAMPO HIDDEN PER INSERIMENTO PRODOTTO IN CARRELLO MOBILE
	$('.sa-qt-stepper select').on('change',function(){
		var qt = $(this).val();
		$("input[name='pCart[art_qt]']").val(qt); 
	});
    
    //AGGIUNGE CLASSE ACTIVE A PULSANTE TUTTI I FILTRI SE UN SUO DISCENDENTE E SELEZIONATO
    if($(".filters__dropdown .filter-select").hasClass('active')){
        //DEBUG -->console.log('filtro con classe active');
        $(".filters__dropdown").prev().addClass('filters__all-active'); 
    }

    
    
	
    
    /********
     funzione che, al cambio della variante modifica eventualmente il prezzo di partenza non scontato.
    ****/
    if($('.option-choices__entry').length){
        SA_script.noScountPrice.init();
    }
   
    //STEPPER CARRELLO aggiunto a quantity-stepper.js eliminare
    $('.quantity-stepper.kart-stepper').each(function(){
        var $this = $(this);
        var $input = $this.find('.quantity-stepper__input');
        var $up = $this.find('.quantity-stepper__plus');
        var $down = $this.find('.quantity-stepper__minus');
        var step = $input.data('step-value');
        var start_qt = $input.data('qtval');
        var key = $input.attr('data-key');
        var min_val = $input.attr('min');
        $up.on('click',function(e){
            //e.preventDefault();
            $input.val(start_qt + step);
		    $("input[name='pCart[kart]["+key+"][art_qt]']").val(start_qt + step);
            $('form.form--register').submit();
        });
        $down.on('click',function(e){
            //e.preventDefault();
            if(start_qt > min_val){
               $input.val(start_qt - step);
		       $("input[name='pCart[kart]["+key+"][art_qt]']").val(start_qt - step);
               $('form.form--register').submit();
            }
        });
    });
    
  
/* ****************************************************************************************************************************** */
    
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
    
    /** MASONRY **/
    // init Masonry
    if($('#masonry').length){
        var $grid = $('#masonry').masonry({
            itemSelector : ".refer-item",
            columnWidth: '.refer-item',
            gutter: 20
        });
        // layout Masonry after each image loads
        $grid.imagesLoaded().progress( function() {
          $grid.masonry('layout');
        }); 
    }
        
/* ****************************************************************************************************************************** */        
	
}); //* fine ready document



//SPOSTATO IN INFO-PAGE.js
function mobileAccordion(){
    $('.single-tab').each(function(){
        var id = $(this).attr('id');
        $("#"+id).insertAfter('.heading__switch[data-target="#'+id+'"]');
        $("#"+id).removeClass('hidden').slideUp();
        $("#"+id+" h3").hide();
    });
    //switching tab only for mobile
    $('.heading__switch').on('click',function(){
        var target = $(this).data('target');
        //porto immediatamente alla posizione iniziale
        if( $(window).width()<= 480 ){
            $('html, body').animate({
                scrollTop: $(this).parent().offset().top
            }, 1);
        }
        $(target).slideDown();
    });
}
//SPOSTATO IN INFO-PAGE.js
function deskTab(){
    $('.single-tab').each(function(){
         var id = $(this).attr('id');
         $("#"+id).insertAfter('.sped-tabs');
         $("#"+id).show(); 
         $("#"+id+" h3").show();
    });
}

/** funzione somma per calcolare prezzo senza sconti 
//SPOSTATO IN APPLICATION.JS [DESKTOP]
function calcStartPrice(){
    //var startPrice = $(this).data('startprice'); 
    var priceAct = $('#prezzo_sconto_base').val();
    //console.log('prezzo base: '+ priceAct);
    $('.option-choices__entry.selected').each(function(i, obj) {
        //console.log('prezzo variante no sconto: '+ $(obj).data('startprice'));
        priceAct = parseFloat(priceAct) + parseFloat($(obj).data('startprice'));
        priceAct = priceAct.toFixed(2);
    });
    priceAct = priceAct.replace(".", ",");
    var split_str = priceAct.split(',');
    priceAct = split_str[0] + ","+"<small>"+split_str[1]+"</small> &euro;";
    //console.log('prezzo prodotto configurato senza sconto : '+ priceAct);
    $('.product__full-price').html(priceAct);
}
**/


//funzione per promo abbinati, al click su elemento effettua submit di un form
//SPOSTATA IN CART.js
function insertPromoCode(e){
	console.log('click');
    e.preventDefault();
    var target = $( event.target )[0];
    //console.log(target);
    var code = target.getAttribute('data-promoCode');  
    $('.checkout-summary__promocode').attr('value', code);
    //console.log('code vale '+code);
    $('.form--register').submit();
}


var SA_script = {
	mainHeadAdmin: {
		init: function(){
			
			$('#AdminInfoContent').hide();
			$('#AdminInfoToggle').click(function() {
    			$('#AdminInfoContent').toggle();
    				return false;
			});
		}
	},//close function mainHeadAdmin
	validateEmail:{
		init:function(email){
			
			var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			$('div.newsletter__form input#pmail').keyup(function(){
				$('div.sa_popover').hide('fast');
			});
			if(filter.test(email)){
				$("#cFormNewsletter").submit();
			}else{
				$('div.sa_popover').slideDown('fast');
				//DEBUG -->console.log('email non valida');
			}
		}
	},//close function validateEmail
	setActualImgVar: {
		init:function(art_var_cod){
			
			//DEBUG --> console.log('codice variante completo: '+ art_var_cod);
			var flkty = Flickity.data('.product-gallery__show');//recupero istanza della gallery flickty
			var index = $('.product-gallery__thumb[data-selector~="'+art_var_cod+'"]').index();
			//DEBUG --> console.log('index: '+index);
			flkty.select(index,false, true);//rimuovere false, true se vogliamo animazione
			//DEBUG --> console.log(flkty);
		},//close function setActualImgVar
					
	}, //slideshow in landing page DISMESSA 18/11/2021
	lpSlide: {
		init:function(){
			var flkty = new Flickity( '.lp-carousel', {
			  // options
				"freeScroll": true,
				setGallerySize: false,//size the carousel with CSS, rather than using the size of cells.
				pageDots: false
			});
		},
		resize:function(){
			var img_h;
			if($(window).width() <= 768){
				img_h = $('.flickity-slider img:first-child').height();
				//DEBUG -->console.log(img_h);
				$('.flickity-viewport').css('height',img_h);
				$(window).resize(function(){
					img_h = $('.flickity-slider img:first-child').height();
					$('.flickity-viewport').css('height',img_h);
				});
			}
			
		}
	},
	toggleFormDestination:{
		init:function(){
			
			var other_dest = new Array();
			$('#formDestination .sa_reset').each(function () {
				if($(this).val() !==""){
					other_dest.push($(this).val());
				}
				//DEBUG -->console.log(other_dest);
			});
			if(other_dest.length !== 0){//se la parte di form altro luogo di consegna è gia popolata la mostro
				$('#formDestination').show();
				$('.open-dest').addClass('filter-select--open');
			}
            
            
			//console.log(other_dest);
			$('.open-dest').on('click',function(){
				//DEBUG -->console.log('clisk su span');
				$(this).toggleClass("filter-select--open");
				$('#formDestination').slideToggle("slow");
			});
			
			$('#reset_form').on('click',function(){
				$('#formDestination .sa_reset').each(function () {
					$(this).val("");
					$('select.form-select.sa_reset').val('').trigger('change');
                    $('#formDestination .kartlabelError').hide();
				});
			});
			
		}	
	},
	checkPsw:{
		init:function(){ 
			
			//DEBUG-->console.log('start');
			var password = $("#mysa_users_pwd");
  			var confirm_password = $("#mysa_users_pwd_chk");
			
			$('form').submit(function(e){
				e.preventDefault();
				var pswCk = SA_script.checkPsw.validatePassword(password,confirm_password);
				//DEBUG -->console.log(pswCk);
				if(pswCk){
					this.submit();
				}else{
					//DEBUG -->console.log('Form error');
				}
			}); 
		}, 
		validatePassword: function(password,confirm_password){
			
			if(password.val().length < 8 ) {
					//DEBUG -->console.log(password.val().length);
					password[0].setCustomValidity("almeno 8 caratteri");
					setTimeout(function() {
					  password[0].reportValidity();
					  password[0].setCustomValidity('');
					}, 1);
					return false;
				}else if(password.val() !== confirm_password.val()) {
			  		confirm_password[0].setCustomValidity("Passwords Don't Match"); 
					setTimeout(function() {
					  confirm_password[0].reportValidity();
					  confirm_password[0].setCustomValidity('');
					}, 1);
				  	
					return false;
			  	}else{
					return true;
				}
				
		}
	},
	tabView: {
		init:function(){
			 
			$('.tab-content .tab-pane').hide();
			$('.tab-content .tab-pane.active').show();
			//TAB TEST PER SIMILI/CONSIGLIATI/COLLEZIONE
			$('.recent-suggested ul li a').click(function (e) {
				e.preventDefault();
				$('.tab-content .tab-pane').hide();
				$('.recent-suggested ul li').removeClass('active');
				var tab = $(this).data('panel');
				$(this).closest('li').addClass('active');
				//DEBUG -->console.log(tab);
				$('.tab-content #'+tab).show();
			});
		}
	},
    noScountPrice: {
		init:function(){
             calcStartPrice();    
             $('.option-choices__entry').on('click',function(){
               calcStartPrice(); 
            });
        }
    },
    
};


 //VERIFICARE  testFlk(); 

/****************************************************************************************************************************/
/* Funzione di test per ajax loading  
 * 
 *

function testAjax(){
    console.log('Webtest : ajax loader Start');
    //sa-loader
    var url = '/it/index.php?pAct=';
    var sa_obj = $('.sa-loader');//tutti gli elementi con classe sa-loader
    var number = sa_obj.length;//numero di elementi con classe sa-loader
    
    console.log('Numero Elementi ajax: '+ number);
    
    if(sa_obj.length){
        sa_obj.each(function(){
            var d = $(this).data('ajax');
            url = url+d;
            console.log('Valore Elemento ajax: '+ d);
            console.log('Url per ajax: '+url);
            
            //chiamata a funzione TEST
            testFlk($(this),url);
            
        });    
    }
    
   console.log('Webtest : ajax loader End');
 
}

function testFlk(element, url){//element -> DOM object
    element.load(url,function() {
        console.log('Ajax call by function' + url);
        //element.find('.carousel').flickity({pageDots:false, cellAlign:'left'});
        var carousel = element.find('.carousel'),
            contW = carousel.width(),
            itemW = carousel.find('.carousel__item').width(),
            visibleItems = contW / itemW,
            navigable = (carousel.find('.carousel__item').length > visibleItems && !carousel.hasClass('carousel--dotted')) ? true : false,
            grouped = carousel.hasClass('carousel--group') ? visibleItems : false,
            contain = grouped ? false : true,
            hasDots = carousel.hasClass('carousel--dotted') ? true : false;
      
        carousel.flickity({
          pageDots: hasDots,
          wrapAround: navigable,
          groupCells: grouped,
          cellAlign: 'left',
          draggable: true,
          prevNextButtons: navigable,
          arrowShape: arrowShape,
          // selectedAttraction: 0.013,
          // friction: 0.2,
          contain: contain
        });
        
        
        
    });
}

   
    /*if($('.recent-suggested-ajax').length){
			$('.recent-suggested-ajax').load('/it/index.php?pAct=shw50',function() {
				$('.recent-suggested-ajax .carousel').flickity({pageDots:false, cellAlign:'left'});	
				
			});
			
		}*/