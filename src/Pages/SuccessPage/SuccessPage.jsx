// SuccessPage.js

import React from 'react';
import QRCode from 'qrcode.react';
import './SuccessPage.css';
import { Success } from '../../Constant/ImageConstant';
import { useLocation, useNavigate } from 'react-router-dom';
import { encrypt } from '../../Util/encryption';

const SuccessPage = ({ proposalInfo }) => {
  // Proposal information
  const data = useLocation()
  const Navigate=useNavigate()
  const proposalNo=data?.state
  console.log(proposalNo?.id)
  // const { proposalNumber, insuredName, registrationNumber } = proposalInfo;

  return (
    <div className="successContainer">
      {/* Proposal information */}
      <img src={Success} style={{height:'225px',width:'225px'}}/>
      <h2>Success!</h2>

      <div className="proposal-info">
        <span><strong>Proposal Number</strong> :{proposalNo.proposal_no}</span>
        <span><strong>Insured Name</strong> : {proposalNo?.insured_name}</span>
        <span><strong>Vehicle No</strong> : {proposalNo?.v_registration_no}</span>
      </div>

      {/* Message about triggered email */}
      <p className="email-message">Complete Breakin Inspection by the Following ways </p>


      {/* Links to Open Link URL and Playstore */}
      <div className="links">
        <div className="link-container">
          <a href={`https://demoezclick-pwa.netlify.app/proposal-info/${encrypt(String(proposalNo.id))}`}>Open Link URL</a>
        </div>
        {/* <div className="link-container">
          <a href="https://drive.google.com/drive/folders/1Zhb7bEPnyoPXCjvypn2hRb5vASZNlCr5?usp=drive_link">Playstore</a>
        </div> */}
      </div>

      {/* QR Code for Open Link URL and Playstore */}
      <div className="qr-codes">
        <div className="qr-code-container">
          <QRCode value={`https://demoezclick-pwa.netlify.app/proposal-info/${encrypt(String(proposalNo.id))}`} />
        </div>
        {/* <div className="qr-code-container">
          <QRCode value="https://drive.google.com/drive/folders/1Zhb7bEPnyoPXCjvypn2hRb5vASZNlCr5?usp=drive_link" />
        </div> */}
      </div>
      <p className="email-message">{`An SMS/Email has been triggered to ${proposalNo?.mobile_no}/${proposalNo?.email}`}</p>

      {/* Button for completing the process */}
      <button onClick={()=>{Navigate('/proposalList')}} className="break-in-button">Done</button>
    </div>
  );
};

export default SuccessPage;
