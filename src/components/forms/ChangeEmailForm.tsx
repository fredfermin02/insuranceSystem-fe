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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input";
import useAuthUser from "@/hooks/use-auth-user";
import { useFormState } from "react-dom";
import {
  handleConfirmUserAttribute,
  handleUpdateUserAttribute,
} from "@/lib/aws/cognitoActions";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/get-error-message";

export default function ChangeEmailForm() {
  const user = useAuthUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(user?.email);
  const [needCode, setNeedCode] = useState(false);

  const formSchema = z.object({
    email: z
      .string()
      .min(1)
      .max(50)
      .refine((email) => email !== userEmail, {
        message:
          "Email hasn't changed. Please change email before submitting again.",
      }),
  });

  const pinFormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    // Check if user data is loaded and set the initial value
    if (user?.name) {
      setUserEmail(user?.email);
      reset({ email: user.email });
    }
  }, [user, reset]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const formData = new FormData();
    formData.set("email", values.email);

    handleUpdateUserAttribute("", formData)
      .then((returnMessage) => {
        setUserEmail(user?.email);
        toast({
          title: "Succesfull",
          description: returnMessage,
        });
        if (returnMessage.includes("code")) {
          setNeedCode(true);
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: getErrorMessage(error),
        });
      });
    setIsLoading(false);
    console.log(values);
  }


  // #############
  const pinForm = useForm<z.infer<typeof pinFormSchema>>({
    resolver: zodResolver(pinFormSchema),
    defaultValues: {
      pin: "",
    },
  })

   
  function onSubmitPin(data: z.infer<typeof pinFormSchema>) {
    const formData = new FormData();
    formData.set("code", data.pin);
    handleConfirmUserAttribute(undefined, formData)
      .then((returnMessage) => {
        setUserEmail(user?.email);
        toast({
          title: "Succesfull",
          description: returnMessage,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: getErrorMessage(error),
        });
      });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={user?.email} {...field} />
                </FormControl>
                <FormMessage />
                <Button type="submit">Change</Button>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {needCode && (
        <>
          <Form {...pinForm}>
            <form
              onSubmit={pinForm.handleSubmit(onSubmitPin)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={pinForm.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
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
                      Please enter the one-time password sent to your Email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}

