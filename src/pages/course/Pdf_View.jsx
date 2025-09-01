import { useState } from "react";
import { Document, Page } from "react-pdf";

const Pdf_View = () => {
     const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
     <div 
      className="pdf-container"
      onContextMenu={(e) => e.preventDefault()} // disable right-click
    >
      <Document
        file="https://example.com/sample.pdf" // load from URL
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  )
}

export default Pdf_View