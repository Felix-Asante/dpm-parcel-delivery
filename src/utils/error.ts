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

/**
 * Parse typical NestJS / JSON error responses from the backend.
 */
export function getApiErrorMessage(
  result: unknown,
  defaultMessage: string = "Something went wrong. Please try again."
): string {
  if (result && typeof result === "object" && "message" in result) {
    const m = (result as { message: unknown }).message;
    if (Array.isArray(m)) {
      return m.map(String).filter(Boolean).join(". ");
    }
    if (typeof m === "string" && m.trim()) {
      return m;
    }
  }
  if (result && typeof result === "object" && "error" in result) {
    return getErrorMessage((result as { error: unknown }).error, defaultMessage);
  }
  return defaultMessage;
}
