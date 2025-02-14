import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Divider } from "@mui/material";
import { newProtocolStyles } from "./NewProtocolStyles";
import { ProtocolModalItems } from "./components/ProtocolModalItems";
import { createNewProtocol } from "../../services/post/createProtocol";
import { updateProtocol } from "../../services/patch/updateProtocol";

export function NewProtocolModal({
  open,
  onClose,
  handleModalIsOpen,
  allProtocols,
  setAllProtocols,
  selectedProtocol,
}) {
  const [selectedRoles, setSelectedRoles] = useState({});
  const [protocolCode, setProtocolCode] = useState("");

  useEffect(() => {
    if (selectedProtocol) {
      setSelectedRoles({
        ra_lead: selectedProtocol.ra_lead || [],
        clinical_labelling_manager:
          selectedProtocol.clinical_labelling_manager || [],
        cta_sm: selectedProtocol.cta_sm || [],
        cta_associate: selectedProtocol.cta_associate || [],
        study_lead: selectedProtocol.study_lead || [],
      });
      setProtocolCode(selectedProtocol.protocol_key);
    } else {
      setSelectedRoles({});
      setProtocolCode("");
    }
  }, [open, selectedProtocol]);

  const handleRoleChange = (event, role) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [role.apiCode]: Array.isArray(event.target.value)
        ? event.target.value
        : event.target.value.split(","),
    }));
  };

  const handleProtocolChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Keeps only alphanumeric characters
    setProtocolCode(sanitizedValue);
  };

  const handleOnSave = async () => {
    const protocol = {
      protocol_key: protocolCode,
      ...selectedRoles,
    };
    console.log("Saving Protocol:", protocol);

    const existingProtocol = allProtocols.find(
      (p) => p.protocol_key === protocolCode
    );

    try {
      if (existingProtocol) {
        // Update existing protocol in the database
        await updateProtocol(protocol);
      } else {
        // Create a new protocol in the database
        await createNewProtocol(protocol);
      }

      // Update UI state after successful API call
      setAllProtocols((prev) => {
        const protocolExists = prev.some(
          (p) => p.protocol_key === protocolCode
        );

        if (protocolExists) {
          return prev.map((p) =>
            p.protocol_key === protocolCode ? protocol : p
          );
        } else {
          const allProtocolsData = [...prev, protocol];
          const sortedProtocols = allProtocolsData.sort((a, b) =>
            a.protocol_key.localeCompare(b.protocol_key)
          );
          return sortedProtocols;
        }
      });
      handleModalIsOpen(); // to close the modal
    } catch (error) {
      console.error("Error saving protocol:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={open}
      aria-labelledby="modal-title"
      sx={{ "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
    >
      <Box id="new-protocol-modal" sx={newProtocolStyles.container}>
        <Box
          id="protocol-modal-container"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6">Add Protocol Users</Typography>
          <Box id="close/save-buttons">
            <Button
              variant="outlined"
              sx={{ marginRight: "20px" }}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              onClick={handleOnSave}
              variant="contained"
              disabled={
                !protocolCode ||
                Object.values(selectedRoles).some(
                  (roleArray) => roleArray.length === 0
                )
              }
            >
              Save
            </Button>
          </Box>
        </Box>
        <Divider orientation="horizontal" />
        <Typography variant="subtitle2">
          Fields marked with <span style={{ color: "red" }}>*</span> are
          required
        </Typography>
        <ProtocolModalItems
          protocolCode={protocolCode}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
          handleRoleChange={handleRoleChange}
          handleProtocolChange={handleProtocolChange}
        />
      </Box>
    </Modal>
  );
}
