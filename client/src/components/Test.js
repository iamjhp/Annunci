const Test = ({ images }) => {
  return (
    <div>
      {images.map((img) => (
        <div key={img}>
          <img
            src={`http://localhost:3001/api/items/images/${img}`}
            alt="example"
          />
          <p>{img}</p>
        </div>
      ))}
    </div>
  );
};

export default Test;
