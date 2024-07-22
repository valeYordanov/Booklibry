import StarRating from "../reusables/star-rating/StarRating";
import "./BookDetails.css";

export default function BookDetails() {
  return (
    <section className="book">
        <div className="book-container">
        <div className="book-img">
        <img
          src="https://m.media-amazon.com/images/I/71-++hbbERL._AC_SL1000_.jpg"
          alt=""
        />
      </div>

      <div className="book-details">
        <h1 className="title">Harry potter</h1>
        <label htmlFor="author">Author</label>
        <h3 className="author">J.K.Rowling</h3>

        

        <h2 className="resume">Resume</h2>
        <p>
          The series follows the life of a boy named Harry Potter. In the first
          book, Harry Potter and the Philosophers Stone, Harry lives in a
          cupboard under the stairs in the house of the Dursleys, his aunt,
          uncle and cousin, who all treat him poorly. At the age of 11, Harry
          discovers that he is a wizard. He meets a half-giant named Hagrid who
          gives him a letter of acceptance to attend the Hogwarts School of
          Witchcraft and Wizardry. Harry learns that his parents, Lily and James
          Potter, also had magical powers, and were murdered by the dark wizard
          Lord Voldemort when Harry was a baby. When Voldemort attempted to kill
          Harry, his curse rebounded, seemingly killing Voldemort, and Harry
          survived with a lightning-shaped scar on his forehead. The event made
          Harry famous among the community of wizards and witches.
        </p>

        <StarRating></StarRating>
      </div>
        </div>
      

      <div className="special-buttons">
        <button className="rent-btn">Rent</button>

        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </section>
  );
}
