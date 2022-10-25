import { Button } from "react-materialize";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { deleteUser, updateEmail } from './Users';

export default function User() {
    const dispatch = useDispatch();
    const userList = useSelector((state)=> state.users.value); 
    const [newEmail,setNewEmail]=useState('');
    return(
        <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Major</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Change Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.major}</TableCell>
                <TableCell>{user.message}</TableCell>
                <TableCell>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <input
                      id="outlined-basic"
                      label="Your Name"
                      variant="outlined"
                      onChange={(e)=>setNewEmail(e.target.value)}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Button onClick={()=>{dispatch(updateEmail({id: user.id, email: newEmail}));}}>Update</Button>
                  <Button style={{ marginTop: "5px", width: '85px' }} onClick={()=> {dispatch(deleteUser({id: user.id}));}}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}


