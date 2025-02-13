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
        id="cancel-modal"
        sx={[
          newProtocolStyles.container,
          newProtocolStyles.cancelContainerStyles,
        ]}
      >
        <Typography variant="h5">Are you sure you want to cancel?</Typography>
        <Box id="no-yes-button">
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
