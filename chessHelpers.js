var cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var inBounds = function(x, y) {
  return (x >= 0) && (x < 8) && (y >= 0) && (y < 8);
}
module.exports = {
  rookMove: (x, y, playerPieces, opponentPieces, pieceName = 'R') => {
    var moves = [];
    var addPiece = function(pos) {
      if (playerPieces[pos]) {
        break;
      } else {
        moves.push[pieceName + pos];
        if (opponentPieces[pos]) {
          break;
        }
      }
    }
    let i = 0;
    for (i = x+1; i < 8; i++) {
      addPiece(cols[i] + j);
    }
    for (i = x-1; i >= 0; i--) {
      addPiece(cols[i] + j);
    }
    for (i = y+1; i < 8; i++) {
      addPiece(cols[i] + j);
    }
    for (i = y-1; i >= 0; i--) {
      addPiece(cols[i] + j);
    }
    return moves;
  },
  kingMove: function(x, y, playerPieces, opponentPieces) {
    var moves = [];
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
  knightMove: function(x, y, playerPieces, opponentPieces) {
    var moves = [];
    if (inBounds(x+1, y+2) && playerPieces[cols[x+1] + (y+2)] === undefined) moves.push('N' + cols[x+1] + (y+2));
    if (inBounds(x+2, y+1) && playerPieces[cols[x+2] + (y+1)] === undefined) moves.push('N' + cols[x+2] + (y+1));
    if (inBounds(x-1, y+2) && playerPieces[cols[x-1] + (y+2)] === undefined) moves.push('N' + cols[x-1] + (y+2));
    if (inBounds(x-2, y+1) && playerPieces[cols[x-2] + (y+1)] === undefined) moves.push('N' + cols[x-2] + (y+1));
    if (inBounds(x+1, y-2) && playerPieces[cols[x+1] + (y-2)] === undefined) moves.push('N' + cols[x+1] + (y-2));
    if (inBounds(x+2, y-1) && playerPieces[cols[x+2] + (y-1)] === undefined) moves.push('N' + cols[x+2] + (y-1));
    if (inBounds(x-1, y-2) && playerPieces[cols[x-1] + (y-2)] === undefined) moves.push('N' + cols[x-1] + (y-2));
    if (inBounds(x-2, y-1) && playerPieces[cols[x-2] + (y-1)] === undefined) moves.push('N' + cols[x-2] + (y-1));
    return moves;
  }
  bishopMove: function(x, y, playerPieces, opponentPieces, pieceName = 'B') {
    var moves = [];
    var addPiece = function(pos) {
      if (playerPieces[pos]) {
        break;
      } else {
        moves.push[pieceName + pos];
        if (opponentPieces[pos]) {
          break;
        }
      }
    }
    let i = 0;
    let j = 0;
    for (i = x+1, j = y+1; i<8 && j<8; i++, j++) {
      addPiece(cols[i] + j);
    }
    for (i = x-1, j = y+1; i>=0 && j<8; i--, j++) {
      addPiece(cols[i] + j);
    }
    for (i = x+1, j = y-1; i<8 && j>=0; i++, j--) {
      addPiece(cols[i] + j);
    }
    for (i = x-1, j = y-1; i>=0 && j>=0; i--, j--) {
      addPiece(cols[i] + j);
    }
    return moves;
  },
  queenMove: function(x, y, playerPieces, opponentPieces) {
    var moves = module.exports.rookMove(x, y, playerPieces, opponentPieces, 'Q');
    moves = moves.concat(module.exports.bishopMove(x, y, playerPieces, opponentPieces, 'Q'));
    return moves;
  }
}