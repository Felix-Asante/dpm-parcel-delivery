import { z } from "zod";
import { COMPLAINT_CATEGORY_ZOD } from "../constants/complaints";
import { AllowedCities } from "../constants/enum";
import { isValidPhoneNumberInput } from "../utils/phone";

export const complaintFieldSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name")
    .max(200, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number")
    .max(20, "Phone number is too long")
    .refine(isValidPhoneNumberInput, {
      message:
        "Enter a valid phone number. Examples: 0244 123 456 for Ghana, or +233 24 123 4567",
    }),
  trackingNumber: z
    .string()
    .trim()
    .min(1, "Order or tracking number is required")
    .max(100, "That reference looks too long"),
  category: z.enum(COMPLAINT_CATEGORY_ZOD, {
    message: "Please choose a category",
  }),
  issue: z
    .string()
    .trim()
    .min(5, "Please describe what happened in at least 5 characters")
    .max(8000, "Description is too long — please shorten it"),
});

export type ComplaintFieldInput = z.infer<typeof complaintFieldSchema>;

export const deliverySchema = z.object({
  pickupArea: z.string().min(1, "Pickup area is required"),
  pickupCity: z.enum([
    AllowedCities.Nkawkaw,
    AllowedCities.Koforidua,
    AllowedCities.Donkorkrom,
  ]),
  senderPhone: z.string().min(10, "Pickup telephone is required"),
  dropOffArea: z.string().min(1, "Delivery area is required"),
  dropOffCity: z.enum([
    AllowedCities.Nkawkaw,
    AllowedCities.Koforidua,
    AllowedCities.Donkorkrom,
  ]),
  recipientPhone: z.string().min(10, "Recipient telephone is required"),
  pickupDate: z.coerce.date().optional(),
  dropOffDate: z.coerce.date().optional(),
  shipmentOption: z.enum([
    "standard_delivery",
    "express_delivery",
    "special_delivery",
    "bulk_delivery",
  ]),
  modeOfShipment: z.enum(["Aboboyaa", "Bike", "Van"]),
  extraInformation: z.string().optional(),
});

export type DeliverySchemaInput = z.infer<typeof deliverySchema>;
