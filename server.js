// server.js
const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();
const PORT = process.env.PORT || 8008;

app.use(express.static('public'));

const citiesData = {};

fs.readdirSync('./data').forEach(file => {
    const filePath = `./data/${file}`;
    const city = file.split('.')[0];
    const xmlData = fs.readFileSync(filePath, 'utf-8');

    xml2js.parseString(xmlData, (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return;
        }
        citiesData[city] = result;
    });
});

app.get('/data/:city', (req, res) => {
    const city = req.params.city;
    if (citiesData[city]) {
        res.json(citiesData[city]);
    } else {
        res.status(404).send('City not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
