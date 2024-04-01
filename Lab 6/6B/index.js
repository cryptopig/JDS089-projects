const express = require('express');
const path = require('path');

const PORT = 8000;

const app = express();


app.use(express.static(path.join(__dirname, 'public')));

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// pasta page
app.get('/pasta', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pasta.html'));
});

// pizza page
app.get('/pizza', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pizza.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function textToJson(data, search, sortField) {
    console.log("textToJson", search, sortField);
    let objects = [];
    let lines = data.toString().split("\n");
    for (let i=2; i < lines.length; i++) {
        if (lines[i].length < 2) {
            continue;
        }
        if (search != "" && lines[i].toLowerCase().indexOf(search.toLowerCase())< 0) {
            continue;
        }

        const fields = lines[i].split("|");
        const foodObj = {};
        foodObj.foodName = fields[0];
        foodObj.price = fields[1];
        foodObj. calories = fields[2];
        objects.push (foodObj);

        if (sortField == "foodName") {
            console.log("sorting by food name.");
            objects.sort(cmpString);
        }

        else if (sortField == "price" || sortField == "calories") {
            objects.sort(cmpNumeric);
        }

        return JSON.stringify(objects, null, 2);

    }

    function cmpString(a, b) {
        if ((a[sortField]) < (b[sortField])) {
            return -1;
        }
        else if ((a[sortField]) > (b[sortField])) {
            return 1
        }

        return 0
    }
    function cmpNumeric(a, b) {
        if (parseInt(a[sortField]) < parseInt(b[sortField])) {
            return -1;
        }
        else if (parseInt(a[sortField]) > parseInt(b[sortField])) {
            return 1
        }

        return 0
    }
}
