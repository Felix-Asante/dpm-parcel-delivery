import { z } from "zod";
import { AllowedCities } from "../constants/enum";

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
