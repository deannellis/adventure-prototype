const TestBox = ({ x, y, dim, color = "red" }) => {
  return (
    <div
      style={{
        width: dim,
        height: dim,
        // transform: `translate3d(${x}px, ${y}px, 0)`,
        top: `${y}px`,
        left: `${x}px`,
        backgroundColor: color,
        opacity: 0.6,
        zIndex: 100,
        position: "absolute",
      }}
    ></div>
  );
};

export default TestBox;
