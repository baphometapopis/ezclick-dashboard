import { Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { Api_Endpoints } from '../../Api/Api_Endpoint';
import { makeApiCall } from '../../Api/makeApiCall';
import Dropdown from '../../Component/UI/Dropdown';
import TextInput from '../../Component/UI/TextInput';
import { fetchDataLocalStorage } from '../../Util/LocalStorage';
import { showErrorToast, showSuccessToast } from '../../Util/toastService';
import './UpdateList.css'; // Import the CSS file



const UpdateList = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [makeDropdown, setMakeDropdown] = useState([]);
  const [productTypeDropdown, setProductTypeDropdown] = useState([]);
  const [LoginData, setLoginData] = useState({});
  const [breakinChoiceAnswer,setbreakinChoiceAnswer]=useState([])

  // State for the first tab's form
  const [formData, setFormData] = useState({
    make_id: '',
    product_type_id: '',
    variant_name: '',
    model_name: ''
  });

  // State for the second tab's form
  const [formData2, setFormData2] = useState({
    product_type_id: '',
    question: '',
    answer_ids: '',
  });

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleChange1 = (e, field) => {
    setFormData2({
      ...formData2,
      [field]: e.target.value
    });
  };
  const arrayToString = (array) => {
    return array.join(',');
  };
  

  const getLocalData = async () => {
    const getLocalData = fetchDataLocalStorage('claim_loginDashboard');
    setLoginData(getLocalData?.data);

    const res = await makeApiCall(Api_Endpoints?.getBreakinChoiceAnswer,"GET")
    if(res?.status){
      setbreakinChoiceAnswer(res?.breakin_choice_answer)
    }else{
      showErrorToast(res?.message)
    }
  };

  const getDropDownMaster = async (id) => {
    const res = await makeApiCall(Api_Endpoints?.getMasterDetails, "POST", { product_type_id: id });
    if (res?.status) {
      setMakeDropdown(res?.make_master);
    } else {
      showErrorToast(res?.message);
    }
  };

  const handleDropdownChange = async (event, field) => {
    const selectedValue = event.target.value;
    if (field && String(selectedValue)) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [field]: String(selectedValue)
      }));
      if (field === 'product_type_id') {
        setFormData(prevFormData => ({
          ...prevFormData,
          make_id: '',
        }));
        getDropDownMaster(selectedValue);
      }
    }
  };

  const handleDropdownChange1 = async (event, field) => {
    const selectedValue = event.target.value;
    console.log(selectedValue,field)

    if (field && String(selectedValue)) {
      setFormData2(prevFormData => ({
        ...prevFormData,
        [field]: String(selectedValue)
      }));
    
    }
  };

  const getProductType = async () => {
    const res = await makeApiCall(Api_Endpoints?.getProductType, "GET");
    if (res?.status) {
      setProductTypeDropdown(res?.product_type_master);
    } else {
      showErrorToast(res?.message);
    }
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setFormData2(prevState => ({
      ...prevState,
      checkboxes: prevState.checkboxes.includes(value)
        ? prevState.checkboxes.filter(v => v !== value)
        : [...prevState.checkboxes, value]
    }));
  };

  const handleSubmit = async () => {
    if (activeTab === "1") {
      if (!formData.make_id || !formData.product_type_id || !formData.variant_name || !formData.model_name) {
        showErrorToast("Please fill all required fields.");
        return;
      }
  
      const res = await makeApiCall(Api_Endpoints.updateezclickMaster, 'POST', { ...formData, user_id: LoginData?.user_details?.id });
      if (res?.status) {
        showSuccessToast(res?.message);

        window.location.reload()

        setFormData(null);
      } else {
        showErrorToast(res?.message);
      }
    } else {
      if (!formData2.product_type_id || !formData2.question || !formData2.answer_ids || formData2.answer_ids.length === 0) {
        showErrorToast("Please fill all required fields.");
        return;
      }
  
    const arrayToStriasdng=  arrayToString(formData2?.answer_ids)
    const postdata={
      product_type_id: formData2?.product_type_id,
      user_id: LoginData?.user_details?.id ,
      answer_ids:arrayToString(formData2?.answer_ids),
question:formData2?.question,
    }
      const res = await makeApiCall(Api_Endpoints?.update_breakin_inspection_master,"POST",postdata)
      if(res?.status){
        showSuccessToast(res?.message)
        window.location.reload()
      }else{
        showErrorToast(res?.message)
      }    }
  };



  useEffect(() => {
    getProductType();
    getLocalData();
  }, []);

  return (
    <div className="container">
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={activeTab === "1" ? "tab active" : "tab noactive"}
            onClick={() => setActiveTab("1")}
          >
            Add Vehicle Modal
          </button>
          <button
            className={activeTab === "2" ? "tab active" : "tab noactive"}
            onClick={() => setActiveTab("2")}
          >
            Add Question Checkpoint
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "1" && (
            <>
              <Dropdown
                label="Vehicle Product Type"
                required={true}
                value={formData?.product_type_id}
                onChange={(event) => handleDropdownChange(event, 'product_type_id')}
                options={productTypeDropdown?.map((product) => ({
                  value: product?.id,
                  label: product?.label
                }))}
                placeholder="Select Product type"
              />
              <Dropdown
                label="Select Make"
                required={true}
                value={formData?.make_id}
                isDisabled={formData?.product_type_id ? false : true}
                onChange={(event) => handleDropdownChange(event, 'make_id')}
                options={makeDropdown?.map((make) => ({
                  value: make.make_id,
                  label: make.make_cleaned
                }))}
                tippyContent={'select Model'}
                placeholder="Select a make"
              />
              <TextInput
                label="Model Name"
                name="model_name"
                required={true}
                value={formData?.model_name}
                onChange={(e) => handleChange(e, 'model_name')}
                placeholder="Enter Model name"
              />
              <TextInput
                label="Variant"
                name="variant_name"
                required={true}
                value={formData?.variant_name}
                onChange={(e) => handleChange(e, 'variant_name')}
                placeholder="Enter Variant Name"
              />
            </>
          )}
          {activeTab === "2" && (
            <>
              <Dropdown
                label="Vehicle Product Type"
                required={true}
                value={formData2?.product_type_id}
                onChange={(event) => handleDropdownChange1(event, 'product_type_id')}
                options={productTypeDropdown?.map((product) => ({
                  value: product?.id,
                  label: product?.label
                }))}
                placeholder="Select Product type"
              />
              <TextInput
                label="Enter Inspection Question"
                name="inspquestion"
                required={true}
                value={formData2.question}
                onChange={(e) => handleChange1(e, 'question')}

                placeholder="Enter Inspection Question" inputClassName={'full_width'}
              />
              <br/>
              <br/>

              <label>
                Select MCQ Options
      </label>
             <div className="checkbox-container">
             

      <Checkbox.Group
        value={formData2.answer_ids}
        onChange={(checkedValues) =>{console.log(checkedValues); setFormData2({ ...formData2, answer_ids: checkedValues })}}
      >
        {breakinChoiceAnswer.map(item => (
          <div key={item.breakin_multiple_choice_answer_id} className="checkbox-item">
            <Checkbox value={item.breakin_multiple_choice_answer_id}>{item.type}</Checkbox>
          </div>
        ))}
      </Checkbox.Group>
    </div>
            </>
          )}
        </div>
        <button
          className="submit-button"
          onClick={handleSubmit}
          // disabled={!isFormDataValid()} // Disable button if form data is invalid
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UpdateList;
