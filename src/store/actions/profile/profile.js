import * as actionTypes from "../actionType";
import axios from "axios";
import * as actions from "../index";



const userProfile = (data) => {
  return {
    type: actionTypes.USER_PROFILE,
    data: data,
  };
};



export const updateProfile = (request) => {
 console.log("request ", request);

  var  formData = new FormData();

  formData.append("file", request.data.file);
  formData.append("pdftype", request.data.data.exceltype);
  formData.append("row", request.data.data.row);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  console.log("formData ", formData);

  return (dispatch) => {
    axios
      .post("http://localhost:4441/fileupload", formData, config)
      .then((result) => {
        console.log("result ", result);

        if (result.data.success === true) {
          dispatch(userProfile(result.data));

        } else {
        }
      })
      .catch((error) => {
      });
  };
};




