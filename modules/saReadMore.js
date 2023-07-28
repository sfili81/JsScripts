/**
 *  Read More JS
 *  Truncates text via specfied character length with more/less actions.
 *  Maintains original format of pre truncated text.
 *  @author stephen scaff
 *  @todo   Add destroy method for ajaxed content support.
 *          Add settings via params
 *
 */

let s, truncatedHeight;

export default class SaReadMore {
	
	static settings(options) {
		//console.log(options);
		let selector   = options.selector   ? options.selector   : '.js-read-more'; 
		let moreTxt    = options.moreTxt    ? options.moreTxt    : 'Read More'; 
		let lessTxt    = options.lessTxt    ? options.lessTxt    : 'Less More'; 
		let breakWords = options.breakWords ? options.breakWords : '50'; 
		let isAnimate  = options.isAnimate  ? options.isAnimate  : 'false';
		
		//console.log('3' + selector);
    return {
    	content: document.querySelectorAll(selector),
      originalContentArr: [],
      truncatedContentArr: [],
      moreLink: moreTxt,
      lessLink: lessTxt,
			rmWords: breakWords,
			isAnimate: isAnimate,
		}
	}
	
	static bindEvents() {
  	this.truncateText();
  }
	
	/**
   * Count Words
   * Helper to handle word count.
   * @param {string} str - Target content string.
  */
  static countWords(str) {
  	return str.split(/\s+/).length;
  }

	
	/**
   * Ellpise Content
   * @param {string} str - content string.
   * @param {number} wordsNum - Number of words to show before truncation.
   */
  static  ellipseContent(str, wordsNum) {
		
		//creo un array con ogni parola
		const str_array = str.split(/\s+/)
		//divido l'array dal fondo fino al numero definito
		const temp = str_array.slice( wordsNum, str_array.length)
		
		const t = (element) => element.includes('.');
		
		let index = temp.findIndex(t); // recupero index del primo . dopo le prime tot parole
		
		wordsNum = parseInt(wordsNum) + parseInt(index) + 1;
		
		//console.log(str_array.length);
		if(str_array.length > wordsNum){
			//rimuovo tutto quello che c'è dopo il punto
			str_array[wordsNum-1] = str_array[wordsNum-1].substring(0, str_array[wordsNum-1].indexOf('.')+1)
		
			//funziona da qui
			let ellipseString = str_array.slice( 0, wordsNum);		
		
  		return ellipseString.join(' ') + ' [...]';	 
		}
  }
	
	/**
   * Truncate Text
   * Truncate and ellipses contented content
   * based on specified word count.
   * Calls createLink() and handleClick() methods.
  */
  static truncateText() {
		//console.log(s.content);
  	for (let i = 0; i < s.content.length; i++) {
    	const originalContent = s.content[i].innerHTML;// take html for the element
      const numberOfWords = s.rmWords;
      const truncateContent = SaReadMore.ellipseContent(originalContent, numberOfWords);
      const originalContentWords = SaReadMore.countWords(originalContent);
			
			//console.log(truncateContent);
			
      s.originalContentArr.push(originalContent);
      s.truncatedContentArr.push(truncateContent);

      if (numberOfWords < originalContentWords) {
        s.content[i].innerHTML = s.truncatedContentArr[i];
        let self = i;
				
				truncatedHeight = s.content[i].offsetHeight;
				//console.log('il testo troncato è alto ' + truncatedHeight);
				
				//DEBUG LINES
				//console.log('numero parole da visualizzare: '+numberOfWords);
				//console.log('numero parole della descrizione: '+originalContentWords);
				//console.log( s.content[i].innerHTML);
				
      	SaReadMore.createLink(self)
      }
    }//end for
       SaReadMore.handleClick(s.content);
	}
	
	/**
   * Create Link
   * Creates and Inserts Read More Link
   * @param {number} index - index reference of looped item
  **/
  static createLink(index) {
  	const linkWrap = document.createElement('span');
    linkWrap.className = 'read-more__link-wrap';
    linkWrap.innerHTML = `<a id="read-more_${index}" class="read-more__link" style="cursor:pointer;">${s.moreLink}</a>`;
    // Inset created link
    s.content[index].parentNode.insertBefore(linkWrap, s.content[index].nextSibling);
	}
	
	/**
  * Handle Click
  * Toggle Click event
	* DA CORREGGERE ADESSO E SBAGLIATO
  */
  static handleClick(el) {
		//console.log('s.content');
		//console.log(el);
		
  	//seleziono tutti gli elementi con eselttore .read-more__link
		const readMoreLink = document.querySelectorAll('.read-more__link');

		//per ogni link leggi di piu aggiungo l'event listener 
    for (let j = 0, l = readMoreLink.length; j < l; j++) {

    	readMoreLink[j].addEventListener('click', function() {
				const moreLinkID = this.getAttribute('id');
        let index = moreLinkID.split('_')[1];
        el[index].classList.toggle('is-expanded');
				
				let animation_handler = SaReadMore.openAnimate(el[index], this.dataset.clicked,'forwards')
				
				if (this.dataset.clicked !== 'true') {
					
					//gestione animazione
					if(s.isAnimate === 'true'){ 
						el[index].innerHTML  = s.originalContentArr[index];
					 
						animation_handler.play();//start animation
						
					}else{
						//no animation
						//console.log(el[index]);
						el[index].style.height='auto';
						el[index].style.maxHeight='none';
						el[index].innerHTML  = s.originalContentArr[index];
						
					}
					
          this.innerHTML       = s.lessLink;
          this.dataset.clicked = true;
        } else {
					
          //gestione animazione
					if(s.isAnimate === 'true'){
					
						//console.log(animation_handler);
						animation_handler.reverse();
						animation_handler.finished.then(() => { 
							console.log('finito') 
							el[index].innerHTML  = s.truncatedContentArr[index];
							this.innerHTML       = s.moreLink;//modifico il testo del link 
						})
						
						/*x.finish(function() {
							console.log('end animation');
							el[index].innerHTML  = s.truncatedContentArr[index];
						});*/
					
					}else{
						el[index].innerHTML  = s.truncatedContentArr[index];
						this.innerHTML       = s.moreLink;//modifico il testo del link 
					}
					
          
        	this.dataset.clicked = false;
        }
      });
  	}//end for
	}

	/**
  * openAnimate
  * Gestisce l'animazione del testo
	* el elemento da animare
	* type non usato 
  */
	static openAnimate(el/*,type*/){
		let animation
		animation = [{ maxHeight: truncatedHeight+'px' },{ maxHeight: '200vh' } ]
		//type !== "true" ?  animation = [{ maxHeight: truncatedHeight+'px' },{ maxHeight: '100vh' } ] : animation = [{ maxHeight: '100vh' },{ maxHeight: truncatedHeight+'px' } ] ;
		//console.log (animation);
		let keyframes = new KeyframeEffect(
    	el, 
    	animation, {
				duration: 500,
				iterations: 1,
				fill: 'both'
			}
  	);
		
		let istance =  new Animation(keyframes, document.timeline);
		
		return istance;		
	}
	
	
	/**
  * Open All
  * Method to expand all instances on the page.
  */
  static openAll() {
    const instances = document.querySelectorAll('.read-more__link');
    for (let i = 0; i < instances.length; i++) {
      content[i].innerHTML = s.truncatedContentArr[i];
    	instances[i].innerHTML = s.moreLink;
  	}
  }
	
	/* Inizializza la classe SaReadMore */
	static init(options = "") {
    s = this.settings(options);
		console.log(s);
    this.bindEvents();
		console.log('SaReadMore init');
		
	}


}//end SaKart

