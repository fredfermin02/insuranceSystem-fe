"use client"
import { Toaster } from "@/components/ui/toaster"
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { handleSignUp } from "@/lib/aws/cognitoActions";
import { toast} from "@/hooks/use-toast"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormState } from "react-dom";
import { passwordSchema } from "@/Schemas";
import { getErrorMessage } from "@/utils/get-error-message";
import { useRouter } from "next/navigation";



const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email({ message: "Email is required" }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}


export function UserSignupForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("name", values.name);
  
    handleSignUp(undefined, formData)
      .then(() => {
        router.push("/auth/confirmsignup");
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
    <div className={cn("grid gap-6", className)} {...props}>
      <Toaster />
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="password"
            render={({ field }) => (
              <FormItem className="mt-0">
                <FormLabel className="mt-0">Password</FormLabel>
                <FormControl>
                  <Input className="mt-0" type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="flex w-full"  disabled={isLoading}>{isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <div>submit</div>
          )}</Button>
        </form>
      </Form>
      
      {/* {errorMessage && (
        <>
          <p className="text-sm text-red-500">{errorMessage}</p>
        </>
      )} */}

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
  );
}



