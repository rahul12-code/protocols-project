import React from "react";
import ProtocolTable from "../components/ProtocolTable";
import { NewProtocolModal } from "../components/Modals/NewProtocolModal";
import { useState } from "react";
import { CancelWarningModal } from "../components/Modals/CancelWarningModal";

const ProtocolsPage = () => {
  const [isOpen, setOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [allProtocols, setAllProtocols] = useState([]);
  const handleModalOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleCancelModalOpen = () => {
    setIsCancelOpen((prev) => !prev);
  };

  return (
    <>
      <ProtocolTable
        handleModalOpen={handleModalOpen}
        allProtocols={allProtocols}
        setAllProtocols={setAllProtocols}
      />
      <NewProtocolModal
        open={isOpen}
        onClose={() => setIsCancelOpen(true)}
        isCancelOpen={isCancelOpen}
        handleModalIsOpen={handleModalOpen}
        setAllProtocols={setAllProtocols}
      />
      <CancelWarningModal
        isCancelOpen={isCancelOpen}
        handleCancelModalOpen={handleCancelModalOpen}
        handleModalOpen={handleModalOpen}
      />
    </>
  );
};

export default ProtocolsPage;
