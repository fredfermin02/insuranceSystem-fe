import axiosClient from "@/api/axiosClient";
import { IFileUpload } from "@/interfaces";
import { AxiosError } from "axios";

const ENDPOINT = "admin/excel-upload";
const uploadExcelAdminFile = async (data: any) => {
  try {
    console.log('api')
    console.log(data)
    return await axiosClient.post(`/${ENDPOINT}`, data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The request was made, and the server responded with a status code
      console.error(axiosError.response);
      throw new Error(`HTTP error response: ${axiosError.response.status}`);
    } else if (axiosError.request) {
      // The request was made but no response was received
      throw new Error("No response received");
    } else {
      // Something happened in setting up the request
      throw new Error(`Error setting up the request: ${axiosError.message}`);
    }
  }
};

const getUploadExcelAdminFiles = async (): Promise<IFileUpload[]> => {

  try {
    let response: IFileUpload[] = await axiosClient.get(`/${ENDPOINT}`)
    console.log(response  )
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The request was made, and the server responded with a status code
      console.error(axiosError.response);
      throw new Error(`HTTP error response: ${axiosError.response.status}`);
    } else if (axiosError.request) {
      // The request was made but no response was received
      throw new Error("No response received");
    } else {
      // Something happened in setting up the request
      throw new Error(`Error setting up the request: ${axiosError.message}`);
    }
  }
};

export { uploadExcelAdminFile, getUploadExcelAdminFiles };
