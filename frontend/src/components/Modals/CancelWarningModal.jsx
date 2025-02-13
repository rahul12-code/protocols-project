import { newProtocolStyles } from "./NewProtocolStyles";
import { Modal, Box, Typography, Button } from "@mui/material";
export function CancelWarningModal({
  isCancelOpen,
  handleCancelModalOpen,
  handleModalOpen,
}) {
  return (
    <Modal
      open={isCancelOpen}
      onClose={handleCancelModalOpen}
      aria-labelledby="modal-title"
      sx={{ "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
    >
      <Box
        sx={{
          ...newProtocolStyles.container,
          width: "30vw",
          height: "30vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Typography variant="h5">Are you sure you want to cancel?</Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={handleCancelModalOpen}
            sx={{ marginRight: "20px" }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              handleModalOpen();
              handleCancelModalOpen();
            }}
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
