import { useSelector } from "react-redux";

import Player from "./components/Player";
import GameLoop from "./components/GameLoop";
import Map from "./components/Map";
import useKeyListener from "./hooks/useKeyListener";
import { collisions } from "./assets/mapData/dungeonTest01";
import TestBox from "./utils/TestBox";
import { checkCollisions2 } from "./utils/checkCollisions";

function App() {
  // CONSTANTS
  const heldDirections = useKeyListener();
  const pixelSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")
  );
  const viewWidth =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--view-width"
      )
    ) * pixelSize;
  const viewHeight =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--view-height"
      )
    ) * pixelSize;
  const gridCellSize = pixelSize * 16;
  const cameraLeft = viewWidth / 2 - gridCellSize * 2;
  const cameraTop = viewHeight / 2 - gridCellSize * 2;
  const playerXStart = viewWidth / 2 - gridCellSize * 2;
  const playerYStart = viewHeight / 2 - gridCellSize * 2;

  // MAP
  const mapWidth = 32;
  const mapHeight = 32;
  const collisionsMap = [];
  for (let i = 0; i < collisions.length; i += mapWidth) {
    collisionsMap.push(collisions.slice(i, mapWidth + i));
  }
  let cols = [];
  collisionsMap.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 1) {
        cols.push({
          x: i * gridCellSize,
          y: j * gridCellSize,
        });
      }
    });
  });
  let testBlocks = [];
  const getColTests = () => {
    collisionsMap.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 1) {
          testBlocks.push(
            <TestBox
              x={j * gridCellSize - (playerXPos - playerXStart)}
              y={i * gridCellSize - (playerYPos - playerYStart)}
              dim={gridCellSize}
            />
          );
        }
      });
    });
    return testBlocks;
  };

  // STATE
  const { lastDirection } = useSelector((state) => state.playerPosition);
  const playerXPos = useSelector((state) => state.playerPosition.x);
  const playerYPos = useSelector((state) => state.playerPosition.y);

  // const updatePlayerPos = () => {
  //   const heldDirection = heldDirections[0];
  //   if (heldDirection) {
  //     if (heldDirections.length === 2) {
  //       const diagonalSpeed = playerSpeed * 0.75;
  //       if (heldDirections.includes("right") && heldDirections.includes("up")) {
  //         setPlayerXPos(Math.round(playerXPos + diagonalSpeed * pixelSize));
  //         setPlayerYPos(Math.round(playerYPos - diagonalSpeed * pixelSize));
  //       }
  //       if (
  //         heldDirections.includes("right") &&
  //         heldDirections.includes("down")
  //       ) {
  //         setPlayerXPos(Math.round(playerXPos + diagonalSpeed * pixelSize));
  //         setPlayerYPos(Math.round(playerYPos + diagonalSpeed * pixelSize));
  //       }
  //       if (
  //         heldDirections.includes("left") &&
  //         heldDirections.includes("down")
  //       ) {
  //         setPlayerXPos(Math.round(playerXPos - diagonalSpeed * pixelSize));
  //         setPlayerYPos(Math.round(playerYPos + diagonalSpeed * pixelSize));
  //       }
  //       if (heldDirections.includes("left") && heldDirections.includes("up")) {
  //         setPlayerXPos(Math.round(playerXPos - diagonalSpeed * pixelSize));
  //         setPlayerYPos(Math.round(playerYPos - diagonalSpeed * pixelSize));
  //       }
  //     } else {
  //       if (heldDirection === "right") {
  //         setPlayerXPos(playerXPos + playerSpeed * pixelSize);
  //       }
  //       if (heldDirection === "left") {
  //         setPlayerXPos(playerXPos - playerSpeed * pixelSize);
  //       }
  //       if (heldDirection === "down") {
  //         setPlayerYPos(playerYPos + playerSpeed * pixelSize);
  //       }
  //       if (heldDirection === "up") {
  //         const updateY = playerYPos - playerSpeed * pixelSize;
  //         setPlayerYPos(updateY);
  //         cols.forEach((cell) => {
  //           if (
  //             !checkCollisions2(
  //               {
  //                 x: playerXPos,
  //                 y: updateY,
  //                 width: gridCellSize * 2,
  //                 height: gridCellSize * 2,
  //               },
  //               {
  //                 x: cell.x,
  //                 y: cell.y,
  //                 width: gridCellSize,
  //                 height: gridCellSize,
  //               }
  //             )
  //           ) {
  //             setPlayerYPos(updateY);
  //           }
  //         });
  //         checkCollisions(
  //           playerXPos,
  //           updateY,
  //           gridCellSize * 2,
  //           cols,
  //           gridCellSize,
  //           () => {
  //             setPlayerYPos(updateY);
  //           }
  //         );
  //       }
  //     }
  //     setLastDirection(heldDirection);
  //   }
  // };

  return (
    <GameLoop>
      <p className="debug-bar">
        pX:{playerXPos}, pY: {playerYPos}, directions: {heldDirections}
      </p>
      <section className="frame">
        <div className="camera">
          <Map
            playerXPos={playerXPos}
            playerYPos={playerYPos}
            cameraLeft={cameraLeft}
            cameraTop={cameraTop}
            bgImageName="Dungeon_test01.png"
            width={mapWidth}
            height={mapHeight}
            gridCellSize={gridCellSize}
          />
          <Player heldDirections={heldDirections} facing={lastDirection} />
          <TestBox x={playerXStart} y={playerYStart} dim={gridCellSize * 2} />
          {getColTests()}
        </div>
      </section>
    </GameLoop>
  );
}

export default App;
