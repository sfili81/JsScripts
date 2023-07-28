//Array of regex
var matchs  = [];
		
// Miliseconds
matchs.push(/^[0-9]*$/.source); //.source
// MM/DD/YY hhs:mm:ss
matchs.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
// YY/DDD/MM hhs:mm:ss and YY-DD-MM hhs:mm:ss
matchs.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
// Cast the matchs to a regular expression object
matchs = new RegExp(matchs.join('|'));
			
//check if date is in a valid format ANONYMOUS FUNCTION
const getDate = dateString => {
	// Caste string to date object
	if(String(dateString).match(matchs)) {
		// If dateString is pass as miliseconds ->  cast to number before create a new Date
		if(String(dateString).match(/^[0-9]*$/)) {
			dateString = Number(dateString);
		}
		// Replace dashes to slashes
		if(String(dateString).match(/\-/)) {
			dateString = String(dateString).replace(/\-/g, '/');
	  	}
		//Create Date Object
		return new Date(dateString);				
	}else {
	  throw new Error('Non posso fare il cast di `' + dateString + '` ad un date object.');
	}
};
		
if(typeof dateString !== 'undefined'){
	var countDownDate = getDate(dateString).getTime();//new Date("2021-02-14T09:36").getTime(); //2021-01-29T03:24:00

	//First call of countdown function
	countdown(totalH);

	// Update the countdown every 1 second
	setInterval(function() {
		countdown(totalH);
	}, 1000);
}
function countdown(totalH=false){
	
	if(!document.getElementById("countdown")){
		console.log('no countdown');
		return;
	}
	
	// Get today's date and time
	let now = new Date().getTime();

  	// Find the difference between now and the countdown date
  	let diff = countDownDate - now;
			
  	if(diff > 0){	
			  
		// Time calculations for days, hours, minutes and seconds
	  	let days    = Math.floor(diff / (1000 * 60 * 60 * 24));
	  	let hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  	let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	  	let seconds = Math.floor((diff % (1000 * 60)) / 1000);			  
	  	//Total hours calculation 
	  	let totalhours = Math.floor(diff / (1000 * 60 * 60));
			  			  
	  	//Write Countdown	
		if(!totalH){
			document.getElementById("days-countdown").innerHTML    = days.toString().padStart(2, '0');
			document.getElementById("hours-countdown").innerHTML   = hours.toString().padStart(2, '0');
		}else{
			document.getElementById("hours-countdown").innerHTML   = totalhours.toString().padStart(2, '0');
		}			  	
			document.getElementById("minutes-countdown").innerHTML = minutes.toString().padStart(2, '0');
			document.getElementById("seconds-countdown").innerHTML = seconds.toString().padStart(2, '0');		
	}
}