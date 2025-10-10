import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation, useNavigate } from "react-router-dom";
import { UseDataProvider } from "../../contexts/DataProvider";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(null);
  const location=useLocation()
  const Navigation=useNavigate()
  const {HandleLink}=UseDataProvider()
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(1.0);
  const {key}=location.state

  const geturl=async(key)=>{
    setLoading(true);
    const res = await HandleLink(key);
    setPdfUrl(res);
    setLoading(false);
  }

  useEffect(() => {
    geturl(key)
  }, []);

    const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));
  const resetZoom = () => setScale(0.6);

  if (!pdfUrl && loading) return <p>Loading PDF...</p>;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-background overflow-y-auto p-4"
      onContextMenu={(e) => e.preventDefault()} // disable right-click
    >
      <button
        onClick={() => Navigation(-1)}
        className="fixed top-4 left-4 bg-background/20 text-foreground px-4 py-2 rounded-xl hover:bg-background/30 backdrop-blur-md transition shadow-md border border-border"
      >
        ← Back
      </button>

      <div className="fixed top-4 right-4 flex gap-2 z-50">
        <button
          onClick={zoomOut}
          className="bg-background/20 hover:bg-background/30 text-foreground px-3 py-2 rounded-lg backdrop-blur-md transition border border-border"
        >
          −
        </button>
        <button
          onClick={resetZoom}
          className="bg-background/20 hover:bg-background/30 text-foreground px-3 py-2 rounded-lg backdrop-blur-md transition border border-border"
        >
          {scale*100}%
        </button>
        <button
          onClick={zoomIn}
          className="bg-background/20 hover:bg-background/30 text-foreground px-3 py-2 rounded-lg backdrop-blur-md transition border border-border"
        >
          +
        </button>
      </div>
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <><Page
            key={index}
            scale={scale}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
          <br/></>
        ))}
      </Document>
    </div>
  );
}
