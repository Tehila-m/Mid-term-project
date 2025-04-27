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


const UpdateTodos = ({ onClose, todo }) => {

    const [_id, set_id] = useState("")
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState([])
    const [complete, setComplete] = useState(false)

    const handleDeleteClick = () => {
        setTitle("")
        setTags([])
        setComplete(false)
    }

    const Naviage = useNavigate()

    useEffect(() => {
        console.log("todo received in UserActions:", todo);
        if (todo && todo._id) {
            setTitle(todo.title || "");
            setTags(todo.tags || "");
            setComplete(todo.complete || false);
        }
    }, [todo]);

    const submitForm = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
    
        try {
            const { data } = await axios.put("http://localhost:7001/api/todos", { title, tags, complete });
            onClose();  // Close the form after successful update
            Naviage("/api/todos");  // Navigate to the todos page
        } catch (error) {
            console.error("Error updating todo:", error);  // Handle any errors that occur during the update
        }
    };
    
    return (
        <Box component="form" onSubmit={submitForm} sx={{ display: "flex", flexDirection: "column", gap: 2, width: 320 }}>
            <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8, color: "gray", backgroundColor: "#f5f5f5", borderRadius: "4px", "&:hover": { backgroundColor: "#e0e0e0" } }} size="small">
                <CloseIcon fontSize="small" />
            </IconButton>

            <TextField label="title" required fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField label="tags" required fullWidth value={tags} onChange={(e) => setTags(e.target.value)} />
            <TextField label="complete" required fullWidth value={complete} onChange={(e) => setComplete(e.target.value)} />
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<ClearRoundedIcon />} onClick={()=>handleDeleteClick()}>
                    Delete
                </Button>
                <Button variant="contained" endIcon={<PersonAddRoundedIcon />} type="submit" >
                    Update Uesr
                </Button>
            </Stack>
        </Box>
    );
};

export default UpdateTodos;
