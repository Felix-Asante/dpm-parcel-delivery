import {
  BanIcon,
  CheckIcon,
  LoaderIcon,
  PackageCheckIcon,
  TruckIcon,
  UserCheckIcon,
  UserPlusIcon,
  CreditCardIcon,
  Undo2Icon,
  PauseCircleIcon,
  BoxIcon,
  MapIcon,
  MapPinIcon,
  StoreIcon,
  BanknoteIcon,
  type AstroComponent,
} from "@lucide/astro";
import { ShipmentHistoryStatus, ShipmentOptions } from "../constants/enum";

export function removeEmptyValues(obj: Record<string, any>) {
  return Object.entries(obj)
    .filter(([_, value]) => {
      return value !== null && value !== undefined && value !== "";
    })
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, any>
    );
}

export function getShipmentHistoryStatusDisplay(status: string) {
  const statusDisplay: Record<string, string> = {
    [ShipmentHistoryStatus.OUT_FOR_DELIVERY]: "Out for Delivery",
    [ShipmentHistoryStatus.FAILED_DELIVERY_ATTEMPT]: "Failed Delivery Attempt",
    [ShipmentHistoryStatus.DELIVERED]: "Delivered",
    [ShipmentHistoryStatus.RIDER_REASSIGNED]: "Rider Reassigned",
    [ShipmentHistoryStatus.PICKUP_CONFIRMED]: "Pickup Confirmed",
    [ShipmentHistoryStatus.PENDING]: "Pending",
    [ShipmentHistoryStatus.RIDER_ASSIGNED]: "Rider Assigned",
    [ShipmentHistoryStatus.PAYMENT_RECEIVED]: "Payment Received",
    [ShipmentHistoryStatus.RETURNED]: "Returned",
    [ShipmentHistoryStatus.ON_HOLD]: "On Hold",
    [ShipmentHistoryStatus.REPACKAGED]: "Repackaged",
    [ShipmentHistoryStatus.IN_TRANSIT]: "In Transit",
    [ShipmentHistoryStatus.ARRIVED]: "Arrived",
    [ShipmentHistoryStatus.READY_FOR_PICKUP]: "Ready for Pickup",
    [ShipmentHistoryStatus.REFUNDED]: "Refunded",
  };

  return statusDisplay[status] ?? status;
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

export function getIconByShipmentStatus(status: string) {
  const iconDisplay: Record<string, AstroComponent> = {
    [ShipmentHistoryStatus.OUT_FOR_DELIVERY]: TruckIcon,
    [ShipmentHistoryStatus.FAILED_DELIVERY_ATTEMPT]: BanIcon,
    [ShipmentHistoryStatus.DELIVERED]: CheckIcon,
    [ShipmentHistoryStatus.RIDER_REASSIGNED]: UserPlusIcon,
    [ShipmentHistoryStatus.PICKUP_CONFIRMED]: PackageCheckIcon,
    [ShipmentHistoryStatus.PENDING]: LoaderIcon,
    [ShipmentHistoryStatus.RIDER_ASSIGNED]: UserCheckIcon,
    [ShipmentHistoryStatus.PAYMENT_RECEIVED]: CreditCardIcon,
    [ShipmentHistoryStatus.RETURNED]: Undo2Icon,
    [ShipmentHistoryStatus.ON_HOLD]: PauseCircleIcon,
    [ShipmentHistoryStatus.REPACKAGED]: BoxIcon,
    [ShipmentHistoryStatus.IN_TRANSIT]: MapIcon,
    [ShipmentHistoryStatus.ARRIVED]: MapPinIcon,
    [ShipmentHistoryStatus.READY_FOR_PICKUP]: StoreIcon,
    [ShipmentHistoryStatus.REFUNDED]: BanknoteIcon,
  };

  return iconDisplay[status] ?? status;
}

export function getDescriptionByShipmentStatus(status: string) {
  const descriptionDisplay: Record<string, string> = {
    [ShipmentHistoryStatus.OUT_FOR_DELIVERY]:
      "Rider/Driver has picked your package for final delivery.",
    [ShipmentHistoryStatus.FAILED_DELIVERY_ATTEMPT]:
      "Delivery attempt was Unsuccessful",
    [ShipmentHistoryStatus.DELIVERED]: "Customer has received the package",
    [ShipmentHistoryStatus.RIDER_REASSIGNED]:
      "A new rider has been assigned to your order",
    [ShipmentHistoryStatus.PICKUP_CONFIRMED]:
      "Package collected from customer successfully",
    [ShipmentHistoryStatus.PENDING]: "Your delivery request is pending",
    [ShipmentHistoryStatus.RIDER_ASSIGNED]:
      "A rider has been assigned to your order",
    [ShipmentHistoryStatus.PAYMENT_RECEIVED]:
      "Payment for delivery has been received",
    [ShipmentHistoryStatus.RETURNED]:
      "Package has being returned to pickup point",
    [ShipmentHistoryStatus.ON_HOLD]: "Process is on Hold",
    [ShipmentHistoryStatus.REPACKAGED]: "Your package has being repackaged",
    [ShipmentHistoryStatus.IN_TRANSIT]:
      "Package is on its way to the destination city",
    [ShipmentHistoryStatus.ARRIVED]:
      "Package has reached the receiving city office.",
    [ShipmentHistoryStatus.READY_FOR_PICKUP]:
      "Package is ready for Pickup at Destination city office",
    [ShipmentHistoryStatus.REFUNDED]:
      "Payment for delivery has being refunded successfully",
  };

  return descriptionDisplay[status] ?? status;
}
