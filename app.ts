window.onload = () => {

  let height = 200, width = 200;
  const boardSize = 800;
  
  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';

  let ar: boolean[][] = generateBoard(width, 0.03);

  // Help from not-matthias
  function generateBoard(boardSize: number, population: number) {
    return new Array(boardSize).fill(false).map(() => new Array(boardSize).fill(false).map(() => Math.random() < population));
  };

  function countNeighbours(i: number, j: number) {
    let countN = 0;
    for (let col = i - 1; col <= i + 1; col++) {
      for (let row = j - 1; row <= j + 1; row++) {
        if (!(col === i && row === j) && ar[col] && ar[col][row]) {
          countN++;
        }
      }
    }

    return countN;
  }

  window.requestAnimationFrame(draw);
  function draw() {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let countN = countNeighbours(i, j);

        if (ar[i][j] && (countN < 2 || countN > 3)) {
          ar[i][j] = false;
          continue;
        }

        if (!ar[i][j] && countN == 3) {
          ar[i][j] = true;
        }
      }
    }

    ctx.clearRect(0, 0, boardSize, boardSize);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (ar[i][j] == true) {
          ctx.fillRect(i * 4, j * 4, 4, 4);
        }
      }
    }

    window.requestAnimationFrame(draw);
  }
};