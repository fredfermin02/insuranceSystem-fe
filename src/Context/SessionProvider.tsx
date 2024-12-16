import React, { createContext, useContext, useEffect, useState } from "react";
import { Hub } from "aws-amplify/utils";
import { fetchAuthSession, AuthSession } from "aws-amplify/auth";

const SessionContext = createContext<AuthSession | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession>();
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getSession() {
      console.log('llamo el api')
      const session = await fetchAuthSession();
      setSession(session);
    }

    getSession();

    // Start listening for auth events
    const hubListenerCancelToken = Hub.listen("auth", async (data) => {
      const { event } = data.payload;

      if (event === "signedIn" || event === "signedOut" || event === "tokenRefresh") {
        console.log(`Auth event detected: ${event}`);
        await getSession();
      }
    });

    // Cleanup the listener on unmount
    return () => {
      hubListenerCancelToken(); // Stops listening to events
    };
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useUserSession() {
  return useContext(SessionContext);
}
