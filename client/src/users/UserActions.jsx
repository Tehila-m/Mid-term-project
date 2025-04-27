import * as React from "react";
import { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import { IconButton } from "@mui/material"; 
import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
import Stack from '@mui/material/Stack';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UserActions = ({ onClose , user={}, onUpdate}) => {
  const[_id, set_id] = useState("")
  const[userName, setUserName] = useState("")
  const[email, setEmail] = useState("")
  const[address, setAddress] = useState("")
  const[phone, setPhone] = useState("")

  const[isFieldModify, setIsFieldModify] = useState(false)

  const handleDeleteClick = async () =>{
    await axios.request({
      method: "DELETE",
      url: "http://localhost:7001/api/users",
      data: { _id: user._id },  // Send _id in request body
    });
    onClose()
  }

  useEffect(() => {
    console.log("User received in UserActions:", user);
    if (user && user._id) { 
      setUserName(user.userName || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [user]);
      

  const Naviage = useNavigate()

  const submitForm = async (e)=>{
    e.preventDefault()
    const {data} = await axios.put("http://localhost:7001/api/users", { _id: user._id, userName, email, address, phone,})
    onClose();
    Naviage("/api/users")
  }

  return (
    <Box component="form" onSubmit={submitForm} sx={{ display: "flex", flexDirection: "column", gap: 2, width: 320 }}>
            <IconButton onClick={onClose} sx={{ position: "absolute",  top: 8, right: 8, color: "gray", backgroundColor: "#f5f5f5", borderRadius: "4px", "&:hover": { backgroundColor: "#e0e0e0" }}}size="small">
        <CloseIcon fontSize="small" />
      </IconButton>
      <TextField label="User Name" required fullWidth value={userName} onChange={(e)=>setUserName(e.target.value)} disabled={isFieldModify}/>
      <TextField label="Email" required fullWidth value={email} onChange={(e)=>setEmail(e.target.value)} disabled={isFieldModify}/>
      <TextField label="Address" required fullWidth value={address} onChange={(e)=>setAddress(e.target.value)} disabled={isFieldModify}/>
      <TextField label="Phone" required fullWidth value={phone} onChange={(e)=>setPhone(e.target.value)} disabled={isFieldModify}/>
      <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<VerifiedUserIcon />} type="submit">
        Update user
      </Button>
    </Stack>
    </Box>
  );
};

export default UserActions;
