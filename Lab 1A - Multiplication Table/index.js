var color = document.getElementById('colors');
var swatch = document.getElementById('swatch');
color.onclick = changeColors;

function changeColors(e) {
    console.log(e.target.textContent);
    swatch.style.backgroundColor = e.target.textContent;
}

function makeMultiplicationTable(rows, columns) {
    var tableContent;
    tableContent += `<th> ${rows}x${columns} Multiplication Table </th>` 
    // I also learned about "template literals" which get rid of a lot of plus signs by using ``.
    for (var y = 1; y <= rows; y++ ) {
        tableContent += "<tr>";
        for (var x = 1; x <= columns; x++) {
            tableContent += "<td>" + (x*y) + "</td>";
        }
        tableContent += "</tr>\n";
    }  
    return tableContent;
}
var multiplicationTable = makeMultiplicationTable(12, 12);

window.onload (document.getElementById('mtable').innerHTML = multiplicationTable);