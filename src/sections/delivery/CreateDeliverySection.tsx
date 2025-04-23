import { showDeliveryForm } from "../../store/global";
import { useStore } from "@nanostores/react";
import { DeliveryForm } from "../delivery/DeliveryForm";
import { Success } from "./Success";

export function CreateDeliverySection() {
  const $showDeliveryForm = useStore(showDeliveryForm);
  return (
    <div className="mt-10 lg:max-w-6xl 2xl:max-w-7xl mx-auto px-8 lg:px-3">
      {$showDeliveryForm ? (
        <div>
          <div className="md:w-[60%]">
            <h2 className="text-xl lg:text-2xl font-bold">
              📦 Place Your Delivery Order – Fast & Easy!
            </h2>
            <p className="mt-2">
              We make it simple to get your items delivered right to your
              doorstep. Just fill out the form below and we'll handle the rest.
            </p>
          </div>
          <DeliveryForm />
        </div>
      ) : (
        <Success />
      )}
    </div>
  );
}
