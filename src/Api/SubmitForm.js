import { API_BASE_URL } from "./Api_Endpoint";

export const submitForm=async(data,user_id)=>{
    try {
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("proposal_no", data?.proposal_no);
        // formdata.append("proposal_id", data?.id);

        formdata.append("insured_name", data?.insured_name);
        formdata.append("inspection_date_time", data?.inspection_date_time);

        // formdata.append("proposal_start_date", data?.proposal_start_date);
        // formdata.append("proposal_end_date", data?.proposal_end_date);
        formdata.append("mobile_no", data?.mobile_no);
        formdata.append("email", data?.email);
        formdata.append("additional_email", data?.additional_email);

        // formdata.append("nominee_name", data?.nominee_name);
        formdata.append("insured_address", data?.insured_address);
        // formdata.append("hypothecation_lease", data?.hypothecation_lease);
        formdata.append("registration_no", data?.v_registration_no);
        formdata.append("product_type_id", data?.v_product_type_id);
        formdata.append("make_id", data?.v_make_id);
        formdata.append("model_id", data?.v_model_id);
        formdata.append("variant_id", data?.v_variant_id);
        formdata.append("engine_no", data?.v_engine_no);
        formdata.append("chassis_no", data?.v_chassis_no);
        formdata.append("odometer_reading", data?.v_odometer_reading);
        formdata.append("fuel_type_id", data?.v_fuel_type_id);
        formdata.append("manufacture_year", data?.v_manufacture_year);
        formdata.append("cc", data?.v_cc);
        formdata.append("color", data?.v_color);
        formdata.append("type_of_body", data?.v_type_of_body);
        formdata.append("nill_depreciation", data?.v_nill_depreciation);
        formdata.append("breakin_steps", 'checkpoint');
        formdata.append("user_id", user_id);








        
    
    
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body:formdata,
          redirect: "follow",
        };
    
        const response = await fetch(
          `${API_BASE_URL}create_proposal_details`,
          requestOptions
        );
        const result = await response.text();
    
        return JSON.parse(result);
      } catch (error) {
        // Handle errors
        console.log(error);
      }

}


export const UpdateAdminStatus=async(data)=>{
    try {

  
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("user_id", data?.user_id);
        // formdata.append("proposal_id", data?.id);

        formdata.append("proposal_id", data?.proposal_id);
        formdata.append("breakin_status_id", data?.breakin_status_id);

        formdata.append("comment", data?.comment);
        formdata.append("is_referback_checkpoint", data?.is_referback_checkpoint);
        formdata.append("is_referback_images", data?.is_referback_images);
        formdata.append("is_referback_video", data?.is_referback_video);
        formdata.append("image_ids",  `[${data?.image_ids}]`);

       








        
    
    
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body:formdata,
          redirect: "follow",
        };
    
        const response = await fetch(
          `${API_BASE_URL}update_admin_status`,
          requestOptions
        );
        const result = await response.text();
    
        return JSON.parse(result);
      } catch (error) {
        // Handle errors
        console.log(error);
      }

}

export const updateAlternateEmail=async(data)=>{
    try {

  
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("al_email_id", data?.al_email_id);

        formdata.append("proposal_id", data?.proposal_id);
       
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body:formdata,
          redirect: "follow",
        };
    
        const response = await fetch(
          `${API_BASE_URL}updateAlEmail`,
          requestOptions
        );
        const result = await response.text();
    
        return JSON.parse(result);
      } catch (error) {
        // Handle errors
        console.log(error);
      }

}