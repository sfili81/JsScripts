import saHelper from './saHelper.js';//HELPER CLASS

const sp_slideshow = document.querySelector('#sa-hp-slideshow');
const sp_carousel_store_hp = document.querySelector('#sa-authstore'); 
const sp_slidebrand_hp =  document.querySelector('#sa-slidemagazine');    
const sp_landing_gallery = document.querySelectorAll('.lp-galprod');//tutte le gallery delle landing N.B è un nodelist
const sp_landing_new_gallery = document.querySelectorAll('.lp-new-galprod');//tutte le nuove gallery delle landing N.B è un nodelist
const sp_vetrina_hp = document.querySelector('#sa-galProd');
const sp_catalog_top = document.querySelector('#catalog-top-gallery');
const sp_catalog_history = document.querySelector('#catalog-history');
const sp_brand_gallery = document.querySelector('.brand_splide_gallery');

const arrowPathDefault = 'M23.7,19.2L5.4,0.9c-1.2-1.2-3.3-1.2-4.5,0C0.3,1.5,0,2.3,0,3.1s0.3,1.6,0.9,2.2L17,21.5L0.9,37.6 C0.3,38.2,0,39,0,39.8c0,0.8,0.3,1.6,0.9,2.2C1.5,42.7,2.3,43,3.1,43c0,0,0,0,0,0c0,0,0,0,0,0c0.8,0,1.6-0.3,2.2-0.9l18.4-18.4  C24.9,22.5,24.9,20.5,23.7,19.2z'

export default class SaSplideGallery {
	
	static hpSlideshow() {
		if(!saHelper.elementExist(sp_slideshow)) return;
		let isArrow,
				isDrag;
		let gallery_components = document.querySelectorAll('#sa-hp-slideshow .splide__slide');
		//se abbiamo solo un banner tolgo le frecce e il drag
		if(gallery_components.length > 1){
			isArrow = true;
			isDrag = true;
		}else{
			isArrow = false;
			isDrag = false;
		}
		new Splide( sp_slideshow,{
				type:'loop',
				pagination: false,
				arrows: isArrow,
				drag: isDrag,
				arrowPath : arrowPathDefault ,
				breakpoints: {
						800: {
							arrows: false,
							pagination: true,
							drag: isDrag,
						},					
					}
			} ).mount();
			
	}//end slideshow homepage
/***************************************************************************************************************************************/
	
	/* CAROUSEL STORE HOME PAGE */	
	static carouselStoreHp() {	if(!saHelper.elementExist(sp_carousel_store_hp)) return;
		
		new Splide( sp_carousel_store_hp ,{
				perPage: 6,
				gap:10,
				pagination: false,
				arrowPath :arrowPathDefault ,
				breakpoints: {
					900: {
						perPage: 5,
						arrows: false,
						pagination: true,
						drag: true,
					},		
					460: {
						gap:0,
						perPage: 3,
						arrows: false,
						pagination: true,
					},		
				}
		} ).mount();
		
	}//end 	carouselStoreHp
	/***************************************************************************************************************************************/
		
	/* HP SLIDEBRAND HOME PAGE */
	static hpSlidebrand() {		
		if(!saHelper.elementExist(sp_slidebrand_hp)) return;
		new Splide( sp_slidebrand_hp,{
			perPage: 4,
			gap: 10,
			arrows:false,
			pagination: false,
			drag:false,
			breakpoints: {
				768: {
					perPage: 3,
					arrows: false,
					pagination: true,
					drag: true,
				},	
				468: {
					perPage: 2,
					arrows: false,
					pagination: true,
					drag: true,
					},	
			}
		} ).mount();
		
	}
	/***************************************************************************************************************************************/
	
	/* GALLERY LANDING */
	static landingGallery() {
		/* sp_landing_gallery è di tipo NodeList quindi dobbiamo controllare se abbiamo nodi */
		if(sp_landing_gallery.length === 0) return;
				
		sp_landing_gallery.forEach(function(gallery) {
			
			let totxpage;
			gallery.getAttribute('data-perPage') ? totxpage = gallery.getAttribute('data-perPage') : totxpage = 4
			
			
			new Splide( gallery , {
				type: 'loop',
				perPage: totxpage,
				gap: 25,
				arrows:true,
				pagination: false,
				drag:true,
				arrowPath : arrowPathDefault,
				breakpoints: {
					900: {
						perPage: 2,
						arrows: false,
						pagination: true,
						drag: true,
					},	
					468: {
						perPage: 1,
						arrows: false,
						pagination: true,
						drag: true,
					},	
				}
			}).mount();
		});
	}
	/***************************************************************************************************************************************/
	
	/* NEW GALLERY LANDING  sp_landing_gallery*/
	static landingNewGallery() {
		if(sp_landing_new_gallery.length === 0) return;
		
		sp_landing_new_gallery.forEach(function(gallery) {
			let totxpage;
			gallery.getAttribute('data-perPage') ? totxpage = gallery.getAttribute('data-perPage') : totxpage = 4
			
			new Splide( gallery , {
				type: 'slide',
				perPage: totxpage,
				gap: 25,
				arrows:false,
				pagination: false,
				drag:true,
				arrowPath : arrowPathDefault,
				breakpoints: {
					900: {
						perPage: 2,
						arrows: false,
						pagination: true,
						drag: true,
					},	
					468: {
						perPage: 1,
						arrows: false,
						pagination: true,
						drag: true,
					},	
				}
			}).mount();
			
		})
	}
	/***************************************************************************************************************************************/
	
	/* GALLERY PRODOTTI VETRINA HOME PAGE */  
	static hpGalleryProducts() {		
		if(!saHelper.elementExist(sp_vetrina_hp)) return;
		console.log('x');
		new Splide( '#sa-galProd', {	
			type:'loop',
			perPage: 4,
			gap: '1em',
			pagination: false,
			trimSpace: false,
			arrowPath : arrowPathDefault ,
			padding: {
				left : '4rem',
				right: '4rem',
			},
			breakpoints: {
				1140:{
					perPage: 3,
				},
				900:{
					perPage: 2,
					focus    : 'left',
					trimSpace: false,
				},
				640: {
					type:'loop',
					focus    : 'center',
					arrows: false,
					pagination: true,
					fixedWidth: '88%',
					perPage  : 1,
					trimSpace: false,
					padding: {
						left : 0,
						right: 0,
					}
				},
			}
		}).mount();
	}
	/***************************************************************************************************************************************/
	
	/* CATALOG TOP GALLERY */  
	static catalogTopGallery() {		
		if(!saHelper.elementExist(sp_catalog_top)) return;
		new Splide( sp_catalog_top, {
			//type : 'loop',
			perPage: 4,
			autoHeight: true,
			pagination: false,
			gap: 10,
			heightRatio: 0.6,
			perMove: 1,
			arrowPath :arrowPathDefault ,
			breakpoints: {
				768: {
					perPage: 3,
					arrows: false,
					pagination: true,
					//drag: true,
				},
				600: {
					perPage: 2,
					arrows: false,
					pagination: true,
					//drag : true,
				},
			}
		} ).mount();		
	}
	/***************************************************************************************************************************************/
	
	
	/* CATALOG HISTORY GALLERY */
	static catalogHistoryGallery() {		
		if(!saHelper.elementExist(sp_catalog_history)) return;
		
		new Splide( sp_catalog_history , {
			type   : 'slide',
			perPage: 6,
			gap: '15px',
			arrowPath :arrowPathDefault ,
			breakpoints: {
				768: {
					perPage: 2,
					arrows: false,
				},
			}
		}).mount();
	}
	
	/* BRAND PAGE GALLERY */
	static brandGallery(){ //brand_splide_gallery
		if(!saHelper.elementExist(sp_brand_gallery)) return;
		
		new Splide( sp_brand_gallery , {
			type: 'loop',
			perPage: 4,
			gap: 25,
			arrows:false,
			pagination: true,
			drag:true,
			breakpoints: {
				468: {
					perPage: 2
				},	
			}
		}).mount();
	}
	
	static businessGallery(){ //gallery pagina contract
		const hpBusiness = document.querySelector('#galBusiness');
		const hpBusinessReferenze = document.querySelector('#galBusinessReferenze');
		if(!saHelper.elementExist(hpBusiness)) return;
		
		let totxpage;
			hpBusiness.getAttribute('data-perPage') ? totxpage = hpBusiness.getAttribute('data-perPage') : totxpage = 2
		
		new Splide( hpBusiness , {
			type: 'loop',
			perPage: totxpage,
			gap: 20,
			arrows:true,
			arrowPath : arrowPathDefault,
			//autoWidth :true,
			pagination: false,
			drag:true,
			//noDrag: 'p',
			breakpoints: {
				480: {
					perPage: 1
				},	
			}
		}).mount();
		
		//gallery referenze solo se mobile
		if(window.innerWidth <= 767){
			new Splide( hpBusinessReferenze , {
			type: 'loop',
			perPage: 3,
			gap: 20,
			arrows:true,
			arrowPath : arrowPathDefault,
			//autoWidth :true,
			pagination: false,
			drag:true,
			breakpoints: {
				468: {
					perPage: 2
				},	
			}
		}).mount();
		}
		
	}
	
	
	static onlyMobileGallery(){
		//console.log('entri qui?');
		const mobileGallery = document.querySelectorAll('.mobileGallery');
		
		//console.log(mobileGallery);
		
		if(window.innerWidth <= 767){
			
			mobileGallery.forEach(function(gallery) {
				new Splide( gallery , {
					type: 'loop',
					perPage: 1,
					gap: 20,
					arrows:false,
					arrowPath : arrowPathDefault,
					//autoWidth :true,
					pagination: true,
					drag:true,
					breakpoints: {
						468: {
							perPage: 1
						},	
					}
				}).mount();
			});
			
		}		
	}//end onlyMobileGallery
		
	/***************************************************************************************************************************************/
	
	/*
	*	Funzione che aggrega le creazioni delle gallery
	*/
	static galleries(){
		//init home page slideshow
		this.hpSlideshow();
		//init carousel brand in home page
		this.carouselStoreHp();
		//init home pageslidebrand
		this.hpSlidebrand();
		//init gallery into landing page
		this.landingGallery();
		//init gallery products home page
		this.hpGalleryProducts();
		//init gallery catalog top
		this.catalogTopGallery();
		//init gallery catalog history
		this.catalogHistoryGallery();
		//init gallery brand page
		this.brandGallery();
		//init gallery business page
		this.businessGallery();
		//init only mobile gallery
		this.onlyMobileGallery();
		//init new gallery magazine landing
		this.landingNewGallery();
	}

}//end SaHelper




