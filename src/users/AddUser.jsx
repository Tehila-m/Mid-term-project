import * as React from "react";
import { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import { IconButton } from "@mui/material"; 
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from "@mui/icons-material/Close";
import Stack from '@mui/material/Stack';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddUser = ({ onClose }) => {
  const[userName, setUserName] = useState("")
  const[email, setEmail] = useState("")
  const[address, setAddress] = useState("")
  const[phone, setPhone] = useState("")

  const handleDeleteClick = () =>{
    setUserName("")
    setEmail("")
    setAddress("")
    setPhone("")
  }

  const Naviage = useNavigate()

  const submitForm = async (e)=>{
    e.preventDefault()
    const {data} = await axios.post("http://localhost:7001/api/users", {userName, email, address, phone})
    handleDeleteClick();
    onClose();
    Naviage("/api/users")
  }

  return (
    <Box component="form" onSubmit={submitForm} sx={{ display: "flex", flexDirection: "column", gap: 2, width: 320 }}>
            <IconButton onClick={onClose} sx={{ position: "absolute",  top: 8, right: 8, color: "gray", backgroundColor: "#f5f5f5", borderRadius: "4px", "&:hover": { backgroundColor: "#e0e0e0" }}}size="small">
        <CloseIcon fontSize="small" />
      </IconButton>

      <TextField label="User Name" required fullWidth value={userName} onChange={(e)=>setUserName(e.target.value)}/>
      <TextField label="Email" required fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <TextField label="Address" required fullWidth value={address} onChange={(e)=>setAddress(e.target.value)}/>
      <TextField label="Phone" required fullWidth value={phone} onChange={(e)=>setPhone(e.target.value)}/>
      <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<ClearRoundedIcon />} onClick={handleDeleteClick}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<PersonAddRoundedIcon />} type="submit">
        Add user
      </Button>
    </Stack>
    </Box>
  );
};

export default AddUser;
