"use client"

import React, { useState, type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleConfirmSignUp } from "@/lib/cognitoActions";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { getErrorMessage } from "@/utils/get-error-message";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function page() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter()
  const formSchema = z
  .object({
    email: z.string().email({ message: "Email is required" }),
    code: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("code", values.code);
  
    handleConfirmSignUp(undefined, formData)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: 'Error',
          description: getErrorMessage(error),
        })
      })
    console.log(values)
  }


  return (
    <section>
      {/* Block that shows only on large screens */}
      <Toaster/>
      <h1 className=" md:hidden text-center font-semibold font-roboto text-primary text-3xl sm:text-4xl md:text-4xl 3xl:text-[64px] my-1 mt-3 3xl:mt-4">
        MONITORING CENTER
      </h1>
      <div className={cn("grid gap-6")} >
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Confirm your account
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
           
            <Button className="flex w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <div>Submit</div>
          )}{" "}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
        </Button>
      </div>
    </section>
  );
}
