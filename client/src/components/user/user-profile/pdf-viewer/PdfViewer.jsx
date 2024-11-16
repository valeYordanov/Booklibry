import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

import "./PdfViewer.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../contexts/authContext";

const PdfViewer = ({ bookId, filePath }) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const canvasRef = useRef(null);
  const [isRendering, setIsRendering] = useState(false);

  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEbook = async () => {
      try {
        // Construct the full URL from the filePath passed in props
        // The fileUrl should now be like this:
        const fileUrl = `https://booklibry-server.onrender.com/api/files/presigned-download-url?filePath=${filePath}`;

        const response = await axios.get(fileUrl, { responseType: "blob" });

        const url = URL.createObjectURL(response.data);

        GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs`;

        const loadingTask = getDocument(url);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);

        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchEbook();
  }, [filePath]);

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage]);

  const renderPage = async (pageNumber) => {
    if (!pdfDoc || isRendering) return;

    setIsRendering(true);
    const page = await pdfDoc.getPage(pageNumber);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    setIsRendering(false);
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goBackHandler = () => {
    navigate(`/user-profile/${authState.uid}`);
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <div className="page-controls">
        <button
          className="prev-page"
          onClick={goToPreviousPage}
          disabled={currentPage === 1 || isRendering}
        >
          Previous
        </button>
        <span className="page-count">
          {" "}
          Page {currentPage} of {numPages}{" "}
        </span>
        <button
          className="next-page"
          onClick={goToNextPage}
          disabled={currentPage === numPages || isRendering}
        >
          Next
        </button>
      </div>
      <button onClick={goBackHandler} className="goBck">
        Back
      </button>
    </div>
  );
};

export default PdfViewer;
