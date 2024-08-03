/* eslint-disable react/prop-types */
export default function RentedBookListItem({
  // eslint-disable-next-line react/prop-types
  id,
  title,
  author,
  img,
  returnBookHandler,
}) {
  return (
    <li>
      <div className="rented-book">
        <img src={img} alt="Book 1" className="book-cover" />
        <div className="book-details">
          <h3>{title}</h3>
          <p>
            <strong>Author:</strong> {author}
          </p>

          <button onClick={() => returnBookHandler(id)} className="return-btn">
            Return
          </button>
        </div>
      </div>
    </li>
  );
}
