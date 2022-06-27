const checkCollisions = (pX, pY, pDim, cols, cellSize, callback) => {
  cols.forEach((cell) => {
    // console.log(cell);
    if (
      pX + pDim >= cell.x &&
      pX <= cell.x + cellSize &&
      pY <= cell.y + cellSize &&
      pY + pDim >= cell.y
    ) {
      console.log("collision!");
    } else {
      console.log("no collision!");
      callback();
    }
  });
};

export default checkCollisions;
