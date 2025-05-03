import { Button, Form, Input } from "@heroui/react";
import SelectInput from "../../components/ui/SelectInput";
import { AllowedCities } from "../../constants/enum";

export function HomePickupForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pickupCity = formData.get("pickupCity");
    const pickupArea = formData.get("pickupArea");
    const senderPhone = formData.get("senderPhone");

    const searchParams = new URLSearchParams();
    searchParams.set("pickupCity", pickupCity as string);
    searchParams.set("pickupArea", pickupArea as string);
    searchParams.set("senderPhone", senderPhone as string);

    window.location.href = `/delivery?${searchParams.toString()}`;
  };

  return (
    <div>
      <h2 className="text-xl text-primary font-bold">Schedule Pickup Now !</h2>
      <Form onSubmit={handleSubmit} method="post" className="mt-5 w-full">
        <div className="grid gap-4 w-full">
          <SelectInput
            options={Object.values(AllowedCities).map((city) => ({
              label: city,
              value: city,
            }))}
            label="Pickup City"
            placeholder="Select pickup city"
            size="lg"
            isRequired
            name="pickupCity"
          />
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

          <Button
            type="submit"
            variant="solid"
            radius="full"
            color="primary"
            size="lg"
            className="w-full mt-3"
            disableRipple
          >
            Schedule Now
          </Button>
        </div>
      </Form>
    </div>
  );
}
