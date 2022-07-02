import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";

const useKeyListener = () => {
  const [heldKeys, setHeldKeys] = useState([]);
  const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
  };
  const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,
  };
  useEventListener(
    "keydown",
    (e) => {
      const dir = keys[e.which];
      if (dir && heldKeys.indexOf(dir) === -1) {
        setHeldKeys([...heldKeys, dir]);
      }
    },
    window
  );
  useEventListener(
    "keyup",
    (e) => {
      const dir = keys[e.which];
      const index = heldKeys.indexOf(dir);
      if (index > -1) {
        setHeldKeys(heldKeys.filter((val) => val != dir));
      }
    },
    window
  );
  return heldKeys;
};

export default useKeyListener;
