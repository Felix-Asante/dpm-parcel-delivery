export const prerender = false;

import type { APIRoute } from "astro";
import { categoryRequiresPhoto } from "../../constants/complaints";
import { api } from "../../utils/api";
import { getApiErrorMessage, getErrorMessage } from "../../utils/error";
import { complaintFieldSchema } from "../../validations";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_IMAGE_RE = /\.(jpe?g|png|gif)$/i;

function isValidImageFile(file: File): boolean {
  if (file.size === 0) return false;
  if (file.size > MAX_IMAGE_BYTES) return false;
  const name = file.name;
  if (!name || !ALLOWED_IMAGE_RE.test(name)) return false;
  return true;
}

function formString(
  data: FormData,
  key: string
): string {
  const v = data.get(key);
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (v instanceof File) return "";
  return String(v);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const pictureEntry = data.get("picture");
    const pictureFile =
      pictureEntry instanceof File && pictureEntry.size > 0
        ? pictureEntry
        : null;

    const raw = {
      fullName: formString(data, "fullName"),
      phone: formString(data, "phone"),
      trackingNumber: formString(data, "trackingNumber"),
      category: formString(data, "category"),
      issue: formString(data, "issue"),
    };

    const parsed = complaintFieldSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg =
        Object.values(first).flat()[0] ?? "Please check the form and try again.";
      return new Response(JSON.stringify({ error: msg }), { status: 400 });
    }

    const { category } = parsed.data;
    if (categoryRequiresPhoto(category) && !pictureFile) {
      return new Response(
        JSON.stringify({
          error:
            "A photo is required for this type of issue. Please add a clear image (JPG, PNG, or GIF).",
        }),
        { status: 400 }
      );
    }

    if (pictureFile && !isValidImageFile(pictureFile)) {
      return new Response(
        JSON.stringify({
          error:
            "Image must be JPG, PNG, or GIF, under 10 MB, and not empty.",
        }),
        { status: 400 }
      );
    }

    const outgoing = new FormData();
    outgoing.append("fullName", parsed.data.fullName);
    outgoing.append("phone", parsed.data.phone);
    outgoing.append("trackingNumber", parsed.data.trackingNumber);
    outgoing.append("category", parsed.data.category);
    outgoing.append("issue", parsed.data.issue);
    if (pictureFile) {
      outgoing.append("picture", pictureFile);
    }

    const response = await fetch(api.complaints.root(), {
      method: "POST",
      body: outgoing,
    });

    const result: unknown = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errMsg = getApiErrorMessage(result, "We could not submit your complaint. Please try again.");
      return new Response(JSON.stringify({ error: errMsg }), {
        status: response.status >= 500 ? 500 : 400,
      });
    }

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error({ error });
    return new Response(
      JSON.stringify({ error: getErrorMessage(error) }),
      { status: 500 }
    );
  }
};
