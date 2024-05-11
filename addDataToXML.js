const fs = require('fs');
const xml2js = require('xml2js');

// Citirea fișierului XML
fs.readFile('data/data.xml', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading XML file:', err);
        return;
    }

    // Parsarea XML-ului într-un obiect JavaScript
    xml2js.parseString(data, (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return;
        }

        // Verificăm dacă rezultatul parsării XML este definit și conține elementele dorite
        if (result && result.root && result.root.element) {
            // Modificarea datelor
            result.root.element.push({ newElement: 'newValue' });

            // Convertirea obiectului JavaScript înapoi în XML
            const builder = new xml2js.Builder();
            const xml = builder.buildObject(result);

            // Salvarea XML-ului modificat în fișier
            fs.writeFile('data/data.xml', xml, (err) => {
                if (err) {
                    console.error('Error writing XML file:', err);
                    return;
                }
                console.log('Data added to XML file successfully.');
            });
        } else {
            console.error('Invalid XML structure or missing elements.');
        }
    });
});
