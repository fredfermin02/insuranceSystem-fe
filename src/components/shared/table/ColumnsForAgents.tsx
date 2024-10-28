"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { EditButtonDropdown } from "./EditButtonDropdown";
import React from "react";
import { SaleData } from "@/interfaces/ISaleData";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.




export const columnsForAgents: ColumnDef<SaleData>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "producerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Producer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "producernpn",
    header: "Producer NPN",
  },  
  {
    accessorKey: "memberid",
    header: "Member ID",
    
  },
  {
    accessorKey: "suscribername",
    header: "Suscriber Name",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "lives",
    header: "Lives",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
  {
    accessorKey: "commission",
    header: "Commission",
  },
  {
    accessorKey: "commissionmonth",
    header: "Commission Month",
    cell: ({ row }) => {
      const commissionMonth: Date = row.getValue("commissionmonth"); // Get the blockreason value
      return format(commissionMonth, "PPP");
    }
  },
  {
    accessorKey: "blockreason",
    header: "Block Reason",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      
      const [selectedPayment, setSelectedPayment] = React.useState<any>(null);
      const handleEditClick = (payment: SaleData) => {
        setSelectedPayment(payment); // Store the selected row's data
      };

      return (
        <div className="justify-center">
          <EditButtonDropdown payment={row.original} onEditClick={handleEditClick}/>
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