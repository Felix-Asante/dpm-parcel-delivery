import {
  addToast,
  Button,
  DatePicker,
  Form,
  Input,
  RadioGroup,
  Textarea,
  ToastProvider,
} from "@heroui/react";
import { useState } from "react";
import { CustomRadio } from "../../components/ui/CustomRadio";
import SelectInput from "../../components/ui/SelectInput";
import { ModeOfShipment } from "../../constants/data";
import { createDeliveryOrder } from "../../lib/create-delivery-order";
import { showDeliveryForm } from "../../store/global";
import { getErrorMessage } from "../../utils/error";
import { useStore } from "@nanostores/react";

export function DeliveryForm() {
  const [pending, setPending] = useState(false);
  const $showDeliveryForm = useStore(showDeliveryForm);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      const formData = new FormData(e.currentTarget);

      const result = await createDeliveryOrder(formData);

      if (result?.error) {
        addToast({
          title: "Quote Error",
          description: getErrorMessage(result?.error),
          color: "danger",
        });
        return;
      }
      showDeliveryForm.set(!$showDeliveryForm);
    } catch (error) {
      addToast({
        title: "Quote Error",
        description: getErrorMessage(error),
        color: "danger",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <Form method="post" onSubmit={onSubmit}>
      <div className="grid lg:grid-cols-2 gap-8 2xl:gap-16 w-full my-12 mb-20">
        <div className="flex flex-col gap-y-4 w-full">
          <Input
            isRequired
            errorMessage="Pickup address is required"
            label="Pickup Address"
            labelPlacement="outside"
            name="pickupAddress"
            placeholder="Enter pickup address"
            type="text"
            variant="bordered"
            size="lg"
            radius="sm"
          />
          <Input
            isRequired
            errorMessage="Pickup telephone is required"
            label="Pickup Telephone"
            labelPlacement="outside"
            name="senderPhone"
            placeholder="Enter pickup telephone"
            variant="bordered"
            size="lg"
            radius="sm"
            type="tel"
            inputMode="tel"
          />

          <Input
            isRequired
            errorMessage="Delivery address is required"
            label="Delivery Address"
            labelPlacement="outside"
            name="dropOffAddress"
            placeholder="Enter delivery address"
            type="text"
            variant="bordered"
            size="lg"
            radius="sm"
          />
          <Input
            isRequired
            errorMessage="Recipient telephone is required"
            label="Recipient Telephone"
            labelPlacement="outside"
            name="recipientPhone"
            placeholder="Enter recipient telephone"
            variant="bordered"
            size="lg"
            radius="sm"
            type="tel"
            inputMode="tel"
          />
          <DatePicker
            label="Pickup Date"
            size="lg"
            variant="bordered"
            showMonthAndYearPickers
            labelPlacement="outside"
            radius="sm"
            hideTimeZone
            name="pickupDate"
          />
          <DatePicker
            label="Delivery Date"
            size="lg"
            variant="bordered"
            showMonthAndYearPickers
            labelPlacement="outside"
            radius="sm"
            hideTimeZone
            name="dropOffDate"
          />
        </div>
        <div>
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-y-6">
            <RadioGroup
              label="Shipping Method"
              name="shipmentOption"
              isRequired
            >
              <div className="grid grid-cols-2 gap-4">
                <CustomRadio value="standard_delivery">Standard</CustomRadio>
                <CustomRadio value="express_delivery">Express</CustomRadio>
                <CustomRadio value="special_delivery">Special</CustomRadio>
                <CustomRadio value="bulk_delivery">Bulk</CustomRadio>
              </div>
            </RadioGroup>
            <SelectInput
              options={ModeOfShipment}
              label="Mode of Shipment"
              placeholder="Select mode of shipment"
              size="lg"
              isRequired
              name="modeOfShipment"
            />
            <Textarea
              label="Description"
              placeholder="Extra information"
              name="extraInformation"
              labelPlacement="outside"
              variant="bordered"
              size="lg"
              radius="sm"
            />
          </div>
          <Button
            type="submit"
            variant="solid"
            radius="sm"
            color="primary"
            size="lg"
            className="w-full mt-6"
            isLoading={pending}
            disableRipple
          >
            Get Your Quote Now
          </Button>
        </div>
      </div>
      <ToastProvider placement="top-center" />
    </Form>
  );
}
