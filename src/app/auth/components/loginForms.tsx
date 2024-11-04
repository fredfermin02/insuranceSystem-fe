"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = {
  loginEmail: string;
  loginPassword: string;
};

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();
  
  const onSubmit = handleSubmit(async (data: FormData) => {
    // await handleLogin({ email: data.loginEmail, password: data.loginPassword });
    console.log({ email: data.loginEmail, password: data.loginPassword })

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

    const [isShow, setIsShow] = React.useState<boolean>(false);

    function showPassword(): void {
      setIsShow(!isShow);
      console.log(isShow);
    }

  return (
    <div className={cn("grid gap-6  w-full md:w-1/2", className)} {...props}>
      <div className="flex flex-col space-y-2 text-center ">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            
          
            <TextField
            control={control}
            error={errors?.loginEmail?.message}
            type={'email'}
            placeHolder="E-mail"
            name="loginEmail"
            rule={{
              required: 'Email is required',
            }}
          />
          
          </div>

          <div className="grid gap-1">
            
            <TextField
              control={control}
              error={errors?.loginPassword?.message}
              type={isShow ? 'text' : 'password'}
              placeHolder="Password"
              name="loginPassword"
              rule={{
                required: 'Password is required',
              }}
            />
          </div>

          <Button disabled={isLoading}>
            {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            Login
          </Button>
        </div>
      </form>
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
        Google
      </Button>
    </div>
  );
}
