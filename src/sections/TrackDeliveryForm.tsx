import { Button, Form, Input } from "@heroui/react";

interface TrackDeliveryFormProps {
  onClose: () => void;
}

export default function TrackDeliveryForm({ onClose }: TrackDeliveryFormProps) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const referenceNumber = formData.get("referenceNumber");
    // navigate to reference page
    window.location.href = `/track-delivery/${referenceNumber}`;
    onClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Track your delivery</h2>
      <p className="text-secondary">
        Enter your delivery reference number to track your delivery.
      </p>
      <Form onSubmit={onSubmit} className="mt-7 space-y-4">
        <Input
          isRequired
          errorMessage="Reference number is required"
          label="Reference number"
          labelPlacement="outside"
          name="referenceNumber"
          placeholder="e.g. DPM25PD2020"
          type="text"
          variant="bordered"
          size="lg"
          radius="sm"
        />
        <Button
          type="submit"
          disableRipple
          variant="solid"
          color="primary"
          radius="sm"
        >
          Track Delivery
        </Button>
      </Form>
    </div>
  );
}
