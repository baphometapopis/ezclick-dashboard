// apiConstants.js


// export const API_BASE_URL = "https://breakin.ezclicktech.com/api/api/";
export const API_BASE_URL = "https://demo.ezclicktech.com/Ezclick/api/";
// export const API_BASE_IMG_URL = "https://breakin.ezclicktech.com/api/public/images/";
// export const open_url='https://ezclick-pwa.netlify.app/'
export const open_url='https://demoezclick-pwa.netlify.app'
export const API_BASE_IMG_URL = "https://demo.ezclicktech.com/Ezclick/public/images/";




export const Api_Endpoints = {
    login_Endpoint: `${API_BASE_URL}login_pos`,
    update_ProposalDetails: `${API_BASE_URL}update_proposal_details`,

    proposal_counter_endpoint: `${API_BASE_URL}proposal_counter`,
    submit_inspection_checkpoint: `${API_BASE_URL}submit_inspection_report`,
    submit_inspection_images_new: `${API_BASE_URL}submit_inspection_images`,
    submit_inspection_Video_Endpoint: `${API_BASE_URL}updateBreakInVideo`,
    update_Proposal_Steps: `${API_BASE_URL}update_proposal_steps`,
    fetch_Image_inspection_question_Endpoint: `${API_BASE_URL}fetch_image_inspection_question`,
    submit_odometer_reading_Endpoint: `${API_BASE_URL}odomete_insert_data`,
    fetch_Checkpoint_inspection_question_Endpoint: `${API_BASE_URL}fetch_breaking_question`,
    fetchPendingInspectionEndpoint: `${API_BASE_URL}fetch_breaking_pending_data`,
    fetchProgressInspectionEndpoint: `${API_BASE_URL}fetch_breaking_progress_data`,
    fetchRejectedInspectionEndpoint: `${API_BASE_URL}fetch_breaking_rejected_data`,
    fetchRefferBackInspectionEndpoint: `${API_BASE_URL}fetch_breaking_referback_data`,
    getFullreportEndpoint: `${API_BASE_URL}getBreakinDetails`,
    fetchProposalDetailsEndpoint: `${API_BASE_URL}api/get_proposal_details`,
    fetchLoginDetailsByProposalNoEndpoint: `${API_BASE_URL}api/get_proposal_user_details`,
    upload_signature_endpoint:`${API_BASE_URL}api/uploadCustomerSignature`,
    sendOTP:`${API_BASE_URL}api/SendOtpCustomer`,
    VerifyOTP:`${API_BASE_URL}api/VerifyOtp`,
    update_checkpoint_details:`${API_BASE_URL}update_checkpoint_details`,
    getImageasZip:`${API_BASE_URL}get-images-videos-zip-link`,
    getProductType:`${API_BASE_URL}get_product_type_data`,
    getMasterDetails:`${API_BASE_URL}get_master_details`,
    getModelDetails:`${API_BASE_URL}get_model_details`,
    getVariantDetails:`${API_BASE_URL}get_variant_details`,
    updateezclickMaster:`${API_BASE_URL}update_ezclick_master`,
    update_breakin_inspection_master:`${API_BASE_URL}update_breakin_inspection_master`,
    getBreakinChoiceAnswer:`${API_BASE_URL}get_breakin_choice_answer`,




    


  }; 
