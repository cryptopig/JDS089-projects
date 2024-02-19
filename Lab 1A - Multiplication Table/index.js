
get('submitButton').onclick = function() {
    var rows = parseInt(get('rowinput').value);
    var columns = parseInt(get('columninput').value);
    var multiplicationTable = makeMultiplicationTable(rows, columns);
    get('mtable').innerHTML = multiplicationTable;

}

 // window.onload makes it slightly faster
function makeMultiplicationTable(rows, columns) {
    var tableContent = "";
    tableContent += `<h3 class = \"styled-text\"> ${rows}x${columns} Multiplication Table </h3>` 
    /* I also learned about "template literals" which get rid of a lot of plus signs by using ` string text ${variableName}.` 
    instead of "string text " + variableName + "."*/
    for (var y = 1; y <= rows; y++ ) {
        tableContent += "<tr>";
        for (var x = 1; x <= columns; x++) {
            tableContent += "<td>" + (x*y) + "</td>";
        }
        tableContent += "</tr>\n";
    }  
    return tableContent;
}

function get(id) {
    return document.getElementById(id);
}
