import { useState, useRef } from "react";

import Player from "./components/Player";
import Map from "./components/Map";
import useKeyListener from "./hooks/useKeyListener";
import { collisions } from "./assets/mapData/dungeonTest01";

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
  const cameraLeft = viewWidth / 2 - gridCellSize;
  const cameraTop = viewHeight / 2 - gridCellSize * 2;

  // MAP
  const mapWidth = 32;
  const mapHeight = 32;
  const collisionsMap = [];
  for (let i = 0; i < collisions.length; i += mapWidth) {
    collisionsMap.push(collisions.slice(i, mapWidth + i));
  }
  console.log(collisionsMap);

  // COMPONENT STATE
  const [playerXPos, setPlayerXPos] = useState(
    viewWidth / 2 - gridCellSize * 2
  );
  const [playerYPos, setPlayerYPos] = useState(
    viewHeight / 2 - gridCellSize * 2
  );
  const [lastDirection, setLastDirection] = useState("down");
  const playerSpeed = 1;

  const updatePlayerPos = () => {
    const heldDirection = heldDirections[0];
    if (heldDirection) {
      if (heldDirections.length === 2) {
        const diagonalSpeed = playerSpeed * 0.75;
        if (heldDirections.includes("right") && heldDirections.includes("up")) {
          setPlayerXPos(Math.round(playerXPos + diagonalSpeed * pixelSize));
          setPlayerYPos(Math.round(playerYPos - diagonalSpeed * pixelSize));
        }
        if (
          heldDirections.includes("right") &&
          heldDirections.includes("down")
        ) {
          setPlayerXPos(Math.round(playerXPos + diagonalSpeed * pixelSize));
          setPlayerYPos(Math.round(playerYPos + diagonalSpeed * pixelSize));
        }
        if (
          heldDirections.includes("left") &&
          heldDirections.includes("down")
        ) {
          setPlayerXPos(Math.round(playerXPos - diagonalSpeed * pixelSize));
          setPlayerYPos(Math.round(playerYPos + diagonalSpeed * pixelSize));
        }
        if (heldDirections.includes("left") && heldDirections.includes("up")) {
          setPlayerXPos(Math.round(playerXPos - diagonalSpeed * pixelSize));
          setPlayerYPos(Math.round(playerYPos - diagonalSpeed * pixelSize));
        }
      } else {
        if (heldDirection === "right") {
          setPlayerXPos(playerXPos + playerSpeed * pixelSize);
        }
        if (heldDirection === "left") {
          setPlayerXPos(playerXPos - playerSpeed * pixelSize);
        }
        if (heldDirection === "down") {
          setPlayerYPos(playerYPos + playerSpeed * pixelSize);
        }
        if (heldDirection === "up") {
          setPlayerYPos(playerYPos - playerSpeed * pixelSize);
        }
      }
      setLastDirection(heldDirection);
    }
  };

  // GAME LOOP
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      updatePlayerPos();
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  requestRef.current = requestAnimationFrame(animate);

  return (
    <>
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
        </div>
      </section>
    </>
  );
}

export default App;
