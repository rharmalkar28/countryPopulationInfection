import axios from "axios";
import APIException from "../Common/APIException";

export const getService = async (url, params = {}) => {
  try {
    const response = await axios({
      url: `${url}`,
      method: "GET",
      params
    });
    return response;
  } catch (error) {
    // throw new APIException(error);
    console.log(error);
  }
};
