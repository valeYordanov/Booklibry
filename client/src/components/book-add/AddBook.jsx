import "./AddBook.css";

import BookService from "../../services/bookService";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";

export default function AddBook() {
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    category: "",
    img: "",
    pages: "",
    summary: "",
    isRented: false,
    file: null
  });

  const { authState } = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.title) newErrors.title = "Title is required!";
    if (!formValues.author) newErrors.author = "Author is required!";
    if (!formValues.category) newErrors.category = "Category is required!";
    if (!formValues.img) newErrors.img = "Image URL is required!";
    if (!formValues.pages || isNaN(formValues.pages))
      newErrors.pages = "Valid number of pages is required!";

    if (!formValues.summary) newErrors.summary = "Summary is required!";
    if (!formValues.file) newErrors.file = "Book's content is required!";

    return newErrors;
  };

  const navigate = useNavigate();

  const sumbitHandler = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const formData = new FormData();
        for (const key in formValues) {
          console.log("Form Values before submission:", formValues);
          formData.append(key, formValues[key]);
        }

        await BookService.create(formData,authState.uid);
        navigate("/books");
      } catch (error) {
        console.error("Error submitting form:", error);
        if (error.response && error.response.data.errors) {
          const backendErrors = error.response.data.errors.reduce((acc, curr) => {
            acc[curr.path] = curr.msg; // Map error messages to field names
            return acc;
          }, {});
          setErrors(backendErrors);
        }
      }
    }
  };

  const goBackHandler = () => {
    navigate("/");
  };

  return (
    <div className="full-form">
      <div className="form-title">
        <h1>Add to the library</h1>

        <form onSubmit={sumbitHandler} className="add-form">
          <label htmlFor="title">Title</label>
          {errors.title && <span>{errors.title}</span>}
          <input
            type="text"
            placeholder="Add title"
            name="title"
            value={formValues.title}
            onChange={handleOnChange}
          />

          <label htmlFor="category">Category</label>
          {errors.category && <span>{errors.category}</span>}
          <textarea
            name="category"
            id="desc"
            cols="60"
            rows="3"
            placeholder="Add category here..."
            value={formValues.category}
            onChange={handleOnChange}
          ></textarea>

          <label htmlFor="author">Author</label>
          {errors.author && <span>{errors.author}</span>}
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={formValues.author}
            onChange={handleOnChange}
          />

          <label htmlFor="Summary">Summary</label>
          {errors.summary && <span>{errors.summary}</span>}
          <textarea
            name="summary"
            id="summary"
            cols="60"
            rows="3"
            placeholder="Add summary here..."
            value={formValues.summary}
            onChange={handleOnChange}
          ></textarea>

          <label htmlFor="pages">Pages count</label>
          {errors.pages && <span>{errors.pages}</span>}
          <input
            type="number"
            name="pages"
            value={formValues.pages}
            onChange={handleOnChange}
          />

          <label htmlFor="image">Add picture</label>
          {errors.img && <span>{errors.img}</span>}
          <input
            type="text"
            placeholder="Add image URL"
            name="img"
            value={formValues.img}
            onChange={handleOnChange}
          />

          <label htmlFor="file">Upload the book's PDF file</label>
          {errors.file && <span>{errors.file}</span>}
          <input
            type="file"
            name="file"
            accept="application/pdf"
            onChange={handleOnChange}
          />

          <div className="buttons">
            <button className="add">Add</button>

            <button onClick={goBackHandler} className="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
