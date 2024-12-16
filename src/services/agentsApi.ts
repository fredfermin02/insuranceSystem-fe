"use client"
import { useUserSession } from "@/Context/SessionProvider";
import axiosClient from "@/api/axiosClient";

const fetchAllUsers = async () => {
    const session  = useUserSession();
    if (!session?.tokens?.idToken) {
      throw new Error("User session token not available");
    }
  
    try {
      const response = await axiosClient.get("", {
        headers: {
          Authorization: `Bearer ${session.tokens.idToken}`,
        },
      });
      console.log("User data:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

export default fetchAllUsers;
