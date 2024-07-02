import React from 'react';
import { MyDropzoneComponent } from '../../Component/FileUpload Component/FileDropZone';
import './Home.css'; // Import the CSS file
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fileUpload, getfileUploadList } from '../../Api/FileUpload';
import { useState } from 'react';
import { useEffect } from 'react';
import FileUploadTable from './FileUploadTable';

const HomePage = () => {

  const [selectedExcel,setSelectedExcel]=useState()
  const [uploadedList,setuploadedList]=useState([])


  //Downlaod Sample Excel File 
  const  handleSampleDownload = () => {
    const url = process.env.PUBLIC_URL + "/SampleFile/SampleUserUpload.xlsx";
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "SampleUserUpload.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uploadExcel=async()=>{


   if(selectedExcel){ const res= await fileUpload(selectedExcel)
    if (res?.status) {

      toast.success(res?.message, {
        position: "bottom-right",
        autoClose: 3000,
        theme: 'colored',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (res?.message ==='Partially Uploaded Proposal') {
        // Assuming res?.info is a condition you want to check for info messages
      toast.info('Partially Uploaded Proposal', {
        position: "bottom-right",
        autoClose: 3000,
        theme: 'colored',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        bodyStyle:{backgroundColor:'yellow'}
      });
    } else {
      toast.error(res?.message, {
        position: "bottom-right",
        autoClose: 3000,
        theme: 'colored',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    getUploadedExcelList()

    
  
  }
    
  }
const getUploadedExcelList=async()=>{
  const resData = await getfileUploadList()

  if(resData?.status){
    setuploadedList(resData?.data)
  }

}
  useEffect(()=>{getUploadedExcelList()},[])
  useEffect(()=>{},[selectedExcel,uploadedList])
  return (
    <div className="card-container">
      <div className="card">
        <h2 className="card-title">Upload Proposal Data</h2>
        <MyDropzoneComponent onFileSelect={(res) => setSelectedExcel(res)} />
        <div className="button-container">
          <button onClick={uploadExcel} className="upload-button">Upload</button>
          <button onClick={handleSampleDownload} className="download-button">Download Sample</button>
        </div>

      </div>
      <FileUploadTable data={uploadedList} />
    </div>
  );
};

export default HomePage;
