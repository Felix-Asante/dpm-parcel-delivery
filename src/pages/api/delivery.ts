export const prerender = false;

import type { APIRoute } from "astro";
import { api } from "../../utils/api";
import { deliverySchema } from "../../validations";
import { getErrorMessage } from "../../utils/error";
import { removeEmptyValues } from "../../utils";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    const payload = Object.fromEntries(data);

    const validatedData = deliverySchema.parse(removeEmptyValues(payload));

    const response = await fetch(api.shipping.root(), {
      method: "POST",
      body: JSON.stringify(validatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log({ result });
      return new Response(
        JSON.stringify({ error: getErrorMessage(result?.message?.error) }),
        {
          status: 400,
        }
      );
    }

    return new Response(JSON.stringify({ result }), {
      status: 200,
    });
  } catch (error) {
    console.log({ error });
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 400,
    });
  }
};
