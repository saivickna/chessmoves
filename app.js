
//Initialize board
var iDiv = document.createElement('div');
iDiv.className = 'block';
var board = document.getElementById('board')
board.appendChild(iDiv);
for (var i = 7; i >= 0; i--) {
  var rowDiv = document.createElement('div');
  rowDiv.className = 'column'
  for (var j = 0; j < 8; j++) {
    var colDiv = document.createElement('div');
    colDiv.className = 'row';
    colDiv.id = cols[j] + i;
    colDiv.innerText = cols[j] + i;
    rowDiv.appendChild(colDiv);
  }
  board.appendChild(rowDiv);
}

