import { DataTable } from "@/components/ui/Data-Table";
import React from "react";
import {
  columnsForAgents,
} from "../../../components/shared/table/ColumnsForAgents";
import { Button } from "@/components/ui/button";
import { NewAgentButton } from "./components/newAgentButton";
import { SaleData } from "@/interfaces/ISaleData";

function getData(): SaleData[] {
  return [
    {
      status: "Active",
      producerName: "John Doe",
      producernpn: 123456,
      memberid: "M1001",
      suscribername: "Alice Johnson",
      state: "CA",
      lives: 4,
      rate: 500,
      commission: 50,
      commissionmonth: new Date(),
      blockreason: "None",
    },
    {
      status: "Inactive",
      producerName: "Jane Smith",
      producernpn: 789101,
      memberid: "M1002",
      suscribername: "Bob Brown",
      state: "NY",
      lives: 2,
      rate: 600,
      commission: 60,
      commissionmonth: new Date(),
      blockreason: "Overdue Payment",
    },
    {
      status: "Pending",
      producerName: "Mike Ross",
      producernpn: 654321,
      memberid: "M1003",
      suscribername: "Charlie Davis",
      state: "TX",
      lives: 5,
      rate: 700,
      commission: 70,
      commissionmonth: new Date(),
      blockreason: "Verification Needed",
    },
    {
      status: "Active",
      producerName: "Sarah Connor",
      producernpn: 111213,
      memberid: "M1004",
      suscribername: "Diane Clark",
      state: "FL",
      lives: 3,
      rate: 550,
      commission: 68,
      commissionmonth: new Date(),
      blockreason: "None",
    },
    {
      status: "Inactive",
      producerName: "Tom Hanks",
      producernpn: 141516,
      memberid: "M1005",
      suscribername: "Eve Lewis",
      state: "IL",
      lives: 1,
      rate: 400,
      commission: 68,
      commissionmonth: new Date(),
      blockreason: "Policy Expired",
    },
    {
      status: "Pending",
      producerName: "David Johnson",
      producernpn: 171819,
      memberid: "M1006",
      suscribername: "Frank Miller",
      state: "NV",
      lives: 6,
      rate: 800,
      commission: 68,
      commissionmonth: new Date(),
      blockreason: "Pending Approval",
    },
    {
      status: "Active",
      producerName: "Emily Clark",
      producernpn: 202122,
      memberid: "M1007",
      suscribername: "Grace Turner",
      state: "AZ",
      lives: 2,
      rate: 650,
      commission: 68,
      commissionmonth: new Date(),
      blockreason: "None",
    },
    {
      status: "Inactive",
      producerName: "Chris Evans",
      producernpn: 232425,
      memberid: "M1008",
      suscribername: "Hank Lee",
      state: "OH",
      lives: 4,
      rate: 750,
      commission: 68,
      commissionmonth: new Date(),
      blockreason: "Canceled",
    },
    {
      status: "Pending",
      producerName: "Megan Fox",
      producernpn: 262728,
      memberid: "M1009",
      suscribername: "Ian Green",
      state: "NC",
      lives: 3,
      rate: 720,
      commission: 72,
      commissionmonth: new Date(),
      blockreason: "Verification Needed",
    },
    {
      status: "Active",
      producerName: "John Snow",
      producernpn: 292930,
      memberid: "M1010",
      suscribername: "Jack Hall",
      state: "GA",
      lives: 7,
      rate: 6,      
      commission: 68,
      commissionmonth: new Date(),
      blockreason: "None",
    },
    {
      status: "Inactive",
      producerName: "Tony Stark",
      producernpn: 313233,
      memberid: "M1011",
      suscribername: "Kelly White",
      state: "VA",
      lives: 2,
      rate: 500,
      commission: 68,
      commissionmonth: new Date(),
      blockreason: "Policy Expired",
    },
    {
      status: "Pending",
      producerName: "Bruce Wayne",
      producernpn: 343536,
      memberid: "M1012",
      suscribername: "Leo Black",
      state: "PA",
      lives: 5,
      rate: 670,
      commission: 68,
      commissionmonth: new Date(),
      blockreason: "Pending Approval",
    },
    {
      status: "Active",
      producerName: "Clark Kent",
      producernpn: 373839,
      memberid: "M1013",
      suscribername: "Mia Silver",
      state: "SC",
      lives: 3,
      rate: 540,
      commission: 68,
      commissionmonth: new Date(),
      blockreason: "None",
    },
    {
      status: "Inactive",
      producerName: "Natasha Romanoff",
      producernpn: 404142,
      memberid: "M1014",
      suscribername: "Nina Grey",
      state: "MI",
      lives: 1,
      rate: 400,
      commission: 68,
      commissionmonth: new Date(),
      blockreason: "Overdue Payment",
    },
    {
      status: "Pending",
      producerName: "Peter Parker",
      producernpn: 434445,
      memberid: "M1015",
      suscribername: "Owen Blue",
      state: "NJ",
      lives: 4,
      rate: 600,
      commission: 60,
      commissionmonth: new Date,
      blockreason: "Verification Needed",
    },
  ];
}



export default function page() {
  const data = getData();
  return (
    <div >
      <div className="  ">
        <div className="flex place-self-end py-5">
          <NewAgentButton />
        </div>
        <DataTable columns={columnsForAgents} data={data} />
      </div>
    </div>
  );
}
