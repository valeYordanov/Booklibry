import React, {  useState, useEffect } from "react";
import axios from "axios";

import "./BookContent.css";
import PdfViewer from "../pdf-viewer/PdfViewer";
import {  useParams } from "react-router-dom";
import Spinner from "../../../reusables/spinner/Spinner";


const BookContent = () => {
  
  
  const { bookId } = useParams();
  
  const [bookData, setBookData] = useState(null);
  
 
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`https://booklibry-server.onrender.com/api/books/${bookId}`);
        setBookData(response.data); 

        
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (!bookData) {
    return (<Spinner/>) 
  }

  return (
    <div className="book-reader">
      <PdfViewer filePath={bookData.file} />
    </div>
  );
};

export default BookContent;
