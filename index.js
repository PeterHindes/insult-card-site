const express = require('express');
const app = express();
const fs = require('fs');

const axios = require('axios');

const dateTime = require('node-datetime');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*evilinsult.com/generate_insult.php*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const fmtt = 'H:M:S.N'

app.use(express.static('data'));
app.use('/ins', function (req, res, next) {
    var dt = dateTime.create();
    var formatted = dt.format(fmtt);
    console.log("Requested Remote Resource " + formatted);
    axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json')
        .then(response => {
            console.log(response.data.insult);
            res.send(response.data.insult);
            var dt = dateTime.create();
            var formattedd = dt.format(fmtt);
            console.log("Finished Remote Resource " + formattedd);
        })
        .catch(error => {
            console.log(error);
        });
})
app.listen(8080);