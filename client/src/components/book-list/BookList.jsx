import "./BookList.css"


export default function BookList() {
  return (
    <section id="book-list">
      <h1>Browse Books</h1>
      <div id="card-area">
        <div className="wrapper">
          <div className="box-area">
            <div className="box-container">
              <img
                src="https://m.media-amazon.com/images/I/71MUiF4iVzL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
                alt=""
              />
              <div className="overlay">
                <h3>Harry Potter</h3>
                <p>
                  J.K.ROwling
                </p>
                <a href="#">Get Now</a>
              </div>
            </div>
            <div className="box-container">
              <img
                src="https://m.media-amazon.com/images/I/71MUiF4iVzL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
                alt=""
              />
              <div className="overlay">
                <h3>Harry Potter</h3>
                <p>
                  J.K.ROwling
                </p>
                <a href="#">Get Now</a>
              </div>
            </div>
            
            
            <div className="box-container">
              <img
                src="https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg"
                alt=""
              />
              <div className="overlay">
                <h3>Harry Potter</h3>
                <p>
                  J.K.ROwling
                </p>
                <a href="#">Get Now</a>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </section>
  );
}
