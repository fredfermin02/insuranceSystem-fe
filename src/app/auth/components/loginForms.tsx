"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { handleSignIn, handleSignOut } from "@/lib/cognitoActions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/utils/get-error-message";
import { useFormState } from "react-dom";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}




export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter()
  const formSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: 'Password is required' })
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);
  
    handleSignIn(undefined, formData)
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
      setIsLoading(false)
    console.log(values)
  }
  
  return (
    <div className={cn("grid gap-6 ", className)} {...props}>
      <Toaster/>
      <div className="flex flex-col md:w-96 space-y-2 text-center">
        <h1 className="text-2xl  font-semibold tracking-tight">
          Welcome Back
        </h1>

      </div>
 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem >
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="mobile email" placeholder="example@ex.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

         
         
          <Button className="flex w-full" type="submit" disabled={isLoading}>{isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <div>Sumbit</div>
        )}</Button>
          
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
  );
}
