var cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
module.exports = {
  rookMove: (x, y, playerPieces, opponentPieces) => {
    var moves = [];
    let pos = '';
    for (i = x+1; i < 8; i++) {
      pos = cols[i] + y;
      if (playerPieces[pos]) {
        break;
      } else {
        moves.push['R' + pos];
        if (opponentPieces[pos]) {
          break;
        }
      }
    }
    for (i = x-1; i >= 0; i--) {
      pos = cols[i] + y;
      if (playerPieces[pos]) {
        break;
      } else {
        moves.push['R' + pos];
        if (opponentPieces[pos]) {
          break;
        }
      }
    }
    for (i = y+1; i < 8; i++) {
      pos = cols[x] + i;
      if (playerPieces[pos]) {
        break;
      } else {
        moves.push['R' + pos];
        if (opponentPieces[pos]) {
          break;
        }
      }
    }
    for (i = y-1; i >= 0; i--) {
      pos = cols[x] + i;
      if (playerPieces[pos]) {
        break;
      } else {
        moves.push['R' + pos];
        if (opponentPieces[pos]) {
          break;
        }
      }
    }
    return moves;
  }
}