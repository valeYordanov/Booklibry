/* eslint-disable react/prop-types */
export default function GameListItem({
    // eslint-disable-next-line react/prop-types
    title,
    author,
    img,
}) {
  return (
    <div className="box-container">
      <img
        src={img}
        alt=""
      />
      <div className="overlay">
        <h3>{title}</h3>
        <p>{author}</p>
        <a href="#">Get Now</a>
      </div>
    </div>
  );
}
