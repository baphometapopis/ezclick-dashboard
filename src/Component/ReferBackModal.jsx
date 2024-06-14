import React, { useEffect, useState } from 'react';
import './ReferBackModal.css';
import Select from 'react-select';
import TextInput from './UI/TextInput';
import { validateField } from '../Pages/ProposalPage/ProposalPage';
import { updateAlternateEmail } from '../Api/SubmitForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ReferBackModal({ onClose, onUpdate, reportData }) {
  const [isChecked, setIsChecked] = useState(false);
  const [selectEmail, setSelectEmail] = useState(false);
  const [additionalEmail, setAdditionalEmail] = useState('');
  const [additionalEmailError, setAdditionalEmailError] = useState('');

  const handleTextChange = (e, field) => {
    setAdditionalEmail(e.target.value);

    if (!validateField(field, e.target.value)) {
      setAdditionalEmailError(`Invalid ${field.replace(/_/g, ' ')}`);
    } else {
      setAdditionalEmailError('');
    }
  };

  const [checkboxes, setCheckboxes] = useState({
    checkpoint: false,
    imageInspection: false,
    video: false,
  });

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    });
  };

  const handleSubmit = async () => {
    const selectedCheckboxesArray = Object.entries(checkboxes)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);

    const data = {
      proposal_id: reportData?.proposal_detail?.id,
      al_email_id: additionalEmail,
    };

    const apires = await updateAlternateEmail(data);

    if (apires?.status) {
      toast.success(apires?.message, {
        position: "bottom-right",
        autoClose: 3000,
        theme: 'colored',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      onUpdate(selectedCheckboxesArray, selectedOptions);
      onClose();
    } else {
      toast.error(apires?.message, {
        position: "bottom-right",
        autoClose: 3000,
        theme: 'colored',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const imageInspection = [
    { id: 1, name: "Odometer with Engine on Position", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/ODOMETER.jpeg" },
    { id: 2, name: "Windscreen Inside to Outside", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Windscreen-Inside-to-Outside.jpg" },
    { id: 3, name: "Windscreen Outside to Inside", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Windscreen-Outside-to-Inside.jpg" },
    { id: 4, name: "Front Image", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Front.jpg" },
    { id: 5, name: "Left Image", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Left.jpeg" },
    { id: 6, name: "Rear Image", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Rare.jpg" },
    { id: 7, name: "Dicky Open", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Dicky.jpeg" },
    { id: 8, name: "Right Image", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Right.jpg" },
    { id: 9, name: "Engraved Chassis", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Engraved-Chassis.jpg" },
    { id: 10, name: "Open Engine Compartment", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Engine-Compartment.jpg" },
    { id: 11, name: "Under Carriage Image", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/Undercarriage.jpg" },
    { id: 12, name: "PUC Copy", is_mand: 1, sample_image_url: null },
    { id: 13, name: "Dashboard Copy", is_mand: 1, sample_image_url: null },
    { id: 14, name: "RC Copy", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/RC-Copy.png" },
    { id: 15, name: "Pervious Insurance Copy", is_mand: 1, sample_image_url: "https://demo.ezclicktech.com/Ezclick/public/images/breakin_sample_image/certificate-of-insurance-template.png" },
    { id: 16, name: "Selfie with car", is_mand: 1, sample_image_url: null },
    { id: 17, name: "Additional Image1", is_mand: 1, sample_image_url: null },
    { id: 18, name: "Additional Image2", is_mand: 1, sample_image_url: null },
    { id: 19, name: "Additional Image3", is_mand: 1, sample_image_url: null },
    { id: 20, name: "Front Left Image", is_mand: 1, sample_image_url: null },
    { id: 21, name: "Front Right Image", is_mand: 1, sample_image_url: null },
    { id: 22, name: "Rear Left Image", is_mand: 1, sample_image_url: null },
    { id: 23, name: "Rear Right Image", is_mand: 1, sample_image_url: null }
  ];

  const formatOptions = imageInspection.map(option => ({
    value: option.id,
    label: option.name
  }));

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleEmailChange = () => {
    const selectedCheckboxesArray = Object.entries(checkboxes)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);

    if (selectedCheckboxesArray.length === 0) {
      alert('Please Select a ReferBack Point');
      return;
    }

    if (selectedCheckboxesArray.indexOf('imageInspection') > -1 && selectedOptions.length === 0) {
      alert('Please Select a referback image');
      return;
    }

    setSelectEmail(true);
  };

  useEffect(() => { }, [selectedOptions]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {!selectEmail ? (
          <div>
            <h2 style={{ color: '#2B2D42' }}>Select Refer Back</h2>
            <div className='checkbox-div'>
              <input
                type="checkbox"
                name="checkpoint"
                checked={checkboxes.checkpoint}
                onChange={handleCheckboxChange}
              />
              <label>Checkpoint Survey</label>
            </div>
            <div className='checkbox-div'>
              <input
                type="checkbox"
                name="imageInspection"
                checked={checkboxes.imageInspection}
                onChange={handleCheckboxChange}
              />
              <label>Image Inspection</label>
            </div>
            <div className='checkbox-div'>
              <input
                type="checkbox"
                name="video"
                checked={checkboxes.video}
                onChange={handleCheckboxChange}
              />
              <label>Video</label>
            </div>

            {checkboxes.imageInspection && (
              <div>
                <label>Select Images :</label>
                <Select
                  isMulti
                  options={formatOptions}
                  value={selectedOptions}
                  onChange={handleChange}
                />
              </div>
            )}
            <button onClick={handleEmailChange}>Next</button>
          </div>
        ) : (
          <div>
            <h2 style={{ color: '#2B2D42' }}>Update Alternate Email</h2>
            <TextInput
              name="additional_email"
              value={additionalEmail}
              onChange={(e) => handleTextChange(e, 'additional_email')}
              placeholder="Enter Additional email"
              error={additionalEmailError}
            />
            <button onClick={handleSubmit} disabled={additionalEmailError || additionalEmail === ''} style={{ cursor: additionalEmailError || additionalEmail === '' ? 'not-allowed' : 'pointer' }}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}
