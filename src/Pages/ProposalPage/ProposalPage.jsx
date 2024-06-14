// ProposalPage.js

import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDropDownMasterApi, getModel, getVariant } from '../../Api/getDropDownMasterApi';
import { getProposalDetailsApi } from '../../Api/getProposalDetails';
import Dropdown from '../../Component/UI/Dropdown';
import TextInput from '../../Component/UI/TextInput';
import { Search } from '../../Constant/ImageConstant';
import './ProposalPage.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDatePicker from '../../Component/UI/CustomDatePicker';
import { submitForm } from '../../Api/SubmitForm';
import { fetchDataLocalStorage } from '../../Util/LocalStorage';
import { Navigate, useNavigate } from 'react-router-dom';
import { ConsoleView } from 'react-device-detect';


const ProposalCard = ({ proposalNo, insuredName, registrationNo ,data,selectedProposal}) => {
  return (
    <div onClick={()=>selectedProposal(data)} className="proposal-card">
      <h3>Proposal Number: {proposalNo}</h3>
      <p>Insured Name: {insuredName}</p>
      <p>Registration Number: {registrationNo}</p>
    </div>
  );
};

const mobileRegex = /^([789]\d{9})$/; // 10 digits only 
const nameRegex = /^[a-zA-Z\s]+$/; // Alphabets and spaces only
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email pattern
const registrationNoRegex = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;

const ccRegex = /^\d+$/; // Numbers only
const nilDepreciationRegex = /^(\d+(\.\d{1,2})?|\.\d{1,2})$/; // Numbers with optional decimal up to 2 places
const yearRegex = /^\d{4}$/; // 4 digits only
const colorRegex = /^[a-zA-Z\s]+$/; // Alphabets and spaces only
const chassisNumberRegex = /^[A-Za-z0-9]{10,20}$/;


export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'mobile_no':
      return mobileRegex.test(value);
    case 'insured_name':
    case 'nominee_name':
      return nameRegex.test(value);
    case 'email':
    case 'additional_email':
      return emailRegex.test(value);
    case 'v_cc':
    case 'v_nill_depreciation':
      return ccRegex.test(value);
    case 'v_manufacture_year':
      return yearRegex.test(value);
      case 'v_chassis_no':
        return chassisNumberRegex.test(value);
      case 'v_registration_no':
        return registrationNoRegex.test(value);
    case 'v_color':
      return colorRegex.test(value);
    default:
      return true; // Return true for fields without validation
  }
};
const ProposalPage = () => {


  const Navigate=useNavigate()
  // Regex patterns for validation

// Validation function

  const [LoginData,setLoginData]=useState({})

const updateFormData = (data) => {


  // Check if 'data' contains each property and update 'formData' accordingly
  setFormData(prevFormData => ({
    ...prevFormData,
    ...(data.insured_name && { insured_name: data.insured_name }),
    ...(data.id && { id: data.id }),

    ...(data.v_make_id && { v_make_id: data.v_make_id }),
    ...(data.proposal_no && { proposal_no: data.proposal_no }),
    ...(data.proposal_start_date && { proposal_start_date: data.proposal_start_date }),
    ...(data.proposal_end_date && { proposal_end_date: data.proposal_end_date }),
    ...(data.mobile_no && { mobile_no: data.mobile_no }),
    ...(data.email && { email: data.email }),
    ...(data.nominee_name && { nominee_name: data.nominee_name }),
    ...(data.insured_address && { insured_address: data.insured_address }),
    ...(data.v_registration_no && { v_registration_no: data.v_registration_no }),
    ...(data.v_product_type_id && { v_product_type_id: data.v_product_type_id }),
    ...(data.v_model_id && { v_model_id: data.v_model_id }),
    ...(data.v_variant_id && { v_variant_id: data.v_variant_id }),
    ...(data.v_engine_no && { v_engine_no: data.v_engine_no }),
    ...(data.v_chassis_no && { v_chassis_no: data.v_chassis_no }),
    ...(data.v_odometer_reading && { v_odometer_reading: data.v_odometer_reading }),
    ...(data.v_fuel_type_id && { v_fuel_type_id: data.v_fuel_type_id }),
    ...(data.v_anti_theft_device_status && { v_anti_theft_device_status: data.v_anti_theft_device_status }),
    ...(data.v_manufacture_year && { v_manufacture_year: data.v_manufacture_year }),
    ...(data.v_color && { v_color: data.v_color }),
    ...(data.v_type_of_body && { v_type_of_body: data.v_type_of_body }),
    ...(data.v_nill_depreciation && { v_nill_depreciation: data.v_nill_depreciation }),
    ...(data.v_cc && { v_cc: data.v_cc })
  }));
};

// Call the function with your 'data' object

  const [formData, setFormData] = useState({
    // id:'',
    insured_name: '',
    v_make_id:'',
    proposal_no:'',
    proposal_start_date: '',
    proposal_end_date: '',
    mobile_no: '',
    email: '',
    nominee_name: '',
    insured_address: '',
    // additional_email:'',

    v_registration_no: '',
    v_product_type_id: '',
    v_model_id: '',
    v_variant_id: '',
    v_engine_no: '',
    v_chassis_no: '',
    v_odometer_reading: '',
    v_fuel_type_id: '',
    v_anti_theft_device_status: '',
    v_manufacture_year: '',
    v_color: '',
    // v_type_of_body: '',
    v_nill_depreciation: '',
    v_cc:''
  });

  const [formErrors, setFormErrors] = useState({
    // id:'',
    proposal_no:'',
    insured_name: '',
    proposal_start_date: '',
    proposal_end_date: '',
    mobile_no: '',
    v_make_id:'',

    email: '',
    nominee_name: '',
    insured_address: '',

    v_registration_no: '',
    v_product_type_id: '',
    v_model_id: '',
    v_variant_id: '',
    v_engine_no: '',
    v_chassis_no: '',
    v_odometer_reading: '',
    v_fuel_type_id: '',
    v_anti_theft_device_status: '',
    v_manufacture_year: '',
    v_color: '',
    // v_type_of_body: '',
    v_nill_depreciation: '',
    v_cc:''

  });

  const [selectedProposal,setSelectedProposal]=useState({})

  const [productTypeDropdown,setProductTypeDropdown]=useState([])
  const [makeDropdown,setMakeDropdown]=useState([])
  const [modelDropdown,setModelDropdown]=useState([])
  const [VariantDropdown,setVariantDropdown]=useState([])
  const [searchKeyword,setSearchKeyword]=useState('')
  const [showform,setShowForm]=useState(false)


  const [proposalData,setProposalData]=useState([])

  


  const [fuleTypeDropdown,setFuelTypeDropdown]=useState([])

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value); // Update search keyword as user types
  };

const getDropDownMaster=async()=>{
  const res = await getDropDownMasterApi();
  if(res?.status){
  setProductTypeDropdown(res?.product_type_master)}
  setFuelTypeDropdown(res?.fuel_type_master)
  setMakeDropdown(res?.make_master)
  
    setProductTypeDropdown(res?.product_type_master)


}
const  getLocalData=()=>{

  const getLocalData= fetchDataLocalStorage('claim_loginDashboard')
  console.log('fetched local datat form localk ',getLocalData?.data)

  setLoginData(getLocalData?.data)

}

const setSelectedProposalData=async(data)=>{

  if(data){

    setShowForm(true);
    const make = await getModel(data?.v_make_id)

    if(make?.status){
      setModelDropdown(make?.model_master)

        
       

    }
    const Variant = await getVariant(data?.v_model_id)

    if(Variant?.status){

      setVariantDropdown(Variant?.variant_master)

      
      setFormData({
        ...formData,
        v_variant_id: data?.v_variant_id,
        v_model_id: data?.v_model_id

      }); 

    }
    updateFormData(data);

    

    

  }
}
  const handleDropdownChange = async (event, field) => {
    const selectedValue = event.target.value;


  
    if(field&&String(selectedValue))
    {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: String(selectedValue)
    }));

    setFormErrors({
      ...formErrors,
      [field]: ''
    });

    if(field==='v_make_id'){
      const make = await getModel(selectedValue)


      if(make?.status){
        setModelDropdown(make?.model_master)
      

      }
    }


    if(field==='v_model_id'){
      const Variant = await getVariant(selectedValue)

      if(Variant?.status){
        setVariantDropdown(Variant?.variant_master)

      }
    }}

  };
  
  const handleDateChange=(e,field)=>{
    setFormData({
      ...formData,
      [field]: e
    }); 

    setFormErrors({
      ...formErrors,
      [field]: ''
    });
  }

// Update handleChange function to include validation
const handleChange = (e, field) => {
  let { value } = e.target;

  // Strip non-numeric characters from the input value
  if (field === 'mobile_no') {
    value = value.replace(/\D/g, '').slice(0, 10);
  }

  if (field === 'insured_name'|| field === 'nominee_name'|| field==='v_color') {
    // Remove any non-alphabetic characters and trim to maximum 30 characters
    value = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 30).toUpperCase();
  }


  if (field === 'insured_address') {
    // Remove any non-alphabetic characters and trim to maximum 30 characters
      value = value.slice(0, 65).toUpperCase();;
  }
  if (field === 'v_registration_no') {
    // Remove any non-alphanumeric characters and limit to maximum 10 characters
    value = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).toUpperCase();;
  }
  if (field === 'v_chassis_no') {
    // Remove any non-alphanumeric characters and limit to maximum 10 characters
    value = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20).toUpperCase();;
  }
  if (field === 'v_chassis_no') {
    // Remove any non-alphanumeric characters and limit to maximum 10 characters
    value = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20).toUpperCase();;
  }

  if (field === 'v_odometer_reading') {
    value = value.replace(/\D/g, '').slice(0, 8);
  }
  if (field === 'v_cc'||field==='v_manufacture_year') {
    value = value.replace(/\D/g, '').slice(0, 4);
  }

  let updatedFormErrors = { ...formErrors };

  if (!validateField(field, value)) {
    updatedFormErrors = {
      ...updatedFormErrors,
      [field]: `Invalid ${field.replace(/_/g, ' ')}`
    };
  } else {
    updatedFormErrors = {
      ...updatedFormErrors,
      [field]: ''
    };
  }

  // Update form errors state
  setFormErrors(updatedFormErrors);

  // Update form data regardless of validation
  setFormData({
    ...formData,
    [field]: value
  });
};




const   handleSearchSubmit =async()=>{
  const proposalDetails = await getProposalDetailsApi(searchKeyword)
  setProposalData(proposalDetails?.data)

  if(!proposalDetails?.status){
    toast.error(proposalDetails?.message, {
      position: "bottom-right",
      autoClose: 3000,
      theme:'colored',

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

}
const handleSubmit = async () => {
  console.log(formData)

  let hasError = false;
  const updatedFormErrors = { ...formErrors };

  // Check for errors in each required field

  Object.keys(formData).forEach((fieldName) => {

    const value = formData[fieldName];


    if (
      
      (value === '' || value === null || value === undefined)
    ) {
      updatedFormErrors[fieldName] = `${fieldName.replace(/_/g, ' ')} is required`;
      hasError = true;
    } else {
      updatedFormErrors[fieldName] = '';
    }
  });

  // Update formErrors state
  setFormErrors(updatedFormErrors);

  // If there's an error, prevent form submission
  if (hasError) {
    return;
  }

  // If everything is ok, log "submit form"


    const submitFormres =await  submitForm(formData, LoginData?.user_details?.id)

  if(submitFormres?.status){

    Navigate('/SuccessPage',{state:formData})
    toast.success(submitFormres?.message, {
      position: "bottom-right",
      autoClose: 3000,
      theme:'colored',

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }else{
    toast.error(submitFormres?.message, {
      position: "bottom-right",
      autoClose: 3000,
      theme:'colored',

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }


};


const truefalseoptions =[
  {
  label:'YES',
  value:'YES'
}
, {
  label:'NO',
  value:'NO'
}

]


useEffect(()=>{
  getDropDownMaster()
  getLocalData()
},[])

  return (
    <div>
      {/* {!true? */}
      {false?


      <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Proposal No ..."
          value={searchKeyword}
          onChange={handleSearchChange} // Update search keyword as user types
        /> 
        
        <img
          className="image"
          src={Search}
          alt="Search"
          style={{ height: "35px", width: "35px", paddingLeft: "12px", cursor: "pointer" }}
          onClick={handleSearchSubmit} // Handle search submission on click
        />


      </div>
      <div>
      {proposalData.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          data={proposal}
          selectedData={setSelectedProposal}
          proposalNo={proposal.proposal_no}
          insuredName={proposal.insured_name}
          registrationNo={proposal.v_registration_no}
          selectedProposal={setSelectedProposalData }
        />
      ))}
    </div>
    </div>
      


     :
     <>
     <div style={{ backgroundColor: 'white', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
   
   
        <TextInput 
            label="Proposal Number"
            name="proposal_no"
            required={true}
            value={formData.proposal_no}
            onChange={(e)=>handleChange(e,'proposal_no')}
            placeholder="Enter Proposal number"
            error={formErrors.proposal_no}
          />

        <CustomDatePicker 
        label="Proposal Start Date"
        name="proposal_start_date"
        required={true}
        selectedDate={formData.proposal_start_date}
        onChange={(e)=>handleDateChange(e,'proposal_start_date')}
        placeholder="select policy start date"
        error={formErrors.proposal_start_date}
        />


        <CustomDatePicker 
        label="Proposal End Date"
        name="proposal_end_date"
        required={true}
        isDisabled={!formData.proposal_start_date}
        
        startDate={formData.proposal_start_date}
        selectedDate={formData.proposal_end_date}
        onChange={(e)=>handleDateChange(e,'proposal_end_date')}
        placeholder="select policy End date"
        error={formErrors.proposal_end_date}
        />   
      <TextInput
        label="Insured Name"
        name="insured_name"
        required={true}
        value={formData.insured_name}
        onChange={(e)=>handleChange(e,'insured_name')}
        placeholder="Enter Insured Name"
        error={formErrors.insured_name}
      />
      <TextInput
        label="Mobile Number"
        name="mobile_no"
        required={true}
        value={formData.mobile_no}
        onChange={(e)=>handleChange(e,'mobile_no')}
        placeholder="Enter mobile number"
        error={formErrors.mobile_no}
      />
      <TextInput
        label="Email"
        name="email"
        required={true}
        value={formData.email}
        onChange={(e)=>handleChange(e,'email')}
        placeholder="Enter email"
        error={formErrors.email}
      />
      {/* <TextInput
        label="Additional Email"
        name="additional_email"
        // required={true}
        value={formData.additional_email}
        onChange={(e)=>handleChange(e,'additional_email')}
        placeholder="Enter Additional email"
        error={formErrors.additional_email}
      /> */}
      <TextInput
        label="Nominee Name"
        name="nominee_name"
        required={true}
        value={formData.nominee_name}
        onChange={(e)=>handleChange(e,'nominee_name')}
        placeholder="Enter nominee name"
        error={formErrors.nominee_name}
      />
      <TextInput
        label="Insured Address"
        name="insured_address"
        required={true}
        value={formData.insured_address}
        onChange={(e)=>handleChange(e,'insured_address')}
        placeholder="Enter insured address"
        error={formErrors.insured_address}
      />
      <Dropdown
        label="Select Make"
        required={true}
        value={formData.v_make_id}
        onChange={(event) => handleDropdownChange(event, 'v_make_id')}
        options={makeDropdown.map((make) => ({
          value: make.make_id,
          label: make.make_cleaned
        }))}
        tippyContent={'select Model'}

        placeholder="Select a make"
        error={formErrors.v_make_id}
      />
      <Dropdown
        label="Select Model"
        required={true}
        value={formData.v_model_id}
        onChange={(event) => handleDropdownChange(event, 'v_model_id')}
        options={modelDropdown.map((v_model) => ({
          value: v_model.model_id,
          label: v_model.model_cleaned
        }))}
        isDisabled={formData.v_make_id?false:true}
        placeholder="Select a model"
        error={formErrors.v_model_id}
      />
      <Dropdown
        label="Select Variant"
        required={true}
        value={formData.v_variant_id}
        onChange={(event) => handleDropdownChange(event, 'v_variant_id')}
        options={VariantDropdown.map((v_variant) => ({
          value: v_variant.variant_id,
          label: v_variant.variant_cleaned
        }))}
        isDisabled={formData.v_model_id?false:true}
        placeholder="Select a Variant"
        error={formErrors.v_variant_id}
      />



      {/* <TextInput
        label="Hypothecation Lease"
        name="hypothecation_lease"
        required={true}
        value={formData.hypothecation_lease}
        onChange={(e)=>handleChange(e,'hypothecation_lease')}
        placeholder="Enter hypothecation lease"
        error={formErrors.hypothecation_lease}
      />
      <TextInput
        label="Financier Bank"
        name="financier_bank_id"
        required={true}
        value={formData.financier_bank_id}
        onChange={(e)=>handleChange(e,'financier_bank_id')}
        placeholder="Enter financier bank"
        error={formErrors.financier_bank_id}
      /> */}
      <TextInput
        label="Vehicle Registration No"
        name="v_registration_no"
        required={true}
        value={formData.v_registration_no}
        onChange={(e)=>handleChange(e,'v_registration_no')}
        placeholder="EG . MH02AB1234"
        error={formErrors.v_registration_no}
      />

        <Dropdown
          label="Vehicle Product Type"
          required={true}
          value={formData.v_product_type_id}

          onChange={(event) => handleDropdownChange(event, 'v_product_type_id')}
          options={productTypeDropdown.map((product) => ({
            value: product?.id,
            label: product?.label
          }))}
          tippyContent={'select Model'}

          placeholder="Select a make"
          error={formErrors.v_make_id}
        />

      
   
      <TextInput
        label="Vehicle Engine No"
        name="v_engine_no"
        required={true}
        value={formData.v_engine_no}
        onChange={(e)=>handleChange(e,'v_engine_no')}
        placeholder="Enter vehicle engine number"
        error={formErrors.v_engine_no}
      />
      <TextInput
        label="Vehicle Chassis No"
        name="v_chassis_no"
        required={true}
        value={formData.v_chassis_no}
        onChange={(e)=>handleChange(e,'v_chassis_no')}
        placeholder="Enter vehicle chassis number"
        error={formErrors.v_chassis_no}
      />
      <TextInput
        label="Vehicle Odometer Reading"
        name="v_odometer_reading"
        required={true}
        value={formData.v_odometer_reading}
        onChange={(e)=>handleChange(e,'v_odometer_reading')}
        placeholder="Enter vehicle odometer reading"
        error={formErrors.v_odometer_reading}
      />

        <Dropdown
          label="Vehicle Fuel Type"
          required={true}
          value={formData.v_fuel_type_id}

          onChange={(event) => handleDropdownChange(event, 'v_fuel_type_id')}
          options={fuleTypeDropdown.map((fuel) => ({
            value: fuel?.id,
            label: fuel?.name
          }))}

          placeholder="Select Fuel Type"
          error={formErrors.v_fuel_type_id}
        />
        <TextInput
                label="Vehicle CC"
                name="v_cc"
                required={true}
                value={formData.v_cc}
                onChange={(e)=>handleChange(e,'v_cc')}
                placeholder="Enter vehicle cc"
                error={formErrors.v_cc}
              />

   
  


<Dropdown
        label="Vehicle Anti-theft Status"
        required={true}
        value={formData.v_anti_theft_device_status}
        onChange={(event) => handleDropdownChange(event, 'v_anti_theft_device_status')}
        options={truefalseoptions.map((option) => ({
          value: option.value,
          label: option.label
        }))}
        placeholder="Select a status"
        error={formErrors.v_anti_theft_device_status}
      />

      <TextInput
        label="Vehicle Manufacture Year"
        name="v_manufacture_year"
        required={true}
        value={formData.v_manufacture_year}
        onChange={(e)=>handleChange(e,'v_manufacture_year')}

        placeholder="Enter vehicle manufacture year"
        error={formErrors.v_manufacture_year}
      />
      <TextInput
        label="Vehicle Color"
        name="v_color"
        required={true}
        value={formData.v_color}
       
        onChange={(e)=>handleChange(e,'v_color')}
        
        placeholder="Enter vehicle color"
        error={formErrors.v_color}
      />
      {/* <TextInput
        label="Vehicle Type of Body"
        name="v_type_of_body"
        required={true}
        value={formData.v_type_of_body}
        onChange={(e)=>handleChange(e,'v_type_of_body')}

        placeholder="Enter vehicle type of body"
        error={formErrors.v_type_of_body}
      /> */}
   

<Dropdown
        label="Vehicle Nil Depreciation"
        required={true}
        value={formData.v_nill_depreciation}
        onChange={(event) => handleDropdownChange(event, 'v_nill_depreciation')}
        options={truefalseoptions.map((option) => ({
          value: option.value,
          label: option.label
        }))}
        placeholder="Select a status"
        error={formErrors.v_anti_theft_device_status}
      />

      </div>
      <button  onClick={handleSubmit} className="upload-button">Submit </button>
</>
      }
    </div>

  );
}

export default ProposalPage;
