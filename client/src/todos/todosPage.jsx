import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const fetchTodos = async ()=>{
        const {data} = await Axios.get("http//")
    }
  return (
      <Button variant="outlined" onClick={()=>{navigate("/api/todos/getAllTodos")}}>todos list</Button>
  );
}