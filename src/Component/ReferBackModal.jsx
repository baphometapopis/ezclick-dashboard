import React, { useEffect, useState } from 'react';
import './ReferBackModal.css';
import Select from 'react-select';
import TextInput from './UI/TextInput';
import { validateField } from '../Pages/ProposalPage/ProposalPage';
import { updateAlternateEmail } from '../Api/SubmitForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeApiCall } from '../Api/makeApiCall';
import { Api_Endpoints } from '../Api/Api_Endpoint';
import { showErrorToast } from '../Util/toastService';

export function ReferBackModal({ onClose, onUpdate, reportData }) {

  const [imageInspection,setInspectedImages]=useState([])
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

  const fetchData = async () => {
    const res = await makeApiCall(Api_Endpoints.fetch_Image_inspection_question_Endpoint, 'POST', {
      user_id:reportData?.proposal_detail?.user_id,
      proposal_id: reportData?.proposal_detail?.id,
      break_in_case_id: reportData?.breaking_case_id,
      product_type_id: reportData?.proposal_detail?.v_product_type_id
    });
    if(res?.status){
    setInspectedImages(res?.data);}else{
      showErrorToast(res?.message)
    }
  };
useEffect(()=>{fetchData()},[])

  useEffect(() => { 
  }, [selectedOptions]);

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
