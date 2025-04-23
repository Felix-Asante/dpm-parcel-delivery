import { z } from "zod";

export const deliverySchema = z.object({
  pickupAddress: z.string().min(1, "Pickup address is required"),
  senderPhone: z.string().min(10, "Pickup telephone is required"),
  dropOffAddress: z.string().min(1, "Delivery address is required"),
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
