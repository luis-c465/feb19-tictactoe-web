import { useMemo, useState } from "react";

const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = -1;

export default function Game() {
  // if the turn is true
  // it is the first players turn
  const [turn, setTurn] = useState(true);

  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const winner = useMemo(() => checkWinner(board), [board]);

  function onPiecePressed(r, c) {
    const element = board[r][c];

    if (element !== EMPTY) return null;
    if (winner) return null;

    // if the first players turn
    if (turn) {
      board[r][c] = PLAYER1;
    } else {
      board[r][c] = PLAYER2;
    }

    console.log(board);

    setBoard(board.slice());
    setTurn(!turn);
  }

  function resetBoard() {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setTurn(true);
  }

  return (
    <div className="game-container">
      <h1>{valueToPiece(winner)}</h1>

      <div className="game">
        <Row row={board[0]} r={0} onPiecePressed={onPiecePressed} />
        <Row row={board[1]} r={1} onPiecePressed={onPiecePressed} />
        <Row row={board[2]} r={2} onPiecePressed={onPiecePressed} />
      </div>

      <button className="reset" onClick={resetBoard}>
        Reset board
      </button>
    </div>
  );
}

function Row({ row, r, onPiecePressed }) {
  return (
    <div className="row">
      <Piece value={row[0]} r={r} c={0} onPiecePressed={onPiecePressed} />
      <Piece value={row[1]} r={r} c={1} onPiecePressed={onPiecePressed} />
      <Piece value={row[2]} r={r} c={2} onPiecePressed={onPiecePressed} />
    </div>
  );
}

function Piece({ value, r, c, onPiecePressed }) {
  const character = valueToPiece(value);

  function handleClick() {
    onPiecePressed(r, c);
  }

  return (
    <button onClick={handleClick} className="piece">
      {character}
    </button>
  );
}

function valueToPiece(value) {
  if (value === EMPTY) return null;
  if (value === PLAYER1) return "X";
  if (value === PLAYER2) return "O";

  return null;
}

function checkWinner(board) {
  let sum = 0;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      sum += board[r][c];
    }

    if (sum == -3) {
      return -1;
    } else if (sum == 3) {
      return 1;
    }

    sum = 0;
  }

  sum = 0;
  for (let c = 0; c < 3; c++) {
    for (let r = 0; r < 3; r++) {
      sum += board[r][c];
    }

    if (sum == -3) {
      return -1;
    } else if (sum == 3) {
      return 1;
    }

    sum = 0;
  }

  sum = 0;
  for (let i = 0; i < 3; i++) {
    sum += board[i][i];
  }

  if (sum == -3) {
    return -1;
  } else if (sum == 3) {
    return 1;
  }

  sum = 0;
  for (let i = 0; i < 3; i++) {
    sum += board[i][2 - i];
  }

  if (sum == -3) {
    return -1;
  } else if (sum == 3) {
    return 1;
  }

  return null;
}
