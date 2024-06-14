// ViewReportPage.js
import JSZip from 'jszip';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFullReport } from '../../Api/getProposalDetails';
import { ReferBackModal } from '../../Component/ReferBackModal';
import Dropdown from '../../Component/UI/Dropdown';
import { HeaderLogo,Logo } from '../../Constant/ImageConstant';
import { fetchDataLocalStorage, storeDataLocalStorage } from '../../Util/LocalStorage';
import './ViewReport.css'; // Importing CSS file for additional styles
import { saveAs } from 'file-saver'
import { gridColumnGroupsLookupSelector } from '@mui/x-data-grid';
import { UpdateAdminStatus } from '../../Api/SubmitForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PDFDownloadLink } from '@react-pdf/renderer';
import InspectionReportPdf from '../../Component/InspectionReportPdf';

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

const inspection=   [
    {
        "breakin_inspection_post_question_id": 1,
        "question": "Grill",
        "is_image": 1,
        "order_id": 1,
        "label": "grill",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 2,
        "question": "Head Lamp(RT)",
        "is_image": 1,
        "order_id": 2,
        "label": "head_lamprt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 3,
        "question": "Side Turn Light(LT)",
        "is_image": 1,
        "order_id": 4,
        "label": "side_turn_lightlt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 4,
        "question": "Indicator Light(LT)",
        "is_image": 1,
        "order_id": 6,
        "label": "indicator_lightlt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 5,
        "question": "Fog Lamp(LT)",
        "is_image": 0,
        "order_id": 8,
        "label": "fog_lamplt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 6,
        "question": "Front Panel",
        "is_image": 0,
        "order_id": 10,
        "label": "front_panel",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 7,
        "question": "Bonnet",
        "is_image": 0,
        "order_id": 11,
        "label": "bonnet",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 8,
        "question": "Left Apron",
        "is_image": 0,
        "order_id": 12,
        "label": "left_apron",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 9,
        "question": "Right Apron",
        "is_image": 0,
        "order_id": 13,
        "label": "right_apron",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 10,
        "question": "Left Front Fender",
        "is_image": 0,
        "order_id": 14,
        "label": "left_front_fender",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 11,
        "question": "Left Front Door",
        "is_image": 0,
        "order_id": 15,
        "label": "left_front_door",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 12,
        "question": "Left Rear Door",
        "is_image": 0,
        "order_id": 16,
        "label": "left_rear_door",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 13,
        "question": "Left Pillar Front(A)",
        "is_image": 0,
        "order_id": 17,
        "label": "left_pillar_fronta",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 14,
        "question": "Left Pillar Center(B)",
        "is_image": 0,
        "order_id": 18,
        "label": "left_pillar_centerb",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 15,
        "question": "Left Pillar Rear(C)",
        "is_image": 0,
        "order_id": 19,
        "label": "left_pillar_rearc",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 16,
        "question": "Left Running Board",
        "is_image": 0,
        "order_id": 20,
        "label": "left_running_board",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 17,
        "question": "Left Qtr Panel",
        "is_image": 0,
        "order_id": 21,
        "label": "left_qtr_panel",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 18,
        "question": "boot",
        "is_image": 0,
        "order_id": 22,
        "label": "boot",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 19,
        "question": "Rear Bumper",
        "is_image": 0,
        "order_id": 23,
        "label": "rear_bumper",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 20,
        "question": "Tail lamp(LT)",
        "is_image": 0,
        "order_id": 24,
        "label": "tail_lamplt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 21,
        "question": "Right Front Render",
        "is_image": 0,
        "order_id": 26,
        "label": "right_front_render",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 22,
        "question": "Right Front Door",
        "is_image": 0,
        "order_id": 27,
        "label": "right_front_door",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 23,
        "question": "Right Rear Door",
        "is_image": 0,
        "order_id": 28,
        "label": "right_rear_door",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 24,
        "question": "Right pillar Front(A)",
        "is_image": 0,
        "order_id": 29,
        "label": "right_pillar_fronta",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 25,
        "question": "Right Pillar Center(B)",
        "is_image": 0,
        "order_id": 30,
        "label": "right_pillar_centerb",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 26,
        "question": "Right Pillar Rear(C)",
        "is_image": 0,
        "order_id": 31,
        "label": "right_pillar_rearc",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 27,
        "question": "Right Running Board",
        "is_image": 0,
        "order_id": 32,
        "label": "right_running_board",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 28,
        "question": "Right Qtr Panel",
        "is_image": 0,
        "order_id": 33,
        "label": "right_qtr_panel",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 29,
        "question": "Floor/Silencer",
        "is_image": 0,
        "order_id": 34,
        "label": "floor_silencer",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 30,
        "question": "Rr View Mirror(LT)",
        "is_image": 0,
        "order_id": 35,
        "label": "rr_view_mirrorlt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 31,
        "question": "Tyres/Rim",
        "is_image": 0,
        "order_id": 37,
        "label": "tyres_rim",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 32,
        "question": "Head Lamp(RT)",
        "is_image": 0,
        "order_id": 3,
        "label": "head_lamprt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 33,
        "question": "Side Turn Light(RT)",
        "is_image": 0,
        "order_id": 5,
        "label": "side_turn_lightrt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 34,
        "question": "Indicator Light(RT)",
        "is_image": 0,
        "order_id": 7,
        "label": "indicator_lightrt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 35,
        "question": "Fog Lamp(RT)",
        "is_image": 0,
        "order_id": 9,
        "label": "fog_lamprt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 36,
        "question": "Tail lamp(RT)",
        "is_image": 0,
        "order_id": 25,
        "label": "tail_lamprt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 37,
        "question": "Rr View Mirror(RT)",
        "is_image": 0,
        "order_id": 36,
        "label": "rr_view_mirrorrt",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    },
    {
        "breakin_inspection_post_question_id": 38,
        "question": "Airbag",
        "is_image": 0,
        "order_id": 38,
        "label": "airbag",
        "answers_obj": {
            "0": 1,
            "1": 2,
            "2": 3,
            "3": 4,
            "4": 5,
            "5": 6,
            "6": 7
        }
    }
]


const imageInspection =  [
    {
        "id": 1,
        "name": "Odometer with Engine on Position",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/ODOMETER.jpeg"
    },
    {
        "id": 2,
        "name": "Windscreen Inside to Outside",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Windscreen-Inside-to-Outside.jpg"
    },
    {
        "id": 3,
        "name": "Windscreen Outside to Inside",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Windscreen-Outside-to-Inside.jpg"
    },
    {
        "id": 4,
        "name": "Front Image",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Front.jpg"
    },
    {
        "id": 5,
        "name": "Left Image",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Left.jpeg"
    },
    {
        "id": 6,
        "name": "Rear Image",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Rare.jpg"
    },
    {
        "id": 7,
        "name": "Dicky Open",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Dicky.jpeg"
    },
    {
        "id": 8,
        "name": "Right Image",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Right.jpg"
    },
    {
        "id": 9,
        "name": "Engraved Chassis",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Engraved-Chassis.jpg"
    },
    {
        "id": 10,
        "name": "Open Engine Compartment",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Engine-Compartment.jpg"
    },
    {
        "id": 11,
        "name": "Under Carriage Image",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Undercarriage.jpg"
    },
    {
        "id": 12,
        "name": "PUC Copy",
        "is_mand": 1,
        "sample_image_url": null
    },
    {
        "id": 13,
        "name": "Dashboard Copy",
        "is_mand": 1,
        "sample_image_url": null
    },
    {
        "id": 14,
        "name": "RC Copy",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/RC-Copy.png"
    },
    {
        "id": 15,
        "name": "Pervious Insurance Copy",
        "is_mand": 1,
        "sample_image_url": "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/certificate-of-insurance-template.png"
    },
    {
        "id": 16,
        "name": "Selfie with car",
        "is_mand": 1,
        "sample_image_url": null
    },
    {
        "id": 17,
        "name": "Additional Image1",
        "is_mand": 1,
        "sample_image_url": null
    },
    {
        "id": 18,
        "name": "Additional Image2",
        "is_mand": 1,
        "sample_image_url": null
    },
    {
        "id": 19,
        "name": "Additional Image3",
        "is_mand": 1,
        "sample_image_url": null
    },
    {
        "id": 20,
        "name": "Front Left Image",
        "is_mand": 1,
        "sample_image_url": null
    },
    {
        "id": 21,
        "name": "Front Right Image",
        "is_mand": 1,
        "sample_image_url": null
    },
    {
        "id": 22,
        "name": "Rear Left Image",
        "is_mand": 1,
        "sample_image_url": null
    },
    {
        "id": 23,
        "name": "Rear Right Image",
        "is_mand": 1,
        "sample_image_url": null
    }
]

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
const [reportData,setReportData]=useState()
    




const  downloadImagesAsZip = () => {
      const imageUrl = 'https://demo.ezclicktech.com/Ezclick/public/uploads/break-in-case/1/5281716276335.jpeg';
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          saveAs(blob, 'image.jpeg');
        })
        .catch(error => {
          console.error('Error downloading image:', error);
        });
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
console.log(valuesArray)


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

  if(status===3&&selectedReferbackOption.length===0)
  {
  setIsReferBackModelOpen(true);
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

}

const handleChangeText = (event) => {
    setadminComment(event.target.value);
  setError('');
};

const handleChangeStatus = (event) => {
  console.log(event.target.value)
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






const handlePrint = () => {
if(!isDecalarationChecked){

  alert('Please Accept terms and Condition')

}
 else{ const printContents = document.querySelector('.report-container').innerHTML;
  const printWindow = window.open('Inspection Report', 'Inspection Report', 'height=800,width=800');

  printWindow.document.write('<html><head><title>Ezclick Vehicle Inspection Report</title>');
  const footerLogo=Logo

  // Inline CSS styles or link to external stylesheet
  printWindow.document.write('<style>');
  printWindow.document.write(`
    body { font-family: Arial, sans-serif;  padding-bottom: 280px;
    }
   .header-logo { width: 100%; }
   .report-title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
   .report-section { margin-bottom: 20px; }
   .data-table { width: 100%; border-collapse: collapse; }
   .page-break{ page-break-before: always; }
   .inspection-item { width: 300px; padding: 10px; margin: 10px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
   .inspection-data-container { display: flex; flex-wrap: wrap; }
   .data-table th,.data-table td { border: 1px solid #000; padding: 8px; }
   .inspection-data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
   .inspection-data-table th,.inspection-data-table td { border: 1px solid #000; padding: 8px; }
   .inspection-image { width: 100%; height:400px }
   .button-container { text-align: center; margin-top: 20px; }
   .download-button,.preview-button,.print-button { padding: 10px 20px; font-size: 16px; display: none; }
   .footer {
      position: fixed;
      bottom: -10px;
      left: 0;  
      width: 100%;
      background-color: #f0f0f0;
      padding: 10px;
      text-align:center:
      border-top: 1px solid #ccc;
    }
  `);
  printWindow.document.write('</style>');

  // Optionally link to external stylesheet
  printWindow.document.write('<link rel="stylesheet" type="text/css" href="./ViewReport.css">');

  printWindow.document.write('</head><body>');

  // Write printContents to the print window
  printWindow.document.write(printContents);

  // Add footer
  printWindow.document.write('<div class="footer">');
  printWindow.document.write(`
  <div style="width: 100%; position: fixed; bottom: 0; left: 0; padding: 0px; background-color: #f0f0f0; border-top: 1px solid #ccc; display: flex; align-items: center;">
  <img src="${footerLogo}" alt="Logo" style="width: 100px; height: 80px; margin-right: 10px;">
  <p style="margin: 0;     position: absolute;
  bottom: 45px;
  left: 500px;">Inspection Date: ${new Date().toLocaleDateString()}</p>
</div>
`);  
  printWindow.document.write('</div>');

  // Wait for all images to load before printing
  const images = printWindow.document.querySelectorAll('img');
  let imagesLoaded = 0;

  const checkAllImagesLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === images.length) {
      printWindow.document.close();
      printWindow.print();
    }
  };

  images.forEach(img => {
    if (img.complete) {
      checkAllImagesLoaded();
    } else {
      img.addEventListener('load', checkAllImagesLoaded);
    }
  });

  printWindow.document.write('</body></html>');}
};
  

  
  
  
  
  
  
function mapData(refData, namesData, codesData) {
  let mappedArray = [];
  
  refData.forEach(nameItem => {

    const codeItem = codesData[nameItem.code]; // Access property directly
    const refItem = namesData.find(item => item.name === nameItem.name);

      
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
  const localres=await fetchDataLocalStorage('claim_loginDashboard',)
  console.log('Report Res>>>>>>>>>>>>>>>>>>>',localres)
  
const data ={proposal_id:ldata?.state?.data?.id,
  user_id:localres?.data?.user_details?.id,
  break_in_case_id:ldata?.state?.data?.breakin_inspection_id}

    if(localres){

      const reportRes = await getFullReport(data)

      setLocalData(localres)

      
    setReportData(reportRes);

      const resData = mapData(referenceData,imageInspection,reportRes?.breakin_details)


      setInspectedImages(resData)


    }

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








  useEffect(()=>{

        handleReportData()

  },[])


  useEffect(()=>{},[isPreviewModalOpen,selectedImage,InspectedImages,LocalData])
  

  return (
    <div>
    {isPreviewModalOpen && <ImagePreviewModal imageUrl={selectedImage} onClose={closeModal} />}

    {isReferBackModelOpen&&<ReferBackModal  reportData={reportData} onUpdate={(referbackOption,referbackimageaarray)=>{setselectedReferbackOption(referbackOption);setSelectedImagesReferback(referbackimageaarray)}}  onClose={()=>setIsReferBackModelOpen(false)}/>}


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
        <h2>Proposal Details</h2>
      {reportData&& <>  <div className="report-section">
        <h2>Proposal Info</h2>
        <table className="data-table">
          <tbody>
            <tr>
             
              <td><strong>Proposal No:</strong></td>
              <td>{reportData?.proposal_detail?.proposal_no}</td>
              <td><strong>breakin case Id:</strong></td>
              <td>{reportData.breaking_case_id}</td>
            </tr>
            <tr>
              <td><strong>Proposal Start Date:</strong></td>
              <td>{reportData?.proposal_detail?.proposal_start_date}</td>
              <td><strong>Proposal End Date:</strong></td>
              <td>{reportData?.proposal_detail?.proposal_end_date}</td>
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
              <td><strong>Chassis No:</strong></td>
              <td>{reportData?.proposal_detail?.v_chassis_no}</td>
              <td><strong>Engine no:</strong></td>
              <td>{reportData?.proposal_detail?.v_engine_no}</td>
            </tr>
            <tr>
              <td><strong> Product:</strong></td>
              <td>{reportData?.proposal_detail?.product_type_name}</td>
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
              <td><strong> Odometer Reading:</strong></td>
              <td>{reportData?.breakin_details?.odometer_reading}</td>
             
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
            <td><strong>Nominee:</strong></td>
              <td>{reportData?.proposal_detail?.nominee_name}</td>
              <td><strong>Address:</strong></td>
              <td>{reportData?.proposal_detail?.insured_address}</td>
            </tr>
         
          </tbody>
        </table>
      </div></>
      }

      </div>



  {/* ********************** Inspection Details  Div************** */}

      <div id="inspection-details" className="report-section">
        <h2>Inspection Details</h2>
        <div className="report-section">
  <h2>Inspection Checkpoint Survey</h2>
  <div style={{backgroundColor:'#DCDCDC',overflow:'scroll',marginTop:'10px',marginBottom:'20px'}}>

  <div style={{ width: '900px', height: '378px', margin: '0 auto', position: 'relative' }}>
      {updatedImageStyles.map((style, index) => (
        style.srcs ? (
          <div key={index} style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }}>
            {style.srcs.map((innerStyle, innerIndex) => (
              <img key={innerIndex} src={innerStyle.src}  alt='sample' style={{ position: 'absolute', top: innerStyle.top, left: innerStyle.left, bottom: innerStyle.bottom }} />
            ))}
          </div>
        ) : (
          <img key={index} src={style.src} alt='sample' style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }} />
        )
      ))}
    </div>
    </div>
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
      {inspection.map((item, index) => (
        index % 2 === 0 && (
          <tr key={index}>
            <td><strong>{item.question}:</strong></td>
            {/* <td>{item.label}</td> */}
            <td> {reportData?.qsn_ans?.question_ans[inspection[index + 1].breakin_inspection_post_question_id]??'Not Submitted'}</td>

            {inspection[index + 1] && (
              <React.Fragment>
                <td><strong>{inspection[index + 1].question}:</strong></td>
                {/* <td>{inspection[index + 1].label}</td> */}
                <td> {reportData?.qsn_ans?.question_ans[inspection[index + 1].breakin_inspection_post_question_id]??'Not Submitted'}</td>

              </React.Fragment>
            )}
          </tr>
        )
      ))}
    </tbody>
  </table>
<div className='page-break'>
  <h2 >Inspection Image Reports</h2>
  <div className="inspection-data-container">
    {InspectedImages.map((item, index) => (
      (
        <div key={index} className="inspection-data-row">
          <div className="inspection-item">
          {item.Inspection_Image!=='no_image.jpg' ? (
                <>
              <img src={item.Inspection_Image} alt={item.name} className="inspection-image" />
            </>
            ):<h4 className='inspection-name'>Image not uploaded</h4>}
            <div className="inspection-name">{item.name}</div>
          {item.Inspection_Image &&  <div className="button-container">
              {/* <button className="download-button" >Download</button> */}
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
        </div>
      )
    ))}
    
  </div>
  <h2 >Inspection Video</h2>

  <div style={{display:'flex',justifyContent:'center'}}>

 {reportData?.breakin_details?.video ? <video style={{ width: '70%', height: '500px',padding:'10px' ,   boxShadow:'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;'/* Add shadow for depth */
}} controls>
          <source src={`${reportData?.breakin_details?.video}`} type="video/webm" />
        </video>:<h2>No Video has been Uploaded</h2>}

        </div>
  
  </div>
  {/* <div className="button-container">
              <button onClick={downloadImagesAsZip} className="download-button" >Download All Images</button>
            </div> */}

  

</div>




      </div>



  {/* ********************** Update Status Div************** */}


  
      {reportData&& <>  <div  id="update-status" className="report-section">
        <h2>Update Status</h2>
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
      </div>

    </>
      }

{reportData&& <>  <div  id="declaration" className="report-section">
        <h2>Declaration</h2>

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
      <h1 className="report-title">Inspection Report</h1>

      <div  className="report-section">
      {reportData&& <>  <div className="report-section">
        <h2>Proposal Info</h2>
        <table className="data-table">
          <tbody>
            <tr>
             
              <td><strong>Proposal No:</strong></td>
              <td>{reportData?.proposal_detail?.proposal_no}</td>
              <td><strong>breakin case Id:</strong></td>
              <td>{reportData.breaking_case_id}</td>
            </tr>
            <tr>
              <td><strong>Proposal Start Date:</strong></td>
              <td>{reportData?.proposal_detail?.proposal_start_date}</td>
              <td><strong>Proposal End Date:</strong></td>
              <td>{reportData?.proposal_detail?.proposal_end_date}</td>
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
              <td><strong>Chassis No:</strong></td>
              <td>{reportData?.proposal_detail?.v_chassis_no}</td>
              <td><strong>Engine no:</strong></td>
              <td>{reportData?.proposal_detail?.v_engine_no}</td>
            </tr>
            <tr>
              <td><strong> Product:</strong></td>
              <td>{reportData?.proposal_detail?.product_type_name}</td>
              <td><strong>Manufacture year:</strong></td>
              <td>{reportData?.proposal_detail?.v_manufacture_year}</td>
            </tr>
            <tr>
              <td><strong> Fuel Type:</strong></td>
              <td>{reportData?.proposal_detail?.fuel_type_name}</td>
              <td><strong>Color:</strong></td>
              <td>{reportData?.proposal_detail?.v_color}</td>
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
            <td><strong>Nominee:</strong></td>
              <td>{reportData?.proposal_detail?.nominee_name}</td>
              <td><strong>Address:</strong></td>
              <td>{reportData?.proposal_detail?.insured_address}</td>
            </tr>
         
          </tbody>
        </table>
      </div></>
      }

      </div>



   
        <div id="inspection-details" className="report-section page-break" >
        <div className="report-section ">
  <h2>Inspection Checkpoint Survey</h2>
  <div style={{backgroundColor:'#DCDCDC',overflow:'scroll',marginTop:'10px',marginBottom:'20px'}}>

<div style={{ width: '750px', height: '378px', margin:'0 auto', position: 'relative' }}>
    {updatedImageStyles.map((style, index) => (
      style.srcs ? (
        <div key={index} style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }}>
          {style.srcs.map((innerStyle, innerIndex) => (
            <img key={innerIndex} src={innerStyle.src} style={{ position: 'absolute', top: innerStyle.top, left: innerStyle.left, bottom: innerStyle.bottom }} />
          ))}
        </div>
      ) : (
        <img key={index} src={style.src} style={{ position: 'absolute', top: style.top, left: style.left, bottom: style.bottom }} />
      )
    ))}
  </div>
  </div>
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
      
      {inspection.map((item, index) => (
        index % 2 === 0 && (
          <tr key={index}>
            <td><strong>{item.question}:</strong></td>
            {/* <td>{item.label}</td> */}
            <td> {reportData?.qsn_ans?.question_ans[inspection[index + 1].breakin_inspection_post_question_id]??'Not Submitted'}</td>

            {inspection[index + 1] && (
              <>
                <td><strong>{inspection[index + 1].question}:</strong></td>
                {/* <td>{inspection[index + 1].label}</td> */}
                <td> {reportData?.qsn_ans?.question_ans[inspection[index + 1].breakin_inspection_post_question_id]??'Not Submitted'}</td>

              </>
            )}
          </tr>
        )
      ))}
    </tbody>
  </table>
  <h2>Inspection Image Reports</h2>
  <div className="inspection-data-container">
      {InspectedImages.map((item, index) => {
        // Only render a row for the first item in each pair
        if (index % 2 === 0) {
          return (
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
            </div>
          );
        }
        return null;
      })}
    </div>
</div>
      </div>
       <div  id="update-status" className="report-section page-break">
        <h2>Declaration</h2>

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
