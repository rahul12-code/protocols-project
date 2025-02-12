import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Divider } from "@mui/material";
import { newProtocolStyles } from "./NewProtocolStyles";
import { ProtocolModalItems } from "./components/ProtocolModalItems";
import { createNewProtocol } from "../../services/post/createProtocol";
export function NewProtocolModal({
  open,
  onClose,
  handleModalIsOpen,
  setAllProtocols,
}) {
  const [selectedRoles, setSelectedRoles] = useState({});
  const [protocolCode, setProtocolCode] = useState("");

  useEffect(() => {
    setSelectedRoles({});
    setProtocolCode("");
  }, [open]);

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
    const createProtocol = {
      protocol_key: protocolCode,
      ra_lead: selectedRoles["ra_lead"],
      clinical_labelling_manager: selectedRoles["clinical_labelling_manager"],
      cta_sm: selectedRoles["cta_sm"],
      cta_associate: selectedRoles["cta_associate"],
      study_lead: selectedRoles["study_lead"],
    };
    console.log("created", createProtocol);
    await createNewProtocol(createProtocol);

    handleModalIsOpen();
    setAllProtocols((prev) => [...prev, createProtocol]);
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
                !protocolCode || Object.keys(selectedRoles).length !== 5
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
          selectedRoles={selectedRoles}
          handleRoleChange={handleRoleChange}
          handleProtocolChange={handleProtocolChange}
          setSelectedRoles={setSelectedRoles}
        />
      </Box>
    </Modal>
  );
}
