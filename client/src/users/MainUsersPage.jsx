import { useEffect, useState } from "react";
import Axios from "axios";
import * as React from 'react';
import AddUser from "./AddUser";
import UserActions from "./UserActions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';

export default function MainUsersPage() {

    const [open, setOpen] = useState(true);
    const [users, setUsers] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [userActionOpen, setUserActionOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // const handleClick = () => {
    //     setOpen(!open);
    // };

    const handleAddUserClick = () => {
        setOpenForm(open => !open);
    };

    const handleRowClick = (user) => {
        console.log("The user is:", user); 
        setSelectedUser(user);
        setUserActionOpen(true);
    };
    
    const fetchUsers = async () => {
        const { data } = await Axios.get("http://localhost:7001/api/users");
        const sortedUsers = data.sort((a, b) => b._id.localeCompare(a._id));
        setUsers(sortedUsers);
    }

    useEffect(() => {
        fetchUsers();
    }, [open, users, openForm, userActionOpen, selectedUser])

    if (users.length === 0) return <div>no users... 🤭</div>

    // function createData(userName, email, address, phone) {
    //     return { userName, email, address, phone }
    // }

    return (
        <>
            <div className="main-content">
                <div className="main-content-background"></div>

                {userActionOpen && (<div className="add-user-container"><UserActions user={selectedUser} onClose={() => setUserActionOpen(false)} onUpdate={fetchUsers} /></div>)}
                {openForm && (<div className="add-user-container"><AddUser user={selectedUser} onClose={() => setOpenForm(false)} /></div>)}

                <div className="main-content">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User name:</TableCell>
                                    {/* <TableCell align="right"></TableCell> */}
                                    <TableCell align="right">email&nbsp;</TableCell>
                                    <TableCell align="right">address&nbsp;</TableCell>
                                    <TableCell align="right">phone&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user._id} onClick={() => handleRowClick(user)} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell component="th" scope="row">
                                            {user.userName}
                                        </TableCell>
                                        {/* <TableCell align="right">{row.userName}</TableCell> */}
                                        <TableCell align="right">{user.email}</TableCell>
                                        <TableCell align="right">{user.address}</TableCell>
                                        <TableCell align="right">{user.phone}</TableCell>
                                    </TableRow>
                                )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div className="sidebar">
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            User management
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleAddUserClick}>
                        <ListItemIcon>
                            <PersonAddRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create new user" />
                    </ListItemButton>

                    {/* <ListItemButton>
        <ListItemIcon>
          <PersonRemoveRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Delete user" />
      </ListItemButton> */}

                    {/* <ListItemButton>
                        <ListItemIcon>
                            <ManageAccountsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Update user" />
                    </ListItemButton> */}

                    <ListItemButton>
                        <ListItemIcon>
                            <GroupRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="All users" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <PersonSearchRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Search user by id" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </div>
        </>
    );
}