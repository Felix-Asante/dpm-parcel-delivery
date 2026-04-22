/** Aligned with DPM-delivery-api `ComplaintCategory` (src/utils/enums.ts) */
export const ComplaintCategory = {
  DELAY: "delay",
  DAMAGED_ITEM: "damaged_item",
  RIDER_CONTACT: "rider_contact",
  INCORRECT_STATUS_UPDATE: "incorrect_status_update",
  MISSING_ITEM: "missing_item",
  SAFETY_TRAFFIC_VIOLATIONS: "safety_traffic_violations",
  REFUND_REQUEST: "refund_request",
  INCORRECT_ADDRESS: "incorrect_address",
  ITEM_SWAP: "item_swap",
} as const;

export type ComplaintCategoryValue =
  (typeof ComplaintCategory)[keyof typeof ComplaintCategory];

export const COMPLAINT_CATEGORIES_REQUIRING_PICTURE: ComplaintCategoryValue[] =
  [ComplaintCategory.DAMAGED_ITEM, ComplaintCategory.ITEM_SWAP];

/** Tuple for `z.enum()` validation */
export const COMPLAINT_CATEGORY_ZOD = [
  ComplaintCategory.DELAY,
  ComplaintCategory.DAMAGED_ITEM,
  ComplaintCategory.RIDER_CONTACT,
  ComplaintCategory.INCORRECT_STATUS_UPDATE,
  ComplaintCategory.MISSING_ITEM,
  ComplaintCategory.SAFETY_TRAFFIC_VIOLATIONS,
  ComplaintCategory.REFUND_REQUEST,
  ComplaintCategory.INCORRECT_ADDRESS,
  ComplaintCategory.ITEM_SWAP,
] as const;

export const COMPLAINT_CATEGORY_OPTIONS: {
  value: ComplaintCategoryValue;
  label: string;
  hint: string;
}[] = [
  {
    value: ComplaintCategory.DELAY,
    label: "Delivery took longer than expected",
    hint: "Delays, missed time windows, or no updates when the package was late.",
  },
  {
    value: ComplaintCategory.DAMAGED_ITEM,
    label: "Item arrived damaged",
    hint: "A photo of the item and packaging helps us process this quickly.",
  },
  {
    value: ComplaintCategory.ITEM_SWAP,
    label: "Wrong item was delivered",
    hint: "Please include a clear photo of what you received so we can verify.",
  },
  {
    value: ComplaintCategory.MISSING_ITEM,
    label: "Missing item or contents",
    hint: "Part of the order was missing or the package was empty when opened.",
  },
  {
    value: ComplaintCategory.RIDER_CONTACT,
    label: "Problem reaching the rider or driver",
    hint: "Could not get through, rude behaviour, or unprofessional service.",
  },
  {
    value: ComplaintCategory.INCORRECT_STATUS_UPDATE,
    label: "Tracking or status is wrong",
    hint: "The app shows a status that does not match what really happened.",
  },
  {
    value: ComplaintCategory.SAFETY_TRAFFIC_VIOLATIONS,
    label: "Safety or traffic concern",
    hint: "Reckless riding, road safety, or other serious service concerns.",
  },
  {
    value: ComplaintCategory.REFUND_REQUEST,
    label: "Refund or compensation request",
    hint: "You believe you are owed a refund or credit for a service issue.",
  },
  {
    value: ComplaintCategory.INCORRECT_ADDRESS,
    label: "Delivered to the wrong place",
    hint: "Package left at a different address or location than you expected.",
  },
];

export function categoryRequiresPhoto(value: string): boolean {
  return COMPLAINT_CATEGORIES_REQUIRING_PICTURE.includes(
    value as ComplaintCategoryValue
  );
}
