var color = document.getElementById('colors').onclick = changeColors;
var swatch = document.getElementById('swatch');

function changeColors(e) {
    console.log(e.target.textContent);
    swatch.style.backgroundColor = e.target.textContent;
}