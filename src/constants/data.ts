import {
  HandCoinsIcon,
  PackageCheckIcon,
  ShieldCheckIcon,
} from "@lucide/astro";

export const ModeOfShipment = [
  { value: "Aboboyaa", label: "Aboboyaa" },
  { value: "Bike", label: "Bike" },
  { value: "Van", label: "Van" },
];

export const WhyWeAreTrustedData = [
  {
    title: "Fast Pickup and delivery",
    description:
      "From small packages to large freight, we deliver with speed and precision that keeps your business moving forward.",
    icon: PackageCheckIcon,
  },
  {
    title: "Total Package Security",
    description:
      "Advanced tracking and handling protocols ensure your items arrive exactly as they left, every single time.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Affordable Pricing",
    description:
      "No hidden fees, no surprises. Our transparent pricing ensures you get reliable delivery service that fits your budget. Whether you're a small business or an individual sending packages occasionally.",
    icon: HandCoinsIcon,
  },
];

export const DeliveryMadeEasyData = [
  {
    title: "Book a Pickup",
    description:
      "Tell us what needs moving and when. Our user-friendly booking system makes scheduling effortless.",
  },
  {
    title: "We Collect & Deliver",
    description:
      "Our friendly professionals arrive on schedule, handling your items with the care they deserve. Sit back as we take the load off your shoulders—literally!",
  },
  {
    title: "Relax & Enjoy",
    description:
      "Enjoy the peace of mind that comes with our real-time tracking. It's like having a GPS for your precious cargo, updating you every step of the journey.",
  },
];
