"use client"
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { handleSignOut } from "@/lib/aws/cognitoActions";
import EditProfileSheet from "./editProfileSheet";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/get-error-message";

export default function AvatarCollapsableMenu() {
  const router = useRouter();
  
  async function onSubmit() {
    await handleSignOut()
      .then(() => {
        router.push("/auth"); // Use push here
        router.refresh();
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
      <Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SheetTrigger>Edit Profile</SheetTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onSubmit} // Trigger logout on click
              className="hover:bg-destructive text-destructive focus:bg-destructive focus:text-white"
            >
              <button>
                <div>Sign Out</div>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SheetContent className="overflow-auto">
          <EditProfileSheet />
        </SheetContent>
      </Sheet>
    </div>
  );
}
