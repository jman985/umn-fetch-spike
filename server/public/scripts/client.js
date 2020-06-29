console.log('JS is ready');


$(document).ready(handleReady);

let operation;

function handleReady() {
  console.log("jquery is loaded!")

    $("#plus-btn").on('click',handleClickAdd);
    $("#minus-btn").on('click',handleClickSubtract);
    $("#times-btn").on('click',handleClickMultiply);
    $("#divide-btn").on('click',handleClickDivide);

    $("#equals-btn").on('click',handleClickEquals);
    $("#clear-btn").on('click',handleClickClear);

    getHistory(); //get calculation history when page loads
};

//handle equals click and send inputs to the server
function handleClickEquals(event){
    event.preventDefault();

    $('#result').remove();
   
    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
    
    if (num1==undefined ||num2==undefined||operation==undefined) {
      alert("ERROR. PLEASE TRY AGAIN.");
      return false;
          
    };

    console.log('equals clicked', num1,operation,num2);

    $.ajax({
        type: 'POST',
        url: '/equal',
        data: { number1: num1 ,
                number2: num2,
                operator: operation
            } 
       }).then( function(response) {
          console.log('Computed successfully',response);

            getResult();
        })
        .catch( function(error) {
          alert('Sorry, bad things happened. Try again later!');
          console.log('Error on POST', error)
        })
    };


//get result from the server
function getResult(){
    $.ajax({
        type: 'GET',
        url: '/equal'
      })
        .then( function(response) {
          console.log('Got result', response);
          let el = $('#displayResult');
    
            console.log(response);
            el.append(`<h2 id="result">${response.result} <h2>`);

            $("#listHistory").append(`<li> ${response.number1} ${response.operator} 
            ${response.number2} = ${response.result} </li>`);
            
            $("#num1").val('');
            $("#num2").val('');
        
        }).catch( function(error) {
          alert('Sorry, bad things happened. Try again later!');
          console.log('Error on GET', error)
        })
    
};


//add button handler
function handleClickAdd(event) {
    event.preventDefault();
    console.log('add clicked');

    operation= '+';
    };

//subtract button handler
function handleClickSubtract(event) {
    event.preventDefault();

    console.log('subtract clicked');

    operation='-';
    };

//multiply button handler
function handleClickMultiply(event) {
    event.preventDefault();

    console.log('multiply clicked');

    operation='*';
  
    };

//divide button handler
function handleClickDivide(event) {
    event.preventDefault();
  
    console.log('divide clicked');

    operation='/';
};


//get calculation history for when page loads
function getHistory() {
    $.ajax({
        type: 'GET',
        url: '/history'
      })
        .then( function(response) {
          console.log('Got history', response);
          
          for (let i=0; i<response.length; i++){

            $("#listHistory").append(`<li> ${response[i].number1} ${response[i].operator} 
            ${response[i].number2} = ${response[i].result} </li>`);
        };
     
        }).catch( function(error) {
          alert('Sorry, bad things happened. Try again later!');
          console.log('Error on GET', error)
        })
};

//clear inputs and result
function handleClickClear(event) {
    event.preventDefault();
  
    console.log('clear clicked');

    $("#num1").val('');
    $("#num2").val('');

    $('#result').remove();

};