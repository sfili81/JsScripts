/** nuova ricerca maggio 2020**/

//hide modal
$('.sa-search-container').hide();

//GET Template for saerch predictive
 var tpl_predictive = $("#sa-tpl-search-predictive").html();


/** ??????? **/
if( $('#AdminInfoContent').length ){
    let toph = $('#AdminInfoContent').outerHeight();
    //DEBUG-->console.log(toph);
}

let win = $(window).height();
//DEBUG--> console.log('altezza dell finestra '+win);

/* Open modal search */
$('#sa_search').on('click', function(){
    
    //When open the modal search call recommendations_popular() function
    recommendations_popular();
    
    //DEBUG-->console.log('click su lente');
    $('.sa-search-container').show();
    
    $('body').css('overflow','hidden');//remove scroller
    
    $(".sa-search-container .sa-search-block").animate({
        height: "860"
      }, 400);
        
});

//close modal search
$('#search_close').on('click', function(){
    $('body').css('overflow','auto');// automize scrolling
    $('.sa-search-container').hide();
    //set height 0 
    $(".sa-search-container .sa-search-block").css('height', 0);
    //call reset function
    search_reset();
});

//click on reset form button
$('#search_reset').on('click', function(){
    //call reset function
    search_reset();
});




//Ripulisco html quando elimino una ricerca o il campo ricerca è vuoto
$('.search__input').keyup(function(){
    
    let sa_query = $(this).val();
    if(sa_query === ""){
       $('.col-dx-sa').empty();    
       //DEBUG-->console.log('campo ricerca vuoto');
    }
    
    
   
});


//TEST CLICK SU LI
$('.col-sx-sa ul.cont-suggestions').on('click','li', function(){
    
    let query = $(this).data('query');
    //DEBUG-->console.log( 'val ' + query );
    $('.search__input').val(query);
});


/* Reset Function
*  remove results from html
*/
function search_reset(){
    $('.col-sx-sa ul.cont-suggestions').empty(); 
    $('.col-dx-sa').empty();
    $('.search__input').val("");
}




/** TEST FUNCTION CLERK **/
$('.search__input').keyup(function(){
    
    /* ivalue of the search input */
    let sa_query = $(this).val();
    
    //Call to search/suggestions
    search_suggestions(sa_query);
            
    //Call to search/predictive
    search_predictive(sa_query,tpl_predictive);
    
});


/********* FUNCTIONS CALL API CLERK *********/

/* search predictive */
function search_predictive(query,tpl){
    Clerk("call", "search/predictive",{
        key: "dEsqF8lVQG4kw7uZoeKklYhOgAvf0UYZ",
        limit: 10,
        attributes:["name", "description", "brand", "url", "image"],
        query: query
        },
        function(response){ 
            //DEBUG --> console.log('risultati chiamata predictive');
            //DEBUG --> console.log(response);
            $('.col-dx-sa').empty();
        
            // Final HTML variable 
            var resultHtml = "";
            $.each(response.product_data, function(key,valueObj){
                resultHtml += tpl.replace(/{{url}}/g, valueObj.url)
                                 .replace(/{{image}}/g, valueObj.image)
                                 .replace(/{{name}}/g, valueObj.name)
                                 .replace(/{{description}}/g, valueObj.description);
            });
        
            //console.log('resulthtml '+resultHtml);
            $('.col-dx-sa').append(resultHtml); 
           
        },
        function(response){ 
            console.error(response); 
        }
    );
}

/* search suggestions */
function search_suggestions(query){
    Clerk("call", "search/suggestions",{
            key: "dEsqF8lVQG4kw7uZoeKklYhOgAvf0UYZ",
            limit: 5,
            query: sa_query
        },
        function(response){ 
        
            //$('.col-sx').empty();//azzero
        
            //let data = response.result;
            //DEBUG --> console.log('risultati chiamata diretta');
           //DEBUG -->console.log(response.result);
        
           $('.col-sx-sa ul.cont-suggestions').empty(); 
           $.each(response.result, function(key,val){
                $('.col-sx-sa ul.cont-suggestions').append('<li data-query="'+val+'">'+ val + '</li>');
           });
        },
        function(response){ 
            console.error(response); 
        }
    );
}






/* recommendations/popular  */
function recommendations_popular(){
    Clerk("call", "recommendations/popular",{
        key: "dEsqF8lVQG4kw7uZoeKklYhOgAvf0UYZ",
        limit: 10,
        attributes:["name", "image","url" ],//"description", "brand", "url", "image"
        labels:["bestesllers"]
        },
        function(response){ 
            //DEBUG --> console.log('risultati chiamata recommendations_trending');
            //DEBUG --> console.log(response);
            
        },
        function(response){ 
            console.error(response); 
        }
    );
}














 /*
            $.each(response.product_data, function(key,valueObj){
                
                let tpl = '<a href="'+ valueObj.url +'" class="search-autocomplete__item">   <figure class="search-autocomplete__image" style="background-image: url('+ valueObj.image +')"></figure><div class="search-autocomplete__content"> <h5 class="search-autocomplete__title">'+ valueObj.name +'<small> '+ valueObj.brand +'</small></h5> <p class="search-autocomplete__description">'+ valueObj.description +'</p> </div> </a> </div> ';
                $('.col-dx-sa').append(tpl);    
                
            });
        */

/* Clerk quando ricevo una risposta 
Clerk('on', 'response', function(content, data){
    //DEBUG --> console.log('Called when receiving a response form the API.');
    //DEBUG --> console.log(data);
            
    $('.col-dx-sa').empty();
    
    $.each(data.product_data, function(key,valueObj){
        
        let tpl = '<a href="'+ valueObj.url +'" class="search-autocomplete__item">   <figure class="search-autocomplete__image" style="background-image: url('+ valueObj.image +')"></figure><div class="search-autocomplete__content"> <h5 class="search-autocomplete__title">'+ valueObj.name +'<small> '+ valueObj.brand +'</small></h5> <p class="search-autocomplete__description">'+ valueObj.description +'</p> </div> </a> </div> ';
        
        $('.col-dx-sa').append(tpl);        
    });
    
});
*/




 // Content event Clerk
/*
Clerk('on', 'rendered', function(content, data) {
    console.log('Called just before rendering of a Content.');
      
    console.log(data.template); 
    
    console.log(data); 
    
    
    let test = $('body').find('#clerk-content-1');
    console.log('trovato ' + test);
    console.log(test);
    test.remove();
    //$('#clerk-content-1').remove();
    
    //$('.col-sx').html(content.element);
      
});
*/


/*
$('.search__input').keyup(function(){
    let sa_query = $(this).val();
    
    //QUESTO CHIAMA PREDICTIVE
    Clerk("call", 
          "search/predictive",
          {
            key: "dEsqF8lVQG4kw7uZoeKklYhOgAvf0UYZ",
            limit: 2,
            query: sa_query
          },
          function(response){ 
            //$('.col-sx').empty();//azzero
        
            //let data = response.result;
            
            console.log('risultati chiamata diretta');
            console.log(response);
        
        
          },
          function(response){ 
            console.error(response); 
          }
    );
    
});

*/




/*

data-api="search/predictive"
              data-limit="2"
*/

//dEsqF8lVQG4kw7uZoeKklYhOgAvf0UYZ






