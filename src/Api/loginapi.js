import { API_BASE_URL } from "./Api_Endpoint";

export const loginApi = async (email,password) => {
//   console.log(id, file);
  try {
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);


    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${API_BASE_URL}click-login`,
      requestOptions
    );
    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};