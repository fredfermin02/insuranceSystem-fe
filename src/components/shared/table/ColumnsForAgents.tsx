"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AgentSale = {
  status: string,
  producerName: string,
  producernpn: string,
  memberid: string,
  suscribername: string,
  state: string,
  lives: number,
  rate: string,
  commission: string,
  commissionmonth: string,
  blockreason: string
};

export const columnsForAgents: ColumnDef<AgentSale>[] = [
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
  },
  {
    accessorKey: "blockreason",
    header: "Block Reason",
  },

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