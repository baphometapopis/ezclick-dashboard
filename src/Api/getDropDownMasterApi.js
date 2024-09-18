import { API_BASE_URL } from "./Api_Endpoint";

export const getDropDownMasterApi = async () => {
//   console.log(id, file);
  try {
    var myHeaders = new Headers();


    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${API_BASE_URL}get_master_details`,
      requestOptions
    );
    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};


export const getModel=async(makeID)=>{
    try {
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("make_id", makeID);
        
    
    
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body:formdata,
          redirect: "follow",
        };
    
        const response = await fetch(
          `${API_BASE_URL}get_model_details`,
          requestOptions
        );
        const result = await response.text();
    
        return JSON.parse(result);
      } catch (error) {
        // Handle errors
        console.log(error);
      }

}


export const getVariant=async(makeID,modelID)=>{
    try {
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("model_id", modelID);
        formdata.append("make_id", makeID);

        
    
    
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body:formdata,
          redirect: "follow",
        };
    
        const response = await fetch(
          `${API_BASE_URL}get_variant_details`,
          requestOptions
        );
        const result = await response.text();
    
        return JSON.parse(result);
      } catch (error) {
        // Handle errors
        console.log(error);
      }

}