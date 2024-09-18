import React from 'react';
import QRCode from 'react-qr-code';
import './SuccessPage.css';
import { Success } from '../../Constant/ImageConstant';
import { useLocation, useNavigate } from 'react-router-dom';
import { encrypt } from '../../Util/encryption';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';
import { open_url } from '../../Api/Api_Endpoint';

const SuccessPage = () => {
  const data = useLocation();
  const navigate = useNavigate();
  const proposalNo = data?.state;

  const proposalLink = `${open_url}/proposal-info/${encrypt(String(proposalNo?.id))}`;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(proposalLink);
      alert('Link copied to clipboard!');
      
    } catch (error) {
      console.error('Failed to copy the text to clipboard:', error);
    }
  };

  const mailtoLink = `mailto:?subject=Complete Breakin Inspection&body=Complete Breakin Inspection by the following ways: ${proposalLink}`;

  return (
    <div className="successContainer">
      <img src={Success} style={{ height: '225px', width: '225px' }} alt="Success" />
      <h2>Success!</h2>

      <div className="proposal-info">
        <span><strong>Proposal Number</strong>: {proposalNo?.proposal_no}</span>
        <span><strong>Insured Name</strong>: {proposalNo?.insured_name}</span>
        <span><strong>Vehicle No</strong>: {proposalNo?.v_registration_no}</span>
      </div>

      <p className="email-message">Complete Your Breakin Inspection </p>

      <div className="links">
        <div className="link-container">
          <a href={proposalLink}>Open Link URL</a>
        </div>
      </div>

      <div className="qr-codes">
        <div className="qr-code-container">
          <QRCode value={proposalLink} />
        </div>
      </div>

      <p className="email-message">
        {`An SMS/Email has been triggered to ${proposalNo?.mobile_no}/${proposalNo?.email}`}
      </p>

      <div className="button-container">
        <button onClick={handleCopyToClipboard} className="copy-button">Copy to Clipboard</button>
        {/* <a href={mailtoLink} className="gmail-button">Share via Gmail</a> */}
      </div>

      <div className="share-buttons">
        
        <WhatsappShareButton url={proposalLink} title="Complete Breakin Inspection by the Following ways">
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      </div>

      <button onClick={() => navigate('/proposalList')} className="break-in-button">
        Done
      </button>
    </div>
  );
};

export default SuccessPage;
