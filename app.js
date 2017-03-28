//Initialize pieces and calls to pieces
var whitePieces = {};
var blackPieces = {};

//Originally planned on limiting placement of pieces but realized promotion can allow multiple of the same piece
// var availWhite = {'King':1, 'Queen':1, 'Bishop':2, 'Rook':2, 'Knight':2, 'Pawn':8 };
// var availBlack = {'King':1, 'Queen':1, 'Bishop':2, 'Rook':2, 'Knight':2, 'Pawn':8 };
var moveFunctions = {'King': move.king, 'Queen': move.queen, 'Bishop': move.bishop, 'Rook': move.rook, 'Knight': move.knight};


//Initialize board
var board = document.getElementById('board')
for (var i = 7; i >= 0; i--) {
  var rowDiv = document.createElement('div');
  rowDiv.className = 'column'
  for (var j = 0; j < 8; j++) {
    var colDiv = document.createElement('div');
    colDiv.className = 'row';
    colDiv.id = cols[j] + i;
    colDiv.innerText = cols[j] + i;
    colDiv.addEventListener('click', e => {
      e.target.classList.remove('black');
      e.target.classList.remove('white');
      delete whitePieces[e.target.id];
      delete blackPieces[e.target.id];
      e.target.innerText = e.target.id;
    })
    rowDiv.appendChild(colDiv);
  }
  board.appendChild(rowDiv);
}

var addPiece = function(x, y) {
  let col = document.getElementById('columnSelect').value;
  let row = document.getElementById('rowSelect').value;
  let piece = document.getElementById('pieceSelect').value;
  let players = document.getElementsByName('player');
  let player = players[0].checked ? players[0].value : players[1].value;

  let cell = document.getElementById(col+row);
  if (cell.innerText !== cell.id) {
    alert('Cell is occupied. Please click on the cell to delete before assigning another piece');
  } else {
    cell.classList.add(player);
    cell.innerText = piece;
    if (player === 'white') {
      whitePieces[(col+row)] = piece;
    } else {
      blackPieces[(col+row)] = piece;
    }
  }
}

var addBtn = document.getElementById('add');
addBtn.addEventListener('click', addPiece);
var moveList = document.getElementById('moveList');
var calculateMoveBtn = document.getElementById('calculate');
calculateMoveBtn.addEventListener('click', e => {
 let colors = document.getElementsByName('calculatePlayer');
 let color = colors[0].checked ? colors[0].value : colors[1].value;
 let moves = [];
 if (color === 'white') {
  for (var piece in whitePieces) {
    moves = moves.concat(moveFunctions[whitePieces[piece]] ? moveFunctions[whitePieces[piece]](piece.charCodeAt(0) - 97, parseInt(piece[1]), whitePieces, blackPieces) : 
                          move.pawn(piece.charCodeAt(0) - 97, parseInt(piece[1]), whitePieces, blackPieces, true));
  }
 } else {
  for (var piece in blackPieces) {
    moves = moves.concat(moveFunctions[blackPieces[piece]] ? moveFunctions[blackPieces[piece]](piece.charCodeAt(0) - 97, parseInt(piece[1]), blackPieces, whitePieces) : 
                          move.pawn(piece.charCodeAt(0) - 97, parseInt(piece[1]), whitePieces, blackPieces, false));
  }
 }
  while (moveList.firstChild) {
      moveList.removeChild(moveList.firstChild);
  }
 for (var i = 0; i < moves.length; i++) {
    var moveListItem = document.createElement('li');
    moveListItem.innerText = moves[i];
    moveList.appendChild(moveListItem);
 }
});
