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
}
function handleClickSubtract(event) {
    event.preventDefault();

    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
  
    console.log('subtract clicked');
}

function handleClickMultiply(event) {
    event.preventDefault();

    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
  
    console.log('multiply clicked');
}

function handleClickDivide(event) {
    event.preventDefault();

    let num1 = $("#num1").val();
    let num2 = $("#num2").val();
  
    console.log('divide clicked');
}