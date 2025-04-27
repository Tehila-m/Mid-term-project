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


const AddTodos = ({ onClose }) => {
  const[title, setTitle] = useState("")
  const[tags, setTags] = useState([])
  const[complete, setComplete] = useState(false)

  const handleDeleteClick = () =>{
    setTitle("")
    setTags([])
    setComplete(false)
  }

  const Naviage = useNavigate()

  const submitForm = async (e)=>{
    e.preventDefault()
    const {data} = await axios.post("http://localhost:7001/api/todos", {title, tags, complete})
    handleDeleteClick();
    onClose();
    Naviage("/api/todos")
  }

  return (
    <Box component="form" onSubmit={submitForm} sx={{ display: "flex", flexDirection: "column", gap: 2, width: 320 }}>
            <IconButton onClick={onClose} sx={{ position: "absolute",  top: 8, right: 8, color: "gray", backgroundColor: "#f5f5f5", borderRadius: "4px", "&:hover": { backgroundColor: "#e0e0e0" }}}size="small">
        <CloseIcon fontSize="small" />
      </IconButton>

      <TextField label="title" required fullWidth value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <TextField label="tags" required fullWidth value={tags} onChange={(e)=>setTags(e.target.value)}/>
      <TextField label="complete" required fullWidth value={complete} onChange={(e)=>setComplete(e.target.value)}/>
      <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<ClearRoundedIcon />} onClick={handleDeleteClick}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<PersonAddRoundedIcon />} type="submit">
        Add todos
      </Button>
    </Stack>
    </Box>
  );
};

export default AddTodos;
