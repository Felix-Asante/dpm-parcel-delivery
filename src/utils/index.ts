import { ShipmentHistoryStatus, ShipmentOptions } from "../constants/enum";

export function removeEmptyValues(obj: Record<string, any>) {
  return Object.entries(obj)
    .filter(([_, value]) => {
      return value !== null && value !== undefined && value !== "";
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);
}

export function getShipmentHistoryStatusDisplay(status: string) {
  if (status === ShipmentHistoryStatus.OUT_FOR_DELIVERY) {
    return "Out for Delivery";
  } else if (status === ShipmentHistoryStatus.FAILED_DELIVERY_ATTEMPT) {
    return "Failed Delivery Attempt";
  } else if (status === ShipmentHistoryStatus.DELIVERED) {
    return "Delivered";
  } else if (status === ShipmentHistoryStatus.RIDER_REASSIGNED) {
    return "Rider Reassigned";
  } else if (status === ShipmentHistoryStatus.PICKUP_CONFIRMED) {
    return "Pickup Confirmed";
  } else if (status === ShipmentHistoryStatus.PENDING) {
    return "Pending";
  } else if (status === ShipmentHistoryStatus.RIDER_ASSIGNED) {
    return "Rider Assigned";
  }
  return status;
}

export function getShipmentOptionDisplay(option: string) {
  if (option === ShipmentOptions.STANDARD) {
    return "Standard Delivery";
  } else if (option === ShipmentOptions.EXPRESS) {
    return "Express Delivery";
  } else if (option === ShipmentOptions.SPECIAL) {
    return "Special Delivery";
  } else if (option === ShipmentOptions.BULK) {
    return "Bulk Delivery";
  }
  return option;
}
