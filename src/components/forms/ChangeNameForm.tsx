"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import React, { useEffect, useState } from "react";

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
import useAuthUser from "@/hooks/use-auth-user";
import { useFormState } from "react-dom";
import { handleUpdateUserAttribute } from "@/lib/cognitoActions";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { getErrorMessage } from "@/utils/get-error-message";


export default function ChangeNameForm() {
  const user = useAuthUser();
  const [isLoading, setIsLoading] = useState(false)
  const [status, dispatch] = useFormState(handleUpdateUserAttribute, "");
  const [userName, setUserName] = useState<string>(user?.name)
  const formSchema = z.object({
    name: z
      .string()
      .min(1)
      .max(50)
      .refine((name) => name !== userName, {
        message:
          "Name hasn't changed. Please change name before submitting again.",
      }),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",

    },
  });

  const { reset } = form;

  useEffect(() => {
    // Check if user data is loaded and set the initial value
    if (user?.name) {
      setUserName(user?.name)
      reset({ name: user.name });
    }
  }, [user, reset]);
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const formData = new FormData();
    formData.set("name", values.name);
  
    handleUpdateUserAttribute("", formData)
      .then(() => {
        setUserName(values.name)
        toast({
          title: 'Succesfull',
          description: 'Change has been applied succesfully',
        })
        
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: 'Error',
          description: getErrorMessage(error),
        })
      })
      setIsLoading(false)
    console.log(values)
  }
  return (
    <Form {...form}>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Change your name. This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit">Change</Button>
      </form>
    </Form>
  );
}
