export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = "Something went wrong"
): string => {
  let message: string;
  if (error instanceof Error) {
    message = error?.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error?.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = defaultMessage;
  }

  return message;
};
