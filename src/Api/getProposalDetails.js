import { API_BASE_URL } from "./Api_Endpoint";

export const getProposalDetailsApi=async(getProposalDetailsApi)=>{
    try {
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("proposal_no", getProposalDetailsApi);
        
    
    
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body:formdata,
          redirect: "follow",
        };
    
        const response = await fetch(
          `${API_BASE_URL}get_proposal_details`,
          requestOptions
        );
        const result = await response.text();
    
        return JSON.parse(result);
      } catch (error) {
        // Handle errors
        console.log(error);
      }

}


export const getFullReport = async (data)=>{

  try {
    var myHeaders = new Headers();
    var formdata = new FormData();
    formdata.append("proposal_id", data?.proposal_id);
    formdata.append("user_id", data?.user_id);
    formdata.append("break_in_case_id", data?.break_in_case_id);

    


    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body:formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${API_BASE_URL}getBreakinDetails`,
      requestOptions
    );
    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    // Handle errors
    console.log(error);
  }

}