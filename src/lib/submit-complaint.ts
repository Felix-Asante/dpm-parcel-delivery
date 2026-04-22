import { api } from "../utils/api";
import { getApiErrorMessage, getErrorMessage } from "../utils/error";

export type SubmitComplaintResult =
  | { result: unknown }
  | { error: string };

export async function submitComplaint(
  formData: FormData
): Promise<SubmitComplaintResult> {
  const response = await fetch(api.internal.complaint, {
    method: "POST",
    body: formData,
  });

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    return { error: "Invalid response from server. Please try again." };
  }

  if (!response.ok) {
    const d = data as { error?: unknown };
    if (d?.error != null) {
      return { error: getErrorMessage(d.error) };
    }
    return { error: getApiErrorMessage(data) };
  }

  const ok = data as { result?: unknown; error?: unknown };
  if (ok.error != null) {
    return { error: getErrorMessage(ok.error) };
  }
  return { result: ok.result };
}
