//Initialize pieces and calls to pieces
var whitePieces = {};
var blackPieces = {};

//Originally planned on limiting placement of pieces but realized promotion can allow multiple of the same piece
// var availWhite = {'King':1, 'Queen':1, 'Bishop':2, 'Rook':2, 'Knight':2, 'Pawn':8 };
// var availBlack = {'King':1, 'Queen':1, 'Bishop':2, 'Rook':2, 'Knight':2, 'Pawn':8 };
var moveFunctions = {'King': move.king, 'Queen': move.queen, 'Bishop': move.bishop, 'Rook': move.rook, 'Knight': move.knight};


//Initialize board
var board = document.getElementById('board')
for (var i = 8; i >= 1; i--) {
  var rowDiv = document.createElement('div');
  rowDiv.className = 'column'
  for (var j = 0; j < 8; j++) {
    var colDiv = document.createElement('div');
    colDiv.className = 'row';
    colDiv.id = cols[j] + i;
    colDiv.innerText = cols[j] + i;
    //add event listeners to each item on the board to reset it on click
    colDiv.addEventListener('click', e => {
      e.target.classList.remove('black');
      e.target.classList.remove('white');
      delete whitePieces[e.target.id[0] + (e.target.id[1]-1)];
      delete blackPieces[e.target.id[0] + (e.target.id[1]-1)];
      e.target.innerText = e.target.id;
    })
    rowDiv.appendChild(colDiv);
  }
  board.appendChild(rowDiv);
}




//addPiece function takes the inputs of the drop downs on the board, updates the UI, and updates the list of pieces added in memory
var addPiece = function() {
  let col = document.getElementById('columnSelect').value;
  let row = document.getElementById('rowSelect').value;
  let piece = document.getElementById('pieceSelect').value;
  let players = document.getElementsByName('player');
  let player = players[0].checked ? players[0].value : players[1].value;

  let cell = document.getElementById(col+row);
  //Prevent updating a cell if it is already occupied
  if (cell.innerText !== cell.id) {
    alert('Cell is occupied. Please click on the cell to delete before assigning another piece');
  } else {
    cell.classList.add(player);
    cell.innerText = piece;
    if (player === 'white') {
      whitePieces[(col+(row-1))] = piece;
    } else {
      blackPieces[(col+(row-1))] = piece;
    }
  }
}


//calculate move list takes the current list of pieces on the board and who's turn it is to calculate the position of all pieces on the board
var calculateMoveList = function() {

  //determine which player is going
  let colors = document.getElementsByName('calculatePlayer');
  let color = colors[0].checked ? colors[0].value : colors[1].value;
  let moves = [];

  //The pawn function has an additional parameter and must operate different as pawns can only move in one direction
  //The remaining pieces are iterated over and the representative functions are called
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

  //Remove any previous moves from the move list and update the UI
  let moveList = document.getElementById('moveList');
  while (moveList.firstChild) {
    moveList.removeChild(moveList.firstChild);
  }
  //The move calculation is decoupled from the UI, so from the calculation perspective the data goes from 0-7 but on the UI it goes from 1-8
  //String manipulation must be done to handle this
  for (var i = 0; i < moves.length; i++) {
    var moveListItem = document.createElement('li');
    moveListItem.innerText = moves[i].substring(0, moves[i].length - 1) + (parseInt(moves[i][moves[i].length-1]) + 1);
    moveList.appendChild(moveListItem);
  }
}

//Add event handler functions for buttons
document.getElementById('add').addEventListener('click', addPiece);
document.getElementById('calculate').addEventListener('click', calculateMoveList);
