console.log('JS is ready');


$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")

  $("#plus-btn").on('click',handleClickAdd)
  $("#minus-btn").on('click',handleClickSubtract)
  $("#times-btn").on('click',handleClickMultiply)
  $("#divide-btn").on('click',handleClickDivide)
}

function handleClickAdd(event) {
    event.preventDefault();

    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
  
    console.log('add clicked');

    $.ajax({
        type: 'POST',
        url: '/add',
        data: { number1: num1  ,
                number2: num2 }     
       }).then( function(response) {
          console.log('Added successfully',response);
          getHistory();
        })
        .catch( function(error) {
          alert('Sorry, bad things happened. Try again later!');
          console.log('Error on POST', error)
        })
    }


function handleClickSubtract(event) {
    event.preventDefault();

    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
  
    console.log('subtract clicked');

    $.ajax({
        type: 'POST',
        url: '/subtract',
        data: { number1: num1  ,
                number2: num2 }     
       }).then( function(response) {
          console.log('Subtracted successfully',response);
          getHistory();
        })
        .catch( function(error) {
          alert('Sorry, bad things happened. Try again later!');
          console.log('Error on POST', error)
        })
    }


function handleClickMultiply(event) {
    event.preventDefault();

    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
  
    console.log('multiply clicked');

  $.ajax({
        type: 'POST',
        url: '/multiply',
        data: { number1: num1  ,
                number2: num2 }     
       }).then( function(response) {
          console.log('Multiplied successfully',response);
          getHistory();
        })
        .catch( function(error) {
          alert('Sorry, bad things happened. Try again later!');
          console.log('Error on POST', error)
        })
    }


function handleClickDivide(event) {
    event.preventDefault();

    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
  
    console.log('divide clicked');

    $.ajax({
        type: 'POST',
        url: '/divide',
        data: { number1: num1  ,
                number2: num2 }     
       }).then( function(response) {
          console.log('Divided successfully',response);
          getHistory();
        })
        .catch( function(error) {
          alert('Sorry, bad things happened. Try again later!');
          console.log('Error on POST', error)
        })
    }


function getHistory() {
    
}