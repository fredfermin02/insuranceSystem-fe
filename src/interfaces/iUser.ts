export interface User {
    email?: string; // Make email optional as well
    userId: string; // If this is the unique identifier, we keep it required
    username: string;
    attributes?: Record<string, any>; // Allow flexibility for other attributes
    isAdmin: boolean;

  }