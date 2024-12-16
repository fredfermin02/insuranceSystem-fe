"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import Dropzone from "./components/UploadExcel";
import { DataTable } from "@/components/ui/Data-Table";
import {
  columnsForFileUpload,
  FileUpload,
} from "@/components/shared/table/ColumnsForFilepload";
import useUserSession from "@/hooks/use-authuser-token";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
} from "@aws-sdk/client-s3";
import { stringify } from "querystring";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/utils/get-error-message";
import { on } from "events";

import { FileUploader } from "./components/UploadExcel";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { uploadFileToS3 } from "@/lib/aws/s3Actions";
import UploadDialogForm from "./components/UploadDialogForm";
import { useQuery } from "@tanstack/react-query";
import { useUploadedAdminFiles } from "@/hooks/useFileUploadData";
import { IFileUpload } from "@/interfaces";



function getData(): IFileUpload[] {
  return []
}


// Define form schema using zod
const FormSchema = z.object({
  dateOfFile: z.date().nullable(),
  file: z.instanceof(File, { message: "A file is required" }),
});

export default function Page() {
  
  const [loading, setLoading] = useState(false);
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File[]>();
  const [fileName, setfileName] = useState("")
  const [data2, setData] = useState<IFileUpload[]>([]);
  const data3 = getData();
  const schema = z.object({
    files: z.array(z.instanceof(File)),
  });

  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      files: [],
    },
  });

  const { data, isLoading, isSuccess } = useUploadedAdminFiles();
  async function onSubmit(data: Schema): Promise<void> {
    
    try {
      const { files } = data; // Extract files array from data
      console.log(files);
      // Assume your upload logic is here; you can add actual upload code if needed.
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async operation
      // Your actual upload logic would replace the line above.
      console.log(files);
      // Optionally use toast or other UI feedback
      // toast.success("Images uploaded successfully");
    } catch (error) {
      // Handle errors if any occur during upload
      console.error("Upload failed", error);
      // Optionally display an error message
      // toast.error("Failed to upload images");
    }
  }


  return (

    <div className="justify-center  ">
      
      {/* {uploadFile && (
        <UploadDialogForm
          files={uploadFile}
          onOpenChange={setOpen}
          openState={open}
          fileName={fileName}
        />
      )} */}

      <Toaster />
      {/* Wrap your form with FormProvider */}

     
                    <FileUploader
                      
                      maxFileCount={1}
                      maxSize={4 * 1024 * 1024}
                      disabled={isUploading}
                      progresses={progresses}
                    />
                  
                {/* {uploadedFiles.length > 0 ? (
                <UploadedFilesCard uploadedFiles={uploadedFiles} />
              ) : null} */}
              
        

      {/* <Button onClick={onClick} /> */}
      <div className="mx-auto py-10 ">
        <DataTable isLoading={isLoading} columns={columnsForFileUpload} data={data?data.toReversed():[]} />
      </div>
    </div>
  );
}
