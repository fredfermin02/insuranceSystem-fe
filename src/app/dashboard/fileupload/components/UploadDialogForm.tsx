"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "sonner";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getErrorMessage } from "@/utils/get-error-message";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { uploadExcelAdminFile } from "@/services/fileUploadService";
import { useUploadedAdminFiles } from "@/hooks/useFileUploadData";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title of file must be at least 2 characters.",
  }),
  correspondingDate: z.date({
    required_error:
      "Please enter the month and year of the corresponding file.",
  }),
});

interface UploadDialogFormProps {
  openState: boolean;
  onOpenChange: (open: boolean) => void;
  files: File[];
  onRemove?: (index: number) => void;
}

export default function UploadDialogForm({
  openState,
  onOpenChange,
  files,
  onRemove = () => {},
}: UploadDialogFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadExcelAdminFile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['uploadedAdminFiles'] });
      
      console.log('klk')
    },
  });

  useEffect(() => {
    if (files.length > 0) {
      form.setValue("title", files[0].name); // Use the name of the first file
    } else {
      form.setValue("title", ""); // Clear the field if no files
    }
  }, [files, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // Extract month and year from the date
      const correspondingDate = data.correspondingDate;
      const month = correspondingDate.getMonth() + 1;
      const year = correspondingDate.getFullYear();

      // Prepare form data
      const formData = new FormData();
      formData.append("filename", data.title);
      formData.append("month", month.toString());
      formData.append("year", year.toString());
      formData.append("file", files[0]); // Attach the first file

      // Send data to the mutation
      await toast.promise(
        mutateAsync(files[0])
          .then((d) => {
            onOpenChange(false);
          })
          .catch((e) => toast.error(getErrorMessage(e)))
          .finally(),
        {
          loading: "Loading...",
          success: (data) => {
            return ` File has been added successfully`;
          },
          error: "Error",
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  }

  // Function to remove files when dialog is closed
  function handleDialogClose(open: boolean) {
    if (!open && files.length > 0) {
      // Assuming we remove the last file when the dialog is closed
      onRemove(files.length - 1);
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={openState} onOpenChange={handleDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Details For Upload</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title of File</FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input
                        placeholder={"Enter a name for file..."}
                        {...field}
                      />
                    </FormControl>
                    <span>.xlsx</span>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correspondingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date for Corresponding File</FormLabel>
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
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
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
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
