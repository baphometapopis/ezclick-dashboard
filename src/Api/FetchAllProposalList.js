import { API_BASE_URL } from "./Api_Endpoint";

export const getAllProposalListApi = async (data) => {
  try {
  

    var formdata = new FormData();
    formdata.append("start", data?.start);
    formdata.append("length", data?.end);
    formdata.append("search", data?.search);
    formdata.append("user_id", data?.user_id);
    formdata.append("product_type_id", data?.product_Type_id);
    formdata.append("breakin_status", data?.Status);
  

    // formdata.append("login_id", id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${API_BASE_URL}proposal_list`,
      requestOptions
    );
    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};


