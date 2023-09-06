import React from "react";
import { useState, useEffect, useSelector } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useCookies } from "react-cookie";
import AddIcon from "@mui/icons-material/Add";
import RegistrationForm from "../../components/RegistrationForm";
import ProfilePage from "../../components/ProfilePage";
// import { Modal } from "@mui/material";
import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
function Admins() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phoneNumber", headerName: "Phone number", width: 130 },
    { field: "role", headerName: "Role", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      align: "center", // Add align property and set it to 'center'
      headerAlign: "center", // Add headerAlign property and set it to 'cente
      renderCell: (params) => (
        <div className="space-x-2 flex ">
          {console.log("params: ", params)}
          <button
            className="px-3 py-1 border border-green-500 text-green-600 font-semi-bold hover:text-white rounded xoutline hover:bg-green-600 transition-colors duration-300"
            onClick={() => {
              setUser(params.row);
              openProfileModal();
            }}
          >
            {/* <InfoIcon /> */}
            Details
          </button>
          <button
            className="px-3 py-1 border border-blue-500 text-blue-600 font-semi-bold hover:text-white rounded xoutline hover:bg-blue-600 transition-colors duration-300 hidden"
            // onClick={() => handleEdit(params.row)}
          >
            {/* <EditIcon />  */}
            Edit
          </button>
          <button
            className="px-3 py-1 border border-red-500 text-red-600 font-semi-bold hover:text-white rounded outline-none hover:bg-red-600 transition-colors duration-300 "
            onClick={() => {openDeleteDialog(params.row._id)
              setDeleteUser(params.row);}}
          >
            {/* <DeleteIcon /> */}
            Delete
          </button>
        </div>
      ),
    },
  ];

  const [admins, setAdmins] = useState([]);
  const [cookies, setCookies, removeCookie] = useCookies();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [user, setUser] = useState({});
  const [deleteUser, setDeleteUser] = useState({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5); // Initial page size
  const [page, setPage] = useState(0); // Initial page index

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  
  //   const handleButtonClick = (id) => {
  // Placeholder implementation for handleButtonClick
  // console.log(`Details button clicked for ID: ${id}`);
  // };
  // const auth = useSelector((state) => state.persistedReducer.user);
  // const auth = useSelector((state) => state.persistedReducer.user);
  const token = cookies.token;

  const handleDelete = (id) => {
    // Perform your delete logic here
    console.log(" user Deleted!")
    // axios delete request
    axios.delete(`https://wedeyet.herokuapp.com/api/auth/delete/${id}`,
      { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        setAdmins(prev => prev.filter(admin => admin._id !== id));
        closeDeleteDialog();
        console.log(response.data);
       }).
      catch((err) => { console.log(err) })
    // ...
    console.log(` user with ID ${id} Deleted!`);
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  //on added
  // useEffect(() => {
  //   // Perform any necessary actions here
  //   // For example, you can trigger an API call or update some other state

  //   // Refresh the component by setting the items state again
  //   // setAdmin(items);
  // }, [admins]);

  //user info
  useEffect(() => {
    axios
      .get("https://wedeyet.herokuapp.com/api/auth/current/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.User);
        console.log("auth data ", user);
        // setAllSubCategory(data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://wedeyet.herokuapp.com/api/auth/get/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Welcome ", token);
        const data = response.data.Users;
        const res = data.map((item, index) => ({ ...item, id: index + 1 }));
        // console.log(res);
        setAdmins(res);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // window.location.reload();//lloo
  };

  const openProfileModal = () => {
    setIsProfileModal(true);
  };

  const closeProfileModal = () => {
    setIsProfileModal(false);
    // window.location.reload();//lloo
  };

  const addItem = (newItem) => {
    const res = [...admins, newItem].map((item, index) => ({ ...item, id: index + 1 }));
    // setAdmins(prev => [...prev, newItem]);
    setAdmins(res);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div className="flex justify-between pb-2">
        <h2 className="text-xl">Admin and SuperAdmins</h2>
        <button
          onClick={openModal}
          className="flex text-xl bg-lime-400 hover:bg-lime-500 text-white font-bold py-1 px-2 rounded flex items-center mr-2 "
        >
          <AddIcon className="mr-1" fontSize="large" />
          Add User
        </button>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <RegistrationForm closeModal={closeModal}  addItem={addItem} />
        {/* <ProfilePage user={user}/> */}
      </Modal>
      <Modal open={isProfileModal} onClose={closeProfileModal}
        className='mx-4 md:mx-72 mt-8 '>
        <ProfilePage user={user} />
      </Modal>
      {/* //delete */}
      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={()=>handleDelete(deleteUser._id)} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        sx={{ fontSize: "16px", paddingX: "10px" }}
        // rows={admins}
        // columns={columns}
        // rowCount={admins.length}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 5 },
        //   },
        // }}

        pageSizeOptions={[5, 10]}
        // checkboxSelection
        rows={admins} // Your data rows
        columns={columns} // Your columns configuration
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        pagination
        rowCount={admins.length} // Total number of rows in your data
        page={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Admins;
