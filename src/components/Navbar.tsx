import { Button, Modal, ModalBody, ModalContent } from "@heroui/react";
import { cn } from "../utils/style";
import { Modals } from "../constants/enum";
import { useState } from "react";
import TrackDeliveryForm from "../sections/TrackDeliveryForm";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [activeModal, setActiveModal] = useState<Modals | null>(null);

  const handleOpen = (modal: Modals) => {
    setActiveModal(modal);
  };

  const handleClose = () => {
    setActiveModal(null);
  };

  const activeModalContent = {
    [Modals.TRACK_DELIVERY]: <TrackDeliveryForm onClose={handleClose} />,
  }[activeModal || Modals.TRACK_DELIVERY];

  return (
    <nav className={cn("bg-secondary h-16", className)}>
      <div className="lg:max-w-6xl mx-auto p-3 flex items-center justify-between h-full">
        <a href="/" className="text-white font-bold text-xl md:text-2xl">
          DPM <span className="text-primary">Deliveries</span>{" "}
        </a>
        <ul className="flex items-center gap-4">
          <a href="/" className="text-white font-bold text-sm">
            Home
          </a>
          <li>
            <Button
              size="md"
              variant="light"
              disableRipple
              onPress={() => handleOpen(Modals.TRACK_DELIVERY)}
              radius="sm"
              className="text-white font-bold hover:!bg-transparent"
            >
              Track delivery
            </Button>
          </li>
        </ul>
      </div>

      <Modal isOpen={!!activeModal} onClose={handleClose} size="lg">
        <ModalContent>
          <ModalBody>{activeModalContent}</ModalBody>
        </ModalContent>
      </Modal>
    </nav>
  );
}
