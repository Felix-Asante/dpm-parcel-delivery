import { Form, Input } from "@heroui/react";

export function TrackingDeliveryForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trackingReference = formData.get("trackingReference");

    window.location.href = `/track-delivery/${trackingReference}`;
  };

  return (
    <div className="mt-8 2xl:w-[70%]">
      <Form
        className="bg-white p-2 rounded-full"
        onSubmit={handleSubmit}
        method="post"
      >
        <div className="flex items-center gap-2 w-full">
          <input
            name="trackingReference"
            type="text"
            placeholder="Enter Tracking Reference"
            className="flex-1 border-0 outline-none !bg-transparent"
            required
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 transition-colors rounded-full p-2 px-3"
          >
            Track your order
          </button>
        </div>
      </Form>
    </div>
  );
}
