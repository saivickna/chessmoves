//declare column list
var cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var inBounds = function(x, y) {
  return (x >= 0) && (x < 8) && (y >= 0) && (y < 8);
}
var move = {
  rook: (x, y, playerPieces, opponentPieces, pieceName = 'R') => {
    var moves = [];

    //ideally rewrite the code to be more functional
    var addPiece = function(pos) {
      if (playerPieces[pos]) {
        return true;
      } else {
        moves.push(pieceName + pos);
        if (opponentPieces[pos]) {
          return true;
        }
      }
    }
    //Given the position of the rook, iterate through the rows and columns to obtain all possible positions
    let i = 0;
    for (i = x+1; i < 8; i++) {
      if (addPiece(cols[i] + y)) break;
    }
    for (i = x-1; i >= 0; i--) {
      if (addPiece(cols[i] + y)) break;
    }
    for (i = y+1; i < 8; i++) {
      if (addPiece(cols[x] + i)) break;
    }
    for (i = y-1; i >= 0; i--) {
      if (addPiece(cols[x] + i)) break;
    }
    return moves;
  },
  king: function(x, y, playerPieces, opponentPieces) {
    var moves = [];
    //Check the surrounding 8 squares around the king (assuming they are in bounds)
    if (inBounds(x-1, y-1) && playerPieces[cols[x-1] + (y-1)] === undefined) moves.push('K' + cols[x-1] + (y-1));
    if (inBounds(x-1, y) && playerPieces[cols[x-1] + y] === undefined) moves.push('K' + cols[x-1] + y);
    if (inBounds(x-1, y+1) && playerPieces[cols[x-1] + (y+1)] === undefined) moves.push('K' + cols[x-1] + (y+1));
    if (inBounds(x, y-1) && playerPieces[cols[x] + (y-1)] === undefined) moves.push('K' + cols[x] + (y-1));
    if (inBounds(x, y+1) && playerPieces[cols[x] + (y+1)] === undefined) moves.push('K' + cols[x] + (y+1));
    if (inBounds(x+1, y-1) && playerPieces[cols[x+1] + (y-1)] === undefined) moves.push('K' + cols[x+1] + (y-1));
    if (inBounds(x+1, y) && playerPieces[cols[x+1] + y] === undefined) moves.push('K' + cols[x+1] + y);
    if (inBounds(x+1, y+1) && playerPieces[cols[x+1] + (y+1)] === undefined) moves.push('K' + cols[x+1] + (y+1));
    return moves;
  },
  knight: function(x, y, playerPieces, opponentPieces) {
    var moves = [];
    //Check the possible 8 places a knight can move (assuming they are in bounds)
    if (inBounds(x+1, y+2) && playerPieces[cols[x+1] + (y+2)] === undefined) moves.push('N' + cols[x+1] + (y+2));
    if (inBounds(x+2, y+1) && playerPieces[cols[x+2] + (y+1)] === undefined) moves.push('N' + cols[x+2] + (y+1));
    if (inBounds(x-1, y+2) && playerPieces[cols[x-1] + (y+2)] === undefined) moves.push('N' + cols[x-1] + (y+2));
    if (inBounds(x-2, y+1) && playerPieces[cols[x-2] + (y+1)] === undefined) moves.push('N' + cols[x-2] + (y+1));
    if (inBounds(x+1, y-2) && playerPieces[cols[x+1] + (y-2)] === undefined) moves.push('N' + cols[x+1] + (y-2));
    if (inBounds(x+2, y-1) && playerPieces[cols[x+2] + (y-1)] === undefined) moves.push('N' + cols[x+2] + (y-1));
    if (inBounds(x-1, y-2) && playerPieces[cols[x-1] + (y-2)] === undefined) moves.push('N' + cols[x-1] + (y-2));
    if (inBounds(x-2, y-1) && playerPieces[cols[x-2] + (y-1)] === undefined) moves.push('N' + cols[x-2] + (y-1));
    return moves;
  },
  bishop: function(x, y, playerPieces, opponentPieces, pieceName = 'B') {
    var moves = [];
    var addPiece = function(pos) {
      if (playerPieces[pos]) {
        return true;
      } else {
        moves.push(pieceName + pos);
        if (opponentPieces[pos]) {
          return true;
        }
      }
    }
    let i = 0;
    let j = 0;
    //Given the position of the bishop, iterate through the diagonals to obtain all possible positions
    for (i = x+1, j = y+1; i<8 && j<8; i++, j++) {
      if (addPiece(cols[i] + j)) break;
    }
    for (i = x-1, j = y+1; i>=0 && j<8; i--, j++) {
      if (addPiece(cols[i] + j)) break;
    }
    for (i = x+1, j = y-1; i<8 && j>=0; i++, j--) {
      if (addPiece(cols[i] + j)) break;
    }
    for (i = x-1, j = y-1; i>=0 && j>=0; i--, j--) {
      if (addPiece(cols[i] + j)) break;
    }
    return moves;
  },
  queen: function(x, y, playerPieces, opponentPieces) {
    //The potential queen moves are the rook moves combined with the bishop moves
    var moves = move.rook(x, y, playerPieces, opponentPieces, 'Q');
    moves = moves.concat(move.bishop(x, y, playerPieces, opponentPieces, 'Q'));
    return moves;
  },
  pawn: function(x, y, whitePieces, blackPieces, whiteBlack) {
    var moves = [];
    //if it is a white piece moving
    if (whiteBlack) {
      if (inBounds(x, y+1) && whitePieces[cols[x] + (y+1)] === undefined && blackPieces[cols[x] + (y+1)] === undefined) {
        moves.push(cols[x] + (y+1));
        //Check if it is on the starting row for a double move
        if (x === 1 && whitePieces[cols[x] + (y+2)] === undefined && blackPieces[cols[x] + (y+2)] === undefined) moves.push(cols[x] + (y+2));
      } 
      //Check if the pawn can take a piece
      if (inBounds(x+1, y+1) && blackPieces[cols[x+1] + (y+1)]) moves.push(cols[x+1] + (y+1));
      if (inBounds(x-1, y+1) && blackPieces[cols[x-1] + (y+1)]) moves.push(cols[x-1] + (y+1));
    } else {
      if (inBounds(x, y-1) && whitePieces[cols[x] + (y-1)] === undefined && blackPieces[cols[x] + (y-1)] === undefined) {
        moves.push(cols[x] + (y-1));
        if (x === 6 && whitePieces[cols[x] + (y-2)] === undefined && blackPieces[cols[x] + (y-2)] === undefined) moves.push(cols[x] + (y-2));
      } 
      if (inBounds(x-1, y-1) && whitePieces[cols[x-1] + (y-1)]) moves.push(cols[x-1] + (y-1));
      if (inBounds(x+1, y-1) && whitePieces[cols[x+1] + (y-1)]) moves.push(cols[x+1] + (y-1));
    }
    return moves;
  }
}