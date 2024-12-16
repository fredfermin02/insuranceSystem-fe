export function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    // Check if the error object has a name and it's "AccessDeniedException"
    if ("name" in error && (error as Error).name === "AccessDeniedException") {
      return "Access is denied. You do not have the required permissions.";
    }
    if ("message" in error) {
      return String((error as any).message);
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An error occurred";
}
