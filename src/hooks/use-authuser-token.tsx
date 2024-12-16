"use client"
import {
  AuthSession,
    fetchAuthSession,

  } from "aws-amplify/auth";
  import { useEffect, useState } from "react";
  
  export default function useUserSession() {
    const [session, setSession] = useState<AuthSession>();

    useEffect(() => {
      async function getSession() {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          return;
        }
        setSession(session);
      }
  
      getSession();
    }, []);
    return session;
  }