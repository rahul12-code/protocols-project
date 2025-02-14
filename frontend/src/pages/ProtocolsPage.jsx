import React, { use } from "react";
import ProtocolTable from "../components/ProtocolTable";
import { NewProtocolModal } from "../components/Modals/NewProtocolModal";
import { useState } from "react";
import { CancelWarningModal } from "../components/Modals/CancelWarningModal";

const ProtocolsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [allProtocols, setAllProtocols] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(null); // New state to store selected protocol

  const handleModalOpen = (protocol = null) => {
    setSelectedProtocol(protocol); // Store the selected protocol data when editing
    setIsModalOpen((prev) => !prev);
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
        setIsEdit={setIsEdit}
      />
      <NewProtocolModal
        open={isModalOpen}
        onClose={() => setIsCancelOpen(true)}
        isEdit={isEdit}
        handleModalIsOpen={handleModalOpen}
        allProtocols={allProtocols}
        setAllProtocols={setAllProtocols}
        selectedProtocol={selectedProtocol}
      />
      <CancelWarningModal
        isCancelOpen={isCancelOpen}
        handleCancelModalOpen={handleCancelModalOpen}
        handleModalOpen={handleModalOpen}
        setIsEdit={setIsEdit}
      />
    </>
  );
};

export default ProtocolsPage;
