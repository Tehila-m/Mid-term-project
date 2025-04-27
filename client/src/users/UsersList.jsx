// import { useEffect, useState } from "react";
// import Axios from "axios";
// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const UsersList = ()=>{

//     const [users, setUsers] = useState([]);

//     const fetchUsers = async ()=>{
//         const {data} = await Axios.get("http://localhost:7001/api/users");
//         setUsers(data);
//     }

//     useEffect(()=>{
//         fetchUsers();
//     }, [])

//     if(users.length === 0) return <div>no users... 🤭</div>

//     function createData(userName, email, address, phone) {
//         return {userName, email, address, phone}
//       }

//       const rows = users.map((user)=>createData(user.userName, user.email, user.address, user.phone))

//       return (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>User name:</TableCell>
//                 <TableCell align="right"></TableCell>
//                 <TableCell align="right">email&nbsp;</TableCell>
//                 <TableCell align="right">address&nbsp;</TableCell>
//                 <TableCell align="right">phone&nbsp;</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row) => (
//                 <TableRow
//                   key={row.userName}
//                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">
//                     {row.name}
//                   </TableCell>
//                   <TableCell align="right">{row.userName}</TableCell>
//                   <TableCell align="right">{row.email}</TableCell>
//                   <TableCell align="right">{row.address}</TableCell>
//                   <TableCell align="right">{row.phone}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       );
// }

// export default UsersList;


