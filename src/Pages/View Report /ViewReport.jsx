// ViewReportPage.js
import JSZip from 'jszip';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFullReport } from '../../Api/getProposalDetails';
import { ReferBackModal } from '../../Component/ReferBackModal';
import Dropdown from '../../Component/UI/Dropdown';
import { EditCheckpoint, HeaderLogo,Logo } from '../../Constant/ImageConstant';
import { fetchDataLocalStorage, storeDataLocalStorage } from '../../Util/LocalStorage';
import './ViewReport.css'; // Importing CSS file for additional styles
import { saveAs } from 'file-saver'
import { gridColumnGroupsLookupSelector } from '@mui/x-data-grid';
import { UpdateAdminStatus } from '../../Api/SubmitForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PDFDownloadLink } from '@react-pdf/renderer';
import InspectionReportPdf from '../../Component/InspectionReportPdf';
import { showErrorToast, showSuccessToast } from '../../Util/toastService';
import { makeApiCall } from '../../Api/makeApiCall';
import { Api_Endpoints } from '../../Api/Api_Endpoint';
import ToggleSwitch from '../../Component/UI/ToggleSwitch';
import FullPageLoader from '../../Component/FullPageLoader';
import {BikeInspectionView} from '../bikePArtsRenderer/BikePartsRenderer';

const CustomTabs = ({ tabs }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('');
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
      navigate(`#${tab}`);
      const element = document.getElementById(tab);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
  
    return (
        <div className="top-bar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      
    );
  };



function ImagePreviewModal({ imageUrl, onClose }) {
    return (
      <div style={{height:'80%', width:'80%', backgroundColor:'white',position:'absolute',padding:"20px",boxShadow:'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',overflow:'scroll'}} className="modal" onClick={onClose}>
        <div className="modal-content1">
          <span className="close" onClick={onClose}>&times;</span>
          <img  style={{width:'100%',height:'100%',maxWidth:'920px'}} src={imageUrl} alt="Preview" />
        </div>
      </div>
    );
  }
  
const ViewReportPage = () => {


  const [productTypeDropdown,setProductTypeDropdown]=useState([])
 
  const [selectedAnswers,setSelectedAnswers]=useState('')
const [errorMessages,setErrorMessages]=useState('')

    const updatestatuslist=[
        {
          "id": 4,
          "label": "Accept"
      },
      {
          "id": 2,
          "label": "Reject"
      },
      {
          "id": 3,
          "label": "ReferBack"
      },
    ]



const [inspection,setInspection]=useState([])
const [inspectionDropDown,setInspectionDropdown]=useState([])


// const imageInspection =  [
//     {
//         "id": 1,
//         "name": "Odometer with Engine on Position",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/ODOMETER.jpeg"
//     },
//     {
//         "id": 2,
//         "name": "Windscreen Inside to Outside",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Windscreen-Inside-to-Outside.jpg"
//     },
//     {
//         "id": 3,
//         "name": "Windscreen Outside to Inside",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Windscreen-Outside-to-Inside.jpg"
//     },
//     {
//         "id": 4,
//         "name": "Front Image",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Front.jpg"
//     },
//     {
//         "id": 5,
//         "name": "Left Image",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Left.jpeg"
//     },
//     {
//         "id": 6,
//         "name": "Rear Image",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Rare.jpg"
//     },
//     {
//         "id": 7,
//         "name": "Dicky Open",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Dicky.jpeg"
//     },
//     {
//         "id": 8,
//         "name": "Right Image",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Right.jpg"
//     },
//     {
//         "id": 9,
//         "name": "Engraved Chassis",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Engraved-Chassis.jpg"
//     },
//     {
//         "id": 10,
//         "name": "Open Engine Compartment",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Engine-Compartment.jpg"
//     },
//     {
//         "id": 11,
//         "name": "Under Carriage Image",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Undercarriage.jpg"
//     },
//     {
//         "id": 12,
//         "name": "PUC Copy",
//         "is_mand": 1,
//         "sample_image_url": null
//     },
//     {
//         "id": 13,
//         "name": "Dashboard Copy",
//         "is_mand": 1,
//         "sample_image_url": null
//     },
//     {
//         "id": 14,
//         "name": "RC Copy",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/RC-Copy.png"
//     },
//     {
//         "id": 15,
//         "name": "Pervious Insurance Copy",
//         "is_mand": 1,
//         "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/certificate-of-insurance-template.png"
//     },
//     {
//         "id": 16,
//         "name": "Selfie with car",
//         "is_mand": 1,
//         "sample_image_url": null
//     },
//     {
//         "id": 17,
//         "name": "Additional Image1",
//         "is_mand": 1,
//         "sample_image_url": null
//     },
//     {
//         "id": 18,
//         "name": "Additional Image2",
//         "is_mand": 1,
//         "sample_image_url": null
//     },
//     {
//         "id": 19,
//         "name": "Additional Image3",
//         "is_mand": 1,
//         "sample_image_url": null
//     },
//     {
//         "id": 20,
//         "name": "Front Left Image",
//         "is_mand": 1,
//         "sample_image_url": null
//     },
//     {
//         "id": 21,
//         "name": "Front Right Image",
//         "is_mand": 1,
//         "sample_image_url": null
//     },
//     {
//         "id": 22,
//         "name": "Rear Left Image",
//         "is_mand": 1,
//         "sample_image_url": null
//     },
//     {
//         "id": 23,
//         "name": "Rear Right Image",
//         "is_mand": 1,
//         "sample_image_url": null
//     }
// ]

const imageStyles = [
  { top: '0px', left: '39%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/17.png' },
  { top: '30px', left: '34%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/13.png' },
  { top: '30px', left: '52%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/12.png' },
  { top: '118px', left: '40%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/15.png' },
  { top: '148px', left: '43%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/43.png' },
  { top: '235px', left: '40%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/36.png' },
  { top: '135px', left: '35%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/21.png' },
  { top: '128px', left: '57%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/42.png' },
  { top: '275px', left: '35%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/34.png' },
  { top: '275px', left: '52%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/33.png' },
  { top: '79px', left: '65%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/14.png' },
  { top: '29px', left: '71%', srcs: [
    { top: '0px', left: '13px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/9.png' },
    { top: '0px', left: '0px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/10.png' },
    { top: '1px', left: '58px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/8.png' }
  ]},
  { top: '73px', left: '87%', srcs: [
    { top: '2px', left: '0px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/5.png' },
    { top: '9px', left: '15px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/4.png' }
  ]},
  { top: '126px', left: '90%', src: 'https://demo.mypolicynow.com/api//images/revised-car-red/3.png' },
  { top: '126px', left: '85%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/1.png' },
  { top: '247px', left: '87%', srcs: [
    { top: '1px', left: '15px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/25.png' },
    { top: '26px', left: '0px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/26.png' }
  ]},
  { top: '120px', left: '66%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/2.png' },
  { top: '268px', left: '72%', srcs: [
    { top: '10px', left: '-11px', src: 'https://demo.mypolicynow.com/api//images/revised-car-red/31.png' },
    { top: '20px', left: '49px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/29.png' },
    { top: '45px', left: '3px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/30.png' }
  ]},
  { top: '259px', left: '63%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/35.png' },
  { bottom: '29px', left: '71%', srcs: [
    { bottom: '0px', left: '13px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/30.png' },
    { bottom: '0px', left: '0px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/31.png' },
    { bottom: '1px', left: '58px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/29.png' }
  ]},
  { top: '359px', left: '40%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/38.png' },
  { top: '259px', left: '17%', srcs: [
    { top: '22px', left: '-11px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/41.png' },
    { top: '-8px', left: '60px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/37.png' }
  ]},
  { top: '130px', left: '19%', src: 'https://demo.mypolicynow.com/api//images/revised-car-yellow/23.png' },
  { top: '17px', left: '16%', srcs: [
    { top: '10px', left: '-11px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/20.png' },
    { top: '80px', left: '59px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/16.png' }
  ]},
  { top: '74px', left: '8%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/19.png' },
  { top: '124px', left: '7%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/22.png' },
  { top: '247px', left: '8%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/40.png' }
];

const TwoWheelerimageData = {
  right: [
      { id: '1', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/rightview/1_grey.png', style: { top: '6px', right: '163px' }, title: 'Back Mudguard', params: 'right,left,top', values: '1,1,1' },
      { id: '2', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/rightview/2_grey.png', style: { top: '7px', right: '172px' }, title: 'Back Tyre', params: 'right,left', values: '2,2' },
      { id: '3', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/rightview/3_grey.png', style: { top: '7px', right: '172px' }, title: 'Back Right Indicator', params: 'right,left', values: '6,6' },
      { id: '4', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/rightview/4_grey.png', style: { top: '15px', right: '176px' }, title: 'Right Handle', params: 'right,left,top', values: '1,1,1' },
      { id: '5', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/rightview/5_grey.png', style: { top: '27px', right: '184px' }, title: 'Front Mudguard', params: 'right,left,top', values: '1,1,1' },
      { id: '6', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/rightview/6_grey.png', style: { top: '27px', right: '190px' }, title: 'Front Tyre', params: 'right,left,top', values: '1,1,1' }
  ],
  left: [
      { id: '1', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/leftview/1_grey.png', style: { top: '6px', left: '163px' }, title: 'Back Mudguard', params: 'right,left,top', values: '1,1,1' },
      { id: '2', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/leftview/2_grey.png', style: { top: '7px', left: '172px' }, title: 'Back Tyre', params: 'right,left', values: '2,2' },
      { id: '3', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/leftview/3_grey.png', style: { top: '7px', left: '172px' }, title: 'Back Left Indicator', params: 'right,left', values: '6,6' },
      { id: '4', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/leftview/4_grey.png', style: { top: '15px', left: '176px' }, title: 'Left Handle', params: 'right,left,top', values: '1,1,1' },
      { id: '5', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/leftview/5_grey.png', style: { top: '27px', left: '184px' }, title: 'Front Mudguard', params: 'right,left,top', values: '1,1,1' },
      { id: '6', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/leftview/6_grey.png', style: { top: '27px', left: '190px' }, title: 'Front Tyre', params: 'right,left,top', values: '1,1,1' }
  ],
  top: [
      { id: '1', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/topview/1_grey.png', style: { left: '75px', top: '19px' }, title: 'Back Mudguard', params: 'right,left,top', values: '1,1,1' },
      { id: '2', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/topview/2_grey.png', style: { left: '90px', top: '45px' }, title: 'Back Tyre', params: 'right,top', values: '2,2' },
      { id: '3', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/topview/3_grey.png', style: { left: '60px', top: '55px' }, title: 'Back Right Indicator', params: 'right,top', values: '6,3' },
      { id: '4', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/topview/4_grey.png', style: { left: '30px', top: '15px' }, title: 'Front Mudguard', params: 'right,left,top', values: '1,1,1' },
      { id: '5', src: 'https://myclaimassistnow.com/uat/tvs/assets/inspection_questions_images/topview/5_grey.png', style: { left: '70px', top: '35px' }, title: 'Front Tyre', params: 'right,left,top', values: '1,1,1' }
  ]
};


const reportimageStyles = [
  { top: '0px', left: '39%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/17.png' },
  { top: '30px', left: '34%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/13.png' },
  { top: '30px', left: '52%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/12.png' },
  { top: '118px', left: '40%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/15.png' },
  { top: '148px', left: '43%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/43.png' },
  { top: '235px', left: '40%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/36.png' },
  { top: '135px', left: '35%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/21.png' },
  { top: '128px', left: '57%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/42.png' },
  { top: '275px', left: '35%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/34.png' },
  { top: '275px', left: '52%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/33.png' },
  { top: '79px', left: '65%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/14.png' },
  { top: '29px', left: '71%', srcs: [
    { top: '0px', left: '13px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/9.png' },
    { top: '0px', left: '0px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/10.png' },
    { top: '1px', left: '58px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/8.png' }
  ]},
  { top: '73px', left: '87%', srcs: [
    { top: '2px', left: '0px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/5.png' },
    { top: '9px', left: '15px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/4.png' }
  ]},
  { top: '126px', left: '90%', src: 'https://demo.mypolicynow.com/api//images/revised-car-red/3.png' },
  { top: '126px', left: '85%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/1.png' },
  { top: '247px', left: '87%', srcs: [
    { top: '1px', left: '15px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/25.png' },
    { top: '26px', left: '0px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/26.png' }
  ]},
  { top: '120px', left: '66%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/2.png' },
  { top: '268px', left: '72%', srcs: [
    { top: '10px', left: '-11px', src: 'https://demo.mypolicynow.com/api//images/revised-car-red/31.png' },
    { top: '20px', left: '49px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/29.png' },
    { top: '45px', left: '3px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/30.png' }
  ]},
  { top: '259px', left: '63%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/35.png' },
  { bottom: '29px', left: '71%', srcs: [
    { bottom: '0px', left: '13px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/30.png' },
    { bottom: '0px', left: '0px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/31.png' },
    { bottom: '1px', left: '58px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/29.png' }
  ]},
  { top: '359px', left: '40%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/38.png' },
  { top: '259px', left: '17%', srcs: [
    { top: '22px', left: '-11px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/41.png' },
    { top: '-8px', left: '60px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/37.png' }
  ]},
  { top: '130px', left: '19%', src: 'https://demo.mypolicynow.com/api//images/revised-car-yellow/23.png' },
  { top: '17px', left: '16%', srcs: [
    { top: '10px', left: '-11px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/20.png' },
    { top: '80px', left: '59px', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/16.png' }
  ]},
  { top: '74px', left: '8%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/19.png' },
  { top: '124px', left: '7%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/22.png' },
  { top: '247px', left: '8%', src: 'https://demo.mypolicynow.com/api//images/revised-car-grey/40.png' }
];

const [isDecalarationChecked, setIsDecalarationChecked] = useState(false);

const handleDeclarationCheckbox = (event) => {
  setIsDecalarationChecked(event.target.checked);
};

const [LocalData,setLocalData]=useState('')
const [adminComment, setadminComment] = useState('');
const [status, setStatus] = useState('');
const [error, setError] = useState('');
const [isReferBackModelOpen, setIsReferBackModelOpen] = useState(false);
const [selectedImagesReferback, setSelectedImagesReferback] = useState([]);
const [selectedReferbackOption, setselectedReferbackOption] = useState([]);
const [InspectedImages, setInspectedImages] = useState([]);
const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState('');
const navigate = useNavigate();
const [activeTab, setActiveTab] = useState('');
const ldata = useLocation()
const [reportData,setReportData]=useState(null)
const [isShowQuestionChecked,setIsShowCheckpointChecked]=useState(false)
const [imageInspectionQuestion,setInspectionImagesQuestion]=useState('')
const [IsLoading,setIsLoading]=useState(false)
const [loaderMessage,setLoaderMessage]=useState('')


const [editCheckpoint,setEditCheckpoint]=useState(true)
const [fuleTypeDropdown,setFuelTypeDropdown]=useState([])
const [makeDropdown,setMakeDropdown]=useState([])
const [modelDropdown,setModelDropdown]=useState([])
const [VariantDropdown,setVariantDropdown]=useState([])


const downloadImagesAsZip = async () => {
  setIsLoading(true)
  setLoaderMessage('File Generating,Please Wait...........')
  try {
    const res = await makeApiCall(Api_Endpoints?.getImageasZip, "POST", { break_in_case_id: reportData?.breaking_case_id });
    
    if (res?.status) {
      const zipFileUrl = res?.file; // Assuming the ZIP file URL is in res.data.zipFileUrl
      
      if (zipFileUrl) {
        window.open(zipFileUrl, '_blank');

      } else {
        showErrorToast("ZIP file URL not found in the response.");
      }
    } else {
      showErrorToast(res?.message);
    }
  } catch (error) {
    showErrorToast("An error occurred. Please try again.");
  }
  setIsLoading(false)
  setLoaderMessage('')

};

   
const handleSubmit = async () => {

  const result = {
    is_referback_checkpoint: 0,
    is_referback_images: 0,
    is_referback_video: 0,
  };

  
  
if(status==3){
  selectedReferbackOption.forEach((item) => {
    if (item === 'checkpoint') {
      result.is_referback_checkpoint = 1;
    } else if (item === 'imageInspection') {
      result.is_referback_images = 1;
    } else if (item === 'video') {
      result.is_referback_video = 1;
    }
  });
}

const valuesArray = selectedImagesReferback?.map(item => item.value);


const data ={proposal_id:reportData?.proposal_detail?.id,
  user_id:LocalData?.data?.user_details?.id,
  breakin_status_id:status,
  is_referback_checkpoint:result?.is_referback_checkpoint,
is_referback_images:result?.is_referback_images,
is_referback_video:result?.is_referback_video,
  image_ids:valuesArray,
  comment:adminComment,
}


  if (adminComment.trim() === '' || status === '') {
    setError('Please select and fill in all fields.');
    return;
  }

  setIsLoading(true)

  if(status===3&&selectedReferbackOption.length===0)
  {
  setIsReferBackModelOpen(true);
  setIsLoading(false)
return null
}


  const updateStatus= await UpdateAdminStatus(data)




  if(updateStatus?.status){
    toast.success(updateStatus?.message, {
      position: "bottom-right",
      autoClose: 3000,
      theme:'colored',

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    setIsLoading(false)
    window.location.reload()

  }else{

    toast.error(updateStatus?.message, {
      position: "bottom-right",
      autoClose: 3000,
      theme:'colored',

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
  
  setadminComment('')
  setStatus(null)
  setIsLoading(false)

}

const handleChangeText = (event) => {
    setadminComment(event.target.value);
  setError('');
};

const handleChangeStatus = (event) => {
  setStatus(event.target.value);
  setError('');
};


const openModal = (uri) => {
    setIsPreviewModalOpen(true)
    setSelectedImage(uri)
};
  const closeModal = () =>{ 
    setIsPreviewModalOpen(false)
    setSelectedImage('')
}

    
  const data = ldata?.state?.data;
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`${ldata.pathname}#${tab}`);
  };

// const handlePrint = () => {
//   if (!isDecalarationChecked) {
//     alert('Please Accept terms and Condition');
//   } else {
//     const printContents = document.querySelector('.report-container').innerHTML;
//     const printWindow = window.open('', 'Inspection Report', 'height=800,width=800');

//     printWindow.document.write('<html><head><title>Ezclick Vehicle Inspection Report</title>');

//     // Inline CSS styles or link to external stylesheet
//     printWindow.document.write('<style>');
//     printWindow.document.write(`
//       body { font-family: Arial, sans-serif; padding-bottom: 280px; }
//       .header-logo { width: 100%; }
//       .remove-header{display:none}
//       .report-title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px;  }
//       .report-section { margin-bottom: 15px;margin-top:10px }
//       .data-table { width: 100%; border-collapse: collapse; }
//       .page-break { page-break-before: always;margin-top:10px ;top:10px}
//       .inspection-item { width: 230px; padding: 5px; margin: 5px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
//       .inspection-data-container { display: flex; flex-wrap: wrap; }
//       .data-table th { border: 1px solid #000; padding: 6px; font-size:16px} 
//       .data-table td { border: 1px solid #000; padding: 6px; font-size:14px }
//       .inspection-data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px;margin-top:0px }
//       .inspection-data-table th  { border: 1px solid #000; padding: 5px;font-size:16px }
//       .inspection-data-table td { border: 1px solid #000; padding: 5px; font-size:16px }
//       .inspection-data-table thead { background-color:red}

      
//       .inspection-image { width: 100%; height: 400px; }
//       .button-container { text-align: center; margin-top: 20px; }
//       .download-button, .preview-button, .print-button { padding: 10px 20px; font-size: 16px; display: none; }

//       .bike-container {
 
//         margin: 20px auto;
//         position: relative;
//       }
      
//       .bike-hori-left,
//       .bike-vert,
//       .bike-hori-right {
//         position: relative;
//       }
      
//       .bike-hori-left img,
//       .bike-vert img,
//       .bike-hori-right img {
//         position: absolute;
//         cursor: pointer;
//         transition: transform 0.3s ease-in-out;
//       }


//       .footer {
//         margin-top:150px
//         position: fixed;
//         bottom: -10px;
//         left: 0;
//         width: 100%;
//         background-color: #f0f0f0;
//         padding: 10px;
//         text-align: center;
//         border-top: 1px solid #ccc;
//       }
//        @page {
//           margin: 0.5cm;
//         }
//     `);
//     printWindow.document.write('</style>');

//     // Optionally link to external stylesheet
//     printWindow.document.write('<link rel="stylesheet" type="text/css" href="./ViewReport.css">');

//     printWindow.document.write('</head><body>');

//     // Write printContents to the print window
//     printWindow.document.write(printContents);

//     // Add footer
//     printWindow.document.write('<div class="footer">');
//     printWindow.document.write(`
//       <div style="width: 100%; position: fixed; bottom: 0; left: 0; padding: 0px; background-color: #f0f0f0; border-top: 1px solid #ccc; display: flex; align-items: center;">
//         <img src="${Logo}" alt="Logo" style="width: 100px; height: 80px; margin-right: 10px;">
//         <p style="margin: 0; position: absolute; bottom: 45px; left: 400px;">Inspection Date: ${reportData?.proposal_detail?.inspection_date_time}</p>
//       </div>
//     `);  
    
//     printWindow.document.write('</div>');

//     printWindow.document.write('</body></html>');

//     // Ensure document is fully loaded before printing
//     printWindow.document.close();
//     printWindow.onload = () => {
//       printWindow.print();
//       printWindow.close();
//     };
//   }
// };

const handlePrint = () => {
  if (!isDecalarationChecked) {
    alert('Please Accept terms and Condition');
  } else {
    const printContents = document.querySelector('.report-container').innerHTML;
    const printWindow = window.open('', 'Inspection Report', 'height=800,width=800');

    printWindow.document.write('<html><head><title>Ezclick Vehicle Inspection Report</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; }
      .header-logo { width: 100%; }
      .remove-header { display: none; }
      .report-title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
      .report-section { margin-bottom: 15px; margin-top: 10px; }
      .data-table { width: 100%; border-collapse: collapse; }
      .page-break { page-break-before: always; margin-top: 10px; }
      .inspection-item { width: 230px; padding: 5px; margin: 5px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
      .inspection-data-container { display: flex; flex-wrap: wrap; }
      .data-table th, .data-table td { border: 1px solid #000; padding: 6px; font-size: 16px; }
      .inspection-data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; margin-top: 0px; }
      .inspection-data-table th, .inspection-data-table td { border: 1px solid #000; padding: 5px; font-size: 16px; }
      .inspection-data-table thead { background-color: red; }
      .inspection-image { width: 100%; height: 400px; }
      .button-container { text-align: center; margin-top: 20px; }
      .download-button, .preview-button, .print-button { padding: 10px 20px; font-size: 16px; display: none; }
      .bike-container { margin: 20px auto; position: relative; }
      .bike-hori-left, .bike-vert, .bike-hori-right { position: relative; }
      .bike-hori-left img, .bike-vert img, .bike-hori-right img { position: absolute; cursor: pointer; transition: transform 0.3s ease-in-out; }
      .footer { 
        position: fixed; 

        bottom: 0; 
        left: 0; 
        width: 100%; 
        background-color: #f0f0f0; 
        padding: 10px; 
        text-align: center; 
        border-top: 1px solid #ccc; 
      }
      .content { 
        padding-bottom: 100px; /* Reserve space for footer */
      }
      @page {
        margin: 0.5cm;
      }
      /* Prevent page break inside tables */
      .data-table, .data-table tr, .data-table td, .data-table th {
        page-break-inside: avoid;
      }
      .inspection-data-table, .inspection-data-table tr, .inspection-data-table td, .inspection-data-table th {
        page-break-inside: avoid;
      }
    `);
    printWindow.document.write('</style>');

    // Optionally link to external stylesheet
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="./ViewReport.css">');

    printWindow.document.write('</head><body>');

    // Wrap the content with a div to ensure enough space for the footer
    printWindow.document.write('<div class="content">');
    printWindow.document.write(printContents);
    printWindow.document.write('</div>');

    // Footer content
    printWindow.document.write(`<div class="footer"><img src="${Logo}" alt="Logo" style="width: 40px; height: 20px ; position:absolute; bottom:0.5px;left:0px; margin-right: 10px;"> <p style="margin: 0; position: absolute; bottom: 0px; left: 420px;">Inspection Date: ${reportData?.proposal_detail?.inspection_date_time}</p>
    </div>`);

    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }
};


// const handlePrint = () => {
//   if (!isDecalarationChecked) {
//     alert('Please Accept terms and Condition');
//   } else {
//     const printContents = document.querySelector('.report-container').innerHTML;
//     const printWindow = window.open('', 'Inspection Report', 'height=800,width=800');

//     printWindow.document.write('<html><head><title>Ezclick Vehicle Inspection Report</title>');

//     // Inline CSS styles or link to external stylesheet
//     printWindow.document.write('<style>');
//     printWindow.document.write(`
//       body { font-family: Arial, sans-serif; }
//       .header-logo { width: 100%; }
//       .remove-header { display: none; }
//       .report-title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
//       .report-section { margin-bottom: 15px; margin-top: 10px; }
//       .data-table { width: 100%; border-collapse: collapse; }
//       .page-break { page-break-before: always; margin-top: 10px; }
//       .inspection-item { width: 230px; padding: 5px; margin: 5px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
//       .inspection-data-container { display: flex; flex-wrap: wrap; }
//       .data-table th { border: 1px solid #000; padding: 6px; font-size: 16px; }
//       .data-table td { border: 1px solid #000; padding: 6px; font-size: 14px; }
//       .inspection-data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; margin-top: 0px; }
//       .inspection-data-table th { border: 1px solid #000; padding: 5px; font-size: 16px; }
//       .inspection-data-table td { border: 1px solid #000; padding: 5px; font-size: 16px; }
//       // .inspection-data-table thead { background-color: red; }
//       .inspection-image { width: 100%; height: 400px; }
//       .button-container { text-align: center; margin-top: 20px; }
//       .download-button, .preview-button, .print-button { padding: 10px 20px; font-size: 16px; display: none; }
//       .bike-container { margin: 20px auto; position: relative; }
//       .bike-hori-left, .bike-vert, .bike-hori-right { position: relative; }
//       .bike-hori-left img, .bike-vert img, .bike-hori-right img { position: absolute; cursor: pointer; transition: transform 0.3s ease-in-out; }
//       .footer { 
//         position: fixed; 
//         bottom: 0; 
//         left: 0; 
//         width: 100%; 
//         background-color: #f0f0f0; 
//         padding: 5px; 
//         text-align: center; 
//         border-top: 1px solid #ccc; 
//       }
//       .content { 
//         padding-bottom: 150px; /* Reserve space for footer */
//       }
//       @page {
//         margin: 0.5cm;
//       }
//     `);
//     printWindow.document.write('</style>');

//     // Optionally link to external stylesheet
//     printWindow.document.write('<link rel="stylesheet" type="text/css" href="./ViewReport.css">');

//     printWindow.document.write('</head><body>');

//     // Wrap the content with a div to ensure enough space for the footer
//     printWindow.document.write('<div class="content">');
//     printWindow.document.write(printContents);
//     printWindow.document.write('</div>');

//     // Add footer
//     printWindow.document.write('<div class="footer">');
//     printWindow.document.write(`
//       <div style="width: 100%; padding: 0px; background-color: #f0f0f0; border-top: 1px solid #ccc; display: flex; align-items: center;">
//         <img src="${Logo}" alt="Logo" style="width: 100px; height: 80px; margin-right: 10px;">
//         <p style="margin: 0; position: absolute; bottom: 5px; left: 400px;">Inspection Date: ${reportData?.proposal_detail?.inspection_date_time}</p>
//       </div>
//     `);  
//     printWindow.document.write('</div>');

//     printWindow.document.write('</body></html>');

//     // Ensure document is fully loaded before printing
//     printWindow.document.close();
//     printWindow.onload = () => {
//       printWindow.print();
//       // printWindow.close();
//     };
//   }
// };

const handleRadioChange = (questionId, answerId) => {


  console.log(questionId,answerId,selectedAnswers,'lkjhgfdhjkljhghjgjjjghhghfghghhgghfghg')
  setSelectedAnswers({
    ...selectedAnswers,
    [questionId]: answerId,
  });

  // Remove error message for the current question
  setErrorMessages({
    ...errorMessages,
    [questionId]: "",
  });
};
const allQuestionsAnswered = () => {
  for (const question of inspection) {
    if (!selectedAnswers[question.breakin_inspection_post_question_id]) {
      return false;
    }
  }
  return true;
};
const handleInspectionSubmit = async () => {

  if (allQuestionsAnswered()) {
    const formattedData = Object.entries(selectedAnswers)
    .map(([key, value]) => `${key}:${value}`)
    .join(',');  
    // {
    //   proposal_id:ldata?.state?.data?.id,
    //   user_id:localres?.data?.user_details?.id,
    //   break_in_case_id:ldata?.state?.data?.breakin_inspection_id}  
    const postdata ={
      user_id:LocalData?.data?.user_details?.id,
      proposal_list_id:ldata?.state?.data?.id,
      question_answer_ids:`${formattedData}`,
      product_type_id:reportData?.proposal_detail?.v_product_type_id,
      breakin_steps:'completed',
      is_admin:1
    }


const submittedresponse = await makeApiCall(Api_Endpoints?.submit_inspection_checkpoint,"POST",postdata)

if(submittedresponse?.status){
  showSuccessToast(submittedresponse?.message)
  window.location.reload()


}else{
showErrorToast(submittedresponse?.message)

}


  } else {
    let isQuestionRequired=false
    // Display error messages for unanswered questions
    const updatedErrorMessages = {};
    inspection.forEach((question) => {
      if (!selectedAnswers[question.breakin_inspection_post_question_id]) {
        updatedErrorMessages[question.breakin_inspection_post_question_id] =
          "This question is required";
          isQuestionRequired=true
      } else {
        updatedErrorMessages[question.breakin_inspection_post_question_id] =
          "";
          isQuestionRequired=false
      }
    });
    showErrorToast('All Question Mandatory')
    

    setErrorMessages(updatedErrorMessages);
  }

// navigate('/camera')
};

const handleEditInspectionSubmit = async () => {

  setIsLoading(true)

    const formattedData = Object.entries(selectedAnswers)
    .map(([key, value]) => `${key}:${value}`)
    .join(',');  
    // {
    //   proposal_id:ldata?.state?.data?.id,
    //   user_id:localres?.data?.user_details?.id,
    //   break_in_case_id:ldata?.state?.data?.breakin_inspection_id}  
    const postdata ={
      user_id:LocalData?.data?.user_details?.id,
      proposal_list_id:ldata?.state?.data?.id,
      question_answer_ids:`${formattedData}`,
      product_type_id:reportData?.proposal_detail?.v_product_type_id,
      breakin_steps:'completed',
      is_admin:1
    }


const submittedresponse = await makeApiCall(Api_Endpoints?.submit_inspection_checkpoint,"POST",postdata)

if(submittedresponse?.status){
  showSuccessToast(submittedresponse?.message)
  window.location.reload()


}else{
showErrorToast(submittedresponse?.message)

}


  

setIsLoading(false)

// navigate('/camera')
};


const handleShowCheckpoint = async (e) => {
  let data = {
    proposal_id: ldata?.state?.data?.id,
    is_question_checkpoint: e ? 0 : 1
  };

  try {
    const res = await makeApiCall(Api_Endpoints?.update_checkpoint_details, "POST", data);
    if (res?.status) {
      window.location.reload();
      
    } else {
      showErrorToast(res?.message);
    }
  } catch (error) {
    showErrorToast("An error occurred. Please try again.");
  }
};

  
  
  
function mapData(refData, namesData, codesData) {
  let mappedArray = [];
  
  refData.forEach(nameItem => {

    const codeItem = codesData[nameItem.code]; // Access property directly
    const refItem = namesData?.find(item => item.name === nameItem.name)??[];

      
    if (codeItem && refItem) {
      const mappedItem = {
        id: refItem.id,
        name: refItem.name,
        is_mand: refItem.is_mand,
        sample_image_url: refItem.sample_image_url,
        "Inspection_Image": codeItem // Access property directly
      };
      mappedArray.push(mappedItem);
    }
  });
  

  return mappedArray;
}




const referenceData = [
  {"name": "Odometer with Engine on Position", "code": "autometer_engine"},
  {"name": "Windscreen Inside to Outside", "code": "windscreen_inside_outside"},
  {"name": "Windscreen Outside to Inside", "code": "windscreen_outside_inside"},
  {"name": "Front Image", "code": "front_image"},
  {"name": "Left Image", "code": "left_image"},
  {"name": "Rear Image", "code": "rear_image"},
  {"name": "Dicky Open", "code": "dicky_open"},
  {"name": "Right Image", "code": "right_image"},
  {"name": "Engraved Chassis", "code": "car_chassis_print"},
  {"name": "Open Engine Compartment", "code": "open_engine_compartment"},
  {"name": "Under Carriage Image", "code": "under_the_chassis_embossed_chassis_photo"},
  {"name": "PUC Copy", "code": "puc_copy"},
  {"name": "Dashboard Copy", "code": "dashboard_copy"},
  {"name": "RC Copy", "code": "rc_copy"},
  {"name": "Pervious Insurance Copy", "code": "pervious_insurances"},
  {"name": "Selfie with car", "code": "selfie_with_car"},
  {"name": "Additional Image1", "code": "addtion1"},
  {"name": "Additional Image2", "code": "addtion2"},
  {"name": "Additional Image3", "code": "addtion3"},
  {"name": "Front Left Image", "code": "front_left_image"},
  {"name": "Front Right Image", "code": "front_right_image"},
  {"name": "Rear Left Image", "code": "rear_left_image"},
  {"name": "Rear Right Image", "code": "rear_right_image"}
]


const handleReportData=async()=>{
  setIsLoading(true)
  const localres=await fetchDataLocalStorage('claim_loginDashboard')
  
  
const data ={
  proposal_id:localres?.selectedProposal.id,
  user_id:localres?.data?.user_details?.id,
  break_in_case_id:localres?.selectedProposal?.breakin_inspection_id,
  product_type_id:localres?.selectedProposal?.v_product_type_id,


}

    if(localres){

      const reportRes = await makeApiCall(Api_Endpoints?.getFullreportEndpoint,"POST",data)
      if(reportRes?.status){
        const finaldata = reportRes?.proposal_detail
        setEditableData(finaldata)
        getDropDownMaster(finaldata?.v_product_type_id)
        const make = await makeApiCall(Api_Endpoints?.getModelDetails,"POST",{make_id:finaldata?.v_make_id})
        if(make?.status){
          setModelDropdown(make?.model_master)
        }
        else{
          showErrorToast(make?.message)
        }

        const Variant = await makeApiCall(Api_Endpoints?.getVariantDetails,"POST",{model_id:finaldata?.v_model_id,make_id:finaldata?.v_make_id})
        if(Variant?.status){
          setVariantDropdown(Variant?.variant_master)
        }
        else{
          showErrorToast(Variant?.message)
        }
        const response = await makeApiCall(Api_Endpoints?.fetch_Checkpoint_inspection_question_Endpoint,"POST",{product_type_id:reportRes?.proposal_detail?.v_product_type_id})

    if(response?.status){  
      
      setLocalData(localres)


      console.log(response?.data?.length,'fetch_Checkpoint_inspection_question_Endpoint')
      const initialState = {};

      for (let i = 1; i <= response?.data?.length; i++) {
        initialState[i] = 1;
      }
    
setSelectedAnswers(initialState)

      
    setReportData(reportRes);
    setIsShowCheckpointChecked(reportRes?.proposal_detail?.is_question_checkpoint==0?false:true)

    let reports = reportRes?.qsn_ans?.inspection_question_answere_chunk || [];
    let filteredRes = reports.filter(res => res?.user_id === data?.user_id && res?.breakin_case_id === data?.break_in_case_id);
    setInspectionDropdown(response?.data)
    if(filteredRes?.length===0){
      setInspection(response?.data)
    }else{
    let filteredRes = reports.filter(res => res?.user_id === data?.user_id && res?.breakin_case_id === data?.break_in_case_id);


    setInspection(filteredRes)}
      

      const resData = mapData(referenceData,[],reportRes?.breakin_details)

      setInspectedImages(resData)
    }
      else{
        showErrorToast(response?.message)
      }
    }else{
        showErrorToast(reportRes?.message)
      }


    }
    setIsLoading(false)

}

const updatedImageStyles = imageStyles.map(style => {
  if (style.src) {
    const id = style.src.match(/\/(\d+)\.png$/)[1]; // Extracts the ID from the URL
    const color = reportData?.qsn_ans?.color[id]; // Gets the color for the ID
    return {
      ...style,
      src: `https://demo.mypolicynow.com/api//images/revised-car-${color}/${id}.png`
    };
  } else if (style.srcs) {
    return {
      ...style,
      srcs: style.srcs.map(subStyle => {
        const id = subStyle.src.match(/\/(\d+)\.png$/)[1]; // Extracts the ID from the URL
        const color = reportData?.qsn_ans?.color[id]; // Gets the color for the ID
        return {
          ...subStyle,
          src: `https://demo.mypolicynow.com/api//images/revised-car-${color}/${id}.png`
        };
      })
    };
  } else {
    return style;
  }
});


const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(reportData?.proposal_detail);

  const handleUpdateDetails = async () => {

    setIsLoading(true)
const POSTDATA={
      proposal_no:editableData?.proposal_no,
insured_name:editableData?.insured_name,
proposal_start_date:editableData?.proposal_start_date,
proposal_end_date:editableData?.proposal_end_date,
mobile_no:editableData?.mobile_no,
email:editableData?.email,
insured_address:editableData?.insured_address,
registration_no:editableData?.v_registration_no,
product_type_id:editableData?.v_product_type_id,
make_id:editableData?.v_make_id,
model_id:editableData?.v_model_id,
variant_id:editableData?.v_variant_id,
engine_no:editableData?.v_engine_no,
chassis_no:editableData?.v_chassis_no,
odometer_reading:editableData?.v_odometer_reading,
fuel_type_id:editableData?.v_fuel_type_id,
manufacture_year:editableData?.v_manufacture_year,
cc:editableData?.v_cc,
color:editableData?.v_color,
nill_depreciation:editableData?.v_nill_depreciation,
user_id:editableData?.user_id,
proposal_id:editableData?.id,
al_email:editableData?.al_email,
breakin_steps:editableData?.breakin_steps
    }

 if(isEditing){   const res = await makeApiCall(Api_Endpoints?.update_ProposalDetails,'POST',POSTDATA)

    if(res?.status){
      window.location.reload()

      showSuccessToast(res?.message)
    }else{
      showErrorToast(res?.message)
    }}

    setIsEditing(!isEditing);
    setIsLoading(false)

  };

  const handleChange = (e) => {
    console.log(e.target.name)
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };


// Functional component for a single view (left, right, top)
const BikeView = ({ viewData }) => {
  return (
    <div className={`bike-${viewData.position}`}>
      {viewData.images.map((image) => (
        // <a key={image.id} href="javascript:void(0);" onClick={() => damagemark(viewData.position, image.id, image.markTypes, image.markIds)}>
          <img
            id={`${viewData.position}_${image.id}`}
            src={image.src}
            style={{ top: image.top, [viewData.position === 'left' ? 'left' : 'right']: image.position }}
            title={image.title}
          />
        // </a>
      ))}
      <img src={viewData.backgroundImage} alt="" style={{ [viewData.position === 'left' ? 'right' : 'left']: 90, top: 370 }} />
    </div>
  );
};



const reportupdatedImageStyles = reportimageStyles.map(style => {
  if (style.src) {
    const id = style.src.match(/\/(\d+)\.png$/)[1]; // Extracts the ID from the URL
    const color = reportData?.qsn_ans?.color[id]; // Gets the color for the ID
    return {
      ...style,
      src: `https://demo.mypolicynow.com/api//images/revised-car-${color}/${id}.png`
    };
  } else if (style.srcs) {
    return {
      ...style,
      srcs: style.srcs.map(subStyle => {
        const id = subStyle.src.match(/\/(\d+)\.png$/)[1]; // Extracts the ID from the URL
        const color = reportData?.qsn_ans?.color[id]; // Gets the color for the ID
        return {
          ...subStyle,
          src: `https://demo.mypolicynow.com/api//images/revised-car-${color}/${id}.png`
        };
      })
    };
  } else {
    return style;
  }
});
const getDropDownMaster=async(id)=>{
  const res = await makeApiCall(Api_Endpoints?.getMasterDetails,"POST",{product_type_id:id})

  if(res?.status){

  setFuelTypeDropdown(res?.fuel_type_master)
  setMakeDropdown(res?.make_master)
  

  }
}

const handleDropdownChange = async (event, field) => {
  const selectedValue = event.target.value;



  if(field&&String(selectedValue))
  {
  setEditableData(prevFormData => ({
    ...prevFormData,
    [field]: String(selectedValue)
  }));

  
  // productTypeDropdown v_product_type_id

  if(field==='v_product_type_id'){
    setEditableData(prevFormData => ({
      ...prevFormData,
      v_make_id:'',
      v_model_id:'',
      v_variant_id:''

    }));


   getDropDownMaster(selectedValue)
  }

  if(field==='v_make_id'){
    setEditableData(prevFormData => ({
      ...prevFormData,
      v_model_id:'',
      v_variant_id:''

    }));

    const make = await makeApiCall(Api_Endpoints?.getModelDetails,"POST",{make_id:selectedValue})


    if(make?.status){
      setModelDropdown(make?.model_master)
    

    }
  }


  if(field==='v_model_id'){
    setEditableData(prevFormData => ({
      ...prevFormData,
      v_variant_id:''
    }));
    // const Variant = await getVariant(formData?.v_make_id,selectedValue)
    
    const Variant = await makeApiCall(Api_Endpoints?.getVariantDetails,"POST",{make_id:editableData?.v_make_id,model_id:selectedValue})

    if(Variant?.status){
      setVariantDropdown(Variant?.variant_master)

    }
  }}

};



const getProductType=async()=>{
  const res = await makeApiCall(Api_Endpoints?.getProductType,"GET")

  if(res?.status){

// getDropDownMaster()
    setProductTypeDropdown(res?.product_type_master)
  }else{
    // showErrorToast(res?.message)
  }
}


  useEffect(()=>{
    getProductType()
        handleReportData()
        

  },[])



  useEffect(()=>{},[isPreviewModalOpen,selectedImage,InspectedImages,LocalData])
  

  return (
    <div>
      {IsLoading&& <FullPageLoader loading={IsLoading} message={loaderMessage} />}
    {isPreviewModalOpen && <ImagePreviewModal imageUrl={selectedImage} onClose={closeModal} />}

    {isReferBackModelOpen&&<ReferBackModal  imageInspection={inspectionDropDown} reportData={reportData} onUpdate={(referbackOption,referbackimageaarray)=>{setselectedReferbackOption(referbackOption);setSelectedImagesReferback(referbackimageaarray)}}  onClose={()=>setIsReferBackModelOpen(false)}/>}


    <div  className="top-bar">
    <CustomTabs
        tabs={[
          { id: 'proposal-details', title: 'Proposal Details' },
          { id: 'inspection-details', title: 'Inspection Details' },
          { id: 'update-status', title: 'Update Status' },

          { id: 'declaration', title: 'Declaration' },
        ]}
      />
 </div>

   {/* ********************** Proposal Details Details  Div************** */}

   <div id="proposal-details" className="report-section">
      <h2 className="remove-header">Proposal Details</h2>
      
      {reportData && (
        <>
          <div className="report-section">
            <h2>Proposal Info</h2>
            
            <table className="data-table">
         
              <tbody>
                <tr>
                  <td><strong>Proposal No:</strong></td>
                  <td>{isEditing ? <input type="text" className='edit_details_Form'  name="proposal_no" value={editableData.proposal_no} onChange={handleChange} /> : reportData?.proposal_detail?.proposal_no}</td>
                  <td><strong>Breakin Case Id:</strong></td>
                  <td>{reportData.breaking_case_id}</td>
                </tr>
                <tr>
                  <td><strong>Inspection Start Date/Time:</strong></td>
                  <td>{isEditing ? <input type="text" className='edit_details_Form'  name="inspection_date_time" value={editableData.inspection_date_time} onChange={handleChange} /> : reportData?.proposal_detail?.inspection_date_time}</td>
                  <td><strong>Registration No</strong></td>
                  <td>{isEditing ? <input type="text" className='edit_details_Form'  name="v_registration_no" value={editableData.v_registration_no} onChange={handleChange} /> : reportData?.proposal_detail?.v_registration_no}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="report-section">
            <h2>Vehicle Info</h2>
            <table className="data-table">
              <tbody>
                <tr>
                  <td><strong>Chassis No:</strong></td>
                  <td>{isEditing ? <input type="text" className='edit_details_Form'  name="v_chassis_no" value={editableData.v_chassis_no} onChange={handleChange} /> : reportData?.proposal_detail?.v_chassis_no}</td>
                  <td><strong>Engine No:</strong></td>
                  <td>{isEditing ? <input type="text" className='edit_details_Form'  name="v_engine_no" value={editableData.v_engine_no} onChange={handleChange} /> : reportData?.proposal_detail?.v_engine_no}</td>
                </tr>
            
                <tr>
                <td><strong>Product Type:</strong></td>
                  <td>{false ? 
                     <Dropdown
          value={editableData.v_product_type_id}
          

          onChange={(event) => handleDropdownChange(event, 'v_product_type_id')}
          options={productTypeDropdown?.map((product) => ({
            value: product?.id,
            label: product?.label
          }))}

          placeholder="Select Product type"
        />: ` ${reportData?.proposal_detail?.is_commercial == 1 &&reportData?.proposal_detail?.v_product_type_id == 1  ? 'Four Wheeler Commercial' : reportData?.proposal_detail?.is_commercial == '1'&&reportData?.proposal_detail?.v_product_type_id == 2?'Two Wheeler Commercial': reportData?.proposal_detail?.product_type_name}`}</td>
                  <td><strong>Make:</strong></td>
                  <td>{isEditing ? 
                   <Dropdown
        value={editableData.v_make_id}
        isDisabled={editableData.v_product_type_id?false:true}

        onChange={(event) => handleDropdownChange(event, 'v_make_id')}
        options={makeDropdown?.map((make) => ({
          value: make.make_id,
          label: make.make_cleaned
        }))}
        tippyContent={'select Model'}

        placeholder="Select a make"
      /> : reportData?.proposal_detail?.make_name}</td>
                </tr>
                <tr>
                <td><strong>Model:</strong></td>
                  <td>{isEditing ?      
                       <Dropdown
                       value={editableData.v_model_id??null}
                       
                       onChange={(event) => handleDropdownChange(event, 'v_model_id')}
                       options={modelDropdown?.map((v_model) => ({
                         value: v_model.model_id,
                         label: v_model.model_name
                       }))}
                       isDisabled={editableData.v_make_id?false:true}
                       placeholder="Select a model"
                       valueid='model_id'
                     /> : reportData?.proposal_detail?.model_name}</td>
                 
                  <td><strong>Variant:</strong></td>
                  <td>{isEditing ?
                    <Dropdown
                    value={editableData.v_variant_id}
                    onChange={(event) => handleDropdownChange(event, 'v_variant_id')}
                    options={VariantDropdown?.map((v_variant) => ({
                      value: v_variant.variant_id,
                      label: v_variant.variant_name
                    }))}
                    isDisabled={editableData.v_model_id?false:true}
                    placeholder="Select a Variant"
                  />
                  : reportData?.proposal_detail?.variant_name}</td>
                 
                </tr>
                <tr>
                  
                  <td><strong>CC:</strong></td>
                  <td>{isEditing ? <input type="text" className='edit_details_Form'  name="v_cc" value={editableData.v_cc} onChange={handleChange} /> : reportData?.proposal_detail?.v_cc}</td>
                  <td><strong>Manufacture Year:</strong></td>
                  <td>{isEditing ? <input type="text" className='edit_details_Form'  name="v_manufacture_year" value={editableData.v_manufacture_year} onChange={handleChange} /> : reportData?.proposal_detail?.v_manufacture_year}</td>
                </tr>
                <tr>
                  <td><strong>Fuel Type:</strong></td>
                  <td>{isEditing ? <input type="text" className='edit_details_Form'  name="fuel_type_name" value={editableData.fuel_type_name} onChange={handleChange} /> : reportData?.proposal_detail?.fuel_type_name}</td>
                  <td><strong>Color:</strong></td>
                  <td>{isEditing ? <input type="text" className='edit_details_Form'  name="v_color" value={editableData.v_color} onChange={handleChange} /> : reportData?.proposal_detail?.v_color}</td>
                </tr>
                <tr>
                  <td><strong>Odometer Reading:</strong></td>
                  <td>{isEditing ? <input type="text" className='edit_details_Form'  name="v_odometer_reading" value={editableData.v_odometer_reading} onChange={handleChange} /> : reportData?.proposal_detail?.v_odometer_reading}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="report-section">
            <h2>Customer Info</h2>
            <table className="data-table">
              <tbody>
                <tr>
                  <td><strong>Insured Name:</strong></td>
                  <td>{isEditing ? <input type="text" name="insured_name" className='edit_details_Form' value={editableData.insured_name} onChange={handleChange} /> : reportData?.proposal_detail?.insured_name}</td>
                  <td><strong>Mobile No:</strong></td>
                  <td>{isEditing ? <input type="text" name="mobile_no" className='edit_details_Form'  value={editableData.mobile_no} onChange={handleChange} /> : reportData?.proposal_detail?.mobile_no}</td>
                </tr>
                <tr>
                  <td><strong>Email ID:</strong></td>
                  <td>{isEditing ? <input type="text" name="email" className='edit_details_Form'  value={editableData.email} onChange={handleChange} /> : reportData?.proposal_detail?.email}</td>
                  <td><strong>Additional Email ID:</strong></td>
                  <td>{isEditing ? <input type="text" name="al_email" className='edit_details_Form'  value={editableData.al_email} onChange={handleChange} /> : reportData?.proposal_detail?.al_email}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{isEditing ? <input type="text" name="insured_address" className='edit_details_Form'  value={editableData.insured_address} onChange={handleChange} /> : reportData?.proposal_detail?.insured_address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      <button onClick={handleUpdateDetails}>
        {isEditing ? 'Save Details' : 'Edit Details'}
      </button>
    </div>



  {/* ********************** Inspection Details  Div************** */}

      <div id="inspection-details" className="report-section">
        <h2>Inspection Details</h2>
        <div className="report-section">
  <h2>Inspection Checkpoint Survey</h2>
  <ToggleSwitch onChange={(text)=> handleShowCheckpoint(text.target.checked)}  isChecked={isShowQuestionChecked} option1={'YES'} option2={'NO'} label='Show Checkpoint to user'/>

  <div style={{backgroundColor:'#DCDCDC',overflow:'scroll',marginTop:'10px',marginBottom:'20px'}}>

  <div style={{ width: '900px', height: '378px', margin: '0 auto', position: 'relative' }}>
   {reportData?.proposal_detail?.v_product_type_id==2 &&<> {reportData?.qsn_ans?.color ? <BikeInspectionView report={reportData}/>:null}</>
}
  {reportData?.proposal_detail?.v_product_type_id==1&&  <>  {updatedImageStyles.map((style, index) => (
        style.srcs ? (
          <div key={index} style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }}>
            {style.srcs.map((innerStyle, innerIndex) => (
              <img key={innerIndex} src={innerStyle.src}  alt='sample' style={{ position: 'absolute', top: innerStyle.top, left: innerStyle.left, bottom: innerStyle.bottom }} />
            ))}
          </div>
        ) : (
          <img key={index} src={style.src} alt='sample' style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }} />
        )
      ))}</>}
  {reportData?.proposal_detail?.v_product_type_id==4&&  <>  {updatedImageStyles.map((style, index) => (
        style.srcs ? (
          <div key={index} style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }}>
            {style.srcs.map((innerStyle, innerIndex) => (
              <img key={innerIndex} src={innerStyle.src}  alt='sample' style={{ position: 'absolute', top: innerStyle.top, left: innerStyle.left, bottom: innerStyle.bottom }} />
            ))}
          </div>
        ) : (
          <img key={index} src={style.src} alt='sample' style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }} />
        )
      ))}</>}

    </div>
    </div>
   {inspection[0]?.answere&&   <div onClick={()=>setEditCheckpoint(!editCheckpoint)}  style={{cursor:'pointer',display:'flex',justifyContent:'flex-end',alignItems:'center',gap:'5px'}}>
    <p style={{color:'#2D3043',fontWeight:'bold',fontSize:'22px'}}> Edit Checkpoint</p>
      <img src={EditCheckpoint}  style={{width:'25px',height:'24px',cursor:'pointer'}} />
</div>}
 {editCheckpoint ? 
 <table className="inspection-data-table">
    <thead>
      <tr>
        <th>Question</th>
        <th>Label</th>
        <th>Question</th>
        <th>Label</th>
      </tr>
    </thead>
    <tbody>
      {inspection?.map((item, index) => (
            index % 2 === 0 && (
              <tr key={index}>
                <td><strong>{item.question}:</strong></td>
                { item?.answere ? (
                  <td>{item?.answere}</td>
                ) : (
                  <td>
                     <Dropdown
        
        value={selectedAnswers[item.breakin_inspection_post_question_id]??1}
error={errorMessages[item.breakin_inspection_post_question_id]}
onChange={(e) => handleRadioChange(inspection[index]?.breakin_inspection_post_question_id, e.target.value)}
options={ Object.keys(item?.answers_obj).map((key) => ({
  value: key,
  label: item?.answers_obj[key]
}))}

        placeholder="Select Status "
      />
                   
                  </td>
                )}


                {inspection[index + 1] && (
                  <React.Fragment>
                    
                    <td><strong>{inspection[index + 1].question}:</strong></td>
                    {inspection[index + 1]?.answere ? (
                      <td>{inspection[index + 1]?.answere}</td>
                    ) : (
                      <td>
                        
                        <Dropdown
        
        value={selectedAnswers[inspection[index+1].breakin_inspection_post_question_id]??1}
error={errorMessages[inspection[index+1].breakin_inspection_post_question_id]}
onChange={(e) => handleRadioChange(inspection[index+1]?.breakin_inspection_post_question_id, e.target.value)}
options={ Object.keys(inspection[index+1]?.answers_obj).map((key) => ({
  value: key,
  label: inspection[index+1]?.answers_obj[key]
}))}

        placeholder="Select Status "
      />
                      
                      </td>
                    )}
                  </React.Fragment>
                )}
              </tr>
            )
          ))}
{!inspection[0]?.answere&&                <button onClick={handleInspectionSubmit}>Submit</button>
}
    </tbody>
  </table> :
   <table className="inspection-data-table">
    <thead>
      <tr>
        <th>Question</th>
        <th>Label</th>
        <th>Question</th>
        <th>Label</th>
      </tr>
    </thead>
    <tbody>
      {inspectionDropDown?.map((item, index) => (
            index % 2 === 0 && (
              <tr key={index}>
                <td><strong>{item.question}:</strong></td>
                  <td>
                     <Dropdown
        
        value={selectedAnswers[item.breakin_inspection_post_question_id]??inspection[index]?.answere}
error={errorMessages[item.breakin_inspection_post_question_id]}
onChange={(e) => handleRadioChange(item?.breakin_inspection_post_question_id, e.target.value)}
options={ Object.keys(inspectionDropDown[index]?.answers_obj).map((key) => ({
  value: key,
  label: inspectionDropDown[index]?.answers_obj[key]
}))}

        placeholder="Select Status "
      />
                   
                  </td>
                

                {inspection[index + 1] && (
                  <React.Fragment>
                    <td><strong>{inspection[index + 1].question}:</strong></td>
                    
                      <td>
                        
                        <Dropdown
        
        value={selectedAnswers[item.breakin_inspection_post_question_id+1]??inspection[index+1]?.answere}
error={errorMessages[item.breakin_inspection_post_question_id+1]}
onChange={(e) => handleRadioChange(item?.breakin_inspection_post_question_id+1, e.target.value)}
options={ Object.keys(inspectionDropDown[index+1]?.answers_obj).map((key) => ({
  value: key,
  label: inspectionDropDown[index+1]?.answers_obj[key]
}))}

        placeholder="Select Status "
      />
                      
                      </td>
                    
                  </React.Fragment>
                )}
              </tr>
            )
          ))}
{!inspection[0]?.answere&&                <button onClick={handleInspectionSubmit}>Submit</button>
}
    </tbody>
  </table>}
{!editCheckpoint &&  <button onClick={handleEditInspectionSubmit}>Submit</button>
}<div className='page-break'>
  <h2 >Inspection Image Reports</h2>
 { <div className="inspection-data-container">
    {InspectedImages.map((item, index) => (
      (
        <>
       {item.Inspection_Image!=='no_image.jpg' &&
        <div key={index} className="inspection-data-row">
          <div className="inspection-item">
          {item.Inspection_Image!=='no_image.jpg' ? (
                <>
              <img src={item.Inspection_Image} alt={item.name} className="inspection-image" />
            </>
            ):<h4 className='inspection-name'>Image not uploaded</h4>}
            <div className="inspection-name">{item.name}</div>
          {item.Inspection_Image &&  <div className="button-container">
              <button onClick={()=>openModal(item.Inspection_Image)} className="preview-button" >Preview</button>

            </div>}
          </div>
          {/* {data[index + 1] && (
            <div key={index + 1} className="inspection-item">
              {data[index + 1].sample_image_url && (
                <img src={data[index + 1].sample_image_url} alt={data[index + 1].name} className="inspection-image" />
                
              )}
              <div className="inspection-name">{data[index + 1].name}</div>
            </div>
          )} */}
        </div>}
      </>)
    ))}
    
  </div>}
  <h2 >Inspection Video</h2>

  <div style={{display:'flex',justifyContent:'center'}}>

 {reportData?.breakin_details?.video ? 
 <video style={{ width: '70%', height: '500px',padding:'10px' ,   boxShadow:'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;'/* Add shadow for depth */
}} controls>
          <source src={`${reportData?.breakin_details?.video}`} type="video/webm" />
        </video>:<h2>No Video has been Uploaded</h2>}

        

        </div>
  
  </div>
  <div className="button-container">
              <button onClick={downloadImagesAsZip} className="download-button" >Download All</button>
            </div>


  

</div>




      </div>



  {/* ********************** Update Status Div************** */}


  
      {reportData&& <>  <div  id="update-status" className="report-section">
        <h2>Update Status</h2>

 {reportData?.proposal_detail?.breakin_status_name!=='Pending' ?      <>
{error&& <p style={{color:'red'}}>{error }</p>}
        <Dropdown
        
          value={status}

          onChange={handleChangeStatus}
          options={updatestatuslist.map((product) => ({
            value: product?.id,
            label: product?.label
          }))}

          placeholder="Select Status "
        />

        <textarea value={adminComment}  onChange={handleChangeText} style={{width:'100%',height:'150px'}} placeholder="Enter text"></textarea>
        <div className="button-container">
              <button onClick={handleSubmit} className="download-button" >Update Status </button>
              {/* <PDFDownloadLink document={<InspectionReportPdf  />} fileName="document.pdf">
        {({ loading }) => (loading ? 'Generating document...' : 'Download PDF')}
      </PDFDownloadLink> */}
            </div>
            </>:<h4>Inspection Not Submitted</h4>}
      </div>
      

    </>
      }

{reportData&& <>  <div  id="declaration" className="report-section">
<h2>Declaration</h2>
{reportData?.proposal_detail?.breakin_status_name&&        <p><strong>Status:</strong>{reportData?.proposal_detail?.breakin_status_name}</p>}
    { reportData?.admin_comment?.comment&&   <p><strong>Remarks:</strong>{reportData?.admin_comment?.comment}</p>}
        <h4>Agent Declaration</h4>

        <div style={{display:'flex',alignItems:'flex-start'}}>
        <input
          type="checkbox"
          id="declarationCheckbox"
          checked={isDecalarationChecked}
          onChange={handleDeclarationCheckbox}
        />
        <p htmlFor="declarationCheckbox">
          I/We hereby declare, conform and agree that:- ‡ The Motor vehicle proposed for insurance after a break in cover has not met with any accident giving rise to any claim by a Third Party for injury or death caused to any person or damages to any property.
          I have presented the same vehicle for pre-insurance inspection, which I have proposed for insurance. Identification details noted/photographs taken by the inspecting officials are correct.
          If later on, at anytime it is found that inspected vehicle and damaged/accidental vehicles are different then neither any claim nor any indemnity in respect of either own damage or third party death or injury or property damage loss nor any benefit shall be available to me/us..
          Vehicle has been visually inspected in my/ our presence. No damage or no fact which is material to acceptance of this proposal has been hidden/ undisclosed/ withheld by me/us. Damages of vehicle as noted/photographs taken by the inspecting officials are correct.
          I/We also agree that damages mentioned as per inspection photographs/video shall be excluded in the event of any claim being lodged during the policy period.
        </p>
      </div> 

     <h4>PROPOSER SIGNTURE AND DECLARATION - </h4>
     <p> I HEREBY AGREE THAT DAMAGES NOTICES DURING THIS INSPECTION SHALL BE EXCLUDED IN THE EVENT OF ANY CLAIM BEING LADGE </p>

     <img src={reportData?.proposal_detail?.customer_signature} style={{width:'150px',height:'150px'}}alt="Signature" />
     <div style={{display:'flex',justifyContent:'flex-end'}}>

     <button className="print-button" onClick={handlePrint}>Print</button>
     </div>
</div>

    </>
      }



  {/* **********************Full Inspection Report PDF Div************** */}

   {reportData &&   <div id="full-report" style={{display:'none'}} className="report-section ">
    <h2>Full Inspection Report</h2>
  
<div className="report-container">
      <img src={HeaderLogo} className="header-logo" alt="Header Logo" />
      {/* <h1 className="report-title">Inspection Report</h1> */}

      <div  className="report-section">
      {reportData&& <>  <div className="report-section">
        <h2 className='remove-header'>Proposal Info</h2>
        <table className="data-table">
          <tbody>
            <tr>
             
              <td><strong>Proposal No:</strong></td>
              <td>{reportData?.proposal_detail?.proposal_no}</td>
              <td><strong>breakin case Id:</strong></td>
              <td>{reportData.breaking_case_id}</td>
            </tr>
            <tr>
              <td><strong>Inspection Start Date/Time:</strong></td>
              <td>{reportData?.proposal_detail?.inspection_date_time}</td>
              <td><strong>Registration No</strong></td>
              <td>{reportData?.proposal_detail?.v_registration_no}</td>
              
            </tr>
            <tr>
              <td><strong>Chassis No:</strong></td>
              <td>{reportData?.proposal_detail?.v_chassis_no}</td>
              <td><strong>Engine no:</strong></td>
              <td>{reportData?.proposal_detail?.v_engine_no}</td>
            </tr>
            <tr>
              <td><strong>Model:</strong></td>
              <td>{reportData?.proposal_detail?.model_name}</td>
              <td><strong>Make:</strong></td>
              <td>{reportData?.proposal_detail?.make_name}</td>
            </tr> <tr>
              <td><strong>Variant:</strong></td>
              <td>{reportData?.proposal_detail?.variant_name}</td>
              <td><strong>CC:</strong></td>
              <td>{reportData?.proposal_detail?.v_cc}</td>
            </tr>
          
            <tr>
              <td><strong> Product Type:</strong></td>
              <td>{`${reportData?.proposal_detail?.is_commercial == '1'&&reportData?.proposal_detail?.v_product_type_id == 1  ? 'Four Wheeler Commercial' : reportData?.proposal_detail?.is_commercial == '1'&&reportData?.proposal_detail?.v_product_type_id == 2?'Two Wheeler Commercial': reportData?.proposal_detail?.product_type_name}`}</td>
              <td><strong>Manufacture year:</strong></td>
              <td>{reportData?.proposal_detail?.v_manufacture_year}</td>
            </tr>
            <tr>
              <td><strong> Fuel Type:</strong></td>
              <td>{reportData?.proposal_detail?.fuel_type_name}</td>
              <td><strong>Color:</strong></td>
              <td>{reportData?.proposal_detail?.v_color}</td>
            </tr>
          <tr>
          <td><strong>Odometer Reading:</strong></td>
          <td>{reportData?.proposal_detail?.v_odometer_reading}</td>
            <td><strong>Vehicle Nil Dip:</strong></td>
              <td>{reportData?.proposal_detail?.v_nill_depreciation}</td>
          </tr>
            <tr>
              <td><strong>Insured Name:</strong></td>
              <td>{reportData?.proposal_detail?.insured_name}</td>
              <td><strong>Mobile No:</strong></td>
              <td>{reportData?.proposal_detail?.mobile_no}</td>
              
              
            </tr>
            <tr>
              <td><strong>Email ID:</strong></td>
              <td>{reportData?.proposal_detail?.email}</td>
              <td><strong>Additional Email ID:</strong></td>
              <td>{reportData?.proposal_detail?.al_email}</td>
             
            </tr>
            <tr>
            {/* <td><strong>Nominee:</strong></td>
              <td>{reportData?.proposal_detail?.nominee_name}</td> */}
              <td><strong>Insured Address:</strong></td>
              <td>{reportData?.proposal_detail?.insured_address}</td>
            </tr>
         
          </tbody>
        </table>
      </div>

  
     </>
      }

      </div>



   
        <div id="inspection-details" className="report-section " >
        <div className="report-section ">
  <h2 className='remove-header'>Inspection Checkpoint Survey</h2>
  <div style={{backgroundColor:'#DCDCDC',overflow:'scroll',marginTop:'10px',marginBottom:'20px'}}>

{reportData?.proposal_detail?.v_product_type_id!=9&& <div style={{ width: '750px', height: '378px', margin:'0 auto', position: 'relative' }}>
{reportData?.proposal_detail?.v_product_type_id==2 &&<> {reportData?.qsn_ans?.color ? <BikeInspectionView report={reportData}/>:null}</>
}
  {reportData?.proposal_detail?.v_product_type_id==1&&  <>  {updatedImageStyles.map((style, index) => (
        style.srcs ? (
          <div key={index} style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }}>
            {style.srcs.map((innerStyle, innerIndex) => (
              <img key={innerIndex} src={innerStyle.src}  alt='sample' style={{ position: 'absolute', top: innerStyle.top, left: innerStyle.left, bottom: innerStyle.bottom }} />
            ))}
          </div>
        ) : (
          <img key={index} src={style.src} alt='sample' style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }} />
        )
      ))}</>}
  {reportData?.proposal_detail?.v_product_type_id==4&&  <>  {updatedImageStyles.map((style, index) => (
        style.srcs ? (
          <div key={index} style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }}>
            {style.srcs.map((innerStyle, innerIndex) => (
              <img key={innerIndex} src={innerStyle.src}  alt='sample' style={{ position: 'absolute', top: innerStyle.top, left: innerStyle.left, bottom: innerStyle.bottom }} />
            ))}
          </div>
        ) : (
          <img key={index} src={style.src} alt='sample' style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }} />
        )
      ))}</>}

  </div>}
  </div>
  <table className={`inspection-data-table ${reportData?.proposal_detail?.v_product_type_id==9 ?'': 'page-break'}`}>
    <thead>
      <tr>
        <th>Question</th>
        <th>Label</th>
        <th>Question</th>
        <th>Label</th>
      </tr>
    </thead>
    <tbody>
      {inspection?.map((item, index) => (
            index % 2 === 0 && (
              <tr key={index}>
                <td><strong>{item.question}:</strong></td>
                  <td>{item?.answere}</td>


                {inspection[index + 1] && (
                  <React.Fragment>
                    <td><strong>{inspection[index + 1].question}:</strong></td>
                      <td>{inspection[index + 1]?.answere}</td>
                  
                  </React.Fragment>
                )}
              </tr>
            )
          ))}

    </tbody>
  </table> 
  <h2 className='remove-header'>Inspection Image Reports</h2>
  <div className="inspection-data-container">
      {InspectedImages.map((item, index) => {
        if (index % 2 === 0) {
          return (
            <>  
           { item.Inspection_Image!=='no_image.jpg' &&

            
            <div key={index} className="inspection-data-row">
              <div className="inspection-item">
                {item.Inspection_Image !== 'no_image.jpg' ? (
                  <img src={item.Inspection_Image} alt={item.name} className="inspection-image" />
                ) : (
                  <h4 className="inspection-name">Image not uploaded</h4>
                )}
                <div className="inspection-name">{item.name}</div>
              </div>
              {InspectedImages[index + 1] && (
                <div key={index + 1} className="inspection-item">
                  {InspectedImages[index + 1].Inspection_Image !== 'no_image.jpg' ? (
                    <img src={InspectedImages[index + 1].Inspection_Image} alt={InspectedImages[index + 1].name} className="inspection-image" />
                  ) : (
                    <h4 className="inspection-name">Image not uploaded</h4>
                  )}
                  <div className="inspection-name">{InspectedImages[index + 1].name}</div>
                </div>
              )}
            </div>}
            </>
          );
        }
        return null;
      })}
    </div>
</div>
      </div>
       <div  id="update-status" className="report-section page-break">

        
        <h2>Declaration</h2>
        <p><strong>Status:</strong>{reportData?.proposal_detail?.breakin_status_name}</p>
        <p><strong>Remarks:</strong>{reportData?.admin_comment?.comment}</p>
        <h4>Agent Declaration</h4>
       

        <div style={{display:'flex',alignItems:'flex-start'}}>
        <input
          type="checkbox"
          id="declarationCheckbox"
          checked={true}
          onChange={handleDeclarationCheckbox}
        />
        <p htmlFor="declarationCheckbox">
          I/We hereby declare, conform and agree that:- ‡ The Motor vehicle proposed for insurance after a break in cover has not met with any accident giving rise to any claim by a Third Party for injury or death caused to any person or damages to any property.
          I have presented the same vehicle for pre-insurance inspection, which I have proposed for insurance. Identification details noted/photographs taken by the inspecting officials are correct.
          If later on, at anytime it is found that inspected vehicle and damaged/accidental vehicles are different then neither any claim nor any indemnity in respect of either own damage or third party death or injury or property damage loss nor any benefit shall be available to me/us..
          Vehicle has been visually inspected in my/ our presence. No damage or no fact which is material to acceptance of this proposal has been hidden/ undisclosed/ withheld by me/us. Damages of vehicle as noted/photographs taken by the inspecting officials are correct.
          I/We also agree that damages mentioned as per inspection photographs/video shall be excluded in the event of any claim being lodged during the policy period.
        </p>
      </div> 

     <h4>PROPOSER SIGNTURE AND DECLARATION - </h4>
     <p> I HEREBY AGREE THAT DAMAGES NOTICES DURING THIS INSPECTION SHALL BE EXCLUDED IN THE EVENT OF ANY CLAIM BEING LADGE </p>

     <img src={reportData?.proposal_detail?.customer_signature} style={{width:'150px',height:'150px'}}alt="Signature" />


</div>

  
    
    </div>
    </div>}

    </div>
  );
};

export default ViewReportPage;
