import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AddNewTaskDialog from "../dialogs/AddNewTaskDialog";
import { NavBarWrapper } from "../../styles";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <NavBarWrapper>
      <Typography variant="h6">Kanban Style board</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Task
      </Button>

      <AddNewTaskDialog open={open} handleClose={handleClose} />
    </NavBarWrapper>
  );
};

export default NavBar;
