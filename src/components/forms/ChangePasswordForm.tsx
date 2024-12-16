import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { passwordSchema } from "@/Schemas"
import { handleUpdatePassword } from "@/lib/aws/cognitoActions"
import { toast } from "@/hooks/use-toast"
import { getErrorMessage } from "@/utils/get-error-message"



export default function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
    const formSchema = z.object({
        currentPassword: z.string().min(1,"Current password is required"),
        newPassword: passwordSchema
      })
      
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword:""
        },
      })
      
      function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        const formData = new FormData();
        formData.set("current_password", values.currentPassword);
        formData.set("new_password", values.newPassword);
      
        handleUpdatePassword(undefined, formData)
          .then((Return) => {
            toast({
              title: Return,
              description: 'Change has been applied successfully',
            })
            form.reset();
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
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Current Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="New Password" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                  <Button type="submit">Change</Button>
                  

                </FormItem>
              )}
            />
          </form>
        </Form>
      )
}
