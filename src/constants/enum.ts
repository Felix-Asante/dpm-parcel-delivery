export enum Modals {
  TRACK_DELIVERY = "track-delivery",
}

export enum ModeOfShipment {
  Bike = "Bike",
  Aboboyaa = "Aboboyaa",
  Van = "Van",
}

export enum ShipmentOptions {
  STANDARD = "standard_delivery",
  EXPRESS = "express_delivery",
  SPECIAL = "special_delivery",
  BULK = "bulk_delivery",
}

export enum ShipmentHistoryStatus {
  OUT_FOR_DELIVERY = "out_for_delivery",
  FAILED_DELIVERY_ATTEMPT = "failed_delivery_attempt",
  DELIVERED = "delivered",
  RIDER_REASSIGNED = "rider_reassigned",
  PICKUP_CONFIRMED = "pickup_confirmed",
  PENDING = "pending",
  RIDER_ASSIGNED = "rider_assigned",
}
