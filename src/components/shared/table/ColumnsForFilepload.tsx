"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"

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



export const columnsForFileUpload: ColumnDef<FileUpload>[] = [
  {
    accessorKey: "uploadDate",
    header: "Upload Date",
  },
  {
    accessorKey: "fileName",
    header: "File Name",
  },
  {
    accessorKey: "year",
    header: "Year",
  },  
  {
    accessorKey: "user",
    header: "Uploaded By",
    
  },
  {
    accessorKey: "status",
    header: "Status",
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