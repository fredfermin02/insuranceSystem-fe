"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { FileUploadActionButtonDropdown } from "./FileUploadActionButtonDropdown";
import { Row } from "react-day-picker";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FileUpload = {
  uploadDate: string,
  fileName: string,
  year: string,
  month: string,
  user: string,
  status: string,
};

export interface IFileUpload {
  id: number;
  file_name: string;
  agent_id: string;
  uploaded_date: string;
  month: number;
  year: number;
  published: boolean;
}


export const columnsForFileUpload: ColumnDef<IFileUpload>[] = [
  {
    accessorKey: "id",
    header: "File Id",
  },
  {
    accessorKey: "file_name",
    header: "File Name",
  },
  {
    accessorKey: "agent_name",
    header: "Agent Name",
  },
  {
    accessorKey: "uploaded_date",
    header: "Uploaded Date",
  },
  {
    accessorKey: "month",
    header: "Year",
  },
  {
    accessorKey: "year",
    header: "Year",
  },  
  {
    accessorKey: "published",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.getValue("published"); // Access the value
      return <div>{isPublished ? "Yes" : "No"}</div>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      

      return (
        <div className="justify-center">
          <FileUploadActionButtonDropdown/>
        </div>
        
      )
    },
  } 
]

// {
//   accessorKey: "amount",
//   header: () => <div className="text-right">Amount</div>,
//   cell: ({ row }) => {
//     const amount = parseFloat(row.getValue("amount"))
//     const formatted = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount)

//     return <div className="text-right font-medium">{formatted}</div>
//   },
// },