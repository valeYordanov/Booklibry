import "./AddBook.css";

import FirebaseService from "../../services/bookService";

export default function AddBook() {
  const sumbitHandler = async (e) => {
    e.preventDefault();

    try {
      const bookData = Object.fromEntries(new FormData(e.currentTarget));

      await FirebaseService.create("books", bookData);
    } catch (error) {
      console.log(error.massage);
    }
  };

  return (
    <div className="full-form">
      <div className="form">
        <h1>Add to the library</h1>

        <form onSubmit={sumbitHandler} className="add-form">
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Add title" name="title" />

          <label htmlFor="category">Category</label>
          <textarea
            name="category"
            id="desc"
            cols="60"
            rows="3"
            placeholder="Add category here..."
          ></textarea>

          <label htmlFor="author">Author</label>
          <input type="text" placeholder="Author" name="author" />

          <label htmlFor="Summary">Summary</label>
          <textarea
            name="summary"
            id="summary"
            cols="60"
            rows="3"
            placeholder="Add summary here..."
          ></textarea>

          <label htmlFor="pages">Pages count</label>
          <input type="number" name="pages" />

          <label htmlFor="image">Add picture</label>
          <input type="text" placeholder="Add image URL" name="img" />

          <div className="buttons">
            <button>Add to the collection</button>

            <button>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
