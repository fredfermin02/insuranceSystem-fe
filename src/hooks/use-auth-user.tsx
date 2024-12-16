"use client"
import {
  AuthSession,
    fetchAuthSession,
    fetchUserAttributes,
    getCurrentUser,
  } from "aws-amplify/auth";
  import { useEffect, useState } from "react";
  
  export default function useAuthUser() {
    const [user, setUser] = useState<Record<string, any>>();
    const [token, setToken] = useState<AuthSession>();
    useEffect(() => {
      async function getUser() {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          return;
        }
        console.log('session')
        console.log(session.tokens.idToken?.toString());
        
        const user = {
          ...(await getCurrentUser()),
          ...(await fetchUserAttributes()),
          isAdmin: false,
        };
        const groups = session.tokens.accessToken.payload["cognito:groups"];
        // @ts-ignore
        user.isAdmin = Boolean(groups && groups.includes("Admins"));
        setUser(user);
        setToken(session)
      }
  
      getUser();
    }, []);
   
    return user
  }