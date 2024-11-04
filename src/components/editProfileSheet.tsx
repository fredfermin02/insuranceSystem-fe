import React from "react";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ChangeNameForm from "./forms/ChangeNameForm";
import { Separator } from "@/components/ui/separator"
import ChangePasswordForm from "./forms/ChangePasswordForm";
import ChangeEmailForm from "./forms/ChangeEmailForm";
import { Toaster } from "./ui/toaster";


export default function EditProfileSheet() {
  return (
    
      <div >

      <Toaster/>
        <SheetHeader>
          <SheetDescription></SheetDescription>
          <SheetTitle>Change Name</SheetTitle>
          <ChangeNameForm/>
          <Separator />
          <SheetTitle>Change Password</SheetTitle>
          <ChangePasswordForm/>
          <Separator />
          <SheetTitle>Change Email</SheetTitle>
          <ChangeEmailForm/>
          
        </SheetHeader>
        </div>
  );
}
