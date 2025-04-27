import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from "axios";
import AddTodos from './AddTodos';
import UpdateTodos from './UpdateTodos'

import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import AddIcon from '@mui/icons-material/Add';

export default function MainTodosPage() {

  const [todos, setTodos] = useState([]);
  const [isComplete, setIsComplete] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [openUpdateForm, setOpenUpdateForm] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null);


  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const fetchUsers = async () => {
    const { data } = await Axios.get("http://localhost:7001/api/todos");
    const sortedTodos = data.sort((a, b) => b._id.localeCompare(a._id));
    setTodos(sortedTodos);
  }

  const handleCheckboxChange = async (_id, currentStatus) => {
    await Axios.put(`http://localhost:7001/api/todos/${_id}`, { complete: !currentStatus });
    // setTodos((prevTodos) =>
    //   prevTodos.map((todo) =>
    //     todo._id === id ? { ...todo, complete: !currentStatus } : todo
    //   )
    // );
  };

  const handleAddTodosClick = () => {
    setOpenForm(open => !open);
  };

  const handleUpdateTodosClick = (todo) => {
    setSelectedTodo(todo);
    setOpenUpdateForm(true);  
};


  const handleDeleteClick = async (_id) => {
    await Axios.delete(`http://localhost:7001/api/todos/${_id}`)
  }

  useEffect(() => {
    fetchUsers();
  }, [handleCheckboxChange, handleDeleteClick])

  if (todos.length === 0) return <div>no todos... 🤭</div>


  return (
    <div>
      {openForm && (<div className="add-user-container"><AddTodos onClose={() => setOpenForm(false)} /></div>)}
      {openUpdateForm && (<div className="add-user-container"><UpdateTodos onClose={() => setOpenUpdateForm(false)} todo={selectedTodo} /></div>)}
      <Stack spacing={2} sx={{ padding: 2 }}>
        {todos.map((todo) => (
          <Card key={todo._id} sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {todo.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {todo.tags?.join(', ') || 'No tags'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=> handleUpdateTodosClick(todo)} >Update</Button>
              <Button size="small" onClick={() => handleDeleteClick(todo._id)}>Delete</Button>
              <Checkbox checked={todo.complete}
                onChange={() => handleCheckboxChange(todo._id, todo.complete)}>
                complete</Checkbox>
            </CardActions>
          </Card>
        ))}
      </Stack>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton selected={selectedIndex === 0} onClick={() => handleAddTodosClick()} >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add todo" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="Trash" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="Spam" />
          </ListItemButton>
        </List>
      </Box>


    </div>
  );
}