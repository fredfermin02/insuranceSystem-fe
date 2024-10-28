'use client'

import { useAppSelector } from "@/redux/store"
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";


export default function AuthLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const authState = useAppSelector((state)=>state.auth.authState);
    useLayoutEffect(() => {
      if (authState) {
        redirect("/dashboard");
      }
    }, []);
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
   
        {children}
      </section>
    )
  }