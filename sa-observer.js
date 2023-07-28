//Using document.body.contains.
if(document.body.contains(document.getElementById('infografica_observer'))){    
    
 /**** animated numbers ****/
    function animateInfografica(id, start, end, increase) {
        let current = start; 
        let increment = increase;
        let obj = document.getElementById(id);
        let timer = setInterval(function() {
            current += increment;
            obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, .10); 
     }
       
    //infoTest id infografica x observer
    let observer = new IntersectionObserver((entries, observer) => { 
      entries.forEach(entry => {
          //console.log('2- ' + entry.intersectionRatio);
        if (entry.isIntersecting) {
		     // console.log(entry.target.id, "is intercepting");
            //call to function
            animateInfografica("case", 0, 88830, 378);
            animateInfografica("contr", 0, 5405, 23);
            animateInfografica("paesi", 0, 235, 1);
            animateInfografica("catalog", 0, 5170, 22);
            
            observer.unobserve(entry.target);    
        }
      });
    }, {threshold: [0.75, 1]});  

    observer.observe(document.querySelector('#infografica_observer'));   
  
    
}//end check if element exist 