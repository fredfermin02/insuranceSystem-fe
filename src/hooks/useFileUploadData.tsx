
import { IFileUpload } from "@/interfaces";
import { getUploadExcelAdminFiles } from "@/services/fileUploadService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUploadedAdminFiles = () => {
  const { data, isLoading, isSuccess, error } = useQuery<IFileUpload[], AxiosError>({
    queryKey: ['uploadedAdminFiles'], // consistent key
    queryFn: () => getUploadExcelAdminFiles(),
    staleTime: 0,
  });
  return { data, isLoading, isSuccess, error };
};

export { useUploadedAdminFiles };
