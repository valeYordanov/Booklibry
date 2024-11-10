import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import "./BookContent.css";
import PdfViewer from "../pdf-viewer/PdfViewer";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../../contexts/authContext";

const BookContent = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const { bookId } = useParams();
  
  const [bookData, setBookData] = useState(null);
  
  // Fetch book data on mount
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`https://booklibry-server.onrender.com/api/books/${bookId}`);
        setBookData(response.data); // Store the book data

        console.log(bookData.fileUrl);
        
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (!bookData) {
    return <div>Loading...</div>; // Or a loading spinner, depending on your preference
  }

  return (
    <div className="book-reader">
      <PdfViewer bookId={bookId} filePath={bookData.fileUrl} />
    </div>
  );
};

export default BookContent;
