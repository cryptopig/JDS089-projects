var xhttp = new XMLHttpRequest();
document.getElementById('submitButton').onclick = getComposer;
function getComposer() {
    xhttp.onreadystatechange = processResponse;

    xhttp.open('GET', 'http://www.mixed-up.com/mc/api/monarchs.php');

    xhttp.send();
}

function processResponse() {
    if(xhttp.readyState == 4 && xhttp.status == 200)  {
        document.getElementById('monarch').textContent = xhttp.responseText;
    }
}