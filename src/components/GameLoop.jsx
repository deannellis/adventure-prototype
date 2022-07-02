import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import useKeyListener from "../hooks/useKeyListener";
import {
  setLastDirection,
  incrementX,
  incrementY,
  decrementX,
  decrementY,
} from "../store/slices/playerPositionSlice";
import { collisions } from "../assets/mapData/dungeonTest01";

const GameLoop = ({ children }) => {
  const dispatch = useDispatch();

  const pixelSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")
  );
  const gridCellSize = pixelSize * 16;

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

  // PLAYER MOVEMENT
  const heldKeys = useKeyListener();
  const updatePlayerPos = () => {
    const heldDirection = heldKeys[0];
    if (heldDirection) {
      if (heldKeys.length === 2) {
        if (heldKeys.includes("right") && heldKeys.includes("up")) {
          dispatch(incrementX({ diagonal: true }));
          dispatch(decrementY({ diagonal: true }));
        }
        if (heldKeys.includes("right") && heldKeys.includes("down")) {
          dispatch(incrementX({ diagonal: true }));
          dispatch(incrementY({ diagonal: true }));
        }
        if (heldKeys.includes("left") && heldKeys.includes("down")) {
          dispatch(decrementX({ diagonal: true }));
          dispatch(incrementY({ diagonal: true }));
        }
        if (heldKeys.includes("left") && heldKeys.includes("up")) {
          dispatch(decrementX({ diagonal: true }));
          dispatch(decrementY({ diagonal: true }));
        }
      } else {
        if (heldDirection === "right") {
          dispatch(incrementX({ diagonal: false }));
        }
        if (heldDirection === "left") {
          dispatch(decrementX({ diagonal: false }));
        }
        if (heldDirection === "down") {
          dispatch(incrementY({ diagonal: false }));
        }
        if (heldDirection === "up") {
          dispatch(decrementY({ diagonal: false }));
        }
      }

      dispatch(setLastDirection(heldDirection));
    }
  };

  // LOOP LOGIC
  const [isVisible, setIsVisible] = useState(true);
  const [isUpdateRequired, setIsUpdateRequired] = useState(false);
  const timerId = useRef();
  // Counter can be used for debugging to track ticks
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (isUpdateRequired) {
      const tick = () => {
        timerId.current = requestAnimationFrame(tick);
        setIsVisible(false);
        setIsVisible(true);
        // LOOP EXECUTABLES
        setCounter((x) => x + 1);
        updatePlayerPos();
      };
      timerId.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(timerId.current);
    }
  }, [isUpdateRequired]);

  const [keysLen, setKeysLen] = useState(0);
  useLayoutEffect(() => {
    if (heldKeys.length != keysLen) {
      setIsUpdateRequired(false);
      setTimeout(() => {
        if (heldKeys.length > 0) {
          setIsUpdateRequired(true);
        }
      }, 1);
    }
    setKeysLen(heldKeys.length);
    return () => setIsUpdateRequired(false);
  }, [heldKeys.length]);

  return <div className="game-loop">{isVisible && <>{children}</>}</div>;
};

export default GameLoop;