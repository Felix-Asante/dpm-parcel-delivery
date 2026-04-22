import { isValidPhoneNumber } from "libphonenumber-js/min";

export function isValidPhoneNumberInput(value: string): boolean {
  const v = value.trim();
  if (!v) {
    return false;
  }
  if (v.startsWith("+")) {
    return isValidPhoneNumber(v);
  }
  return isValidPhoneNumber(v, "GH");
}
