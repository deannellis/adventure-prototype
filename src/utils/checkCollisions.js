export const checkCollisions = (pX, pY, pDim, cols, cellSize) => {
  let collided = false;
  cols.forEach((cell) => {
    if (
      pX + pDim >= cell.x &&
      pX <= cell.x + cellSize &&
      pY <= cell.y + cellSize &&
      pY + pDim >= cell.y
    ) {
      console.log("collision!");
      collided = true;
    } else {
      console.log("no collision!");
    }
  });
  return collided;
};

export const checkCollisions2 = (rect1, rect2) => {
  console.log("fuck");
  return (
    rect1.x + rect1.width >= rect2.x &&
    rect1.x <= rect2.x + rect2.width &&
    rect1.y <= rect2.y + rect2.height &&
    rect1.y + rect1.height >= rect2.y
  );
};
