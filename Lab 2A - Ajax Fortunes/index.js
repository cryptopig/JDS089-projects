

var xhttp = new XMLHttpRequest();

document.getElementById('generateButton').onclick = generateFortune;
generateFortune();
function generateFortune() {
    xhttp.onreadystatechange = processResponse;

    xhttp.open('GET', 'http://www.mixed-up.com/mc/api/fortunepb.php')

    xhttp.send();
}
function processResponse() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        document.getElementById('fortune').textContent = xhttp.responseText;
    }
}