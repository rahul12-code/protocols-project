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
      setProtocolCode(selectedProtocol.protocol_key || "");
    } else {
      setSelectedRoles({});
      setProtocolCode("");
    }
  }, [open, selectedProtocol]);

  console.log(selectedRoles, protocolCode);

  const handleRoleChange = (event, role) => {
    const {
      target: { value },
    } = event;
    setSelectedRoles((prev) => ({
      ...prev,
      [role.apiCode]: typeof value === "string" ? value.split(",") : value,
    }));
  };
  const handleProtocolChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    e.target.value = value;
    setProtocolCode(value);
  };

  const handleOnSave = async () => {
    const updatedProtocol = {
      protocol_key: protocolCode,
      ra_lead: selectedRoles["ra_lead"] || [],
      clinical_labelling_manager:
        selectedRoles["clinical_labelling_manager"] || [],
      cta_sm: selectedRoles["cta_sm"] || [],
      cta_associate: selectedRoles["cta_associate"] || [],
      study_lead: selectedRoles["study_lead"] || [],
    };

    console.log("Saving Protocol:", updatedProtocol);

    const existingIndex = allProtocols.findIndex(
      (p) => p.protocol_key === protocolCode
    );

    try {
      if (existingIndex > -1) {
        // Existing protocol -> Call update function
        await updateProtocol(updatedProtocol);
      } else {
        // New protocol -> Call create function
        await createNewProtocol(updatedProtocol);
      }

      // Update UI state after successful API call
      setAllProtocols((prev) => {
        if (existingIndex > -1) {
          const updatedList = [...prev];
          updatedList[existingIndex] = updatedProtocol;
          return updatedList;
        }
        return [...prev, updatedProtocol];
      });

      handleModalIsOpen();
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
          selectedProtocol={selectedProtocol}
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
