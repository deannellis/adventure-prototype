const Map = ({
  playerXPos,
  playerYPos,
  cameraLeft,
  cameraTop,
  bgImageName,
  width,
  height,
  gridCellSize,
}) => {
  return (
    <div
      className="map "
      style={{
        transform: `translate3d(${-playerXPos + cameraLeft}px, ${
          -playerYPos + cameraTop
        }px, 0)`,
        backgroundImage: `url(./src/assets/images/${bgImageName})`,
        width: width * gridCellSize,
        height: height * gridCellSize,
      }}
    ></div>
  );
};

export default Map;
