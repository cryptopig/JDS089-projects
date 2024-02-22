var xhttp = new XMLHttpRequest();

document.getElementById('submitButton').onclick = function() {
    // Get the input values from the form
    var name = get('nameInput').value;
    var year = get('yearInput').value;
    var format = get('formatInput').value;

    // Call getMonarch with the input values
    getMonarch(name, year, format);
};

function getMonarch(name, year, format) {
    // Construct the URL with query parameters
    var url = 'http://www.mixed-up.com/mc/api/monarchs.php';
    url += '?query=' + encodeURIComponent(name);
    url += '&year=' + encodeURIComponent(year);
    url += '&format=' + encodeURIComponent(format);

    xhttp.onreadystatechange = processResponse;
    xhttp.open('GET', url);
    xhttp.send();
}

function processResponse() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        document.getElementById('monarch').textContent = xhttp.responseText;
    }
}

function get(id) {
    return document.getElementById(id);
}
