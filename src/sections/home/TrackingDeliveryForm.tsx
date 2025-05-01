export function TrackingDeliveryForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="mt-8 2xl:w-[70%]">
      <form
        className="bg-white p-2 rounded-full flex items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter Tracking Reference"
          className="flex-1 border-0 outline-none"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 transition-colors rounded-full p-2"
        >
          Track your order
        </button>
      </form>
    </div>
  );
}
