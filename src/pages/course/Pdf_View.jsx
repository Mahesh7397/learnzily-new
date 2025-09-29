import { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UseDataProvider } from "../../contexts/DataProvider";

export default function App() {
  const [pdfData, setPdfData] = useState(null);
  const location =useLocation()
  const {key}=location.state||""
  const [isloading,setisloading]=useState(false)
  const {Handlelink}=UseDataProvider()

  const Navigation=useNavigate()

  const Handle_Pdf=async(key)=>{
    try {
      setisloading(true)
      const link=await Handlelink(key)
      const response = await fetch(link);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      setPdfData(arrayBuffer);
      setisloading(false) 
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setisloading(false)
      Navigation(-1)
    }
  }

  useEffect(() => {
    if(key){
      Handle_Pdf(key)
    }
  },[]);

  return (
    <div style={{ height: "100vh" }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
        {!isloading ? pdfData?<Viewer fileUrl={{ data: pdfData }} />:null : <p>Loading...</p>}
      </Worker>
    </div>
  );
}
