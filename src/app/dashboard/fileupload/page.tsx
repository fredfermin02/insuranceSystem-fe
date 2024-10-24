'use client'

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Dropzone from "./components/UploadExcel";
import { DataTable } from "@/components/ui/Data-Table";
import { columnsForAgents  } from "@/components/shared/table/ColumnsForAgents";
import { columnsForFileUpload, FileUpload } from "@/components/shared/table/ColumnsForFilepload";
//Get data for table


function getData(): FileUpload[] {
  // Fetch data from your API here.
  return [
    {
      uploadDate: "2024-01-15",
      fileName: "report_jan_2024.pdf",
      year: "2024",
      month: "January",
      user: "John Doe",
      status: "Completed"
    },
    {
      uploadDate: "2024-02-10",
      fileName: "sales_feb_2024.xlsx",
      year: "2024",
      month: "February",
      user: "Jane Smith",
      status: "Pending"
    },
    {
      uploadDate: "2024-03-22",
      fileName: "project_plan_mar_2024.docx",
      year: "2024",
      month: "March",
      user: "Mike Ross",
      status: "In Progress"
    },
    {
      uploadDate: "2024-04-05",
      fileName: "invoice_apr_2024.pdf",
      year: "2024",
      month: "April",
      user: "Alice Johnson",
      status: "Completed"
    },
    {
      uploadDate: "2024-05-18",
      fileName: "budget_may_2024.xlsx",
      year: "2024",
      month: "May",
      user: "Bob Brown",
      status: "Failed"
    },
    {
      uploadDate: "2024-06-12",
      fileName: "presentation_jun_2024.pptx",
      year: "2024",
      month: "June",
      user: "Sarah Connor",
      status: "Pending"
    },
    {
      uploadDate: "2024-07-09",
      fileName: "contract_jul_2024.pdf",
      year: "2024",
      month: "July",
      user: "David Johnson",
      status: "Completed"
    },
    {
      uploadDate: "2024-08-21",
      fileName: "meeting_notes_aug_2024.docx",
      year: "2024",
      month: "August",
      user: "Grace Turner",
      status: "In Progress"
    },
    {
      uploadDate: "2024-09-14",
      fileName: "schedule_sep_2024.xlsx",
      year: "2024",
      month: "September",
      user: "Chris Evans",
      status: "Failed"
    },
    {
      uploadDate: "2024-10-03",
      fileName: "research_oct_2024.pdf",
      year: "2024",
      month: "October",
      user: "Emily Clark",
      status: "Pending"
    }
  ]
}

// Define form schema using zod
const FormSchema = z.object({
  dateOfFile: z.date().nullable(),
  file: z.instanceof(File, { message: "A file is required" }),
});

export default  function Page() {
  const data =  getData()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateOfFile: null,
      file: null,
    },
  });

  const { reset, handleSubmit } = form; // Destructure reset and handleSubmit from useForm

  const onSubmit = async (data: any) => {
    // Convert the date to a Unix timestamp (in seconds)
    const formattedData = {
      ...data,
      dateOfFile: data.dateOfFile ? Math.floor(new Date(data.dateOfFile).getTime() / 1000) : null, // Convert to Unix timestamp (seconds)
    };

    // Create FormData object
    const formData = new FormData();
    formData.append('file', data.file); // Append file
    if (formattedData.dateOfFile) {
      formData.append('dateOfFile', formattedData.dateOfFile.toString()); // Append Unix timestamp
    }

    // Log FormData contents for debugging
    formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  };

  return (
    <div className="h-screen  justify-center">
      {/* Wrap your form with FormProvider */}
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full justify-center p-4">
          <Dropzone name="file" onUpload={handleSubmit(onSubmit)} />
        </form>
      </FormProvider>

      <div className="container mx-auto py-10 ">
      <DataTable columns={columnsForFileUpload} data={data} />
    </div>

    </div>
  );
}
