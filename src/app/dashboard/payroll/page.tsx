"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CSVLink } from "react-csv";
import { Button } from "@/components/ui/button";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const csvData = [
  {
    "Commission type": "Commission",
    "Payee name": "Health One Corp",
    "Payee type": "BROKER_AGENCY",
    "Payee NPN": "17845113",
    "Producer name": "Abel Molina",
    "Producer type": "BROKER",
    "Producer npn": "18226331",
    "Member ID": "OSC77978973-01",
    "Subscriber name": "Brandon Picado",
    State: "FL",
    "On or Off Exchange": "On HIX",
    Tier: "Individual",
    "Policy name": "Silver Classic Standard",
    Lives: 1,
    "Effective Date": "2024-01-01",
    Commission: 25,
    "Commission month": "2024-06-01",
    "Renewal status": "New",
    County: "Miami-Dade",
    "Block Reason": "",
  },
  {
    "Commission type": "Commission",
    "Payee name": "Health One Corp",
    "Payee type": "BROKER_AGENCY",
    "Payee NPN": "17845113",
    "Producer name": "Abel Molina",
    "Producer type": "BROKER",
    "Producer npn": "18226331",
    "Member ID": "OSC78919323-01",
    "Subscriber name": "Yanisbeli Martinez Delgado",
    State: "FL",
    "On or Off Exchange": "On HIX",
    Tier: "Individual",
    "Policy name": "Silver Simple PCP Saver",
    Lives: 1,
    "Effective Date": "2024-01-01",
    Commission: 25,
    "Commission month": "2024-08-01",
    "Renewal status": "Renewal",
    County: "Miami-Dade",
    "Block Reason": "",
  },
  {
    "Commission type": "Commission",
    "Payee name": "Health One Corp",
    "Payee type": "BROKER_AGENCY",
    "Payee NPN": "17845113",
    "Producer name": "Abel Molina",
    "Producer type": "BROKER",
    "Producer npn": "18226331",
    "Member ID": "OSC78666724-01",
    "Subscriber name": "Cesar Acosta",
    State: "FL",
    "On or Off Exchange": "On HIX",
    Tier: "Individual",
    "Policy name": "Silver Elite Saver Plus",
    Lives: 1,
    "Effective Date": "2024-01-01",
    Commission: 25,
    "Commission month": "2024-08-01",
    "Renewal status": "Renewal",
    County: "Miami-Dade",
    "Block Reason": "",
  },
  {
    "Commission type": "Commission",
    "Payee name": "Health One Corp",
    "Payee type": "BROKER_AGENCY",
    "Payee NPN": "17845113",
    "Producer name": "Abel Molina",
    "Producer type": "BROKER",
    "Producer npn": "18226331",
    "Member ID": "OSC77328218-01",
    "Subscriber name": "Victor Dianez Martinez",
    State: "FL",
    "On or Off Exchange": "On HIX",
    Tier: "Individual",
    "Policy name": "Bronze Elite Saver Plus",
    Lives: 1,
    "Effective Date": "2024-07-01",
    Commission: 25,
    "Commission month": "2024-08-01",
    "Renewal status": "New",
    County: "Miami-Dade",
    "Block Reason": "",
  },
  {
    "Commission type": "Commission",
    "Payee name": "Health One Corp",
    "Payee type": "BROKER_AGENCY",
    "Payee NPN": "17845113",
    "Producer name": "Abel Molina",
    "Producer type": "BROKER",
    "Producer npn": "18226331",
    "Member ID": "OSC78669568-01",
    "Subscriber name": "Francisco Martinez Blanco",
    State: "FL",
    "On or Off Exchange": "On HIX",
    Tier: "Ind+Spouse",
    "Policy name": "Silver Simple PCP Saver",
    Lives: 2,
    "Effective Date": "2024-01-01",
    Commission: 50,
    "Commission month": "2024-09-01",
    "Renewal status": "Renewal",
    County: "Broward",
    "Block Reason": "",
  },
  {
    "Commission type": "Commission",
    "Payee name": "Health One Corp",
    "Payee type": "BROKER_AGENCY",
    "Payee NPN": "17845113",
    "Producer name": "Abel Molina",
    "Producer type": "BROKER",
    "Producer npn": "18226331",
    "Member ID": "OSC77898173-01",
    "Subscriber name": "Rigoberto Marquez",
    State: "FL",
    "On or Off Exchange": "On HIX",
    Tier: "Individual",
    "Policy name": "Bronze Classic 4700",
    Lives: 1,
    "Effective Date": "2024-01-01",
    Commission: 25,
    "Commission month": "2024-09-01",
    "Renewal status": "New",
    County: "Miami-Dade",
    "Block Reason": "",
  },
  {
    "Commission type": "Commission",
    "Payee name": "Health One Corp",
    "Payee type": "BROKER_AGENCY",
    "Payee NPN": "17845113",
    "Producer name": "Abel Molina",
    "Producer type": "BROKER",
    "Producer npn": "18226331",
    "Member ID": "OSC78621101-01",
    "Subscriber name": "Jose Morales",
    State: "FL",
    "On or Off Exchange": "On HIX",
    Tier: "Individual",
    "Policy name": "Silver Simple PCP Saver",
    Lives: 1,
    "Effective Date": "2024-01-01",
    Commission: 25,
    "Commission month": "2024-09-01",
    "Renewal status": "Renewal",
    County: "Miami-Dade",
    "Block Reason": "",
  },
];


export default function page() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Oscar - 2024</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-72 rounded-md border">
            <div className="p-4">
              <>
                <div className="flex flex-row justify-between items-center">
                  <div className="text-sm">Abel Molina</div>
                  <div>
                    <CSVLink
                      data={csvData}
                      filename={"commission_data_abel_molina.csv"}
                    >
                      <Button variant="secondary">Download CSV</Button>
                    </CSVLink>
                  </div>
                </div>
                <Separator className="my-2" />
              </>
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
