import React, { useContext } from "react";

import "./BookContent.css";
import PdfViewer from "../pdf-viewer/PdfViewer";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../../contexts/authContext";

const BookContent = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const { bookId } = useParams();

  

  return (
    <div className="book-reader">
      <>
        <PdfViewer bookId={bookId} />

       
      </>
    </div>
  );
};

export default BookContent;
