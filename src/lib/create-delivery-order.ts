import { api } from "../utils/api";

export async function createDeliveryOrder(payload: FormData) {
  const response = await fetch(api.internal.delivery, {
    method: "POST",
    body: payload,
  });
  return response.json();
}
