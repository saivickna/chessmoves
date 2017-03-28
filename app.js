var whitePieces = {};
var blackPieces = {};
var availWhite = {'King':1, 'Queen':1, 'Bishop':2, 'Rook':2, 'Knight':2, 'Pawn':8 };
var availBlack = {'King':1, 'Queen':1, 'Bishop':2, 'Rook':2, 'Knight':2, 'Pawn':8 };
var moveFunctions = {'King': move.king, 'Queen': move.queen, 'Bishop': move.bishop, 'Rook': move.rook, 'Knight': move.knight, 'Pawn': move.pawn};
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
    colDiv.addEventListener('click', e => {
      if (e.target.classList.contains('black')) {
        e.target.classList.remove('black');
        availBlack[e.target.innerText]++;
      } else if (e.target.classList.contains('white')) {
        e.target.classList.remove('white');
        availWhite[e.target.innerText]++;
      }
      delete whitePieces[e.target.id];
      delete blackPieces[e.target.id];
      e.target.innerText = e.target.id;
    })
    rowDiv.appendChild(colDiv);
  }
  board.appendChild(rowDiv);
}


var addBtn = document.getElementById('add');
addBtn.addEventListener('click', e => {
  let col = document.getElementById('columnSelect').value;
  let row = document.getElementById('rowSelect').value;
  let piece = document.getElementById('pieceSelect').value;
  let players = document.getElementsByName('player');
  let player = players[0].checked ? players[0].value : players[1].value;

  let cell = document.getElementById(col+row);
  if (cell.innerText !== cell.id) {
    alert('Cell is occupied. Please click on the cell to delete before assigning another piece');
  } else if ((player === 'white' && availWhite[piece] === 0) || (player === 'black' && availBlack[piece] === 0) ) {
    alert('No available pieces of that type left.');
  } else {
    cell.classList.add(player);
    cell.innerText = piece;
    if (player === 'white') {
      whitePieces[(col+row)] = piece;
      availWhite[piece]--;
    } else {
      blackPieces[(col+row)] = piece;
      availBlack[piece]--;
    }
  }
});
