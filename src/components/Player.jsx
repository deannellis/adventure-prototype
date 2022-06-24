const Player = ({ x, y, heldDirections, facing }) => {
  return (
    <div
      className="character test"
      facing={`${facing}`}
      walking={`${!heldDirections.length == 0}`}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      <div className="shadow pixel-art"></div>
      <div className="character_spritesheet "></div>
    </div>
  );
};

export default Player;
