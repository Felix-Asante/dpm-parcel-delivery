import { API_BASE_URL } from "astro:env/client";

export const api = {
  baseUrl: API_BASE_URL,
  shipping: {
    root: () => `${api.baseUrl}/shipping`,
    get_by_reference: (referenceId: string) =>
      `${api.baseUrl}/shipping/reference/${referenceId}`,
  },
  complaints: {
    root: () => `${api.baseUrl}/complaints`,
  },
  internal: {
    delivery: "/api/delivery",
    complaint: "/api/complaint",
  },
};
