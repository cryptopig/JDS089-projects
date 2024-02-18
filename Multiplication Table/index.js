var color = Document.getElementById('colors').onclick = changeColors();
var swatch = Document.getElementById('swatch');
function changeColors(e) {
    console.log(e.target.textContent);
    swatch.style.backgroundColor = e.target.textContent;
}