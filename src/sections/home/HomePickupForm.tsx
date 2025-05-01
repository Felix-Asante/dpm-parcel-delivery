import { Button, Form, Input } from "@heroui/react";

export function HomePickupForm() {
  return (
    <div>
      <h2 className="text-xl text-primary font-bold">Schedule Pickup Now !</h2>
      <Form method="post" className="mt-5 w-full">
        <div className="grid gap-4 w-full">
          <Input
            isRequired
            errorMessage="Pickup area is required"
            label="Pickup Area"
            labelPlacement="outside"
            name="pickupArea"
            placeholder="Please enter your precise area eg: Nkawkaw - Around Life FM"
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
            errorMessage="Delivery area is required"
            label="Delivery Area"
            labelPlacement="outside"
            name="dropOffArea"
            placeholder="Please enter your precise area eg: Nkawkaw - Around Life FM"
            type="text"
            variant="bordered"
            size="lg"
            radius="sm"
          />

          <Button
            type="submit"
            variant="solid"
            radius="full"
            color="primary"
            size="lg"
            className="w-full mt-3"
            disableRipple
          >
            Get Your Quote Now
          </Button>
        </div>
      </Form>
    </div>
  );
}
