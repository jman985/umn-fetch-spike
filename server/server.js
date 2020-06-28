const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
let historyArray=[];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))
// app.use( bodyParser.json() );

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

app.post('/equal', (req,res) => {
    let newCalc = req.body;
    console.log(newCalc);
    historyArray.push(newCalc);
    res.sendStatus(201);
  })

  app.get('/equal', (req, res) => {
    let newCalc = historyArray[historyArray.length-1];
    let result;

    if(newCalc.operator==='+'){
        result=Number(newCalc.number1)+Number(newCalc.number2);

    }else if(newCalc.operator==='-'){
        result=Number(newCalc.number1)-Number(newCalc.number2);
    }
    else if(newCalc.operator==='*'){
       result = Number(newCalc.number1)*Number(newCalc.number2);
    }
    else if(newCalc.operator==='/'){
        result=Number(newCalc.number1)/Number(newCalc.number2);
    }

    newCalc.result = result;

    res.send(newCalc);
    console.log('in GET /equal', newCalc);
  })