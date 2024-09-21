const boardSize = 4;
let board = [];

function createBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = 0;  // Initialize all tiles to 0
    }
  }
}

function drawBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Clear the previous board

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const tileValue = board[row][col];
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (tileValue !== 0) {
        tile.classList.add(`tile-${tileValue}`);
        tile.textContent = tileValue;
      }
      gameBoard.appendChild(tile);
    }
  }
}

function spawnTile() {
  let emptyTiles = [];

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === 0) {
        emptyTiles.push({ row, col });
      }
    }
  }

  if (emptyTiles.length > 0) {
    const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
}

function moveLeft() {
  let moved = false;
  for (let row = 0; row < boardSize; row++) {
    let newRow = board[row].filter(val => val);  // Remove all zeros
    while (newRow.length < boardSize) newRow.push(0);  // Fill the rest with zeros

    for (let col = 0; col < newRow.length - 1; col++) {
      if (newRow[col] === newRow[col + 1]) {
        newRow[col] *= 2;  // Merge tiles
        newRow.splice(col + 1, 1);  // Remove the merged tile
        newRow.push(0);  // Add a zero to the end
      }
    }
    
    if (board[row].toString() !== newRow.toString()) moved = true;
    board[row] = newRow;
  }

  if (moved) spawnTile();  // If any tiles moved, spawn a new tile
  drawBoard();
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < boardSize; row++) {
      let newRow = board[row].filter(val => val);  // Remove all zeros
      while (newRow.length < boardSize) newRow.unshift(0);  // Fill the rest with zeros in front
  
      for (let col = newRow.length - 1; col > 0; col--) {
        if (newRow[col] === newRow[col - 1]) {
          newRow[col] *= 2;  // Merge tiles
          newRow.splice(col - 1, 1);  // Remove the merged tile
          newRow.unshift(0);  // Add a zero to the front
        }
      }
  
      if (board[row].toString() !== newRow.toString()) moved = true;
      board[row] = newRow;
    }
  
    if (moved) spawnTile();  // If any tiles moved, spawn a new tile
    drawBoard();
  }
  
  function moveUp() {
    let moved = false;
    for (let col = 0; col < boardSize; col++) {
      let newCol = [];
      for (let row = 0; row < boardSize; row++) {
        if (board[row][col] !== 0) newCol.push(board[row][col]);  // Collect non-zero tiles
      }
      while (newCol.length < boardSize) newCol.push(0);  // Fill the rest with zeros
  
      for (let row = 0; row < newCol.length - 1; row++) {
        if (newCol[row] === newCol[row + 1]) {
          newCol[row] *= 2;  // Merge tiles
          newCol.splice(row + 1, 1);  // Remove the merged tile
          newCol.push(0);  // Add a zero to the end
        }
      }
  
      for (let row = 0; row < boardSize; row++) {
        if (board[row][col] !== newCol[row]) moved = true;
        board[row][col] = newCol[row];
      }
    }
  
    if (moved) spawnTile();  // If any tiles moved, spawn a new tile
    drawBoard();
  }
  
  function moveDown() {
    let moved = false;
    for (let col = 0; col < boardSize; col++) {
      let newCol = [];
      for (let row = 0; row < boardSize; row++) {
        if (board[row][col] !== 0) newCol.push(board[row][col]);  // Collect non-zero tiles
      }
      while (newCol.length < boardSize) newCol.unshift(0);  // Fill the rest with zeros in front
  
      for (let row = newCol.length - 1; row > 0; row--) {
        if (newCol[row] === newCol[row - 1]) {
          newCol[row] *= 2;  // Merge tiles
          newCol.splice(row - 1, 1);  // Remove the merged tile
          newCol.unshift(0);  // Add a zero to the front
        }
      }
  
      for (let row = 0; row < boardSize; row++) {
        if (board[row][col] !== newCol[row]) moved = true;
        board[row][col] = newCol[row];
      }
    }
  
    if (moved) spawnTile();  // If any tiles moved, spawn a new tile
    drawBoard();
  }
  

  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        moveLeft();
        break;
      case 'ArrowRight':
        moveRight();
        break;
      case 'ArrowUp':
        moveUp();
        break;
      case 'ArrowDown':
        moveDown();
        break;
    }
  });
  

function initGame() {
  createBoard();
  spawnTile();
  spawnTile();
  drawBoard();
}

initGame();
