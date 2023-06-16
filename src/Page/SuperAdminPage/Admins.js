import React from 'react'
import { useState, useEffect,useSelector } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useCookies } from 'react-cookie';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'phoneNumber', headerName: 'Phone number', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 }
]
function Admins() {
  const [admins, setAdmins] = useState([]);
  const [cookies, setCookies, removeCookie] = useCookies();
  // const auth = useSelector((state) => state.persistedReducer.user);
  // const auth = useSelector((state) => state.persistedReducer.user);
  const token = cookies.token

  useEffect(() => {
    axios.get('https://wedeyet.herokuapp.com/api/auth/get/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Welcome ",token)
        const data = response.data.Users;
        const res = data.map((item, index) => ({ ...item, id: index+1}))
        // console.log(res);
        setAdmins(res);
      })
      .catch(error => {
        console.error(error);
        console.log(error);
      });
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Admin and SuperAdmins</h2>
      <DataGrid
        rows={admins}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

export default Admins