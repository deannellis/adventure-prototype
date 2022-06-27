const Player = ({ heldDirections, facing }) => {
  return (
    <div
      className="character "
      facing={`${facing}`}
      walking={`${!heldDirections.length == 0}`}
    >
      <div className="shadow pixel-art"></div>
      <div className="character_spritesheet "></div>
    </div>
  );
};

export default Player;
