import React, { useEffect } from "react";
import { getAllProtocols } from "../services/get/getAllProtocols";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ProtocolTable = ({ handleModalOpen, allProtocols, setAllProtocols }) => {
  
  const columnNames = [
    "Protocol ID",
    "RA Lead",
    "Clinical Labelling Manager",
    "CTA SM",
    "CTA Associate",
    "Study Lead",
  ];

  useEffect(() => {
    async function fetchProtocols() {
      try {
        const allProtocolsData = await getAllProtocols();
        setAllProtocols(allProtocolsData);
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchProtocols();
  }, []);
  console.log(allProtocols);

  return (
    <Box sx={{ p: 4 }}>
      <Box
        onClick={handleModalOpen}
        sx={{ display: "flex", justifyContent: "end", mb: 2 }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "blue",
            borderRadius: "8px",
            px: 3,
            py: 1,
            "&:hover": { backgroundColor: "darkblue" },
          }}
        >
          + ADD PROTOCOL USERS
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {columnNames.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: "bold", width: "17%" }}
                >
                  {column}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProtocols.map((protocol, index) => (
              <TableRow key={index} sx={{ borderTop: "1px solid #ddd" }}>
                <TableCell sx={{ color: "blue", cursor: "pointer" }}>
                  {protocol.protocol_key}
                </TableCell>
                <TableCell>{protocol.ra_lead?.join(", ")}</TableCell>
                <TableCell>
                  {protocol.clinical_labelling_manager?.join(", ")}
                </TableCell>
                <TableCell>{protocol.cta_sm?.join(", ")}</TableCell>
                <TableCell>{protocol.cta_associate?.join(", ")}</TableCell>
                <TableCell>{protocol.study_lead?.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleModalOpen(protocol)} // Pass protocol data for editing
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProtocolTable;
