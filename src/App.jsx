import { useState, useRef, useEffect } from "react";
import useEventListener from "@use-it/event-listener";
import Player from "./components/Player";
import useKeyListener from "./hooks/useKeyListener";
import useAnimationFrame from "./hooks/useAnimationFrame";
import logo from "./logo.svg";
import "./scss/index.scss";

function App() {
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
      setLastDirection(heldDirection);
    }
  };
  // GAME LOOP
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      // callback(deltaTime);
      updatePlayerPos();
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  requestRef.current = requestAnimationFrame(animate);

  const cameraLeft = viewWidth / 2 - gridCellSize;
  const cameraTop = viewHeight / 2 - gridCellSize * 2;

  return (
    <>
      <p className="debug-bar">
        pX:{playerXPos}, pY: {playerYPos}, directions: {heldDirections}
      </p>
      <section className="frame">
        <div className="camera">
          <div
            className="map"
            style={{
              transform: `translate3d(${-playerXPos + cameraLeft}px, ${
                -playerYPos + cameraTop
              }px, 0)`,
            }}
          >
            <Player
              x={playerXPos}
              y={playerYPos}
              heldDirections={heldDirections}
              facing={lastDirection}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
