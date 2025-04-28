export function Success() {
  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-bold">
        🎉 Your Delivery Request is Confirmed!
      </h2>
      <p className="mt-2">We&apos;ve Got It – Thank You for Trusting Us!</p>
      <div className="mt-10 border-t pt-4 flex items-center divide-x gap-4">
        <p className="text-small">
          Call us now at{" "}
          <a
            href="tel:+233554436269"
            className="hover:underline hover:text-primary"
          >
            +233 55 443 6269
          </a>{" "}
          or email{" "}
          <a
            href="mailto:support@yourdelivery.com"
            className="hover:underline hover:text-primary"
          >
            support@yourdelivery.com
          </a>
        </p>
        {/* <a
          href="/track-delivery"
          className="px-2 text-small hover:underline hover:text-primary"
        >
          Track Your Shipment
        </a> */}
      </div>
    </div>
  );
}
