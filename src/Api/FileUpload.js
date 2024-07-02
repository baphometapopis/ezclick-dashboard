import { API_BASE_URL } from "./Api_Endpoint";

export const fileUpload = async (file) => {
//   console.log(id, file);
  try {
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("user_id", 1);

    // formdata.append("login_id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${API_BASE_URL}upload-proposal-data`,
      requestOptions
    );
    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};


export const getfileUploadList = async () => {
//   console.log(id, file);
  try {
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("user_id", 1);

    // formdata.append("login_id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${API_BASE_URL}upload-proposal-list-data`,
      requestOptions
    );
    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};