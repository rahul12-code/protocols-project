import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Chip,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { protocolModalItemStyles } from "./ProtocolModalItemsStyles";

import { rolesDropdownConfig } from "../../../config/RolesDropdownConfig";
import { getAllUsers } from "../../../services/get/getAllUsers";

export function ProtocolModalItems({
  protocolCode,
  selectedRoles,
  handleRoleChange,
  handleProtocolChange,
  setSelectedRoles,
}) {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const allUsersData = await getAllUsers();
        setAllUsers(allUsersData);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    fetchUsers();
  }, []);

  const handleChipDelete = (role, valueToRemove) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [role.apiCode]:
        prev[role.apiCode]?.filter((item) => item !== valueToRemove) || [],
    }));
  };

  return (
    <Box id="items-data" sx={protocolModalItemStyles.container}>
      <Box
        id="protocol-id-tab"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Typography variant="subtitle2">
          <span style={{ color: "red" }}>*</span> Protocol ID
        </Typography>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Add Protocol ID"
          value={protocolCode}
          onChange={(e) => {
            handleProtocolChange(e);
          }}
          helperText="Only Alphanumeric characters are allowed"
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              height: "65px",
            },
          }}
        />
      </Box>

      {rolesDropdownConfig.map((role) => (
        <Box id="roles-tab" key={role.id}>
          <Typography variant="subtitle2">
            <span style={{ color: "red" }}>*</span> {role.name}
          </Typography>
          <FormControl fullWidth variant="outlined">
            <Select
              multiple
              value={selectedRoles[role.apiCode] || []}
              onChange={(event) => {
                handleRoleChange(event, role);
              }}
              sx={{ height: "65px" }}
              renderValue={(selected) => (
                <Box
                  id="selected-item-chips"
                  onMouseDown={(e) => e.stopPropagation()}
                  sx={protocolModalItemStyles.selectedChipItemsContainer}
                >
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onMouseDown={(e) => e.stopPropagation()}
                      onDelete={() => {
                        handleChipDelete(role, value);
                      }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {allUsers.map((user) => {
                const fullName = `${user.first_name} ${user.last_name}`;
                return (
                  <MenuItem key={user.id} value={fullName}>
                    <ListItemText primary={fullName} />
                    {selectedRoles[role.apiCode]?.includes(fullName) && (
                      <CheckIcon />
                    )}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      ))}
    </Box>
  );
}
