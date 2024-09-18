import React, { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { Modal, Checkbox, Button } from 'antd';
import { Api_Endpoints } from '../../Api/Api_Endpoint';
import { makeApiCall } from '../../Api/makeApiCall';
import FullPageLoader from '../../Component/FullPageLoader';
import { extractBase64FromDataURI } from '../../Util/convertImageToBase64';
import { showErrorToast, showSuccessToast } from '../../Util/toastService';
import './ManualUpload.css';
import Dropdown from '../../Component/UI/Dropdown';
import { Link, ListInspection, ListInspection1, Viewreport } from '../../Constant/ImageConstant';

const ManualUpload = () => {
  const [data, setData] = useState([]);
  const navigate=useNavigate()
  const [files, setFiles] = useState({});
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({});
  const [videoUploadStatus, setVideoUploadStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSteps, setselectedSteps] = useState('');

  const location = useLocation();
  const handleViewReports=(params)=>{
    navigate('/viewReportPage',{replace:true,state:{
      data:{ id: location?.state?.data?.id,
        breakin_inspection_id: location?.state?.data?.breakin_inspection_id,
        v_product_type_id:location?.state?.data?.v_product_type_id
        
      }
    }})}
    
  const [odometerReading, setOdometerReading] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [checkedOptions, setCheckedOptions] = useState({
    odometer: false,
    images: false,
    video: false,
    steps:false
  });

  const fetchData = async () => {
    const res = await makeApiCall(Api_Endpoints.fetch_Image_inspection_question_Endpoint, 'POST', {
      user_id: location?.state?.data?.user_id,
      proposal_id: location?.state?.data?.id,
      break_in_case_id: location?.state?.data?.breakin_inspection_id,
      product_type_id:location?.state?.data?.v_product_type_id
    });
    setData(res?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleOdometerChange = (event) => {
    const value = event.target.value;
  
    // Allow only digits and limit to 6 digits
    if (/^\d{0,8}$/.test(value)) {
      setOdometerReading(value);
    }
  };
  

  const handleFileChange = (event, qid) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = extractBase64FromDataURI(reader.result);
        setFiles((prevFiles) => ({
          ...prevFiles,
          [qid]: base64Image,
        }));
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [qid]: 'pending',
        }));
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file.');
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/') && file.size <= 50 * 1024 * 1024) {
      setVideoFile(file);
      setVideoUploadStatus('pending');
    } else {
      alert('Please select a video file smaller than 25MB.');
    }
  };

  const handleSubmitOdometer = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const res = await makeApiCall(Api_Endpoints.submit_odometer_reading_Endpoint, 'POST', {
      user_id: location?.state?.data?.user_id,
      proposal_id: location?.state?.data?.id,
      break_in_case_id: location?.state?.data?.breakin_inspection_id,
      odometer: odometerReading,
    });

    if (res?.status) {
      showSuccessToast(res?.message);
    } else {
      showErrorToast(res?.message);
    }

    setIsSubmitting(false);
  };
  const stepsDropDown = [{value:'images',label:'images'},{value:'video',label:'video'},{value:'checkpoint',label:'checkpoint'},{value:'compeleted',label:'compeleted'},


]

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);


    const submitPromises = Object.keys(files).map(async (qid) => {
      const imagedata = files[qid];
      const res = await makeApiCall(Api_Endpoints.submit_inspection_images_new, 'POST', {
        user_id: location?.state?.data?.user_id,
        proposal_id: location?.state?.data?.id,
        break_in_case_id: location?.state?.data?.breakin_inspection_id,
        image: imagedata,
        question_id: qid,
        breakin_steps: checkedOptions.video?'video':'completed',
      });

      setUploadStatus((prevStatus) => ({
        ...prevStatus,
        [qid]: res?.status ? 'success' : 'failure',
      }));

      if (res?.status) {
      } else {
        showErrorToast(res?.message)
      }
    });

    if (videoFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Video = extractBase64FromDataURI(reader.result);
        const res = await makeApiCall(Api_Endpoints.submit_inspection_images_new, 'POST', {
          user_id: location?.state?.data?.user_id,
          proposal_id: location?.state?.data?.id,
          break_in_case_id: location?.state?.data?.breakin_inspection_id,
          image: base64Video,
          question_id: 'video',
          breakin_steps: 'video',
        });

        setVideoUploadStatus(res?.status ? 'success' : 'failure');

        if (res?.status) {
        } else {
        }
      };

      reader.readAsDataURL(videoFile);
    }

    await Promise.all(submitPromises);
    setIsSubmitting(false);
  };

  const handleSubmitVideo = async (event) => {
    setIsSubmitting(true);

    const res = await makeApiCall(Api_Endpoints?.submit_inspection_Video_Endpoint, 'POST', {
      user_id: location?.state?.data?.user_id,
      proposal_id: location?.state?.data?.id,
      break_in_case_id: location?.state?.data?.breakin_inspection_id,
      breakin_steps: 'completed',
      video: videoFile,
    });

    if (res?.status) {
      showSuccessToast(res?.message);
    } else {
      showErrorToast(res?.message);
    }

    setIsSubmitting(false);
  };


const handleBreakinSteps = async()=>{
setIsSubmitting(true)
  const res = await makeApiCall(Api_Endpoints?.update_Proposal_Steps,'POST',{
    user_id: location?.state?.data?.user_id,
    proposal_id: location?.state?.data?.id,
    breakin_steps: selectedSteps,
  })


  if(res?.status){
    showSuccessToast(res?.message)
  }else{
    showErrorToast(res?.message)
  }
  setIsSubmitting(false)

}


const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Modal
        title="Select Upload Options"
        visible={isModalVisible}
        onOk={handleOk}
      onCancel={()=>setIsModalVisible(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
         <Checkbox name="steps" checked={checkedOptions.steps} onChange={handleCheckboxChange}>
          Update Breakin Steps
        </Checkbox> 
        <br/>
        <Checkbox name="odometer" checked={checkedOptions.odometer} onChange={handleCheckboxChange}>
          Update Odometer
        </Checkbox>
        <br />
        <Checkbox name="images" checked={checkedOptions.images} onChange={handleCheckboxChange}>
          Manual Upload Images
        </Checkbox>
        <br />
        <Checkbox name="video" checked={checkedOptions.video} onChange={handleCheckboxChange}>
          Manual Upload Video
        </Checkbox>
      </Modal>

      <div className="manual-upload-container">
    <div style={{display:'flex',gap:'10px'}}>
      <img  style={{width:'35px',cursor:'pointer'}} onClick={()=>navigate(-1)} src={ListInspection1}/>
  <img  style={{width:'35px',cursor:'pointer'}} onClick={handleViewReports} src={Viewreport}/>

</div>
      {checkedOptions.steps && (
          <>
            <h1>Manual Update Steps</h1>
            <div className="odometer-form">
              <div className="odometer-item">
                <label>Select Steps</label>
                <Dropdown
          // label="Vehicle Fuel Type"
          // required={true}
          // value={formData.v_fuel_type_id}
        
value={selectedSteps}
          onChange={(event) => setselectedSteps(event?.target?.value)}
          options={stepsDropDown}

          placeholder="Select Step "
        />
                <div className="upload-button-div">
                  <button onClick={handleBreakinSteps} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Update Breakin Steps'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {checkedOptions.odometer && (
          <>
            <h1>Manual Odometer Update</h1>
            <div className="odometer-form">
              <div className="odometer-item">
                <label>Odometer Reading:</label>
                <input
                  type="text"
                  value={odometerReading}
                  style={{ width: '200px' }}
                  onChange={handleOdometerChange}
                />
                <div className="upload-button-div">
                  <button onClick={handleSubmitOdometer} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Update Odometer Reading'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {checkedOptions.images && (
          <>
            <h1>Manual Inspection Upload</h1>
            <form className="upload-form" onSubmit={handleSubmit}>
              <div className="upload-grid">
                {data.map((item) => (
                  <div key={item.id} className="upload-item">
                    <label>{item.name}</label>
                    {files[item.id] && (
                      <img
                        src={`data:image/png;base64,${files[item.id]}`}
                        style={{ width: '150px', height: '150px' }}
                        alt={`Preview for ${item.name}`}
                      />
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, item.id)} />
                    {uploadStatus[item.id] && (
                      <p style={{ color: uploadStatus[item.id] === 'success' ? 'green' : 'red' }}>
                        {uploadStatus[item.id] === 'success' ? '✅ Upload successful' : '❌ Upload failed'}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="upload-button-div">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Upload Image Files'}
                </button>
              </div>
              {isSubmitting && <FullPageLoader loading={isSubmitting} />}
            </form>
          </>
        )}

        {checkedOptions.video && (
          <>
            <h1>Manual Inspection Video Upload</h1>
            <div className="upload-form">
              <div className="upload-grid">
                <div className="upload-item">
                  {videoFile ? (
                    <video controls style={{ width: '150px', height: '150px' }} src={URL.createObjectURL(videoFile)} />
                  ) : (
                    <p>Select video File</p>
                  )}
                  <input type="file" accept="video/*" onChange={handleVideoChange} />
                 
                </div>
              </div>
              <div className="upload-button-div">
                <button onClick={handleSubmitVideo} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Upload Video'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManualUpload;
