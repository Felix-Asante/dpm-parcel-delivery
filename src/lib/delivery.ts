import type { Order } from "../types/order";
import { api } from "../utils/api";
import { getErrorMessage } from "../utils/error";

interface OrderByReferenceResponse {
  data: Order | null;
  error: string | null;
}

export async function getDeliveryOrderByReference(
  reference: string
): Promise<OrderByReferenceResponse> {
  try {
    const response = await fetch(api.shipping.get_by_reference(reference));
    const data = await response.json();
    if (!response.ok) {
      return { data: null, error: getErrorMessage(data?.message?.error) };
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
}
