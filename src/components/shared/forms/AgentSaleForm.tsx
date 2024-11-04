"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaleData } from "@/interfaces/ISaleData";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface AgentSaleFormProps {
  saleData?: SaleData;
}

const formSchema = z
  .object({
    producerName: z.preprocess((val) => {
      if (val === "") return undefined;
      return val;
    }, z.string().min(2).max(50)),
    producerNpn: z.preprocess((val) => {
      if (val === undefined) return undefined;
      return Number(val);
    }, z.number()),
    memberId: z.preprocess((val) => {
      if (val === "") return undefined;
      return val;
    }, z.string()),
    suscriberName: z.preprocess((val) => {
      if (val === "") return undefined;
      return val;
    }, z.string()),
    lives: z.preprocess((val) => {
      if (val === "") return undefined;
      return Number(val);
    }, z.number()),
    rate: z.preprocess((val) => {
      if (val === "") return undefined;
      return Number(val);
    }, z.number()),
    commission: z.preprocess((val) => {
      if (val === "") return undefined;
      return Number(val);
    }, z.number()),
    commissionMonth: z.date({
      required_error: "A date of birth is required.",
    }),
    blockReason: z.preprocess((val) => {
      if (val === "") return undefined;
      return val;
    }, z.string()),
  })
  .refine((data) => data.commission === data.lives * data.rate, {
    message: "Commission must be the product of lives and rate",
    path: ["commission"],
  });

export default function AgentSaleDialog({ saleData }: AgentSaleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      producerName: saleData ? saleData.producerName : "",
      producerNpn: saleData ? saleData.producernpn : undefined,
      memberId: saleData ? saleData.memberid : undefined,
      suscriberName: saleData ? saleData.suscribername : "",
      lives: saleData ? saleData.lives : undefined,
      rate: saleData ? saleData.rate : undefined,
      commission: saleData ? saleData.commission : undefined,
      commissionMonth: saleData ? saleData.commissionmonth : undefined,
      blockReason: saleData ? saleData.blockreason : "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="producerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Producer Name</FormLabel>
                      <FormControl>
                        <Input
                          id="producerName"
                          placeholder={saleData ? saleData.producerName : ""}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="producerNpn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Producer Npn</FormLabel>
                      <FormControl>
                        <Input
                          id="producerNpn"
                          placeholder={
                            saleData
                              ? (saleData.producernpn as unknown as string)
                              : ""
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <FormField
                control={form.control}
                name="memberId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member Id</FormLabel>
                    <FormControl>
                      <Input
                        id="memberId"
                        placeholder={saleData ? saleData.memberid : ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormField
                  control={form.control}
                  name="suscriberName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suscriber Name</FormLabel>
                      <FormControl>
                        <Input
                          id="suscriberName"
                          placeholder={saleData ? saleData.suscribername : ""}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row items-center  gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="lives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lives</FormLabel>
                      <div className="flex flex-row items-center gap-4">
                        <div>
                          <FormControl>
                            <Input
                              id="lives"
                              placeholder={
                                saleData
                                  ? (saleData.lives as unknown as string)
                                  : ""
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                        <div>
                          <Label>x</Label>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate</FormLabel>
                      <div className="flex flex-row items-center gap-4">
                        <div>
                          <FormControl>
                            <Input
                              id="rate"
                              placeholder={
                                saleData
                                  ? (saleData.rate as unknown as string)
                                  : ""
                              }
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </div>
                        <div>
                          <Label>=</Label>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="commission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission</FormLabel>
                      <div className="flex flex-row items-center gap-4">
                        <div>
                          <FormControl>
                            <Input
                              id="commission"
                              placeholder={
                                saleData
                                  ? (saleData.commission as unknown as string)
                                  : ""
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <FormField
                control={form.control}
                name="commissionMonth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Commission Month</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick Month and Year</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="blockReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Block Reason</FormLabel>
                    <FormControl>
                      <Input
                        id="blockReason"
                        placeholder={saleData ? saleData.blockreason : ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button className=" flex justify-end" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
